import React from 'react';
import { X, Keyboard } from 'lucide-react';

export const ShortcutsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Right Arrow / Down / Space', action: 'Next Slide' },
    { key: 'Left Arrow / Up / Shift+Space', action: 'Previous Slide' },
    { key: 'P', action: 'Toggle Presenter Notes & Teleprompter' },
    { key: 'G', action: 'Toggle Slide Grid Matrix' },
    { key: 'Q', action: 'Toggle Project Q&A Mode' },
    { key: 'D', action: 'Open Internship Report, Speech & System Guide' },
    { key: 'S', action: 'Return to Clean Slide View' },
    { key: 'F', action: 'Toggle Fullscreen Mode' },
    { key: 'T', action: 'Start / Pause Presentation Timer' },
    { key: 'Esc', action: 'Close Modal / Exit Special Views' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border-2 border-slate-200 max-w-md w-full p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-purple-800" />
            <h3 className="text-base font-extrabold text-slate-900">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
            >
              <span className="font-semibold text-slate-700">{sc.action}</span>
              <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-2xs text-purple-900 shadow-2xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
