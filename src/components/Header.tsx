import React from 'react';
import { PresentationMode, SlideData } from '../types';
import { Maximize2, Minimize2, Grid, HelpCircle, MonitorPlay, MessageSquareText, FileText, Clock, BookOpen, Pin, PinOff } from 'lucide-react';

interface HeaderProps {
  currentSlide: SlideData;
  currentIndex: number;
  totalSlides: number;
  mode: PresentationMode;
  setMode: (mode: PresentationMode) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  elapsedSeconds: number;
  toggleTimer: () => void;
  isTimerRunning: boolean;
  onOpenShortcuts: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  currentIndex,
  totalSlides,
  mode,
  setMode,
  isFullscreen,
  toggleFullscreen,
  elapsedSeconds,
  toggleTimer,
  isTimerRunning,
  onOpenShortcuts,
  isPinned = false,
  onTogglePin,
  onMouseEnter,
  onMouseLeave
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4 select-none shadow-sm transition-all"
    >
      {/* Left: Branding & Slide Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 bg-purple-950 text-white font-black text-xs rounded-lg tracking-wider shadow-2xs">
            INTERNSHIP PROJECT • ODOO 18
          </span>
          <span className="px-2.5 py-0.5 bg-teal-50 text-teal-900 font-bold text-xs rounded-md border border-teal-200 hidden sm:inline-block">
            v18.0.1.0
          </span>
        </div>

        <div className="h-4 w-px bg-slate-300 hidden md:block" />

        <div className="min-w-0 truncate">
          <span className="text-2xs font-black uppercase tracking-wider text-purple-800 block truncate">
            {currentSlide.phase} • Slide {currentIndex + 1} of {totalSlides}
          </span>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
            {currentSlide.title}
          </h1>
        </div>
      </div>

      {/* Right: Controls & Modes */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Timer Button */}
        <button
          onClick={toggleTimer}
          title={isTimerRunning ? 'Pause timer' : 'Start timer'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors border cursor-pointer ${
            isTimerRunning
              ? 'bg-purple-50 text-purple-950 border-purple-300 shadow-2xs'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-purple-700 animate-pulse' : 'text-slate-500'}`} />
          <span>{formatTime(elapsedSeconds)}</span>
        </button>

        {/* Mode Selectors */}
        <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-0.5">
          <button
            onClick={() => setMode('presentation')}
            title="Slides Mode (Key: S)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'presentation'
                ? 'bg-white text-purple-950 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Slides</span>
          </button>

          <button
            onClick={() => setMode('presenter')}
            title="Presenter Notes & Next Slide (Key: P)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'presenter'
                ? 'bg-white text-purple-950 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Presenter</span>
          </button>

          <button
            onClick={() => setMode('grid')}
            title="Slide Matrix Grid (Key: G)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'grid'
                ? 'bg-white text-purple-950 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Grid</span>
          </button>

          <button
            onClick={() => setMode('defense_qa')}
            title="Frequently Asked Questions & Technical Discussion (Key: Q)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'defense_qa'
                ? 'bg-white text-teal-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareText className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden md:inline">Q&A</span>
          </button>

          <button
            onClick={() => setMode('dossier')}
            title="Internship Report, Speech & Practical Guide (Key: D)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mode === 'dossier'
                ? 'bg-white text-purple-950 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-800" />
            <span className="hidden md:inline">Report & Guide</span>
          </button>
        </div>

        {/* Pin / Auto-hide toggle */}
        {onTogglePin && (
          <button
            onClick={onTogglePin}
            title={isPinned ? 'Header pinned open (Click to auto-hide on hover)' : 'Auto-hiding on hover (Click to pin permanently)'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isPinned
                ? 'bg-purple-100 text-purple-950 border-purple-300'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {isPinned ? <Pin className="w-4 h-4 text-purple-800" /> : <PinOff className="w-4 h-4 text-slate-400" />}
          </button>
        )}

        {/* Shortcuts button */}
        <button
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts (?)"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen (Key: F)"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
