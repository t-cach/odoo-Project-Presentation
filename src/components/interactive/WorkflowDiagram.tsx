import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, Activity, User, ShieldCheck, CheckSquare, RefreshCw } from 'lucide-react';
import { WorkflowPhase } from '../../types';

const PHASES: WorkflowPhase[] = [
  {
    id: 'PHASE_1',
    title: '1. Operator Report',
    role: 'Floor Machine Operator',
    badge: 'Anomaly Intake',
    color: '#875A7B',
    details: 'Failure or defect identified on factory asset. Operator scans machine QR or accesses portal to submit equipment.repair.request with severity tag, symptom notes, and photo attachment.',
    outputs: [
      'equipment.repair.request record created (state = "draft")',
      'Automated Chatter thread initiated with timestamps',
      'Instant notification badge pushed to maintenance supervisor'
    ],
    modelsTouched: ['equipment.repair.request', 'equipment.equipment', 'mail.message']
  },
  {
    id: 'PHASE_2',
    title: '2. Manager Review',
    role: 'Maintenance Supervisor',
    badge: 'Triage & Approval',
    color: '#017E84',
    details: 'Supervisor reviews reported symptoms, validates warranty/contract status, and assigns an qualified technician. A single approval click converts request into an active work order.',
    outputs: [
      'equipment.maintenance.order generated (state = "assigned")',
      'Technician calendar scheduled via mail.activity.mixin',
      'Automated SLA target resolution countdown initiated'
    ],
    modelsTouched: ['equipment.maintenance.order', 'res.users', 'mail.activity']
  },
  {
    id: 'PHASE_3',
    title: '3. Execution & Parts',
    role: 'Assigned Field Technician',
    badge: 'Active Intervention',
    color: '#d97706',
    details: 'Technician opens mobile order and clicks "Start Work" to engage live timer. Completes mandatory safety checklists, logs consumed spare part quantities, and captures repair photos.',
    outputs: [
      'Live duration timer tracking hours to 2 decimal places',
      'equipment.spare.part.line records created with quantity and cost',
      'Safety checklist items validated before order closure'
    ],
    modelsTouched: ['equipment.maintenance.order', 'equipment.spare.part.line', 'equipment.checklist']
  },
  {
    id: 'PHASE_4',
    title: '4. Closure & Settlement',
    role: 'System Automation & Stock Core',
    badge: 'Final Settlement',
    color: '#10b981',
    details: 'Technician marks order as Done. System automatically executes stock move deductions in stock.quant, updates asset health rating, computes MTTR/MTBF, and refreshes KPI dashboard.',
    outputs: [
      'stock.move picking validated and deducted from warehouse',
      'Asset Health Score dynamically updated (0 to 100)',
      'equipment.dashboard singleton store refreshed in real time'
    ],
    modelsTouched: ['stock.move', 'stock.quant', 'equipment.equipment', 'equipment.dashboard']
  }
];

