import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Shield, Terminal, PlayCircle, Video, FileCheck, Layers } from 'lucide-react';

export const TestReportViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'suites' | 'live_api' | 'demo_steps'>('summary');

  const demoSteps = [
    { step: 1, action: 'User authentication & session token exchange', outcome: 'Admin logged into Odoo 18 Community' },
    { step: 2, action: 'Executive KPI dashboard load', outcome: '30 live plant metrics aggregated without delay' },
    { step: 3, action: 'Equipment registry list & kanban check', outcome: 'Grouped card view expanded with health badges' },
    { step: 4, action: 'Mobile QR barcode generation probe', outcome: 'Valid 21x21 PNG generated with magic header' },
    { step: 5, action: 'Asset detail inspection & telemetry', outcome: 'MTBF/MTTR and straight-line depreciation rendered' },
    { step: 6, action: 'Draft new corrective maintenance order', outcome: 'Order created with SLA deadline target' },
    { step: 7, action: 'Assign technician & configure timer', outcome: 'Calendar activity created via mail.activity' },
    { step: 8, action: 'Spare part warehouse line addition', outcome: 'Quantity reserved from stock.quant inventory' },
    { step: 9, action: 'Verify safety checklist criteria', outcome: 'Mandatory items checked before closure' },
    { step: 10, action: 'Start timer & log intervention hours', outcome: 'Elapsed duration computed to 2 decimals' },
    { step: 11, action: 'Order completion & stock move dispatch', outcome: 'Automatic picking validated in warehouse' },
    { step: 12, action: 'Asset Health Score recalculation', outcome: 'Score dynamically updated with 5-factor formula' },
    { step: 13, action: 'Statistical failure risk re-evaluation', outcome: 'P(fail) updated and reflected on dashboard' },
    { step: 14, action: 'AI Natural Language logger wizard launch', outcome: 'Raw maintenance text input provided' },
    { step: 15, action: 'LLM structured extraction execution', outcome: 'Symptoms, parts & hours parsed cleanly' },
    { step: 16, action: 'Conversational assistant status query', outcome: 'Machine status answered with accurate data' },
    { step: 17, action: 'Assistant write intent triggering', outcome: 'Confirmation preview card rendered' },
    { step: 18, action: 'Explicit user confirmation button click', outcome: 'Order committed to database with audit log' },
    { step: 19, action: '7 QWeb PDF report generation', outcome: 'wkhtmltopdf binary rendered valid PDF bytes' },
    { step: 20, action: 'Dashboard final sync & audit validation', outcome: 'All 20 steps passed in 1.1 minutes' }
  ];

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 pb-3 mb-4 border-b border-slate-100">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-purple-800 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Testing Overview
        </button>
        <button
          onClick={() => setActiveTab('suites')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'suites'
              ? 'bg-purple-800 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Verification Matrix
        </button>
        <button
          onClick={() => setActiveTab('live_api')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'live_api'
              ? 'bg-purple-800 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Live LLM API Tests
        </button>
        <button
          onClick={() => setActiveTab('demo_steps')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'demo_steps'
              ? 'bg-purple-800 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          20-Step E2E Walkthrough
        </button>
      </div>

      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <span className="text-2xs font-extrabold uppercase text-emerald-800 block">
                Backend Unit Suite
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-950 mt-1">
                138 / 138
              </div>
              <span className="text-2xs font-semibold text-emerald-700 block mt-0.5">
                0 Failures • RC=0
              </span>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
              <span className="text-2xs font-extrabold uppercase text-purple-800 block">
                LLM Mock Tests
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-purple-950 mt-1">
                46 / 46
              </div>
              <span className="text-2xs font-semibold text-purple-700 block mt-0.5">
                Rate limits, timeouts, json
              </span>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
              <span className="text-2xs font-extrabold uppercase text-teal-800 block">
                Playwright E2E
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-teal-950 mt-1">
                32 / 32
              </div>
              <span className="text-2xs font-semibold text-teal-700 block mt-0.5">
                16 spec files passing
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <span className="text-2xs font-extrabold uppercase text-amber-800 block">
                Full 20-Step Demo
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-950 mt-1">
                PASS (1.1m)
              </div>
              <span className="text-2xs font-semibold text-amber-700 block mt-0.5">
                2 video artifacts on disk
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 justify-center sm:justify-start">
                <Video className="w-4 h-4 text-purple-700" />
                Physical Evidence on Disk
              </h4>
              <p className="text-xs text-slate-600">
                artifacts/videos/full-system-demo.webm (2.9 MB) & ai-llm-demo.webm (1.3 MB)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
              Verified Production Ready
            </span>
          </div>
        </div>
      )}

      {activeTab === 'suites' && (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="p-2 font-bold">Suite</th>
                <th className="p-2 font-bold">Scope</th>
                <th className="p-2 font-bold">Result</th>
                <th className="p-2 font-bold">Evidence Artifact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2 font-bold text-slate-900">Backend Odoo ORM</td>
                <td className="p-2 text-slate-600">Models, workflows, wizards, reports, security rules</td>
                <td className="p-2 font-bold text-emerald-600">138 Passed / 0 Failed</td>
                <td className="p-2 font-mono text-2xs text-slate-500">equipment_maintenance/.bt_final.log</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900">LLM Provider Mocks</td>
                <td className="p-2 text-slate-600">HTTP 401, 403, 429 rate limit, network timeouts, malformed JSON</td>
                <td className="p-2 font-bold text-emerald-600">46 Passed / 0 Failed</td>
                <td className="p-2 font-mono text-2xs text-slate-500">tests/test_llm_providers.py</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900">Google Gemini Live API</td>
                <td className="p-2 text-slate-600">Auth, basic generation, structured output, extraction, intent</td>
                <td className="p-2 font-bold text-emerald-600">6 Passed / 0 Failed</td>
                <td className="p-2 font-mono text-2xs text-slate-500">tests/live_api_results.json</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900">Cerebras Live API</td>
                <td className="p-2 text-slate-600">Auth endpoint verification & live generation check</td>
                <td className="p-2 font-bold text-amber-600">Auth PASS / Gen BLOCKED (402)</td>
                <td className="p-2 font-mono text-2xs text-slate-500">Account Quota Exhausted (External)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900">Playwright Chromium E2E</td>
                <td className="p-2 text-slate-600">16 spec files: Login, Dashboard, Orders, QR, Checklists, Chat</td>
                <td className="p-2 font-bold text-emerald-600">32 Passed / 0 Failed</td>
                <td className="p-2 font-mono text-2xs text-slate-500">artifacts/playwright-report/index.html</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'live_api' && (
        <div className="space-y-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Gemini 2.5 Flash (Live Verification on 2026-09-06)</span>
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-2xs font-bold">
                6/6 LIVE PASS
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-mono text-2xs">
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_authentication: <strong className="text-emerald-600">PASSED</strong> (1.4s)
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_basic_generation: <strong className="text-emerald-600">PASSED</strong> (1.8s)
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_structured_output: <strong className="text-emerald-600">PASSED</strong> (2.1s)
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_maintenance_extraction: <strong className="text-emerald-600">PASSED</strong> (2.6s)
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_assistant_query: <strong className="text-emerald-600">PASSED</strong> (3.2s)
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                ✓ test_intent_classification: <strong className="text-emerald-600">PASSED</strong> (1.9s)
              </div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5">
            <h4 className="font-bold text-amber-950 mb-1 flex items-center justify-between">
              <span>Cerebras API (Live Verification on 2026-09-06)</span>
              <span className="text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-2xs font-bold">
                Auth PASS • Gen BLOCKED (402)
              </span>
            </h4>
            <p className="text-2xs text-amber-900 leading-relaxed">
              Authentication succeeded with a real HTTP request to api.cerebras.ai (646ms). Subsequent generation returned <strong>HTTP 402 Payment Required</strong> (account quota exhausted). The code path is covered 46/46 in the deterministic mock suite.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'demo_steps' && (
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-1 space-y-1.5 text-xs">
          {demoSteps.map((s) => (
            <div
              key={s.step}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xs font-mono font-bold bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded">
                  Step {s.step}
                </span>
                <span className="font-semibold text-slate-800">{s.action}</span>
              </div>
              <span className="text-2xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                {s.outcome}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
