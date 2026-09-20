import { SlideData, ModelEntity } from '../types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    category: 'Internship Project',
    title: 'Equipment Maintenance Management System',
    subtitle: 'Technical Architecture, Data Modeling & Custom Enterprise Module for Odoo 18.0 Community',
    badge: 'Internship Project',
    phase: 'Title & Project Context',
    speakerNotes: [
      'Welcome esteemed members of the evaluation committee and project advisors to this internship project presentation.',
      'Introduce candidate: Software Engineering Student / Intern at iTEAM University.',
      'Introduce host enterprise: IT-Koncept SA (Swiss headquarters in Nyon & delivery center in Tunis).',
      'Acknowledge Project Director & Company Advisor: Aymen Alaya for industrial guidance.',
      'State core target: Deliver a production-grade, open-source enterprise maintenance suite for Odoo 18 Community.'
    ],
    takeaways: [
      'Enterprise Module on Odoo 18 Community',
      'Dual-hub collaboration: IT-Koncept SA Switzerland & Tunisia',
      'Integrated BYO-LLM layer with confirmation-gated writes',
      '100% test-verified (138 backend, 46 mock, 32 E2E tests)'
    ]
  },
  {
    id: 2,
    category: 'Enterprise Background',
    title: 'Industrial Host: IT-Koncept SA',
    subtitle: 'Swiss IT Services & Official Odoo Integration Partner',
    badge: 'Host Company Profile',
    phase: 'Company & Ecosystem Overview',
    speakerNotes: [
      'IT-Koncept SA is an established Swiss digital engineering company and certified Odoo Integration Partner.',
      'Operates across dual engineering hubs: headquarters in Nyon (Vaud, Switzerland) and software engineering center in Tunis (Tunisia).',
      'Over 8 years of certified Odoo engineering experience across versions 7 through 18.',
      'Delivers custom ERP architectures, complex business process automations, and mission-critical modules for demanding industrial enterprises and SMEs.'
    ],
    takeaways: [
      'Founded 2013 in Nyon (Vaud) • Branch in Tunis (Tunisia)',
      'Official Odoo Partner with 8+ years experience (v7 to v18)',
      'Swiss SME & industrial enterprise market focus',
      'Leadership: Alain Lacroix (CEO), Florian Frossard (COO), Aymen Alaya (Project Director)'
    ]
  },
  {
    id: 3,
    category: 'Industrial Problem',
    title: 'Problem Statement & Industrial Motivation',
    subtitle: 'Overcoming the Costs of Reactive Maintenance & Spreadsheet Silos',
    badge: 'Problem Definition',
    phase: 'Problematic & Root Cause Analysis',
    speakerNotes: [
      'Modern manufacturing plants lose between 5% and 20% of their productive capacity to unplanned equipment downtime.',
      'Current common practice in many SMEs relies on Excel spreadsheets, paper intervention slips, and delayed verbal reporting.',
      'Key pain points: Zero link between work orders and inventory warehouse stock moves.',
      'No physical multi-site hierarchy (Site -> Building -> Floor -> Bay), making asset location difficult for technicians.',
      'Lack of real-time machine health assessment leads to costly catastrophic failures.'
    ],
    takeaways: [
      'Average industrial downtime costs $260,000/hour in critical facilities',
      'Fragmented maintenance logs fail ISO/audit traceability standards',
      'Zero automated spare part reservations cause delayed repairs',
      'Need for mobile-accessible QR diagnostics at the machine location'
    ]
  },
  {
    id: 4,
    category: 'Objectives & Scope',
    title: 'Project Objectives & Functional Perimeter',
    subtitle: 'A Proactive, Autonomous & Open-Source Maintenance Solution',
    badge: 'Perimeter Specification',
    phase: 'Functional Scope Definition',
    speakerNotes: [
      'The project delivers a fully modular, zero-license-cost alternative to expensive proprietary CMMS software.',
      'Scope includes equipment registry, preventive templates, corrective work orders, multi-step checklists, and stock moves.',
      'Introduces statistical health scoring (0-100) calculated live from asset age, downtime history, and maintenance adherence.',
      'Integrates modern BYO-LLM capabilities (Google Gemini & Cerebras) with strict guardrails preventing hallucinated database changes.',
      'Guarantees 100% compatibility with Odoo 18 Community edition without relying on Enterprise-only modules.'
    ],
    takeaways: [
      'Complete asset lifecycle from procurement to straight-line depreciation',
      'Automated recurring work orders triggered by cron daemons',
      'Two-way stock quantization and automatic replenish alerts',
      '7 QWeb audit PDF reports & QR code field scanner'
    ]
  },
  {
    id: 5,
    category: 'System Architecture',
    title: '4-Tier Layered System Architecture',
    subtitle: 'Separation of Concerns in Modern Odoo 18 Ecosystem',
    badge: 'Technical Architecture',
    phase: 'System Decomposition',
    speakerNotes: [
      'Walk the jury through the 4 core tiers: Presentation, Business Logic, Data/Storage, and Integration Mixins.',
      'Tier 1 (Presentation): OWL 2.0 components, QWeb templating, XML form/tree/kanban/calendar views, and responsive mobile QR endpoint.',
      'Tier 2 (Logic): 14 Python ORM models implementing mathematical health calculation, SLA timers, and LLM tool routing.',
      'Tier 3 (Data): PostgreSQL 15 relational core leveraging foreign key constraints and optimized composite indexes.',
      'Tier 4 (Integration): Odoo native mixins including mail.thread for audit chatter, mail.activity.mixin for escalations, and stock/product for warehouse movement.'
    ],
    takeaways: [
      'Tier 1: OWL 2.0, QWeb PDFs, and responsive mobile web endpoints',
      'Tier 2: 14 Python ORM models + AI service layer',
      'Tier 3: PostgreSQL 15 with composite indexing & WAL durability',
      'Tier 4: Enterprise mixins (mail.thread, mail.activity, stock.move)'
    ]
  },
  {
    id: 6,
    category: 'Data Modeling',
    title: 'Core ORM Entities & Relational Schema',
    subtitle: 'Relational Integrity & Entity Relationship Architecture',
    badge: 'Data Model',
    phase: 'Entity Relationship Design',
    speakerNotes: [
      'Explain the relationship between equipment.equipment, equipment.maintenance.order, and equipment.repair.request.',
      'equipment.equipment acts as the master aggregate containing location hierarchy, depreciation parameters, and health telemetry.',
      'equipment.maintenance.order manages work orders with duration timers, technician assignments, and one2many spare part lines.',
      'equipment.spare.part.line links directly to Odoo product.product, creating automatic stock moves when orders are closed.',
      'equipment.dashboard is a computed singleton maintaining 30 real-time plant KPIs without duplicate database rows.'
    ],
    takeaways: [
      'equipment.equipment: 573 LOC master ledger with health calculation hooks',
      'equipment.maintenance.order: 486 LOC state engine with live timer',
      'equipment.spare.part.line: 251 LOC bridge into stock inventory',
      'equipment.location: Multi-site parent/child hierarchy (Site -> Bay)'
    ]
  },
  {
    id: 7,
    category: 'Business Workflow',
    title: 'End-to-End Maintenance Lifecycle State Machine',
    subtitle: 'Four-Phase Operational Execution from Report to Stock Settlement',
    badge: 'State Machine',
    phase: 'Workflow Execution Semantics',
    speakerNotes: [
      'Demonstrate the 4-phase state progression: Operator Report -> Manager Review -> Technician Execution -> Closure & Sync.',
      'Phase 1: Floor operator detects anomaly, scans machine QR or submits repair.request with urgency level and photos.',
      'Phase 2: Supervisor triages and approves request with a single click, instantly spawning maintenance.order.',
      'Phase 3: Assigned technician starts order, activating duration tracking, filling checklists, and logging parts.',
      'Phase 4: Order completion triggers stock move confirmation, updates machine health rating, and recalculates MTTR/MTBF.'
    ],
    takeaways: [
      'Phase 1: Floor incident report with QR scan & chatter activity',
      'Phase 2: Manager review & one-click order generation',
      'Phase 3: Live work timer, security checklists, and spare part logging',
      'Phase 4: Automated warehouse move deduction & dynamic KPI sync'
    ]
  },
  {
    id: 8,
    category: 'Algorithmic Engine',
    title: 'Mathematical Health Scoring & Failure Risk',
    subtitle: 'Deterministic 5-Factor Weighted Formula (Explainable Heuristic, Zero Black-Box Opacity)',
    badge: 'Algorithmic Core',
    phase: 'Mathematical Specification',
    speakerNotes: [
      'Detail the exact normalized equation: Health = 0.20 Age + 0.25 Freq + 0.20 Downtime + 0.25 Adherence + 0.10 Warranty (Weights sum to exactly 1.0).',
      'Defense Against ML Attack: We deliberately chose expert statistical weighting over uncalibrated machine learning. Training an ML model on synthetic demo data would be scientifically fraudulent.',
      'Frequency (0.25) and Adherence (0.25) dominate because maintenance discipline is the primary operational failure factor.',
      'Press Key 3 live to show Critical Hazard (Score: 42/100, P(fail) = 0.58). The jury can inspect which slider moved the score—anti-black-box transparency.',
      'Graceful Degradation: New assets without historical downtime fall back cleanly to age and warranty baselines without division-by-zero crashes.'
    ],
    takeaways: [
      'Deterministic 5-factor weighted formula (Weights sum to exactly 1.0)',
      'Honest Heuristic vs Fake ML: No scikit-learn on uncollected production data',
      'P(fail) = (100 - Score)/100 provides dynamic failure probability (Press Key 3 for Critical 0.58)',
      'equipment_ai_data.py extracts structured vectors for future supervised calibration'
    ]
  },
  {
    id: 9,
    category: 'BYO-LLM Architecture',
    title: 'BYO-LLM Architecture: Gemini & Cerebras',
    subtitle: 'Zero-Dependency Provider Abstraction Layer for Industrial Operations',
    badge: 'LLM Abstraction',
    phase: 'Provider Design & Integration',
    speakerNotes: [
      'Explain the "Bring Your Own LLM" (BYO-LLM) architecture implemented via LLMProvider abstract base class.',
      'Integrated using Python urllib with zero third-party dependencies, preserving lightweight Docker deployments.',
      'Supports Google Gemini (generativelanguage.googleapis.com) and Cerebras (OpenAI-compatible /v1/chat/completions).',
      'Live validation on 2026-09-06: Gemini 2.5 Flash passed 6/6 live API verification tests with ~1.9s average latency.',
      'Cerebras live test: authentication verified live; generation blocked by provider account quota (HTTP 402) and fully verified with 46 unit mock tests.'
    ],
    takeaways: [
      'Clean LLMProvider interface: generate(), chat(), structured_output(), test_connection()',
      'Zero extra dependencies: built with Python standard library (urllib.request)',
      'Google Gemini live verified: 6/6 tests passed on gemini-2.5-flash',
      'API keys securely stored with password=True and manager-only access'
    ]
  },
  {
    id: 10,
    category: 'AI Safety & Governance',
    title: 'AI Safety & Confirmation-Gated Write Operations',
    subtitle: '3-Gate Security Barrier: Why LLMs Never Touch SQL or the ORM Directly',
    badge: 'Security & Safety',
    phase: 'Defensive Architecture & Write Gating',
    speakerNotes: [
      'Security Law: It is architecturally impossible for the LLM to execute arbitrary SQL, Python exec, or direct ORM writes.',
      'Intent Routing: The model output only routes to a fixed, hard-coded tool table written in Python with strictly bounded argument schemas.',
      'The 3-Gate Defense: Gate 1 = Strict JSON schema validation; Gate 2 = Odoo security group & ir.model.access ACL re-checks; Gate 3 = Pending Action Token requiring explicit human confirmation.',
      'E2E Proof: Our automated Playwright suite explicitly verifies that unconfirmed AI actions create zero database records.',
      'Every interaction—including rejected or expired intents—is immutably audited in equipment.ai.prediction for ISO compliance.'
    ],
    takeaways: [
      'Zero SQL / Python exec: Model output only maps to a fixed, hard-coded Python tool table',
      '3-Gate Defense: Schema Validation → ACL Re-Check → Pending Action Token',
      'Mandatory Human Confirmation: Unconfirmed actions expire with 0 database writes',
      'Immutable ISO Audit Trail recorded in equipment.ai.prediction table'
    ]
  },
  {
    id: 11,
    category: 'Technical Honesty',
    title: 'AI Reality Check: Objective Technical Classification',
    subtitle: 'Law 1 & Law 2 in Action: Scientific Honesty Over Marketing Hype',
    badge: 'Scientific Rigor',
    phase: 'Objective Technical Transparency',
    speakerNotes: [
      'State Law 1 (Honesty is the Strategy): Section 7 of our report explicitly classifies every feature as Rule-Based, Statistical Heuristic, or LLM.',
      'Statistical Heuristics: Health score, failure probability P(fail), and moving-average cost forecasting are deterministic formulas, not trained neural networks.',
      'Genuine Generative LLM: The NL maintenance logger and conversational assistant are genuinely powered by Google Gemini 2.5 Flash via standard urllib.',
      'State Law 2 (Documented Blocker): Cerebras live generation returned HTTP 402 (Payment Required: Quota Exhausted). We document this external quota blocker openly rather than faking success.',
      'Provider Abstraction: Gemini and Cerebras share byte-for-byte identical interfaces and 46 unit mock tests. Gemini passed 6/6 live; Cerebras is one top-up away.'
    ],
    takeaways: [
      'Law 1: Heuristics classified honestly; no scikit-learn claimed where none exists',
      'Genuine LLM: Gemini 2.5 Flash live-verified (6/6 API tests, ~1.9s avg latency)',
      'Law 2: Cerebras external blocker documented openly (HTTP 402 Quota Exhausted)',
      'BYO-LLM Abstraction: Factory pattern proven across 46 unit mock tests'
    ]
  },
  {
    id: 12,
    category: 'Odoo 18 Migration',
    title: 'Odoo 18 Community Breaking Changes & Refactoring',
    subtitle: 'Resolving Architectural Deprecations from Odoo 17 to Odoo 18',
    badge: 'Version Migration',
    phase: 'Code Refactoring & Modernization',
    speakerNotes: [
      'Detail the 4 major breaking changes solved during Odoo 18 migration.',
      '1. Kanban Views: Odoo 18 completely removed legacy <t t-name="kanban-box"> in favor of unified <t t-name="card">.',
      '2. Stock Products: Deprecation of product.type="product"; migrated to type="consu" and is_storable=True.',
      '3. Form Views: Removed deprecated attrs="{\'invisible\': ...}" in favor of simplified invisible="state != \'done\'".',
      '4. ORM read_group: Migrated from dictionary output with bare field names to tuple unpacking with explicit __count aggregates.',
      'Created odoo_compat.py compatibility wrapper ensuring backward compatibility.'
    ],
    takeaways: [
      'Kanban: Migrated from legacy kanban-box to modern Odoo 18 card templates',
      'Stock: Configured consu with is_storable=True for physical warehouse parts',
      'Views: Replaced inline attrs dictionaries with direct invisible attributes',
      'ORM: Engineered read_group_counts() wrapper handling tuple aggregates'
    ]
  },
  {
    id: 13,
    category: 'Security & Access Control',
    title: 'Role-Based Access Control (RBAC) & Record Rules',
    subtitle: '5-Tier Security Hierarchy and Row-Level Data Isolation',
    badge: 'Security & RBAC',
    phase: 'Authorization & Governance',
    speakerNotes: [
      'Explain the 5-tier role hierarchy: Administrator, Maintenance Manager, Field Technician, Floor Operator, Viewer.',
      'Configured 37 verified ACL permissions in ir.model.access.csv across all custom models.',
      'Row-Level Record Rules: Technicians are sandboxed to view and edit only orders assigned to them: [("technician_user_id", "=", user.id)].',
      'Bug Discovery: Discovered that omitting perm_read in Odoo record rules defaults it to True (1), which filtered reads for admins. Fixed by setting perm_read="0".',
      'API keys for LLM services are encrypted and restricted solely to the Manager group.'
    ],
    takeaways: [
      '5 RBAC security groups mapped to industrial factory roles',
      '37 validated ir.model.access.csv rules across 12 persistent models',
      'Row-level record rules sandbox technician edits without blocking admin oversight',
      'Fixed latent Odoo bug where omitted perm_read defaulted to read-filtering'
    ]
  },
  {
    id: 14,
    category: 'Automation & Daemons',
    title: 'Autonomous Background Services & Crons',
    subtitle: 'Event-Driven Background Daemons Ensuring Machine Safety',
    badge: 'Automated Crons',
    phase: 'System Autonomy & Schedulers',
    speakerNotes: [
      'Present the 4 automated cron jobs executing in the background.',
      'Cron 1: Recurring Preventive Order Generator — scans recurring templates daily at 00:00 UTC and drafts upcoming work orders.',
      'Cron 2: 30-Day Warranty Expiration Warning — monitors equipment warranty dates and posts proactive alerts in chatter and calendar.',
      'Cron 3: Overdue SLA Escalation Engine — flags overdue orders and escalates high-priority tasks to the plant manager.',
      'Cron 4: Low-Stock Spare Part Threshold Alerts — checks warehouse inventory levels and creates purchase requisitions for critical components.'
    ],
    takeaways: [
      'Cron 1: Automated recurring preventive order generation',
      'Cron 2: 30-day warranty expiration alert & calendar scheduling',
      'Cron 3: Real-time SLA breach detection and supervisor escalation',
      'Cron 4: Warehouse stock threshold monitoring & reorder requisition'
    ]
  },
  {
    id: 15,
    category: 'Quality Assurance',
    title: 'Quality Assurance, Testing & Verification Integrity',
    subtitle: 'Law 3 Proactive Correction: Exactly 138 Backend Tests, 46 Mock Tests, 32 E2E Specs (0 Failures)',
    badge: 'Verification & QA',
    phase: 'Testing & Validation Strategy',
    speakerNotes: [
      'State Law 3 Proactively: The test module contains exactly 138 backend test methods executing on a clean PostgreSQL 15 Docker stack with exit code 0. We proactively correct an earlier interim claim of 159.',
      'Evidence on Disk: 138 backend tests in equipment_maintenance/.bt_final.log, 46 mock tests in test_llm_providers.py, 6 live Gemini API tests in live_api_results.json.',
      'Why E2E was Essential: The backend suite was 100% green while the UI was broken. Playwright E2E uncovered 10 real bugs (dialog auto-close, Gantt 500, perm_read filtering).',
      'Playwright E2E: 32 tests passed across 16 specification files with full video evidence (2.9 MB full demo, 1.3 MB AI assistant demo).',
      '20-Step Demo Scenario: Complete end-to-end lifecycle executes cleanly in 1.1 minutes.'
    ],
    takeaways: [
      'Law 3 Proactive Correction: Exactly 138 backend tests (exit code 0), correcting 159 interim figure',
      '46 LLM Mock Tests: 100% pass on rate limits (429), timeouts, and malformed JSON',
      '32 Playwright E2E Specs: 16 spec files surfaced and fixed 10 UI/RPC bugs',
      'Verifiable Evidence on Disk: Logs, live JSON results, and 2 recorded demo videos'
    ]
  },
  {
    id: 16,
    category: 'Engineering Post-Mortem',
    title: 'Engineering Problem Post-Mortem: 15 Bugs Fixed',
    subtitle: 'Process Maturity: 15 Documented Real-World Failures Resolved (0 Remaining)',
    badge: 'Bug Post-Mortem',
    phase: 'Debugging & Remediation Campaign',
    speakerNotes: [
      'Process Maturity: Fifteen documented engineering problems, each carrying a root cause, code fix, and regression test.',
      'Meta-Argument: 15 found bugs proves the multi-tiered verification harness worked. The number to evaluate is not 15; it is 0 remaining defects.',
      'Highlight Bug #4: Gantt view mode in action definition caused HTTP 500 crashes on Community (Enterprise-only module); replaced with list/planning.',
      'Highlight Bug #6: Missing perm_read="0" in record rules caused admin to see 0 spare part lines in UI; fixed with explicit perm_read="0".',
      'Highlight Bug #11: Playwright JS comma operator bug where [("id", "=", orderId)] silently evaluated to [orderId]; audited and repaired.'
    ],
    takeaways: [
      'Process Maturity: 15 authentic technical bugs documented with root cause and verified fix',
      'The Metric is 0 Remaining: Every defect carries a permanent regression test',
      'Solved Odoo 18 Community locks (Bug #4 Gantt 500) & security rules (Bug #6 perm_read)',
      'Harnessed Test Integrity: Repaired subtle JavaScript comma operator evaluation flaw (Bug #11)'
    ]
  },
  {
    id: 17,
    category: 'Deliverables & Outputs',
    title: 'System Deliverables & Executive Reporting Suite',
    subtitle: 'Production Outputs: Analytics, 7 QWeb PDF Reports & Mobile QR Endpoint',
    badge: 'Project Deliverables',
    phase: 'Deliverables & Output Artifacts',
    speakerNotes: [
      'Present the primary deliverables ready for immediate production deployment.',
      '1. Executive KPI Dashboard: real-time MTTR, MTBF, availability percentage, and cost breakdowns.',
      '2. 7 QWeb PDF Reports: Equipment history log, maintenance worksheets, technician performance, warranty audit sheets.',
      '3. Mobile QR Scanner Endpoint (/equipment/QR): instant mobile scan-to-view diagnostics with zero app installation.',
      '4. 2 Full Video Artifacts: full-system-demo.webm (2.9 MB) and ai-llm-demo.webm (1.3 MB) recorded via Playwright.'
    ],
    takeaways: [
      'Real-time OWL dashboard with 30 aggregated maintenance metrics',
      '7 print-ready QWeb PDF reports for compliance and technician work orders',
      'Mobile-responsive QR endpoint (/equipment/QR) for floor diagnostics',
      '2 high-definition video walkthroughs demonstrating full system operation'
    ]
  },
  {
    id: 18,
    category: 'Conclusion & Roadmap',
    title: 'Conclusion, Contributions & Future Engineering Roadmap',
    subtitle: 'Milestones Achieved & Phase 2 Industrial Horizon',
    badge: 'Conclusion & Horizon',
    phase: 'Final Synthesis & Q&A',
    speakerNotes: [
      'Conclude the internship project presentation: All functional, technical, and industrial objectives successfully met.',
      'Contributions: Complete open-source maintenance suite for Odoo 18 Community, robust BYO-LLM integration with safety gating, and verified testing harness.',
      'Future Roadmap Phase 2: Industrial IoT integration via MQTT / OPC-UA sensors for continuous vibration/temperature telemetry.',
      'Train supervised Random Forest / XGBoost models on historical breakdown records extracted via equipment_ai_data.py for dynamic Remaining Useful Life (RUL) prediction.',
      'Native camera barcode scanner for instant parts inventory checkout.',
      'Thank the committee, advisors, and Aymen Alaya, and open the floor for questions.'
    ],
    takeaways: [
      'Fully functional, verified enterprise module for Odoo 18 Community',
      'Architectural blueprint for safe industrial LLM assistant integration',
      'Roadmap Phase 2: Industrial IoT telemetry (MQTT/OPC-UA) & supervised ML RUL',
      'Thank you for your attention • Open for Q&A'
    ]
  }
];

