import React, { useState } from 'react';
import { Gauge, AlertTriangle, ShieldCheck, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

export const HealthScoreCalculator: React.FC = () => {
  const [ageYears, setAgeYears] = useState<number>(1.5);
  const [breakdowns, setBreakdowns] = useState<number>(2);
  const [downtimeHours, setDowntimeHours] = useState<number>(12);
  const [adherencePct, setAdherencePct] = useState<number>(95);
  const [hasWarranty, setHasWarranty] = useState<boolean>(true);

  // Sub-scores (0-100 scale)
  const ageScore = Math.max(0, 100 - (ageYears / 10) * 100);
  const freqScore = Math.max(0, 100 - (breakdowns / 8) * 100);
  const downtimeScore = Math.max(0, 100 - (downtimeHours / 60) * 100);
  const adherenceScore = adherencePct;
  const warrantyScore = hasWarranty ? 100 : 40;

  // Weighted total: 20% age, 25% freq, 20% downtime, 25% adherence, 10% warranty
  const totalScore = Math.round(
    ageScore * 0.20 +
    freqScore * 0.25 +
    downtimeScore * 0.20 +
    adherenceScore * 0.25 +
    warrantyScore * 0.10
  );

  const failureProb = ((100 - totalScore) / 100).toFixed(2);

  let statusBadge = {
    label: 'OPTIMAL HEALTH',
    color: '#10b981',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    icon: ShieldCheck,
    recommendation: 'Asset operating under ideal conditions. Routine quarterly lubrication check.'
  };

  if (totalScore < 50) {
    statusBadge = {
      label: 'CRITICAL HAZARD',
      color: '#ef4444',
      bg: '#fef2f2',
      border: '#fecaca',
      icon: AlertCircle,
      recommendation: 'Immediate technician intervention required. High probability of catastrophic breakdown.'
    };
  } else if (totalScore < 90) {
    statusBadge = {
      label: 'OPERATIONAL WARNING',
      color: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a',
      icon: AlertTriangle,
      recommendation: 'Degradation detected. Schedule corrective service window within 48 hours.'
    };
  }

  const applyPreset = (type: 'optimal' | 'warning' | 'critical') => {
    if (type === 'optimal') {
      setAgeYears(1.0);
      setBreakdowns(0);
      setDowntimeHours(2);
      setAdherencePct(98);
      setHasWarranty(true);
    } else if (type === 'warning') {
      setAgeYears(4.0);
      setBreakdowns(3);
      setDowntimeHours(22);
      setAdherencePct(80);
      setHasWarranty(true);
    } else {
      setAgeYears(8.5);
      setBreakdowns(7);
      setDowntimeHours(54);
      setAdherencePct(45);
      setHasWarranty(false);
    }
  };

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') applyPreset('optimal');
      else if (e.key === '2') applyPreset('warning');
      else if (e.key === '3') applyPreset('critical');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const StatusIcon = statusBadge.icon;

  return (
    <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-extrabold text-purple-800 uppercase tracking-wide">
            Real-time Algorithmic Engine & Formula
          </span>
          <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5">
            Health = 20% Age + 25% Freq + 20% Downtime + 25% Adherence + 10% Warranty
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Presets:</span>
          <button
            onClick={() => applyPreset('optimal')}
            className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors"
          >
            Optimal
          </button>
          <button
            onClick={() => applyPreset('warning')}
            className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200 transition-colors"
          >
            Warning
          </button>
          <button
            onClick={() => applyPreset('critical')}
            className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
          >
            Critical
          </button>
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Live Score Gauge on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Sliders Area */}
        <div className="md:col-span-7 space-y-3.5">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Asset Age: <strong className="text-slate-900">{ageYears} yrs</strong></span>
              <span className="text-purple-800 font-bold">Sub-score: {Math.round(ageScore)}/100 (20%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={ageYears}
              onChange={(e) => setAgeYears(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Breakdown Frequency: <strong className="text-slate-900">{breakdowns} events</strong></span>
              <span className="text-purple-800 font-bold">Sub-score: {Math.round(freqScore)}/100 (25%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              value={breakdowns}
              onChange={(e) => setBreakdowns(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Cumulative Downtime: <strong className="text-slate-900">{downtimeHours} hrs</strong></span>
              <span className="text-purple-800 font-bold">Sub-score: {Math.round(downtimeScore)}/100 (20%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="2"
              value={downtimeHours}
              onChange={(e) => setDowntimeHours(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-800"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Maintenance Adherence: <strong className="text-slate-900">{adherencePct}%</strong></span>
              <span className="text-teal-700 font-bold">Sub-score: {adherencePct}/100 (25%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={adherencePct}
              onChange={(e) => setAdherencePct(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-slate-700">Manufacturer Warranty (10%):</span>
            <button
              onClick={() => setHasWarranty(!hasWarranty)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
                hasWarranty
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              {hasWarranty ? '✓ Active Warranty' : '✕ Warranty Expired'}
            </button>
          </div>
        </div>

        {/* Live Score Gauge Area */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            Dynamic Rating
          </div>

          <div
            className="text-5xl md:text-6xl font-black font-mono my-1 tracking-tight"
            style={{ color: statusBadge.color }}
          >
            {totalScore}
            <span className="text-lg font-semibold text-slate-400">/100</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase border mb-3"
            style={{
              backgroundColor: statusBadge.bg,
              borderColor: statusBadge.border,
              color: statusBadge.color
            }}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {statusBadge.label}
          </div>

          <div className="grid grid-cols-3 gap-1 text-2xs mb-3">
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <span className="font-extrabold text-emerald-600 block">90-100</span>
              <span className="text-slate-500">Optimal</span>
            </div>
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <span className="font-extrabold text-amber-600 block">50-89</span>
              <span className="text-slate-500">Warning</span>
            </div>
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <span className="font-extrabold text-rose-600 block">0-49</span>
              <span className="text-slate-500">Critical</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-2 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Failure Risk P(fail):</span>
              <span className="font-mono font-extrabold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                {failureProb}
              </span>
            </div>
            <p className="text-2xs text-slate-500 mt-1 leading-snug">
              {statusBadge.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
