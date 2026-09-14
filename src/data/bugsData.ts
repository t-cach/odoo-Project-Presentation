import { BugRecord } from '../types';

export const BUGS_DATA: BugRecord[] = [
  {
    id: 1,
    title: 'Odoo 18 _read_group Tuple Aggregation Crash',
    severity: 'Critical',
    category: 'Odoo 18 ORM',
    symptom: 'KPI dashboard, equipment counts, and PDF reports threw TypeError in Odoo 18 during computed field evaluation.',
    rootCause: 'In Odoo 17, _read_group returned a list of dicts. In Odoo 18, it returns tuples and requires explicit aggregate expressions like __count rather than bare field names.',
    engineeredFix: 'Created version-safe read_group_counts() helper in odoo_compat.py using __count aggregation; migrated all 6 call sites across equipment and order models.',
    verifiedBy: 'Unit tests + E2E template and PDF report specs green on clean database.'
  },
  {
    id: 2,
    title: 'Zero Division on MTBF and MTTR Calculation',
    severity: 'High',
    category: 'Odoo 18 ORM',
    symptom: 'ZeroDivisionError crashed equipment forms when creating brand-new machines with zero breakdown records.',
    rootCause: 'MTBF (Mean Time Between Failures) divided operating hours by breakdown count without a boundary condition guard when count is 0.',
    engineeredFix: 'Added defensive division guards with graceful fallback returning theoretical asset lifespan and 0.0 MTTR hours.',
    verifiedBy: '138 backend tests suite; test_equipment_zero_history passing.'
  },
  {
    id: 3,
    title: 'Missing Maintenance Order Completion Date Skewing KPIs',
    severity: 'Medium',
    category: 'Odoo 18 ORM',
    symptom: 'Closing maintenance orders through quick kanban drag-and-drop omitted completion_date, skewing downtime analytics.',
    rootCause: 'Only action_done() wizard wrote completion_date; direct state write via kanban bypass did not populate write_date.',
    engineeredFix: 'Implemented an ORM write() override ensuring completion_date defaults to fields.Datetime.now() whenever state moves to done.',
    verifiedBy: 'Automated test_order_state_transitions & E2E maintenance order spec.'
  },
  {
    id: 4,
    title: 'Maintenance Orders Action 500 in Odoo 18 Community',
    severity: 'Critical',
    category: 'UI / QWeb',
    symptom: 'Clicking "Maintenance Orders" menu crashed with a 500 "Oops" error on Odoo 18 Community during load_views RPC.',
    rootCause: 'view_mode contained "gantt". In Odoo 18 Community, the web_gantt module is Enterprise-only, causing load_views to fail immediately.',
    engineeredFix: 'Removed gantt from view_mode in action_equipment_maintenance_order, replacing it with an advanced calendar and planning list view.',
    verifiedBy: 'Playwright test tests/e2e/orders.spec.ts passing.'
  },
  {
    id: 5,
    title: 'Demo Products Failed to Load in Odoo 18 Community',
    severity: 'High',
    category: 'Odoo 18 ORM',
    symptom: 'Module installation with demo data failed on clean Odoo 18 instances with ValidationError on product.template.',
    rootCause: 'In Odoo 18, product.template.type="product" was deprecated in favor of type="consu" paired with is_storable=True.',
    engineeredFix: 'Refactored demo/equipment_demo.xml to set type="consu" and is_storable=True for all spare parts and consumable items.',
    verifiedBy: 'Clean installation on Docker container bt_final3 from scratch with exit code 0.'
  },
  {
    id: 6,
    title: 'Admin User Saw Zero Spare Part Lines in Form View',
    severity: 'Critical',
    category: 'Security / Record Rules',
    symptom: 'System administrator opened maintenance orders and saw 0 spare parts, even though lines existed in database.',
    rootCause: 'Three record rules designed for "technicians can edit own lines" omitted the perm_read attribute. In Odoo, omitting perm_read defaults it to True (1), which filtered reads even for admins!',
    engineeredFix: 'Explicitly declared perm_read="0" perm_write="1" perm_create="1" perm_unlink="1" on technician write-own rules.',
    verifiedBy: 'E2E spare parts spec and RPC JSON inspections.'
  },
  {
    id: 7,
    title: 'Natural Language Logger Dialog Closed Prematurely',
    severity: 'High',
    category: 'BYO-LLM',
    symptom: 'Operator clicked "Parse Log" in the AI NL wizard; dialog closed instantly without displaying the extracted fields.',
    rootCause: 'action_parse() returned True. In Odoo OWL web client, returning a truthy non-dict from a wizard button closes the modal.',
    engineeredFix: 'Modified action_parse() to return an ir.actions.act_window reload payload re-opening the wizard with res_id in place.',
    verifiedBy: 'E2E NL logger spec (verifying parsed fields remain visible before order creation).'
  },
  {
    id: 8,
    title: 'Conversational Assistant Modal Closed on Send/Confirm/Cancel',
    severity: 'High',
    category: 'BYO-LLM',
    symptom: 'Typing a message in the chat wizard and clicking "Send" immediately closed the popup instead of showing assistant response.',
    rootCause: 'action_send(), action_confirm_pending(), and action_cancel_pending() returned boolean True instead of reload action.',
    engineeredFix: 'Refactored all three wizard actions to return self.env["ir.actions.act_window"]._for_xml_id("equipment_maintenance.action_equipment_ai_chat_wizard") preserving dialog state.',
    verifiedBy: 'Live Playwright E2E chat assistant spec.'
  },
  {
    id: 9,
    title: 'Assistant Failed to Identify Equipment Named in Query',
    severity: 'High',
    category: 'BYO-LLM',
    symptom: 'Asking "What is the status of CNC Lathe 01?" caused the assistant to answer with generic help text rather than machine status.',
    rootCause: '_find_mentioned_equipment performed strict whole-string matching rather than tokenized substring scanning across equipment names, codes, and serial numbers.',
    engineeredFix: 'Rewrote matching logic to iterate through candidate assets and check word-boundary substrings against the user prompt.',
    verifiedBy: 'Live Gemini API test + Playwright test asserting CNC Lathe 01 status details.'
  },
  {
    id: 10,
    title: 'QR Code Spec False Negative in Automated Tests',
    severity: 'Medium',
    category: 'Testing / E2E',
    symptom: 'Automated test suite flagged QR code generation as failed despite QR codes scanning perfectly on mobile devices.',
    rootCause: 'Test asserted PNG buffer size > 2000 bytes. A 21x21 version 1 QR code PNG optimized with zlib can be as small as 462 bytes.',
    engineeredFix: 'Updated assertion to check PNG magic header bytes (\\x89PNG\\r\\n\\x1a\\n) and valid image dimensions instead of arbitrary file size.',
    verifiedBy: 'E2E QR spec in tests/e2e/qr-barcode.spec.ts passing.'
  },
  {
    id: 11,
    title: 'Playwright Domain Comma Operator Bug in 9 Test Files',
    severity: 'High',
    category: 'Testing / E2E',
    symptom: 'E2E RPC queries returned unpredictable records or unexpected recordsets.',
    rootCause: 'JavaScript comma operator bug: domain: [("id", "=", orderId)] evaluated as domain: [orderId] because tuple parens inside brackets in JS are treated as comma-separated expressions!',
    engineeredFix: 'Standardized all test RPC domains to explicit array-of-arrays: [["id", "=", orderId]].',
    verifiedBy: 'All 32 Playwright E2E test specs green.'
  },
  {
    id: 12,
    title: 'Template Order Count Assertion Conflict on Demo DB',
    severity: 'Medium',
    category: 'Testing / E2E',
    symptom: 'Backend count test failed when run against demo database versus blank database.',
    rootCause: 'Cron and template tests queried total maintenance orders in system without filtering by the specific template generated in the test.',
    engineeredFix: 'Scoped assertion strictly to orders linked by template_id = test_template.id.',
    verifiedBy: 'Backend suite passes on both blank bt_final3 and demo database.'
  },
  {
    id: 13,
    title: 'WSL / Docker Anonymous Volume Loss During E2E Runs',
    severity: 'High',
    category: 'Testing / E2E',
    symptom: 'Database was wiped between Playwright spec executions, failing subsequent dependent tests.',
    rootCause: 'docker compose down command cleared anonymous PostgreSQL data volumes between test runs.',
    engineeredFix: 'Configured named volume pg_equipment_data, created scripts/e2e-run.sh keeper script with readiness polling and preserved volumes.',
    verifiedBy: 'Executed all 16 spec files consecutively without data loss.'
  },
  {
    id: 14,
    title: 'Playwright Per-Test Timeout Option Incompatibility',
    severity: 'Medium',
    category: 'Testing / E2E',
    symptom: 'Playwright test runner crashed before running tests with "TypeError: timeout option is not supported".',
    rootCause: 'Installed Playwright version did not support timeout in the test options object.',
    engineeredFix: 'Replaced test("...", { timeout: 120000 }, ...) with inline test.setTimeout(120000) inside the test block.',
    verifiedBy: 'Full-demo 20-step spec passed in 1.1 minutes.'
  },
  {
    id: 15,
    title: 'Cerebras Live Generation Quota Block (HTTP 402)',
    severity: 'Medium',
    category: 'BYO-LLM',
    symptom: 'Cerebras LLM provider test authenticated successfully but generation calls failed.',
    rootCause: 'Cerebras developer account quota was exhausted on provider side (HTTP 402 Payment Required).',
    engineeredFix: 'Honest defense reporting: Authentication verified live (646ms); generation transparently documented as BLOCKED by external quota with 46 mock tests verifying code path.',
    verifiedBy: 'Live API test suite logged to tests/live_api_results.json; Gemini 6/6 verified live.'
  }
];
