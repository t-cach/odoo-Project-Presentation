import React from 'react';
import { SlideData } from '../types';
import { SLIDES } from '../data/slidesData';
import { Check, Eye } from 'lucide-react';

interface GridOverviewProps {
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
}

export const GridOverview: React.FC<GridOverviewProps> = ({
  currentIndex,
  onSelectSlide,
  onClose
}) => {
  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 p-5 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-lg font-black text-white">
              Slide Matrix & Presentation Navigation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any slide thumbnail to jump directly or press ESC to return to presentation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-600"
          >
            Resume Slides
          </button>
        </div>

        {/* 18-Slide Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3.5">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between h-36 ${
                  isActive
                    ? 'bg-slate-800 border-purple-500 ring-2 ring-purple-500 shadow-md'
                    : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xs font-mono font-bold bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800/60">
                      Slide {String(slide.id).padStart(2, '0')}
                    </span>
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                      {slide.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2">
                    {slide.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-750 flex items-center justify-between text-2xs text-slate-400">
                  <span className="truncate">{slide.phase}</span>
                  {isActive && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
