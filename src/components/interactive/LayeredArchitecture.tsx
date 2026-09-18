import React, { useState, useEffect } from 'react';
import { Layers, Box, Cpu, Database, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import { LayerInfo } from '../../types';

const LAYERS: LayerInfo[] = [
  {
    id: 0,
    name: '1. Presentation Layer',
    tech: 'OWL 2.0 + QWeb + XML Views',
    badge: 'Frontend Client',
    color: '#875A7B',
    components: [
      'OWL Dashboard Widgets (Real-time availability, MTBF, MTTR)',
      '7 QWeb PDF Report Engines (History, Worksheets, Cost Analysis)',
      'Kanban, Pivot, Calendar, Graph & Hierarchical Search Views',
      'Mobile Responsive QR Diagnostics Endpoint (/equipment/QR)'
    ],
    desc: 'Provides tailored, zero-latency user interfaces for plant managers, maintenance engineers, and mobile shop-floor operators.',
    deliverables: ['Custom OWL widgets', '7 print-ready QWeb PDFs', 'Mobile QR web controller']
  },
  {
    id: 1,
    name: '2. Business Logic Layer',
    tech: '14 Python ORM Models + Services',
    badge: 'Core Services',
    color: '#017E84',
    components: [
      'equipment.equipment (Asset Registry, Depreciation, Health Engine)',
      'equipment.maintenance.order (Duration Timer, Work Order SLA)',
      'equipment.repair.request (Incident Logging & Approval Matrix)',
      'equipment.spare.part.line (Warehouse Move & Reservation Bridge)',
      'equipment.dashboard (30 Aggregated Plant KPIs Store)'
    ],
    desc: 'Encapsulates business rules, algorithmic health score computation, warranty expiration triggers, and LLM tool routing.',
    deliverables: ['Automated state machines', 'Live duration timers', 'Deterministic health algorithms']
  },
  {
    id: 2,
    name: '3. Data & Storage Layer',
    tech: 'PostgreSQL 15 Relational Core',
    badge: 'Persistence',
    color: '#475569',
    components: [
      'Built on ~369 PostgreSQL Tables with Custom Indexes & Views',
      'Foreign Key Cascades & Strict Referential Integrity',
      'Optimized Composite Indexes on (equipment_id, scheduled_date)',
      'PostgreSQL Write-Ahead Logging (WAL) for ACID Transactional Safety'
    ],
    desc: 'Guarantees durable, high-throughput storage, fast indexing across historical breakdown logs, and atomic inventory movements.',
    deliverables: ['Composite indexing', 'ACID transaction safety', 'Relational data isolation']
  },
  {
    id: 3,
    name: '4. Integration & Mixins',
    tech: 'Odoo 18 Core Modules & Mixins',
    badge: 'Ecosystem Bridge',
    color: '#714B67',
    components: [
      'mail.thread (Audit Logging & Chatter Communication Feed)',
      'mail.activity.mixin (Automated Calendar Schedules & Escalations)',
      'stock & product (Warehouse Picking, Quant Deductions, Barcodes)',
      'hr (Technician Skill Matrix & Work Shift Calendars)'
    ],
    desc: 'Seamlessly hooks into standard Odoo ERP modules without duplicating data or breaking standard Odoo behaviors.',
    deliverables: ['Full audit trail in chatter', 'Direct stock.move integration', 'Automated calendar activities']
  }
];

export const LayeredArchitecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') setSelectedLayer(0);
      else if (e.key === '2') setSelectedLayer(1);
      else if (e.key === '3') setSelectedLayer(2);
      else if (e.key === '4') setSelectedLayer(3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const active = LAYERS[selectedLayer];

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* 4-Tier Interactive Stack Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {LAYERS.map((l) => {
          const isSelected = selectedLayer === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setSelectedLayer(l.id)}
              className={`p-3.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-50 border-purple-800 shadow-sm ring-2 ring-purple-800/10'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                  style={{ color: l.color }}
                >
                  {l.badge}
                </span>
                <span className="text-sm font-extrabold text-slate-800 block">
                  {l.name.replace(/^\d+\.\s*/, '')}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-2 truncate">
                {l.tech.split('+')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Layer Inspection Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase text-white"
              style={{ backgroundColor: active.color }}
            >
              Tier {active.id + 1}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {active.tech}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {active.name}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {active.desc}
          </p>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Deliverables
            </span>
            <div className="flex flex-wrap gap-1.5">
              {active.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white rounded border border-slate-200 font-medium text-slate-700"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-700" />
              <span className="text-xs font-extrabold uppercase tracking-wide text-purple-950">
                Core Subsystems & Artifacts
              </span>
            </div>
            <span className="text-xs font-medium text-slate-400">
              {active.components.length} components
            </span>
          </div>
          <div className="space-y-2">
            {active.components.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-800 p-2 rounded-md hover:bg-slate-50 transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: active.color }}
                />
                <span className="font-medium leading-snug">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
