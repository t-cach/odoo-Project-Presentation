import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './data/slidesData';
import { PresentationMode, SlideData } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SlideRenderer } from './components/SlideRenderer';
import { PresenterNotes } from './components/PresenterNotes';
import { GridOverview } from './components/GridOverview';
import { DefenseQA } from './components/DefenseQA';
import { DossierViewer } from './components/DossierViewer';
import { ShortcutsModal } from './components/ShortcutsModal';

export default function App() {
  // Read initial slide index from URL hash (e.g. #3 -> index 2)
  const getInitialIndex = (): number => {
    try {
      const hash = window.location.hash.replace(/^#/, '');
      const parsed = parseInt(hash, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= SLIDES.length) {
        return parsed - 1;
      }
    } catch {
      // ignore
    }
    return 0;
  };

  const [currentIndex, setCurrentIndex] = useState<number>(getInitialIndex);
  const [mode, setMode] = useState<PresentationMode>('presentation');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Hover-only top header management
  const [isHeaderPinned, setIsHeaderPinned] = useState<boolean>(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterHeader = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHeaderHovered(true);
  };

  const handleMouseLeaveHeader = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHeaderHovered(false);
    }, 280);
  };

  // Header is always visible in document/QA/grid modes or when pinned or hovered
  const isHeaderVisible = isHeaderPinned || isHeaderHovered || mode === 'dossier' || mode === 'defense_qa' || mode === 'grid';

  // Sync hash with current slide
  useEffect(() => {
    window.location.hash = `${currentIndex + 1}`;
  }, [currentIndex]);

  // Presentation timer loop
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setElapsedSeconds(0);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Listen for fullscreenchange events (e.g. user pressed Esc on browser level)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const [isBlackout, setIsBlackout] = useState<boolean>(false);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'Escape') {
        if (isBlackout) {
          setIsBlackout(false);
          return;
        }
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
          return;
        }
        if (mode !== 'presentation') {
          setMode('presentation');
          return;
        }
      }

      if (e.key === 'b' || e.key === 'B') {
        setIsBlackout((prev) => !prev);
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Section quick-jumps via Shift + Number
      if (e.shiftKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const sectionMap: Record<string, number> = {
          '1': 0,  // Title
          '2': 2,  // Problem
          '3': 4,  // 4-Tier Architecture
          '4': 5,  // ORM Entities
          '5': 6,  // State Machine
          '6': 7,  // Math Engine
          '7': 9,  // AI Safety
          '8': 14, // Testing & QA
          '9': 17  // Conclusion
        };
        const targetIdx = sectionMap[e.key];
        if (targetIdx !== undefined) {
          setCurrentIndex(targetIdx);
          setIsBlackout(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          setIsBlackout(false);
          handleNext();
          break;
        case ' ':
          if (e.shiftKey) {
            e.preventDefault();
            setIsBlackout(false);
            handlePrev();
          } else {
            e.preventDefault();
            setIsBlackout(false);
            handleNext();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          setIsBlackout(false);
          handlePrev();
          break;
        case 'p':
        case 'P':
          setMode((m) => (m === 'presenter' ? 'presentation' : 'presenter'));
          break;
        case 'g':
        case 'G':
          setMode((m) => (m === 'grid' ? 'presentation' : 'grid'));
          break;
        case 'q':
        case 'Q':
          setMode((m) => (m === 'defense_qa' ? 'presentation' : 'defense_qa'));
          break;
        case 'd':
        case 'D':
          setMode((m) => (m === 'dossier' ? 'presentation' : 'dossier'));
          break;
        case 's':
        case 'S':
          setMode('presentation');
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 't':
        case 'T':
          toggleTimer();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, toggleFullscreen, toggleTimer, mode, isShortcutsOpen, isBlackout]);

  const currentSlide = SLIDES[currentIndex];
  const nextSlide = currentIndex < SLIDES.length - 1 ? SLIDES[currentIndex + 1] : undefined;

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 overflow-hidden font-sans relative">
      {/* Invisible Hover Detection Trigger at the very top */}
      <div
        onMouseEnter={handleMouseEnterHeader}
        className="fixed top-0 left-0 right-0 h-4 z-40 pointer-events-auto"
        aria-hidden="true"
      />

      {/* Subtle Top Indicator Notch (Visible when header is hidden in presentation/presenter mode) */}
      {!isHeaderVisible && (mode === 'presentation' || mode === 'presenter') && (
        <div
          onMouseEnter={handleMouseEnterHeader}
          onClick={handleMouseEnterHeader}
          className="fixed top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900/90 hover:bg-purple-950 backdrop-blur-md text-white rounded-b-xl shadow-md border-b border-x border-slate-700/60 cursor-pointer z-40 transition-all flex items-center gap-2 group text-xs font-bold select-none"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="text-slate-200 group-hover:text-white">
            Slide {currentIndex + 1} of {SLIDES.length} • Hover for menu & controls
          </span>
        </div>
      )}

      {/* Top Header: Hover-revealed / Pinned overlay */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          isHeaderVisible ? 'translate-y-0 shadow-lg' : '-translate-y-full pointer-events-none'
        }`}
      >
        <div className="pointer-events-auto">
          <Header
            currentSlide={currentSlide}
            currentIndex={currentIndex}
            totalSlides={SLIDES.length}
            mode={mode}
            setMode={setMode}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            elapsedSeconds={elapsedSeconds}
            toggleTimer={toggleTimer}
            isTimerRunning={isTimerRunning}
            onOpenShortcuts={() => setIsShortcutsOpen(true)}
            isPinned={isHeaderPinned}
            onTogglePin={() => setIsHeaderPinned((prev) => !prev)}
            onMouseEnter={handleMouseEnterHeader}
            onMouseLeave={handleMouseLeaveHeader}
          />
        </div>
      </div>

      {/* Main View Area */}
      <main className={`flex-1 overflow-hidden relative flex ${
        mode === 'dossier' || mode === 'defense_qa' || mode === 'grid' ? 'pt-14' : ''
      }`}>
        {mode === 'grid' ? (
          <GridOverview
            currentIndex={currentIndex}
            onSelectSlide={(idx) => setCurrentIndex(idx)}
            onClose={() => setMode('presentation')}
          />
        ) : mode === 'defense_qa' ? (
          <DefenseQA onClose={() => setMode('presentation')} />
        ) : mode === 'dossier' ? (
          <DossierViewer onClose={() => setMode('presentation')} />
        ) : mode === 'presenter' ? (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden pt-2">
            {/* Left: Scaled Slide View - Expanded width */}
            <div className="lg:col-span-7 bg-slate-100 p-4 sm:p-6 flex flex-col justify-center items-center overflow-y-auto custom-scrollbar border-r-2 border-slate-200">
              <div className="w-full bg-white rounded-2xl shadow-md border-2 border-slate-200 p-6 sm:p-8">
                <SlideRenderer slide={currentSlide} onNavigateToQA={() => setMode('defense_qa')} />
              </div>
            </div>

            {/* Right: Speaker notes & teleprompter */}
            <div className="lg:col-span-5 h-full overflow-hidden">
              <PresenterNotes
                currentSlide={currentSlide}
                nextSlide={nextSlide}
                elapsedSeconds={elapsedSeconds}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
                isTimerRunning={isTimerRunning}
                onNext={handleNext}
                onPrev={handlePrev}
                canNext={currentIndex < SLIDES.length - 1}
                canPrev={currentIndex > 0}
              />
            </div>
          </div>
        ) : (
          /* Standard Full Slide Presentation Mode - Big card taking full screen */
          <div className="w-full h-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 py-3 sm:py-4 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[97vw] 2xl:max-w-[1750px] bg-white rounded-2xl shadow-sm border-2 border-slate-200 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between my-auto transition-all animate-fadeIn min-h-[84vh]">
              <SlideRenderer slide={currentSlide} onNavigateToQA={() => setMode('defense_qa')} />
            </div>
          </div>
        )}
      </main>

      {/* Bottom Footer Navigation */}
      {mode !== 'grid' && mode !== 'defense_qa' && mode !== 'dossier' && (
        <Footer
          currentIndex={currentIndex}
          totalSlides={SLIDES.length}
          currentSlide={currentSlide}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSlide={(idx) => setCurrentIndex(idx)}
        />
      )}

      {/* Fullscreen Blackout Overlay */}
      {isBlackout && (
        <div
          onClick={() => setIsBlackout(false)}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer select-none animate-fadeIn"
        >
          <div className="text-slate-600 font-mono text-xs uppercase tracking-widest bg-slate-950/80 px-4 py-2 rounded-full border border-slate-900">
            Screen Blackout Active • Press <span className="text-slate-400 font-bold">B</span> or <span className="text-slate-400 font-bold">Esc</span> to resume
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
