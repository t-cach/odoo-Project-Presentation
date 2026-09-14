import React, { useState } from 'react';
import { Bug, Filter, AlertCircle, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUGS_DATA } from '../../data/bugsData';

export const BugPostMortem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBugId, setActiveBugId] = useState<number>(BUGS_DATA[0].id);

  const categories = ['All', 'Odoo 18 ORM', 'UI / QWeb', 'Security / Record Rules', 'BYO-LLM', 'Testing / E2E'];

  const filteredBugs = selectedCategory === 'All'
    ? BUGS_DATA
    : BUGS_DATA.filter((b) => b.category === selectedCategory);

  const activeBug = BUGS_DATA.find((b) => b.id === activeBugId) || BUGS_DATA[0];

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </div>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const first = cat === 'All' ? BUGS_DATA[0] : BUGS_DATA.find((b) => b.category === cat);
                if (first) setActiveBugId(first.id);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-purple-800 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main split: List on left, details on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Bug list scrollable */}
        <div className="md:col-span-5 max-h-[300px] overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
          {filteredBugs.map((bug) => {
            const isCurrent = bug.id === activeBug.id;
            return (
              <button
                key={bug.id}
                onClick={() => setActiveBugId(bug.id)}
                className={`w-full p-2.5 rounded-lg text-left transition-all border flex items-start justify-between gap-2 ${
                  isCurrent
                    ? 'bg-purple-50 border-purple-800 ring-1 ring-purple-800'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xs font-bold text-purple-900 bg-purple-100 px-1.5 py-0.2 rounded font-mono">
                      #{bug.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 truncate block">
                      {bug.title}
                    </span>
                  </div>
                  <span className="text-2xs text-slate-500 block truncate mt-0.5">
                    {bug.category}
                  </span>
                </div>
                <span
                  className={`text-2xs px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    bug.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : bug.severity === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {bug.severity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bug detail viewer */}
        <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <span className="text-2xs font-extrabold uppercase text-purple-800 tracking-wide">
                Issue #{activeBug.id} • {activeBug.category}
              </span>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                {activeBug.title}
              </h4>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                activeBug.severity === 'Critical'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : activeBug.severity === 'High'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {activeBug.severity} Severity
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-bold text-rose-900 block flex items-center gap-1 mb-0.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Observed Symptom:
              </span>
              <p className="text-slate-700 bg-white p-2 rounded border border-rose-100 leading-relaxed">
                {activeBug.symptom}
              </p>
            </div>

            <div>
              <span className="font-bold text-amber-900 block flex items-center gap-1 mb-0.5">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                Root Cause Diagnosed:
              </span>
              <p className="text-slate-700 bg-white p-2 rounded border border-amber-100 leading-relaxed">
                {activeBug.rootCause}
              </p>
            </div>

            <div>
              <span className="font-bold text-emerald-900 block flex items-center gap-1 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Engineered Resolution:
              </span>
              <p className="text-slate-700 bg-white p-2 rounded border border-emerald-100 leading-relaxed">
                {activeBug.engineeredFix}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-2xs text-slate-500">
            <span className="font-semibold">Regression Test Evidence:</span>
            <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {activeBug.verifiedBy}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
