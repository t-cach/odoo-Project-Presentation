import React from 'react';
import { SlideData } from '../types';
import { Clock, Play, Pause, RotateCcw, ArrowRight, Lightbulb, ListChecks } from 'lucide-react';

interface PresenterNotesProps {
  currentSlide: SlideData;
  nextSlide?: SlideData;
  elapsedSeconds: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  isTimerRunning: boolean;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  currentSlide,
  nextSlide,
  elapsedSeconds,
  toggleTimer,
  resetTimer,
  isTimerRunning,
  onNext,
  onPrev,
  canNext,
  canPrev
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 flex flex-col p-4 md:p-5 overflow-y-auto custom-scrollbar">
      {/* Top Timer & Controls */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
              Presentation Elapsed Time
            </span>
            <span className="text-3xl font-black font-mono tracking-tight text-white">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isTimerRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isTimerRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={resetTimer}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
        {/* Left: Speaker Talking Points */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                Speaker Talking Points
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {currentSlide.speakerNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 font-bold flex items-center justify-center shrink-0 text-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentSlide.takeaways && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-slate-700">
                <ListChecks className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                  Key Project Takeaways
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                {currentSlide.takeaways.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded bg-slate-900/50 border border-slate-750">
                    <span className="text-teal-400 font-bold">✓</span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Next Slide Preview & Teleprompter Cue */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <span className="text-2xs font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
              Next Slide Up
            </span>
            {nextSlide ? (
              <div className="bg-slate-900 border border-slate-750 rounded-lg p-3.5 space-y-2">
                <span className="text-2xs font-bold text-purple-400 block uppercase">
                  Slide #{nextSlide.id} • {nextSlide.phase}
                </span>
                <h4 className="text-sm font-extrabold text-white leading-snug">
                  {nextSlide.title}
                </h4>
                {nextSlide.subtitle && (
                  <p className="text-2xs text-slate-400 leading-normal line-clamp-2">
                    {nextSlide.subtitle}
                  </p>
                )}
                <button
                  onClick={onNext}
                  className="w-full mt-2 py-1.5 bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  Advance to this Slide <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-400 p-4 text-center bg-slate-900/50 rounded-lg">
                This is the final slide of the presentation.
              </div>
            )}
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-2 text-xs">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
              Presentation Tip (Internship Project)
            </span>
            <p className="text-slate-300 leading-relaxed text-2xs">
              Keep explanations oriented toward <strong>architectural outcomes</strong> and <strong>business value</strong> for IT-Koncept SA. Point to empirical evidence (138 tests, live Gemini API validation) when questioned about reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
