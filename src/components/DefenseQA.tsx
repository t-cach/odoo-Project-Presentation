import React, { useState, useEffect } from 'react';
import { DEFENSE_QA } from '../data/qaData';
import { HelpCircle, ChevronRight, CheckCircle2, FileCode, Tag, MessageSquare } from 'lucide-react';

export const DefenseQA: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(DEFENSE_QA[0].id);

  const categories = ['All', 'Architecture', 'Odoo 18 Migration', 'AI & LLM Integration', 'Security & RBAC', 'Testing & QA'];

  const filtered = selectedCat === 'All'
    ? DEFENSE_QA
    : DEFENSE_QA.filter((q) => q.category === selectedCat);

  const activeQuestion = DEFENSE_QA.find((q) => q.id === activeQuestionId) || DEFENSE_QA[0];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      // Filter switching via 4 (Left) and 6 / 5 (Right)
      if (e.key === '4') {
        e.preventDefault();
        const currentCatIdx = categories.indexOf(selectedCat);
        const prevCatIdx = currentCatIdx > 0 ? currentCatIdx - 1 : categories.length - 1;
        const newCat = categories[prevCatIdx];
        setSelectedCat(newCat);
        const first = newCat === 'All' ? DEFENSE_QA[0] : DEFENSE_QA.find((q) => q.category === newCat);
        if (first) setActiveQuestionId(first.id);
      } else if (e.key === '6' || e.key === '5') {
        e.preventDefault();
        const currentCatIdx = categories.indexOf(selectedCat);
        const nextCatIdx = currentCatIdx < categories.length - 1 ? currentCatIdx + 1 : 0;
        const newCat = categories[nextCatIdx];
        setSelectedCat(newCat);
        const first = newCat === 'All' ? DEFENSE_QA[0] : DEFENSE_QA.find((q) => q.category === newCat);
        if (first) setActiveQuestionId(first.id);
      }

      // Question navigation via 8 (Up) and 2 (Down)
      if (e.key === '8') {
        e.preventDefault();
        const currentQIdx = filtered.findIndex((q) => q.id === activeQuestionId);
        const prevQIdx = currentQIdx > 0 ? currentQIdx - 1 : filtered.length - 1;
        if (filtered[prevQIdx]) setActiveQuestionId(filtered[prevQIdx].id);
      } else if (e.key === '2') {
        e.preventDefault();
        const currentQIdx = filtered.findIndex((q) => q.id === activeQuestionId);
        const nextQIdx = currentQIdx < filtered.length - 1 ? currentQIdx + 1 : 0;
        if (filtered[nextQIdx]) setActiveQuestionId(filtered[nextQIdx].id);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedCat, activeQuestionId, filtered, categories]);

  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 p-5 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-400" />
              Project Q&A & Technical Arguments (Internship Project)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Prepared justifications, architectural proofs, and code references for evaluation questions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-600"
          >
            Back to Presentation
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                const first = cat === 'All' ? DEFENSE_QA[0] : DEFENSE_QA.find((q) => q.category === cat);
                if (first) setActiveQuestionId(first.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-teal-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Question Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Question List */}
          <div className="md:col-span-5 space-y-2 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
            {filtered.map((q) => {
              const isSelected = q.id === activeQuestion.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`w-full p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-teal-400 ring-1 ring-teal-400 shadow-md'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xs font-bold text-teal-400 uppercase tracking-wider">
                      {q.category}
                    </span>
                    <span className="text-2xs font-mono text-slate-500">Q#{q.id}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {q.question}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Answer Card */}
          <div className="md:col-span-7 bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-teal-400 text-xs font-extrabold uppercase tracking-wide mb-1">
                <Tag className="w-3.5 h-3.5" />
                {activeQuestion.category}
              </div>
              <h3 className="text-base font-extrabold text-white leading-snug">
                {activeQuestion.question}
              </h3>
            </div>

            <div className="bg-slate-900 border border-slate-750 rounded-lg p-3.5">
              <span className="text-2xs font-bold text-teal-300 uppercase tracking-wider block mb-1">
                Executive Synthesis (Direct Answer)
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeQuestion.briefAnswer}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                Key Technical Justifications
              </span>
              <div className="space-y-1.5">
                {activeQuestion.detailedPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-850 p-2 rounded-md border border-slate-750">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-2xs text-slate-400">
              <span className="flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                Verified in Codebase:
              </span>
              <code className="bg-slate-900 text-purple-300 px-2 py-0.5 rounded font-mono border border-slate-750">
                {activeQuestion.codeOrArchitectureReference}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
