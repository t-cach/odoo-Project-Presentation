import React from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Building2 } from 'lucide-react';
import { SlideData } from '../types';

interface FooterProps {
  currentIndex: number;
  totalSlides: number;
  currentSlide: SlideData;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentIndex,
  totalSlides,
  currentSlide,
  onPrev,
  onNext,
  onSelectSlide
}) => {
  const progressPct = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <footer className="w-full bg-white border-t-2 border-slate-200 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-40 select-none shadow-2xs">
      {/* Left: Academic & Corporate Credentials */}
      <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
        <span className="font-extrabold text-purple-900 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-purple-800" />
          iTEAM University
        </span>
        <span className="text-slate-300">•</span>
        <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
          <Building2 className="w-3.5 h-3.5 text-teal-700" />
          IT-Koncept SA (Nyon / Tunis)
        </span>
        <span className="text-slate-300 hidden md:inline">•</span>
        <span className="text-slate-500 font-medium hidden md:inline truncate">
          Supervisor: <strong>Aymen Alaya</strong>
        </span>
      </div>

      {/* Right: Progress & Slide Controls */}
      <div className="flex items-center gap-3">
        {/* Visual Dots / Progress Bar */}
        <div className="hidden lg:flex items-center gap-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              title={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-purple-800'
                  : 'w-1.5 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
          Slide <strong className="text-purple-900">{String(currentIndex + 1).padStart(2, '0')}</strong> / {totalSlides}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`p-1.5 rounded-md border transition-colors ${
              currentIndex === 0
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300 cursor-pointer shadow-2xs'
            }`}
            title="Previous Slide (← / Up / Shift+Space)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            className={`p-1.5 rounded-md border transition-colors ${
              currentIndex === totalSlides - 1
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                : 'bg-purple-900 text-white hover:bg-purple-950 border-purple-950 cursor-pointer shadow-2xs'
            }`}
            title="Next Slide (→ / Down / Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
