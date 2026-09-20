import React from 'react';
import { SlideData } from '../types';
import { LayeredArchitecture } from './interactive/LayeredArchitecture';
import { WorkflowDiagram } from './interactive/WorkflowDiagram';
import { HealthScoreCalculator } from './interactive/HealthScoreCalculator';
import { RefactoringComparison } from './interactive/RefactoringComparison';
import { BugPostMortem } from './interactive/BugPostMortem';
import { ModelArchitectureViewer } from './interactive/ModelArchitectureViewer';
import { TestReportViewer } from './interactive/TestReportViewer';
import { AiSafetyConcept } from './interactive/AiSafetyConcept';
import {
  GraduationCap,
  Building2,
  Calendar,
  Layers,
  Cpu,
  Shield,
  FileCheck,
  AlertTriangle,
  QrCode,
  FileSpreadsheet,
  TrendingUp,
  Boxes,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Lock,
  Clock,
  Sparkles,
  Server,
  Zap,
  HelpCircle,
  Briefcase,
  Workflow
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
  onNavigateToQA?: () => void;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, onNavigateToQA }) => {
  switch (slide.id) {
    // SLIDE 1: Title & Academic Identity
    case 1:
      return (
        <div className="w-full mx-auto my-0 pt-1 pb-4 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-100 text-purple-900 border border-purple-200 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-2xs">
            <GraduationCap className="w-4 h-4 text-purple-800" />
            Software Engineering Internship Project
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-purple-950 tracking-tight leading-tight">
              Equipment Maintenance Management System
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 font-semibold mt-3 max-w-5xl leading-relaxed">
              Technical Architecture, ORM Data Modeling & Custom Enterprise Module for Odoo 18.0 Community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Student / Intern Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                  Student / Intern
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Youssef Benyouness
                </div>
                <div className="text-sm sm:text-base text-teal-700 font-bold mt-1">
                  Software Engineering
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold pt-4 mt-4 border-t border-slate-100">
                iTEAM University • Academic Year 2026
              </div>
            </div>

            {/* Industrial Host Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                  Host Enterprise
                </span>
                <div className="text-xl sm:text-2xl font-black text-purple-900 mt-1 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-700 shrink-0" />
                  IT-Koncept SA
                </div>
                <div className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
                  Nyon (Switzerland) & Tunis (Tunisia)
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold pt-4 mt-4 border-t border-slate-100">
                Official Odoo Partner (8+ Years Specialized)
              </div>
            </div>

            {/* Project Director & Supervisor */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                  Project Director & Host Advisor
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Aymen Alaya
                </div>
                <div className="text-sm sm:text-base text-purple-800 font-bold mt-1">
                  Project Director • IT-Koncept SA
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold pt-4 mt-4 border-t border-slate-100">
                Odoo 18.0 Community • Module v18.0.1.0
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base text-slate-800 font-medium">
            <span className="flex items-center gap-2 font-semibold">
              <Award className="w-5 h-5 text-purple-800 shrink-0" />
              Verified Deliverables: 138 Backend Tests • 46 LLM Mock Tests • 32 Playwright E2E Specs • 2 Demo Videos
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-950 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              Docker / PostgreSQL 15 / Python 3.12
            </span>
          </div>
        </div>
      );

    // SLIDE 2: Company Presentation - IT-Koncept SA
    case 2:
      return (
        <div className="w-full mx-auto my-0 pt-1 pb-4 space-y-5">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-purple-800 uppercase tracking-wider">
                  Host Enterprise Profile & Industrial Ecosystem
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  IT-Koncept SA — Swiss Digital Engineering & Odoo Partner
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 shadow-2xs">
                Founded in 2013 (10+ Years Innovation)
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-6xl">
              IT-Koncept SA is an established Swiss digital engineering company and certified Odoo Integration Partner, operating across dual engineering hubs in Nyon (Vaud, Switzerland) and Tunis (Tunisia). With over 8 years of certified Odoo engineering experience across versions 7 through 18, the company designs, develops, and deploys high-availability ERP architectures, custom modules, and workflow automations for industrial enterprises and SMEs across Switzerland and North Africa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-800" />
                  <span className="text-xs sm:text-sm font-black uppercase text-purple-800 tracking-wide">Swiss Headquarters</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">Nyon, Canton of Vaud</div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Strategic governance, client partnership, enterprise IT consulting, and Swiss cloud infrastructure.
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-teal-800" />
                  <span className="text-xs sm:text-sm font-black uppercase text-teal-800 tracking-wide">Engineering Hub</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">IT-Koncept Tunisia, Tunis</div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Center of excellence dedicated to Python/Odoo ORM development, custom module engineering, and rigorous QA.
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs sm:text-sm font-black uppercase text-emerald-800 tracking-wide">Odoo Ecosystem</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">8+ Years Official Partner</div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deep technical expertise spanning Odoo versions 7 to 18 Community and Enterprise, delivering tailor-made industrial vertical extensions.
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 text-sm sm:text-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <span className="font-semibold text-slate-200 italic">
                "Combining innovation, technical quality, and digital reliability to build the future with our partners."
              </span>
              <span className="text-xs font-mono font-bold text-purple-300 shrink-0 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                Corporate Mission Statement
              </span>
            </div>
          </div>
        </div>
      );

    // SLIDE 3: Problem Statement
    case 3:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  1. Spreadsheet Silos & Lost History
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Floor interventions are logged on disconnected Excel files or physical paper slips. This leads to lost maintenance histories, absence of MTBF/MTTR metrics, and zero warranty lapse tracking.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 self-start">
                Information Loss
              </span>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  2. Zero Spare Parts Synchronization
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Spare parts replaced during repairs are not deducted from warehouse inventory in real time, causing unexpected stockouts of critical machine components and production halts.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 self-start">
                Inventory Disconnect
              </span>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  3. The Shop-Floor Mobility Gap
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Machine operators on the factory floor lack a friction-free mobile tool to scan equipment QR codes and report anomalies immediately without navigating complex desktop ERP menus.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 self-start">
                Field Friction
              </span>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-rose-700 uppercase tracking-wider block">
                Quantified Industrial Impact
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                Unplanned Downtime consumes between 5% and 20% of industrial plant operating margins
              </div>
            </div>
            <span className="px-4 py-2 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-900 font-mono text-sm sm:text-base font-black shrink-0">
              Avg Cost: $260,000 / Hour in Heavy Industry
            </span>
          </div>
        </div>
      );

    // SLIDE 4: Scope & Perimeter
    case 4:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-teal-800 uppercase tracking-wider">
                  Scope & Deliverable Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  A Complete Open-Source Maintenance Suite for Odoo 18
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-black text-purple-950 bg-purple-100 px-4 py-1.5 rounded-full border border-purple-200">
                55 Files • 6,853 LOC
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-black text-purple-950 text-base sm:text-lg block">
                  Core CMMS Operations
                </span>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                    <span><strong>Asset Master Ledger:</strong> Physical multi-site hierarchy (Site → Building → Bay).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                    <span><strong>Preventive Maintenance:</strong> Configurable recurring templates with automated daily cron generation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                    <span><strong>Corrective Work Orders:</strong> Dynamic countdown timers, priority levels, and SLA resolution tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                    <span><strong>Execution Quality:</strong> Interactive checklist lines and photo attachment galleries.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-black text-teal-950 text-base sm:text-lg block">
                  Stock & Analytics Integration
                </span>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-1" />
                    <span><strong>Real Warehouse Stock Deduction:</strong> Direct integration with Odoo's native <code className="text-xs bg-white px-1.5 py-0.5 rounded font-mono">stock.quant</code> and moves.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-1" />
                    <span><strong>Mathematical Health Score:</strong> Deterministic 0–100 index and failure probability P(fail).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-1" />
                    <span><strong>7 QWeb PDF Reports:</strong> Equipment service histories, printable worksheets, and cost analyses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-1" />
                    <span><strong>Mobile QR Portal:</strong> Lightweight web controller (<code className="text-xs bg-white px-1.5 py-0.5 rounded font-mono">/equipment/QR</code>) for instantaneous smartphone incident reporting.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
              <span className="font-bold text-slate-800">
                Zero Enterprise license cost: Engineered 100% on Odoo 18.0 Community Edition.
              </span>
              <span className="text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 text-xs sm:text-sm">
                Open-Source Architecture
              </span>
            </div>
          </div>
        </div>
      );

    // SLIDE 5: 4-Tier Layered Architecture
    case 5:
      return (
        <div className="w-full my-auto">
          <LayeredArchitecture />
        </div>
      );

    // SLIDE 6: Core ORM Data Models
    case 6:
      return (
        <div className="w-full my-auto">
          <ModelArchitectureViewer />
        </div>
      );

    // SLIDE 7: Business Workflow & State Machine
    case 7:
      return (
        <div className="w-full my-auto">
          <WorkflowDiagram />
        </div>
      );

    // SLIDE 8: Algorithmic Health Scoring Engine
    case 8:
      return (
        <div className="w-full my-auto">
          <HealthScoreCalculator />
        </div>
      );

    // SLIDE 9: BYO-LLM Architecture
    case 9:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-purple-800 uppercase tracking-wider">
                  BYO-LLM Provider Layer
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  Zero-Dependency LLM Provider Abstraction
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
                Pure Python urllib HTTP Client
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-6xl">
              We engineered a unified provider abstraction in <code className="text-sm bg-slate-100 px-2 py-0.5 rounded font-mono">equipment_llm_providers.py</code> using the Python standard library, eliminating heavy pip dependencies. It enforces a strict contract: <code className="text-sm bg-slate-100 px-1 rounded font-mono">generate()</code>, <code className="text-sm bg-slate-100 px-1 rounded font-mono">chat()</code>, <code className="text-sm bg-slate-100 px-1 rounded font-mono">structured_output()</code>, and <code className="text-sm bg-slate-100 px-1 rounded font-mono">test_connection()</code>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Gemini */}
              <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-base sm:text-lg text-purple-950">Google Gemini Provider</span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                    LIVE VERIFIED (6/6 TESTS)
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Communicates directly with Google's API endpoint with JSON response schema enforcement. Average measured latency is <strong>1.9s</strong> on <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded">gemini-2.5-flash</code>.
                </p>
                <div className="text-xs font-mono text-purple-950 bg-white p-3 rounded-xl border border-purple-200">
                  POST .../models/gemini-2.5-flash:generateContent
                </div>
              </div>

              {/* Cerebras */}
              <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-base sm:text-lg text-amber-950">Cerebras Provider</span>
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
                    AUTH VERIFIED • HTTP 402 QUOTA
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  OpenAI-compatible REST endpoint at <code className="font-mono text-xs bg-white px-1 py-0.5 rounded">api.cerebras.ai/v1</code>. Authentication was verified live in 646ms; payload generation is blocked by external provider account quota exhaustion.
                </p>
                <div className="text-xs font-mono text-amber-950 bg-white p-3 rounded-xl border border-amber-200">
                  Bearer Token Auth • 46 Resilience Mocks Passed
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-sm sm:text-base flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                Security: API keys are stored in encrypted <code className="font-mono text-xs bg-white px-1 py-0.5 rounded">password=True</code> fields and restricted exclusively to the Maintenance Manager role.
              </span>
              <span className="text-purple-900 font-extrabold text-xs sm:text-sm bg-purple-100 px-3 py-1 rounded-lg">
                Encrypted at Rest
              </span>
            </div>
          </div>
        </div>
      );

    // SLIDE 10: AI Safety & Write Gating (CONCEPTUAL REDESIGN)
    case 10:
      return (
        <div className="w-full mx-auto my-auto">
          <AiSafetyConcept />
        </div>
      );

    // SLIDE 11: AI Reality Check
    case 11:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-purple-800 uppercase tracking-wider">
                  Technical Honesty & Methodological Transparency
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  AI Reality Check: Technical Categorization
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Zero Synthetic Claims
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm sm:text-base">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="font-black text-slate-900 text-base sm:text-lg block uppercase tracking-wide">
                  1. Rule-Based
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Deterministic business logic: Multi-tier approval thresholds, SLA escalation routing, warehouse reorder limits, and mandatory checklist validation.
                </p>
                <div className="text-xs sm:text-sm font-bold text-slate-500 pt-2 border-t border-slate-200">
                  100% Deterministic Python ORM
                </div>
              </div>

              <div className="bg-teal-50/70 border-2 border-teal-200 rounded-2xl p-5 space-y-2">
                <span className="font-black text-teal-950 text-base sm:text-lg block uppercase tracking-wide">
                  2. Statistical Calculations
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Weighted 5-factor equipment health score, linear straight-line depreciation, and moving-average maintenance expense projections with seasonality.
                </p>
                <div className="text-xs sm:text-sm font-bold text-teal-800 pt-2 border-t border-teal-200">
                  Quantitative Math (No Neural Weights)
                </div>
              </div>

              <div className="bg-purple-50/70 border-2 border-purple-200 rounded-2xl p-5 space-y-2">
                <span className="font-black text-purple-950 text-base sm:text-lg block uppercase tracking-wide">
                  3. Real LLM Layer
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Natural Language maintenance logger and conversational assistant calling bounded tools via verified Google Gemini 2.5 Flash API.
                </p>
                <div className="text-xs sm:text-sm font-bold text-purple-900 pt-2 border-t border-purple-200">
                  Genuinely Generative AI (Write-Gated)
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 text-sm sm:text-base border border-slate-750">
              <p className="leading-relaxed text-slate-300">
                <strong className="text-white">Evaluation Statement:</strong> Features initially titled "AI" during preliminary roadmapping were purposefully clarified as statistical heuristics during implementation. No scikit-learn or neural networks exist in the codebase. Feature vectors are cleanly extracted in <code className="text-teal-300 font-mono text-xs">equipment_ai_data.py</code> to serve future supervised training once production logs accumulate.
              </p>
            </div>
          </div>
        </div>
      );

    // SLIDE 12: Odoo 18 Migration & Breaking Changes
    case 12:
      return (
        <div className="w-full my-auto">
          <RefactoringComparison />
        </div>
      );

    // SLIDE 13: Role-Based Security & Record Rules
    case 13:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-purple-800 uppercase tracking-wider">
                  Authorization & Governance Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  5-Tier Role Hierarchy & Row-Level Record Rules
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-black text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 font-mono">
                37 ACLs • Record Sandboxing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <strong className="text-purple-950 block font-black text-base">1. Admin</strong>
                <span className="text-xs text-slate-600 block mt-1">Full CRUD, System Settings, Audit Ledger</span>
              </div>
              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
                <strong className="text-teal-950 block font-black text-base">2. Manager</strong>
                <span className="text-xs text-slate-600 block mt-1">All Work Orders, Triage, LLM Provider Config</span>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <strong className="text-amber-950 block font-black text-base">3. Technician</strong>
                <span className="text-xs text-slate-600 block mt-1">Assigned Orders, Checklists, Spare Parts</span>
              </div>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                <strong className="text-slate-900 block font-black text-base">4. Operator</strong>
                <span className="text-xs text-slate-600 block mt-1">Incident Tickets, Mobile QR Scanner</span>
              </div>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                <strong className="text-slate-900 block font-black text-base">5. Viewer</strong>
                <span className="text-xs text-slate-600 block mt-1">Read-Only KPI Dashboards & Reports</span>
              </div>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
              <span className="text-xs sm:text-sm font-black text-purple-900 uppercase tracking-wider block">
                Row-Level Security Rule (Record Sandboxing)
              </span>
              <div className="text-xs sm:text-sm font-mono bg-white p-3 rounded-xl border border-slate-200 text-purple-950 font-bold">
                ['|', ('technician_user_id', '=', user.id), ('technician_user_id', '=', False)]
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Technicians are prevented from viewing or modifying work orders assigned to other teams. We fixed a critical Odoo trap where omitting <code className="font-mono text-xs bg-white px-1 rounded">perm_read</code> unintentionally hid records from administrative queries. Record rules are now configured for write/unlink with <code className="font-mono text-xs bg-white px-1 rounded">perm_read="0"</code>.
              </p>
            </div>
          </div>
        </div>
      );

    // SLIDE 14: Autonomous Background Services & Crons
    case 14:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-900 font-black text-xs rounded-lg uppercase tracking-wide">
                CRON DAEMON 1
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Recurring Preventive Order Generator
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Runs daily at 00:00 UTC. Automatically evaluates active preventive maintenance templates against calendar intervals and operating hours, pre-drafting work orders ahead of schedule.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-lg uppercase tracking-wide">
                CRON DAEMON 2
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                30-Day Warranty Expiration Warning
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Scans the equipment ledger daily. Posts high-priority alerts in asset chatter feeds and creates calendar inspection activities 30 days prior to manufacturer warranty lapse.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-3 py-1 bg-rose-100 text-rose-900 font-black text-xs rounded-lg uppercase tracking-wide">
                CRON DAEMON 3
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Overdue SLA Escalation Engine
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Monitors active work orders against scheduled target resolution times. Automatically flags breached orders as overdue and dispatches escalation emails to the maintenance supervisor.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-xs rounded-lg uppercase tracking-wide">
                CRON DAEMON 4
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Low-Stock Spare Part Threshold Alerts
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Cross-references warehouse quant balances against critical safety thresholds. Triggers automated procurement notifications when spare motor, seal, or filter stock dips below minimum.
              </p>
            </div>
          </div>
        </div>
      );

    // SLIDE 15: Verification & Testing Suite
    case 15:
      return (
        <div className="w-full my-auto">
          <TestReportViewer />
        </div>
      );

    // SLIDE 16: Engineering Problem Post-Mortem
    case 16:
      return (
        <div className="w-full my-auto">
          <BugPostMortem />
        </div>
      );

    // SLIDE 17: Deliverables & Outputs
    case 17:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                1. Executive KPI Dashboard
              </h3>
              <ul className="text-sm sm:text-base text-slate-600 space-y-1.5">
                <li>• Real-time equipment counts & downtime</li>
                <li>• MTBF and MTTR metrics in hours</li>
                <li>• Monthly maintenance budget burn</li>
                <li>• Technician workload distribution</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                2. 7 QWeb PDF Reports
              </h3>
              <ul className="text-sm sm:text-base text-slate-600 space-y-1.5">
                <li>• Equipment service history ledger</li>
                <li>• Printable technician worksheets</li>
                <li>• Maintenance cost analysis</li>
                <li>• Warranty audit inspection sheets</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                3. Mobile QR Scanner Endpoint
              </h3>
              <ul className="text-sm sm:text-base text-slate-600 space-y-1.5">
                <li>• Direct URL: <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">/equipment/QR</code></li>
                <li>• Responsive camera barcode scanner</li>
                <li>• Instant machine diagnostics view</li>
                <li>• Zero mobile app install required</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm sm:text-base font-bold text-slate-800">
              Verified Playwright Video Evidence: <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded">full-system-demo.webm</code> & <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded">ai-llm-demo.webm</code>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-950 font-mono text-xs sm:text-sm font-black border border-purple-200">
              Total Assets: 4.2 MB on Disk
            </span>
          </div>
        </div>
      );

    // SLIDE 18: Conclusion & Future Roadmap
    case 18:
      return (
        <div className="w-full mx-auto my-auto space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-black text-purple-800 uppercase tracking-wider">
                  Conclusion & Phase 2 Horizon
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1">
                  Project Milestones Achieved & Future Roadmap
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Production Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
                <span className="font-black text-purple-950 text-base sm:text-lg uppercase tracking-wide block">
                  Internship Project Milestones
                </span>
                <ul className="space-y-2.5 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>Delivered a full-featured CMMS for Odoo 18.0 Community with zero Enterprise dependencies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>Engineered safe BYO-LLM integration with strict tool isolation and mandatory confirmation gating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>138 backend tests + 46 mock tests + 32 Playwright E2E tests passing 100% green.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
                <span className="font-black text-teal-950 text-base sm:text-lg uppercase tracking-wide block">
                  Phase 2 Industrial Horizon (Future Work)
                </span>
                <ul className="space-y-2.5 text-slate-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                    <span><strong>Industrial IoT Telemetry:</strong> MQTT & OPC-UA connectors for real-time vibration and temperature sensors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                    <span><strong>Supervised Machine Learning:</strong> Train Random Forest models on historical logs for dynamic RUL estimation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                    <span><strong>Native Barcode Scanner:</strong> Camera-based barcode scanner for instant inventory checkout on shop floor.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xl sm:text-2xl font-black text-purple-950 block">
                  Thank you for your attention!
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  We invite questions and remarks from the evaluation committee.
                </span>
              </div>
              {onNavigateToQA && (
                <button
                  onClick={onNavigateToQA}
                  className="px-5 py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  Open Project Q&A & Technical Arguments
                </button>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return <div className="text-lg font-bold">Slide {slide.id}</div>;
  }
};
