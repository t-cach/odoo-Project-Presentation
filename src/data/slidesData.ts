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
    subtitle: 'Deterministic 5-Factor Weighted Formulation',
    badge: 'Algorithmic Core',
    phase: 'Mathematical Specification',
    speakerNotes: [
      'Detail the mathematical formula: Health Score = 20% Age + 25% Freq + 20% Downtime + 25% Adherence + 10% Warranty.',
      'Explain why this deterministic formulation was selected: It provides immediate, explainable, audit-compliant ratings without black-box opacity.',
      'Each sub-metric is normalized between 0 and 100 before weighting.',
      'Scores above 90 represent Optimal Health; 50-89 triggers Warning alerts; below 50 flags Critical Hazard.',
      'Failure probability P(fail) is calculated dynamically: (100 - totalScore) / 100, providing predictive maintenance cues.'
    ],
    takeaways: [
      'Deterministic 5-factor weighted algorithm (0 to 100 rating)',
      'Normalized components: Age (20%), Frequency (25%), Downtime (20%), Adherence (25%), Warranty (10%)',
      'P(fail) probability estimate provides quantitative operational risk',
      'Directly feeds executive dashboards and automated re-inspection crons'
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
    subtitle: 'Strict Tool Isolation & Human-in-the-Loop Architecture',
    badge: 'Security & Safety',
    phase: 'Defensive Architecture & Write Gating',
    speakerNotes: [
      'Key presentation topic: Why LLMs must never execute direct database writes without human confirmation.',
      'Tool Isolation: The LLM only receives fixed tool schemas (get_equipment, create_order) with rigid argument validation.',
      'The LLM never receives SQL, Python exec, ORM methods, shell, or filesystem permissions.',
      'Confirmation Flow: When an intent requires a database change, the assistant displays an interactive visual preview card.',
      'The database change is ONLY committed when the human user clicks "Confirm". Unconfirmed requests expire safely.',
      'Every conversation, parse result, and tool call is immutably logged to equipment.ai.prediction for ISO audit compliance.'
    ],
    takeaways: [
      'Zero direct ORM or SQL execution from LLM responses',
      'Structured JSON extraction validated against schema before processing',
      'Mandatory visual preview -> Human Confirmation button -> Execution',
      'Full audit trail preserved in equipment.ai.prediction table'
    ]
  },
  {
    id: 11,
    category: 'Technical Honesty',
    title: 'AI Reality Check: Technical Classification',
    subtitle: 'Distinguishing Rule-Based Heuristics, Statistical Formulas & True LLMs',
    badge: 'Scientific Rigor',
    phase: 'Objective Technical Transparency',
    speakerNotes: [
      'Address the academic integrity of the project: rejecting AI marketing hype in favor of precise technical definitions.',
      'Category 1 (Rule-Based): Keyword parsing, deterministic approval matrices, stock replenishment thresholds.',
      'Category 2 (Statistical): Asset health score, failure risk score, moving-average cost forecasting, straight-line depreciation.',
      'Category 3 (Machine Learning): None currently deployed—no scikit-learn or neural weights. Feature extraction foundation (equipment_ai_data.py) is ready.',
      'Category 4 (LLM): Real generative AI used strictly for Natural Language maintenance logging and conversational tool assistance.',
      'Transparently noting Cerebras HTTP 402 quota exhaustion rather than claiming false success.'
    ],
    takeaways: [
      'Phase 2 features are statistical heuristics, not trained neural networks',
      'Phase 3 NL logger & assistant are genuinely powered by verified Gemini LLM',
      'equipment_ai_data.py extracts structured feature vectors for future supervised training',
      'Honest scientific evaluation valued above marketing buzzwords'
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
    title: 'Quality Assurance, Testing & DevOps Pipeline',
    subtitle: 'Multi-Layered Automated Testing with 100% Pass Rate',
    badge: 'Verification & QA',
    phase: 'Testing & Validation Strategy',
    speakerNotes: [
      'Explain the verification strategy: Backend unit tests + LLM mock tests + Live API tests + Playwright E2E browser tests.',
      'Backend: 138 unit and integration tests passing on fresh Docker PostgreSQL 15 database (0 failures, 0 errors).',
      'LLM Mock Suite: 46/46 unit tests verifying HTTP rate limits (429), timeouts, malformed JSON, and provider failovers.',
      'Live API Tests: 6/6 tests passing live with Google Gemini (gemini-2.5-flash).',
      'Playwright E2E: 32 browser tests across 16 specification files in Chromium, including the full 20-step demo walkthrough.'
    ],
    takeaways: [
      'Backend: 138 tests passed / 0 failures on clean PostgreSQL Docker stack',
      'LLM Providers: 46 unit mock tests covering edge cases & rate limits',
      'Live API: 6/6 tests verified live against Gemini 2.5 Flash',
      'Playwright E2E: 32 tests passed across 16 specs with video evidence'
    ]
  },
  {
    id: 16,
    category: 'Engineering Post-Mortem',
    title: 'Engineering Problem Post-Mortem: 15 Bugs Fixed',
    subtitle: 'Overcoming Real-World Development, Framework & Environment Obstacles',
    badge: 'Bug Post-Mortem',
    phase: 'Debugging & Remediation Campaign',
    speakerNotes: [
      'Review the 15 real engineering problems diagnosed and resolved during development.',
      'Highlight Bug #4: Gantt view mode in action definition caused HTTP 500 crashes on Community (Enterprise-only module).',
      'Highlight Bug #6: Missing perm_read="0" in record rules caused admin to see 0 spare part lines in UI.',
      'Highlight Bug #7 & #8: Wizards closing prematurely because action methods returned truthy True rather than window reload payloads.',
      'Highlight Bug #11: Playwright comma operator bug where [("id", "=", orderId)] silently evaluated to [orderId].',
      'Demonstrates true craftsmanship and senior-level debugging skill.'
    ],
    takeaways: [
      '15 authentic technical bugs documented with root cause and verified fix',
      'Solved Odoo 18 framework incompatibilities and view_mode crashes',
      'Repaired subtle security rule inheritance and wizard dialog behaviors',
      'Hardened Playwright E2E orchestration against WSL Docker lifecycle teardowns'
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
