import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertOctagon, Terminal, ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const AiSafetyDemo: React.FC = () => {
  const [stage, setStage] = useState<'prompt' | 'preview' | 'confirmed' | 'cancelled'>('prompt');
  const [simulatedPrompt, setSimulatedPrompt] = useState<string>(
    'Create an urgent corrective maintenance order for CNC Milling Machine 02 with bearing replacement and 3 hours estimated work'
  );

  const resetFlow = () => {
    setStage('prompt');
  };

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-extrabold text-purple-800 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            AI Safety & Write-Gating Architecture
          </span>
          <h4 className="text-sm md:text-base font-extrabold text-slate-900">
            Preview-Gated Execution: Why LLMs Never Write Directly to Database
          </h4>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Zero Direct ORM / SQL Access
        </span>
      </div>

      {/* Interactive Safety Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Step 1: Input & Tool Parsing */}
        <div className="md:col-span-6 space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              1. Operator Natural Language Input
            </span>
            <textarea
              value={simulatedPrompt}
              onChange={(e) => setSimulatedPrompt(e.target.value)}
              className="w-full text-xs p-2.5 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 text-slate-800 font-medium leading-relaxed resize-none h-20"
              placeholder="Enter maintenance query..."
            />
            <div className="flex justify-between items-center pt-1">
              <span className="text-2xs text-slate-500">Gemini 2.5 Flash / Cerebras abstraction</span>
              <button
                onClick={() => setStage('preview')}
                disabled={stage !== 'prompt'}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  stage === 'prompt'
                    ? 'bg-purple-800 text-white hover:bg-purple-900 shadow-xs cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Analyze & Extract Tool Intent →
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-3.5 text-slate-200 text-xs font-mono space-y-1">
            <div className="text-slate-400 text-2xs uppercase tracking-wider flex items-center gap-1">
              <Terminal className="w-3 h-3 text-teal-400" />
              JSON Schema Validation Envelope
            </div>
            <pre className="text-2xs text-teal-300 leading-relaxed overflow-x-auto custom-scrollbar">
{`{
  "intent": "create_maintenance_order",
  "equipment_code": "CNC-02",
  "priority": "urgent",
  "estimated_hours": 3.0,
  "requires_confirmation": true,
  "permission_check": "passed"
}`}
            </pre>
          </div>
        </div>

        {/* Step 2: Human-in-the-loop confirmation preview */}
        <div className="md:col-span-6 space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              2. Interactive Write Confirmation Card
            </span>

            {stage === 'prompt' && (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
                Click "Analyze & Extract Tool Intent" on the left to simulate write gating.
              </div>
            )}

            {stage === 'preview' && (
              <div className="bg-white border-2 border-amber-300 rounded-lg p-3.5 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    PENDING HUMAN APPROVAL
                  </span>
                  <span className="text-2xs font-mono text-slate-400">order.create(preview)</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div><strong>Asset:</strong> CNC Milling Machine 02 (CNC-02)</div>
                  <div><strong>Action:</strong> Corrective Order (Urgent Priority)</div>
                  <div><strong>Duration:</strong> 3.0 Hours Estimated</div>
                  <div className="text-2xs text-amber-800 bg-amber-50/70 p-1.5 rounded mt-2">
                    ⚠ Database record will NOT be created until you explicitly confirm.
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setStage('confirmed')}
                    className="flex-1 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirm & Execute
                  </button>
                  <button
                    onClick={() => setStage('cancelled')}
                    className="py-1.5 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {stage === 'confirmed' && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Order #MO-2026-0042 Successfully Created
                </div>
                <p className="text-2xs text-emerald-800 leading-relaxed">
                  The work order was committed to PostgreSQL after verified human confirmation. An immutable record was saved to <code>equipment.ai.prediction</code> with user ID, timestamps, and raw JSON parameters.
                </p>
                <button
                  onClick={resetFlow}
                  className="text-xs font-bold text-purple-800 hover:underline pt-1 block"
                >
                  ← Test Another Scenario
                </button>
              </div>
            )}

            {stage === 'cancelled' && (
              <div className="bg-rose-50 border border-rose-300 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Operation Safely Aborted
                </div>
                <p className="text-2xs text-rose-800 leading-relaxed">
                  No database modifications were made. The LLM cannot write or bypass human cancellation.
                </p>
                <button
                  onClick={resetFlow}
                  className="text-xs font-bold text-purple-800 hover:underline pt-1 block"
                >
                  ← Test Another Scenario
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