export const CORE_MODELS_DATA: ModelEntity[] = [
  {
    name: 'equipment.equipment',
    loc: 573,
    category: 'Master Data',
    description: 'Central asset repository holding physical specifications, site/bay locations, depreciation schedules, and real-time health telemetry.',
    keyFields: ['name', 'category_id', 'location_id', 'health_score', 'total_downtime', 'qr_code'],
    computedLogic: 'Dynamic health score formula (20/25/20/25/10), MTBF/MTTR statistics, and straight-line asset depreciation.'
  },
  {
    name: 'equipment.maintenance.order',
    loc: 486,
    category: 'Operations',
    description: 'Primary work order lifecycle model managing technician assignments, safety checklists, live intervention timers, and photo proofs.',
    keyFields: ['name', 'equipment_id', 'technician_user_id', 'state', 'duration_hours', 'total_cost'],
    computedLogic: 'Real-time elapsed repair duration, overdue deadline detection, and total intervention cost aggregation.'
  },
  {
    name: 'equipment.repair.request',
    loc: 259,
    category: 'Operations',
    description: 'Shop-floor incident submission ticket used by machine operators to report breakdowns, triage symptoms, and trigger work orders.',
    keyFields: ['name', 'equipment_id', 'reporter_id', 'priority', 'state', 'order_id'],
    computedLogic: 'SLA target deadline computation and one-click conversion into active maintenance orders.'
  },
  {
    name: 'equipment.spare.part.line',
    loc: 251,
    category: 'Stock Integration',
    description: 'Warehouse consumption bridge linking maintenance orders directly to Odoo inventory and stock moves.',
    keyFields: ['order_id', 'product_id', 'quantity', 'unit_cost', 'subtotal'],
    computedLogic: 'Automatic stock quantity validation, stock move creation upon order completion, and low-stock reorder triggers.'
  },
  {
    name: 'equipment.dashboard',
    loc: 240,
    category: 'Analytics',
    description: 'Singleton metrics aggregation engine computing plant-wide maintenance KPIs without duplicate database storage.',
    keyFields: ['total_equipment', 'active_downtime', 'mttr_hours', 'mtbf_hours', 'availability_pct'],
    computedLogic: 'High-speed SQL and ORM aggregations computing availability percentage and monthly repair budget burn.'
  },
  {
    name: 'equipment.location',
    loc: 184,
    category: 'Master Data',
    description: 'Multi-site hierarchical physical taxonomy organizing equipment into Sites, Buildings, Floors, and Bays.',
    keyFields: ['name', 'parent_id', 'complete_name', 'equipment_count'],
    computedLogic: 'Recursive path generation for complete hierarchical breadcrumbs and total child asset counts.'
  },
  {
    name: 'equipment.ai.config',
    loc: 165,
    category: 'AI Service',
    description: 'BYO-LLM credential and configuration repository storing Gemini and Cerebras settings with encryption.',
    keyFields: ['provider', 'api_key', 'model_name', 'temperature', 'active'],
    computedLogic: 'Password field encryption, API connection test probes, and default model parameter presets.'
  },
  {
    name: 'equipment.ai.prediction',
    loc: 142,
    category: 'AI Service',
    description: 'Immutable governance and audit ledger tracking all prompt inquiries, parsed outputs, and tool operations.',
    keyFields: ['user_id', 'prompt', 'response', 'tool_called', 'state', 'create_date'],
    computedLogic: 'Immutable write-once logging preserving ISO compliance records for every AI interaction.'
  }
];
