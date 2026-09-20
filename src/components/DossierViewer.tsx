import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  FileText,
  Mic,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';

interface DossierViewerProps {
  onClose: () => void;
}

export const DossierViewer: React.FC<DossierViewerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'report' | 'speech' | 'essentials' | 'testing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const tabs: ('all' | 'report' | 'speech' | 'essentials' | 'testing')[] = ['all', 'report', 'speech', 'essentials', 'testing'];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === '4') {
        e.preventDefault();
        const currentIdx = tabs.indexOf(activeTab);
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : tabs.length - 1;
        setActiveTab(tabs[prevIdx]);
      } else if (e.key === '6' || e.key === '5') {
        e.preventDefault();
        const currentIdx = tabs.indexOf(activeTab);
        const nextIdx = currentIdx < tabs.length - 1 ? currentIdx + 1 : 0;
        setActiveTab(tabs[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTab, tabs]);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col overflow-hidden text-slate-800">
      {/* Top Banner */}
      <div className="bg-white border-b-2 border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900 text-white flex items-center justify-center font-black shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                Internship Project Report & Presentation Guide
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                Odoo 18.0 Community
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Comprehensive report synthesis, spoken presentation script, key evaluation insights, and hands-on testing guide.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guide (e.g. Gemini, stock, tests)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-700 focus:bg-white w-48 sm:w-64 transition-all"
            />
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Back to Slides
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-purple-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Full View (Complete Dossier)
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === 'report'
              ? 'bg-purple-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          1. Internship Report
        </button>
        <button
          onClick={() => setActiveTab('speech')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === 'speech'
              ? 'bg-purple-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          2. Presentation Script
        </button>
        <button
          onClick={() => setActiveTab('essentials')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === 'essentials'
              ? 'bg-purple-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          3. Essential Knowledge
        </button>
        <button
          onClick={() => setActiveTab('testing')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === 'testing'
              ? 'bg-purple-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5" />
          4. Practical Testing Guide
        </button>
      </div>

      {/* Main Content Viewer */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Metadata Card */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-2xs font-extrabold uppercase tracking-wide text-purple-800 block">
                Internship Project Information
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Equipment Maintenance Management System (CMMS)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Student / Intern:</strong> Youssef Benyouness • <strong>Advisor:</strong> Aymen Alaya • <strong>Host Enterprise:</strong> IT-Koncept SA (Nyon, Switzerland & Tunis) • <strong>University:</strong> iTEAM University
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 font-mono text-xs font-bold">
                Source: /INTERNSHIP_FINAL_REPORT_AND_SPEECH_DOSSIER.md
              </span>
            </div>
          </div>

          {/* SECTION 1: INTERNSHIP REPORT SYNTHESIS */}
          {(activeTab === 'all' || activeTab === 'report') && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-900">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Part I: Comprehensive Internship Report Synthesis
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Industrial context, requirements analysis, 4-tier architecture, and Odoo 18 ORM realization.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('Internship Report Synthesis...', 'report')}
                  className="px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'report' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'report' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1">
                    1. Industrial Motivation & Context
                  </h4>
                  <p>
                    Operational equipment availability directly governs industrial productivity. Unscheduled outages can reduce factory operational margins by 5% to 20%, costing up to $260,000 per hour in heavy manufacturing. Small and medium enterprises (SMEs) face severe constraints: proprietary CMMS tools are cost-prohibitive, while paper binders and spreadsheets result in lost maintenance history and disconnect maintenance from warehouse inventory.
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1">
                    2. Host Enterprise: IT-Koncept SA
                  </h4>
                  <p>
                    Established in 2013 with headquarters in Nyon (Vaud, Switzerland) and a dedicated software engineering center in Tunis (IT-Koncept Tunisia Sàrl), IT-Koncept SA is an official Odoo Partner with over 8 years of certified engineering expertise across Odoo versions 7 through 18. The enterprise specializes in custom ERP architectures, complex business workflows, and high-availability digital transformation for industrial enterprises and SMEs.
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1">
                    3. 4-Tier Architecture & Data Modeling
                  </h4>
                  <p>
                    The module is engineered across four cleanly separated tiers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li><strong>Presentation Tier:</strong> OWL 2.0 components, modern Odoo 18 card templates (<code className="text-2xs bg-slate-100 px-1 py-0.5 rounded">&lt;t t-name="card"&gt;</code>), and 7 high-fidelity QWeb PDF reports.</li>
                    <li><strong>Business Logic Tier:</strong> 14 specialized Python ORM models governing multi-site locations, recurring templates, quality checklists, SLA timers, and background schedulers.</li>
                    <li><strong>Data Tier:</strong> PostgreSQL 15 database ensuring foreign key constraints, indexes, and transactional consistency.</li>
                    <li><strong>Integration & Mixins Tier:</strong> Direct integration with <code className="text-2xs bg-slate-100 px-1 py-0.5 rounded">stock.move</code> for automatic warehouse inventory deduction and <code className="text-2xs bg-slate-100 px-1 py-0.5 rounded">mail.thread</code> for full audit trails.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1">
                    4. Algorithmic Health Engine & Confirmation-Gated AI Assistant
                  </h4>
                  <p>
                    The system evaluates equipment through an objective, deterministic 100-point formula:
                    <span className="font-mono block bg-slate-50 p-2 rounded border border-slate-200 my-1.5 text-purple-900 font-bold">
                      Health Score = 20% Age + 25% Frequency + 20% Downtime + 25% Adherence + 10% Warranty
                    </span>
                    To assist technicians without compromising safety, we developed a zero-dependency HTTP client using Python's standard <code className="text-2xs bg-slate-100 px-1 py-0.5 rounded">urllib</code> communicating with the Google Gemini 2.5 Flash API. Under our <strong>Write Gating</strong> pattern, the AI has zero direct write access to PostgreSQL: every requested action generates an interactive confirmation dialog that a verified human operator must approve.
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-purple-950 mb-1">
                    5. Quality Assurance & Verification Summary
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
                      <span className="text-lg font-black text-purple-950 block">138</span>
                      <span className="text-2xs font-extrabold uppercase text-purple-800">Backend Tests (100% Pass)</span>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-center">
                      <span className="text-lg font-black text-teal-950 block">46</span>
                      <span className="text-2xs font-extrabold uppercase text-teal-800">LLM Resilience & Mock Tests</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                      <span className="text-lg font-black text-emerald-950 block">32</span>
                      <span className="text-2xs font-extrabold uppercase text-emerald-800">Playwright E2E Tests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: PRESENTATION SCRIPT */}
          {(activeTab === 'all' || activeTab === 'speech') && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-900">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Part II: Complete Presentation Script & Speech (Slide by Slide)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Word-for-word spoken delivery timed for a 20 to 25 minute presentation before the evaluation committee.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('Presentation Script...', 'speech')}
                  className="px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'speech' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'speech' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-2xs font-mono font-bold text-teal-800 uppercase block mb-1">
                    Opening Address & Orientation • ~1 min
                  </span>
                  <p className="italic text-slate-800">
                    "Good morning, esteemed members of the evaluation committee, advisors, and mentors. It is an honor to present my software engineering internship project today. My name is Youssef Benyouness, and this work was conducted during my internship at IT-Koncept SA under the guidance of Mr. Aymen Alaya, Project Director. Our project delivers an enterprise Equipment Maintenance Management System tailored specifically for Odoo 18 Community Edition..."
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-2xs font-mono font-bold text-purple-800 uppercase block mb-1">
                    Slide 8 (Mathematical Health Scoring) • ~2 min
                  </span>
                  <p className="italic text-slate-800">
                    "One of the primary engineering contributions in our module is the deterministic asset health engine. Rather than relying on subjective opinions, we developed a 100-point mathematical formula combining five industrial factors: 20% weighting on asset age, 25% on recent failure frequency, 20% on cumulative downtime percentage, 25% on preventive schedule adherence, and 10% on remaining manufacturer warranty coverage..."
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-2xs font-mono font-bold text-purple-800 uppercase block mb-1">
                    Slide 10 (AI Safety & Write Gating) • ~1.5 min
                  </span>
                  <p className="italic text-slate-800">
                    "Security is paramount when connecting generative AI to an enterprise ERP. We enforced a zero-trust Write Gating pattern: the language model cannot execute arbitrary SQL or direct database writes. It outputs a structured action intent which is rendered as a visual preview card, requiring explicit human confirmation before any transaction is committed..."
                  </p>
                </div>

                <div className="bg-purple-950 text-purple-100 p-4 rounded-xl text-xs space-y-1">
                  <span className="font-black text-white block">Full Speech Available:</span>
                  <p className="text-2xs text-purple-300">
                    The complete slide-by-slide speech (Slides 1 through 18) with timing cues and transitions is recorded in the root document <code className="text-purple-200 font-mono">/INTERNSHIP_FINAL_REPORT_AND_SPEECH_DOSSIER.md</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ESSENTIALS */}
          {(activeTab === 'all' || activeTab === 'essentials') && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Part III: Essential Knowledge & High-Impact Project Insights
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Bulletproof technical justifications for tricky evaluation questions and key numbers to remember.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('Evaluation Questions & Insights...', 'essentials')}
                  className="px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'essentials' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'essentials' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-purple-900 block">
                    Trap 1: "Why not use Odoo's native Maintenance module?"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Native Odoo Community maintenance is only a Kanban ticketing board. It lacks spare parts inventory deduction (<code className="font-mono text-2xs">stock.move</code>), physical location hierarchy (Site/Building/Bay), compliance checklists, and quantitative reliability formulas (MTBF, MTTR, Health Score).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-purple-900 block">
                    Trap 2: "Why urllib instead of the official Gemini SDK?"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Zero external dependency footprint. Python's standard library <code className="font-mono text-2xs bg-white px-1 rounded">urllib</code> ensures that the module installs cleanly on any client Odoo instance without external pip conflicts or runtime dependency mismatch.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-purple-900 block">
                    Trap 3: "Why is the technician record rule perm_read='0'?"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    In Odoo, record rules with read filtering enabled by default unintentionally hide records from manager queries. By applying write/unlink restrictions and disabling default read filtering, technician edits are securely sandboxed without blinding managers.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-purple-900 block">
                    Trap 4: "Storable products modeling in Odoo 18"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    In Odoo 18, <code className="font-mono text-2xs bg-white px-1 rounded">type='product'</code> was removed. Storable inventory items must be declared as <code className="font-mono text-2xs bg-white px-1 rounded">type='consu'</code> with boolean <code className="font-mono text-2xs bg-white px-1 rounded">is_storable=True</code>.
                  </p>
                </div>
              </div>

              {/* Memorization Grid */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl">
                <span className="text-2xs font-extrabold text-teal-400 uppercase tracking-wide block mb-2">
                  The 8 Key Metrics to Memorize
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-750">
                    <span className="text-base font-black text-white block">14</span>
                    <span className="text-2xs text-slate-400">ORM Models</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-750">
                    <span className="text-base font-black text-white block">6,853</span>
                    <span className="text-2xs text-slate-400">Lines of Code</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-750">
                    <span className="text-base font-black text-emerald-400 block">138 / 138</span>
                    <span className="text-2xs text-slate-400">Backend Tests OK</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-750">
                    <span className="text-base font-black text-teal-400 block">1.9s</span>
                    <span className="text-2xs text-slate-400">Gemini Latency</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: TESTING GUIDE */}
          {(activeTab === 'all' || activeTab === 'testing') && (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Part IV: Practical Testing Guide — Everything to Try in the System
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Step-by-step verification protocol to demonstrate all core CMMS features.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('Practical Testing Guide...', 'testing')}
                  className="px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors"
                >
                  {copiedSection === 'testing' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'testing' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Multi-Tier Location Hierarchy & Asset Registry</strong>
                    <p className="text-slate-600">Navigate to <em>Equipment Maintenance → Configuration → Locations</em>. Create a Site (Tunis Plant), Building A, and Bay 01. Then register a CNC Haas VF-2 machine linked to this hierarchy.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Preventive Scheduling & Automated Cron Trigger</strong>
                    <p className="text-slate-600">Create a 30-day recurring maintenance template in <em>Preventive Templates</em>. Manually trigger the scheduled action in Odoo to verify the automated creation of a Draft work order with pre-filled checklists.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Real Spare Parts Warehouse Stock Deduction (stock.quant)</strong>
                    <p className="text-slate-600">Add 2 hydraulic filters to an in-progress work order. Upon transitioning the order to <em>Done</em>, open the Inventory module to verify that available warehouse stock is instantly reduced.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Dynamic Health Score Recalculation</strong>
                    <p className="text-slate-600">Simulate consecutive corrective breakdowns, then click <em>Recalculate Health Score</em> on the asset form to observe the health gauge decrease and the failure probability P(fail) escalate.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    5
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Mobile QR Code Portal on Smartphone (/equipment/QR)</strong>
                    <p className="text-slate-600">Access the endpoint <code className="bg-white px-1 py-0.5 rounded font-mono">/equipment/QR</code> on a mobile device to inspect the streamlined asset card and test submitting an incident report without heavy ERP logins.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    6
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">AI Assistant & Anti-Hallucination Write Gating</strong>
                    <p className="text-slate-600">In the maintenance chat, submit: <em>"Create an urgent maintenance order for high vibration"</em>. Verify that the system displays a confirmation preview card rather than writing directly to PostgreSQL.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center shrink-0 text-2xs">
                    7
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Running the 138 Backend Tests via CLI</strong>
                    <p className="text-slate-600">Execute in your terminal: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-2xs">odoo-bin -c /etc/odoo.conf -i equipment_maintenance --test-enable --stop-after-init</code> to confirm 100% test success.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
