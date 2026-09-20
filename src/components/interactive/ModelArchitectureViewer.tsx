import React, { useState, useEffect } from 'react';
import { Database, FileCode, Table2, Key, Link2 } from 'lucide-react';
import { CORE_MODELS_DATA } from '../../data/slidesData';

export const ModelArchitectureViewer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>(CORE_MODELS_DATA[0].name);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      
      const currentIdx = CORE_MODELS_DATA.findIndex((m) => m.name === selectedModel);
      if (e.key === '8') {
        e.preventDefault();
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : CORE_MODELS_DATA.length - 1;
        setSelectedModel(CORE_MODELS_DATA[prevIdx].name);
      } else if (e.key === '2') {
        e.preventDefault();
        const nextIdx = currentIdx < CORE_MODELS_DATA.length - 1 ? currentIdx + 1 : 0;
        setSelectedModel(CORE_MODELS_DATA[nextIdx].name);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedModel]);

  const activeModel = CORE_MODELS_DATA.find((m) => m.name === selectedModel) || CORE_MODELS_DATA[0];

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Category selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wide">
            PostgreSQL 15 & Odoo 18 ORM Layer
          </span>
          <h4 className="text-sm md:text-base font-extrabold text-slate-900">
            Relational Entities & Computed Schema Inspector
          </h4>
        </div>
        <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 font-mono">
          Total LOC: ~2,380 Core ORM Lines
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Model buttons */}
        <div className="md:col-span-4 space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {CORE_MODELS_DATA.map((model) => {
            const isSelected = model.name === selectedModel;
            return (
              <button
                key={model.name}
                onClick={() => setSelectedModel(model.name)}
                className={`w-full p-2.5 rounded-lg text-left transition-all border flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold text-slate-900 block truncate">
                    {model.name}
                  </span>
                  <span className="text-2xs text-slate-500 font-medium">
                    {model.category}
                  </span>
                </div>
                <span className="text-2xs font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                  {model.loc} LOC
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Model Details */}
        <div className="md:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-2xs font-extrabold uppercase text-teal-800 tracking-wider">
                {activeModel.category} Entity
              </span>
              <h3 className="text-base font-mono font-black text-slate-900 mt-0.5">
                {activeModel.name}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {activeModel.loc} Lines of Python
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
            {activeModel.description}
          </p>

          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1.5 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-purple-700" />
              Key Fields & Foreign Keys:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeModel.keyFields.map((f, i) => (
                <span
                  key={i}
                  className="text-xs font-mono font-semibold bg-purple-50 text-purple-900 px-2 py-1 rounded border border-purple-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1 flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5 text-teal-700" />
              Business Logic & Computed Triggers:
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeModel.computedLogic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
