import { DefenseQuestion } from '../types';

export const DEFENSE_QA: DefenseQuestion[] = [
  {
    id: 1,
    category: 'Architecture',
    question: 'Why build a custom module instead of utilizing native Odoo Community maintenance?',
    briefAnswer: 'Native Odoo Community maintenance is a barebones ticketing tool lacking spare parts stock reservation, multi-site hierarchical locations, checklists, dynamic health scoring, and AI integration.',
    detailedPoints: [
      'Native Odoo maintenance lacks two-way stock synchronization with stock.quant and automated reservation.',
      'Does not support hierarchical physical locations (Site -> Building -> Floor -> Work Center -> Bay).',
      'Lacks mathematical asset health scoring and statistical failure risk estimation.',
      'Our module provides 7 specialized QWeb PDF reports, mobile QR code diagnostics, and a BYO-LLM assistant with zero extra licensing fees.'
    ],
    codeOrArchitectureReference: 'equipment.equipment, equipment.spare.part.line, models/equipment_location.py'
  },
  {
    id: 2,
    category: 'AI & LLM Integration',
    question: 'How do you prevent the LLM from hallucinating database changes or dropping tables?',
    briefAnswer: 'The LLM has zero direct SQL, ORM, Python, shell, or filesystem access. It communicates exclusively via rigid schema-validated tool definitions with mandatory confirmation gating.',
    detailedPoints: [
      'Tool isolation: LLM output is parsed into a strictly defined JSON intent schema.',
      'The LLM only receives permission to call bounded internal methods (e.g. get_equipment, preview_create_order).',
      'Confirmation Gating: Any write action is intercepted and shown as a visual preview. Execution only occurs after the human user clicks "Confirm".',
      'All user prompts, model generations, and tool invocations are audited into the equipment.ai.prediction ledger.'
    ],
    codeOrArchitectureReference: 'equipment_ai_chat.py, equipment_ai_nl.py, action_confirm_pending()'
  },
  {
    id: 3,
    category: 'AI & LLM Integration',
    question: 'Why do you describe Phase 2 as "Statistical" rather than "Machine Learning"?',
    briefAnswer: 'We practice technical honesty. Phase 2 features (Health Score, Failure Risk, Cost Forecasting) use weighted statistical moving averages and deterministic formulas—no neural networks or scikit-learn models exist yet.',
    detailedPoints: [
      'Health score is an exact formula: 20% Age + 25% Freq + 20% Downtime + 25% Adherence + 10% Warranty.',
      'Cost forecasting uses a weighted moving average with seasonal factors calculated from past maintenance order invoices.',
      'True AI/LLM technology is reserved for Phase 3: the Gemini/Cerebras natural language parser and conversational agent.',
      'The feature extraction module (equipment_ai_data.py) prepares training vectors for future supervised ML models once operational history accumulates.'
    ],
    codeOrArchitectureReference: 'equipment_ai_service.py, equipment_ai_data.py, FINAL_REPORT Section 9'
  },
  {
    id: 4,
    category: 'Odoo 18 Migration',
    question: 'What were the most severe technical breaking changes encountered between Odoo 17 and Odoo 18?',
    briefAnswer: 'The redesign of Kanban views (replacing kanban-box with card), the overhaul of _read_group return signatures to tuples, and the deprecation of product.template.type="product".',
    detailedPoints: [
      '_read_group previously returned dicts with bare field names; in v18 it returns tuples and requires aggregate methods like __count.',
      'Built a version-safe compat wrapper (odoo_compat.py) ensuring forward and backward compatibility.',
      'Stock products in v18 must use type="consu" and is_storable=True for physical warehouse items.',
      'Eliminated gantt from view_mode because web_gantt is Enterprise-only, avoiding HTTP 500 crashes in Community.'
    ],
    codeOrArchitectureReference: 'odoo_compat.py, demo/equipment_demo.xml, views/equipment_maintenance_order_views.xml'
  },
  {
    id: 5,
    category: 'Security & RBAC',
    question: 'How is data confidentiality and multi-tenant authorization guaranteed across technicians and managers?',
    briefAnswer: 'We implemented 5 security groups (Admin, Manager, Technician, Operator, Viewer), 37 ir.model.access rules, and row-level record rules restricting technicians strictly to their assigned work orders.',
    detailedPoints: [
      'Technician record rules enforce [("technician_user_id", "=", user.id)] for write and unlink operations.',
      'Fixed a subtle Odoo bug where omitting perm_read caused write-own rules to filter read queries for administrators.',
      'API keys for Gemini and Cerebras are stored as encrypted password=True fields, accessible solely by the Manager security group.',
      'Operators can submit requests through a simplified interface with no access to system settings or financial cost analytics.'
    ],
    codeOrArchitectureReference: 'security/equipment_security.xml, security/ir.model.access.csv'
  },
  {
    id: 6,
    category: 'Testing & QA',
    question: 'How did you validate that the entire system works end-to-end under real production conditions?',
    briefAnswer: 'Through a multi-layered verification strategy: 138 backend unit tests on a fresh Docker database, 46 LLM mock tests, 6 live Gemini API tests, and 32 Playwright Chromium E2E tests covering 16 specifications.',
    detailedPoints: [
      '138 backend tests executed via odoo --test-enable on clean PostgreSQL with 0 failures (log verified on disk).',
      '46 mock tests test HTTP network failures, rate limiting (429), timeouts, and schema corruptions.',
      '6 live Gemini API tests verified prompt extraction and tool intent generation against gemini-2.5-flash.',
      '32 Playwright browser tests simulated real technician workflows, including a 20-step complete end-to-end walkthrough video.'
    ],
    codeOrArchitectureReference: 'equipment_maintenance/.bt_final.log, tests/test_llm_providers.py, tests/e2e/full-demo.spec.ts'
  }
];