export const WorkflowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [packetPos, setPacketPos] = useState<number>(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') setActiveStep(0);
      else if (e.key === '2') setActiveStep(1);
      else if (e.key === '3') setActiveStep(2);
      else if (e.key === '4') setActiveStep(3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPacketPos((p) => (p + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const active = PHASES[activeStep];

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-3.5 h-3.5 rounded-full ring-4 transition-all"
            style={{
              backgroundColor: active.color,
              // @ts-ignore
              ringColor: `${active.color}30`
            }}
          />
          <h4 className="text-base font-extrabold text-slate-800">
            End-to-End Maintenance Lifecycle State Machine
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep((s) => (s - 1 + PHASES.length) % PHASES.length)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>
          <button
            onClick={() => setActiveStep((s) => (s + 1) % PHASES.length)}
            className="px-3 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs flex items-center gap-1 transition-colors"
          >
            Next Phase
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-colors border ${
              isPlaying
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? 'Flow Active' : 'Paused'}
          </button>
        </div>
      </div>

      {/* SVG Flow diagram */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[700px] h-[120px] relative">
          <svg className="w-full h-full" viewBox="0 0 920 110">
            {/* Connector Lines */}
            <path d="M 185 55 L 260 55" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 5" />
            <path d="M 430 55 L 505 55" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 5" />
            <path d="M 675 55 L 750 55" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 5" />

            {/* Live animated packet */}
            {isPlaying && (
              <>
                <circle cx={185 + (packetPos / 100) * 75} cy={55} r={5} fill="#875A7B" />
                <circle cx={430 + (packetPos / 100) * 75} cy={55} r={5} fill="#017E84" />
                <circle cx={675 + (packetPos / 100) * 75} cy={55} r={5} fill="#10b981" />
              </>
            )}

            {/* Box 1 */}
            <g
              role="button"
              tabIndex={0}
              onClick={() => setActiveStep(0)}
              className="cursor-pointer"
              transform="translate(15, 10)"
            >
              <rect
                width="170"
                height="85"
                rx="10"
                fill={activeStep === 0 ? '#faf5f8' : '#ffffff'}
                stroke={activeStep === 0 ? '#875A7B' : '#cbd5e1'}
                strokeWidth={activeStep === 0 ? '3.5' : '1.5'}
              />
              <text x="85" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#212529">1. Operator Report</text>
              <text x="85" y="52" textAnchor="middle" fontSize="11" fill="#64748b">Failure Submission</text>
              <rect x="25" y="60" width="120" height="17" rx="4" fill="#875A7B" fillOpacity="0.12" />
              <text x="85" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#875A7B">repair.request</text>
            </g>

            {/* Box 2 */}
            <g
              role="button"
              tabIndex={0}
              onClick={() => setActiveStep(1)}
              className="cursor-pointer"
              transform="translate(260, 10)"
            >
              <rect
                width="170"
                height="85"
                rx="10"
                fill={activeStep === 1 ? '#f0fdfa' : '#ffffff'}
                stroke={activeStep === 1 ? '#017E84' : '#cbd5e1'}
                strokeWidth={activeStep === 1 ? '3.5' : '1.5'}
              />
              <text x="85" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#212529">2. Manager Review</text>
              <text x="85" y="52" textAnchor="middle" fontSize="11" fill="#64748b">Approval & Triage</text>
              <rect x="25" y="60" width="120" height="17" rx="4" fill="#017E84" fillOpacity="0.12" />
              <text x="85" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#017E84">maintenance.order</text>
            </g>

            {/* Box 3 */}
            <g
              role="button"
              tabIndex={0}
              onClick={() => setActiveStep(2)}
              className="cursor-pointer"
              transform="translate(505, 10)"
            >
              <rect
                width="170"
                height="85"
                rx="10"
                fill={activeStep === 2 ? '#fffbeb' : '#ffffff'}
                stroke={activeStep === 2 ? '#d97706' : '#cbd5e1'}
                strokeWidth={activeStep === 2 ? '3.5' : '1.5'}
              />
              <text x="85" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#212529">3. Execution & Parts</text>
              <text x="85" y="52" textAnchor="middle" fontSize="11" fill="#64748b">Checklist & Timer</text>
              <rect x="25" y="60" width="120" height="17" rx="4" fill="#d97706" fillOpacity="0.12" />
              <text x="85" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#d97706">spare.part.line</text>
            </g>

            {/* Box 4 */}
            <g
              role="button"
              tabIndex={0}
              onClick={() => setActiveStep(3)}
              className="cursor-pointer"
              transform="translate(745, 10)"
            >
              <rect
                width="170"
                height="85"
                rx="10"
                fill={activeStep === 3 ? '#f0fdf4' : '#ffffff'}
                stroke={activeStep === 3 ? '#10b981' : '#cbd5e1'}
                strokeWidth={activeStep === 3 ? '3.5' : '1.5'}
              />
              <text x="85" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#212529">4. Closure & Sync</text>
              <text x="85" y="52" textAnchor="middle" fontSize="11" fill="#64748b">Stock Move & Health</text>
              <rect x="25" y="60" width="120" height="17" rx="4" fill="#10b981" fillOpacity="0.12" />
              <text x="85" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#10b981">stock.quant & KPI</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Active Phase Details Grid */}
      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4">
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: active.color }}
          >
            {active.badge} • {active.role}
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            {active.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {active.details}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {active.modelsTouched.map((m, i) => (
              <span key={i} className="text-2xs font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 bg-white border border-slate-200 rounded-lg p-3.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Generated State Artifacts & Database Updates
          </span>
          <div className="space-y-1.5">
            {active.outputs.map((out, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-800">
                <span
                  className="font-bold text-sm leading-none shrink-0"
                  style={{ color: active.color }}
                >
                  ✓
                </span>
                <span className="font-medium leading-snug">{out}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
