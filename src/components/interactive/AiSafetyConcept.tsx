import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  UserCheck,
  FileCode2,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
  Database,
  BrainCircuit,
  History,
  Workflow
} from 'lucide-react';

export const AiSafetyConcept: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-900 border border-purple-200 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-800" />
              Core Architectural Principle
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
              Zero Direct Database Access
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            AI Safety & Write-Gating: The Human-in-the-Loop Barrier
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
            Why probabilistic Large Language Models must never execute direct SQL or ORM writes inside an enterprise ERP.
          </p>
        </div>

        <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-750 text-right shrink-0 hidden md:block">
          <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-400 block">
            The Golden Rule of ERP AI
          </span>
          <span className="text-sm font-black text-white">
            The AI proposes • The human authorizes
          </span>
        </div>
      </div>

      {/* The Threat Model: Why Direct LLM Execution is Fatal in Enterprise */}
      <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-rose-900">
          <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0" />
          <h3 className="text-base sm:text-lg font-black tracking-tight">
            The Threat Model: Why Unconstrained LLM Write Access is Dangerous
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          In consumer chatbots, a hallucination is merely an awkward sentence. In an <strong>industrial ERP</strong>, a single uncontrolled database write can trigger catastrophic operational failures:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs space-y-1.5">
            <span className="text-xs font-black text-rose-900 uppercase tracking-wide block">
              1. Hallucinatory Data Corruption
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              LLMs can invent non-existent equipment IDs, overwrite machine maintenance logs, or erroneously set critical production machinery to "Scrapped".
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs space-y-1.5">
            <span className="text-xs font-black text-rose-900 uppercase tracking-wide block">
              2. Prompt Injection & Confusion
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ambiguous or adversarial operator input (e.g., <em>"Cancel all open orders and clear warehouse reserve"</em>) can trick the model into executing mass destructive mutations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs space-y-1.5">
            <span className="text-xs font-black text-rose-900 uppercase tracking-wide block">
              3. Bypassing ORM Integrity
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Raw SQL writes bypass Odoo's business constraints: warehouse stock deduction (<code className="text-2xs font-mono bg-slate-100 px-1 py-0.5 rounded">stock.move</code>), state machines, and access control lists.
            </p>
          </div>
        </div>
      </div>

      {/* The 3-Tier Defensive Architecture Pipeline */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-purple-800" />
          The 3-Tier Defensive Architecture: How We Solved It
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1: Stateless LLM */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-purple-100 text-purple-900 font-extrabold text-xs rounded-lg">
                  Tier 1: Isolated Model
                </span>
                <BrainCircuit className="w-5 h-5 text-purple-800" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Stateless LLM Inference
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The language model (Gemini 2.5 Flash via standard <code className="text-2xs font-mono bg-slate-100 px-1 rounded">urllib</code>) is treated strictly as an external, untrusted semantic parser.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Zero DB Connections
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> No SQL / Python Exec
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Ephemeral Prompt Memory
              </div>
            </div>
          </div>

          {/* Tier 2: Schema Firewall */}
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-teal-100 text-teal-900 font-extrabold text-xs rounded-lg">
                  Tier 2: Schema Firewall
                </span>
                <FileCode2 className="w-5 h-5 text-teal-800" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Strict JSON Schema Validation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The model cannot return free-form commands. Output must match rigid Pydantic / JSON schema definitions with bounded parameter boundaries.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Whitelisted Tool Intents Only
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Type & Range Coercion
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Malformed JSON Rejected
              </div>
            </div>
          </div>

          {/* Tier 3: Human Write Gating */}
          <div className="bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-lg">
                  Tier 3: The Gating Barrier
                </span>
                <UserCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Human-in-the-Loop Confirmation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Any intent requiring a state change creates an ephemeral preview card. Database writes only execute when a verified human operator clicks "Confirm".
              </p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ephemeral Preview Dialog
              </div>
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Unconfirmed Intents Expire
              </div>
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Immutable Chatter Audit Log
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Comparison Table: Naive vs Write-Gated */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 border border-slate-750 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            Comparison: Naive Direct AI Integration vs. Our Write-Gated Architecture
          </h4>
          <span className="text-2xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
            Enterprise Security Standard
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-750 text-2xs uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">Security Dimension</th>
                <th className="py-2.5 px-3 text-rose-400">Naive Direct Execution (Typical AI Slop)</th>
                <th className="py-2.5 px-3 text-emerald-400">Our Write-Gated Architecture (Production Safe)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-3 px-3 font-extrabold text-white">Database Access</td>
                <td className="py-3 px-3 text-rose-300">Direct SQL or ORM write method handles</td>
                <td className="py-3 px-3 text-emerald-300 font-semibold">Zero DB connection; pure JSON proposal output</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-extrabold text-white">Execution Trigger</td>
                <td className="py-3 px-3 text-rose-300">Autonomous upon model response generation</td>
                <td className="py-3 px-3 text-emerald-300 font-semibold">Mandatory click confirmation by authenticated technician</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-extrabold text-white">Hallucination Impact</td>
                <td className="py-3 px-3 text-rose-300">Silent corruption of production database records</td>
                <td className="py-3 px-3 text-emerald-300 font-semibold">Instantly caught in visual preview before any DB touch</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-extrabold text-white">Audit Trail & Compliance</td>
                <td className="py-3 px-3 text-rose-300">Opaque; difficult to reconstruct who caused what</td>
                <td className="py-3 px-3 text-emerald-300 font-semibold">Every intent + human approval logged in equipment.ai.prediction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Implemented in: <code className="text-teal-300 font-mono">equipment_ai_assistant.py</code> & <code className="text-teal-300 font-mono">equipment_llm_providers.py</code>
          </span>
          <span className="font-bold text-slate-300">
            100% Tested across 46 unit & mock resilience tests
          </span>
        </div>
      </div>
    </div>
  );
};
