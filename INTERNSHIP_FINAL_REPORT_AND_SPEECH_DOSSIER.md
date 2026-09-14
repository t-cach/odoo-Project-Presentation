# INTERNSHIP PROJECT REPORT & PRESENTATION GUIDE
## Advanced Equipment Maintenance Management System for Odoo 18.0 Community
**Software Engineering Internship Project**

---

### Project & Professional Identification
- **Student / Intern:** Youssef Benyouness
- **Role:** Student / Intern (Software Engineering)
- **Institution / University:** iTEAM University (Tunis, Tunisia)
- **Host Company:** IT-Koncept SA (Headquarters: Route du Stand 68, 1260 Nyon, Switzerland / Engineering Hub: IT-Koncept Tunisia Sàrl, Tunis)
- **Project Director & Company Advisor:** Aymen Alaya (Project Director, IT-Koncept SA)
- **Core Technology Stack:** Odoo 18.0 Community Edition, Python 3.12, PostgreSQL 15, OWL 2.0, QWeb, Google Gemini 2.5 Flash API, Docker, Playwright
- **Academic & Operational Year:** 2025 - 2026

---

# TABLE OF CONTENTS

1. **PART I: COMPREHENSIVE INTERNSHIP REPORT SYNTHESIS**
   - 1.1 General Introduction & Industrial Context
   - 1.2 Host Organization Profile (IT-Koncept SA)
   - 1.3 Baseline Analysis, Problem Statement & Requirements Specification
   - 1.4 4-Tier Software Architecture & Data Modeling
   - 1.5 Realization & Key Capabilities of the CMMS Module
   - 1.6 Advanced Algorithmic Engine: Dynamic Health Score & Secure AI Assistance
   - 1.7 Technical Challenges & Migration to Odoo 18.0
   - 1.8 Quality Assurance, Automated Testing & Defect Post-Mortem
   - 1.9 Conclusion & Future Industrial Roadmap

2. **PART II: COMPLETE PRESENTATION SCRIPT & SPEECH (SLIDE BY SLIDE)**
   - Timing & Pacing Guidelines (~20-25 Minutes)
   - Opening Address & Welcome to the Committee
   - Detailed Slide-by-Slide Delivery (Slides 1 through 18 with transitions and emphasis points)
   - Conclusion & Floor Opening for Questions

3. **PART III: ESSENTIAL KNOWLEDGE & HIGH-IMPACT PROJECT INSIGHTS**
   - 3.1 Tricky Evaluation Questions & Bulletproof Technical Answers
   - 3.2 Core Metrics & Figures to Memorize
   - 3.3 Key Architectural Decisions & Engineering Trade-offs

4. **PART IV: PRACTICAL TESTING GUIDE — EVERYTHING TO TRY IN THE SYSTEM**
   - 4.1 Scenario 1: Multi-Tier Location Hierarchy & Asset Registry
   - 4.2 Scenario 2: Automated Preventive Maintenance Generation & Execution
   - 4.3 Scenario 3: Corrective Repair Order & SLA Tracking
   - 4.4 Scenario 4: Real-Time Spare Parts Stock Deduction (`stock.quant`)
   - 4.5 Scenario 5: Dynamic Health Score Recalculation (5-Factor Formula)
   - 4.6 Scenario 6: Mobile QR Code Field Access (`/equipment/QR`)
   - 4.7 Scenario 7: Natural Language AI Assistant with Write Gating Safety
   - 4.8 Scenario 8: Role-Based Access Control (RBAC) & Technician Record Rules
   - 4.9 Scenario 9: Manual Execution of 4 Scheduled Background Cron Jobs
   - 4.10 Scenario 10: Generating 7 High-Fidelity QWeb PDF Reports
   - 4.11 Scenario 11: Running the Complete Automated Test Suites via CLI

---

# PART I: COMPREHENSIVE INTERNSHIP REPORT SYNTHESIS

## 1.1 General Introduction & Industrial Context
In modern manufacturing, pharmaceutical, and service industries, operational equipment availability directly governs profitability. An unplanned breakdown of a critical asset triggers substantial direct costs (idle operator labor, spoiled raw materials, contractual delay penalties) alongside reputational harm. According to industrial research studies, unpredicted downtime can reduce plant operational margins by 5% to 20%, reaching an average cost of $260,000 per hour in heavy continuous process facilities.

Despite these critical stakes, small and medium enterprises (SMEs) frequently operate without adequate software tools. Proprietary CMMS (Computerized Maintenance Management System) packages impose prohibitive licensing costs, whereas artisan approaches reliant on spreadsheets or paper binders cause significant information loss: no auditable service history, zero visibility into real machine wear rates, and complete decoupling from spare parts inventories.

This engineering internship project, conducted at **IT-Koncept SA**, focuses on designing, developing, and validating an enterprise-grade Equipment Maintenance Management System tailored specifically for **Odoo 18.0 Community Edition**, enhanced with a deterministic asset health scoring engine and a secure natural-language LLM assistant.

## 1.2 Host Organization Profile (IT-Koncept SA)
**IT-Koncept SA** is an established Swiss digital engineering and IT services company founded in 2013, operating as an official Odoo Integration Partner. Operating as part of the Business-Koncept group, the company is led by Alain Lacroix (CEO) and Florian Frossard (COO).

The company operates on a bilateral delivery model:
- **Swiss Headquarters (Nyon):** Client relations, strategic governance, cloud infrastructure architecture, IT outsourcing, and cybersecurity for enterprises and public administrations across Swiss Romande.
- **Tunisian Engineering Center (IT-Koncept Tunisia Sàrl, Tunis):** Software engineering center of excellence, specializing in advanced Odoo ORM development, enterprise ERP integrations, and software quality engineering.

With over 8 years of continuous partnership and deep technical expertise spanning Odoo versions 7 to 18, IT-Koncept SA guides international clients through enterprise digitalization. This maintenance project directly serves IT-Koncept's strategy of expanding its library of high-value vertical solutions for Odoo 18 Community.

## 1.3 Baseline Analysis, Problem Statement & Requirements Specification
### Existing System Limitations
1. **Odoo Community Native Module:** The default `maintenance` module in Odoo Community is essentially a rudimentary ticketing board. It lacks multi-level physical plant hierarchies, provides no spare parts management, does not integrate with warehouse stock moves, and offers no predictive reliability metrics.
2. **Stock Disconnect:** In typical SME operations, parts swapped during a repair (bearings, seals, filters) are not deducted in real-time from the warehouse, leading to surprise stockouts during subsequent emergencies.
3. **Lack of Workshop Mobility:** Floor technicians and machine operators lack rapid methods to view service logs right at the work center without logging into heavy desktop ERP interfaces.

### Specified Functional Requirements
- **Asset Master Registry:** Comprehensive asset catalog featuring a multi-tier physical hierarchy (Site → Building → Floor → Work Center → Bay), warranty tracking, hour/cycle counters, and technical manuals.
- **Preventive Maintenance:** Template-driven recurring inspections triggered automatically by calendar intervals or runtime meter thresholds.
- **Corrective Maintenance & SLA:** Incident logging, technician dispatch, and resolution timers calibrated by asset criticality (SLA).
- **Spare Parts Consumption:** Bill-of-materials style spare parts tracking linked to Odoo's product catalog with automatic stock reservation and warehouse deduction (`stock.quant` / `stock.move`).
- **Dynamic Asset Health Score:** A 100-point deterministic evaluation balancing asset age, failure frequency, cumulative downtime, preventive adherence, and warranty status.
- **Workshop Mobility:** Automated QR code generation for every asset with a lightweight, responsive mobile portal (`/equipment/QR`).
- **Reporting & Business Intelligence:** 7 professional QWeb PDF reports and an executive KPI dashboard tracking MTBF, MTTR, availability rates, and cost distributions.
- **BYO-LLM AI Assistant:** Natural language querying with strict write-gating confirmation barriers to prevent hallucinations and unauthorized database mutations.

## 1.4 4-Tier Software Architecture & Data Modeling
The application is structured into four cleanly decoupled tiers to guarantee maintainability, enterprise security, and modularity:

1. **Presentation Tier:**
   - Odoo 18 XML views (Forms, tree views utilizing `column_invisible`, Kanban cards structured with `<t t-name="card">`, graphs, calendar views).
   - OWL 2.0 JavaScript components for dynamic interactions (interactive Health Score gauge widget, responsive `/equipment/QR` mobile view).
   - QWeb templating engine for 7 print-ready PDF reports.
2. **Business Logic Tier:**
   - 14 Python ORM models inheriting from `models.Model` and `models.TransientModel`.
   - Reliability analytics engine computing MTBF, MTTR, and operational availability.
   - Zero-dependency LLM abstraction layer (`equipment_llm_providers.py`) using Python's standard `urllib`.
3. **Data Tier:**
   - PostgreSQL 15 relational database management system.
   - SQL constraints, foreign key indexes, and Python validation constraints (`@api.constrains`).
4. **Integration & Mixins Tier:**
   - Inheriting `mail.thread` and `mail.activity.mixin` for chatter audit trails and notifications.
   - Native integration with `stock.move` and `stock.quant` for warehouse inventory deduction.

### The 14 ORM Models Developed
- `equipment.equipment` (588 LOC): Central asset registry, operational status, runtime meters, health score computations.
- `equipment.category` (112 LOC): Asset categorization, default criticality, and maintenance templates.
- `equipment.location` (165 LOC): Physical plant tree (Site, Building, Floor, Bay).
- `equipment.workcenter` (98 LOC): Shop floor work center linked to production lines.
- `equipment.maintenance.order` (742 LOC): Core operational engine (preventive & corrective orders, 5-phase state machine, SLA timers).
- `equipment.maintenance.template` (230 LOC): Recurring preventive inspection templates.
- `equipment.checklist.item` (145 LOC): Quality and safety compliance checklist items per order.
- `equipment.spare.part.line` (185 LOC): Consumed spare parts lines linked to `product.product`.
- `equipment.failure.log` (160 LOC): Historical breakdown log used for MTBF/MTTR computations.
- `equipment.downtime.entry` (140 LOC): Machine downtime duration and root cause logging.
- `equipment.ai.config` (210 LOC): LLM provider configuration and API credentials management.
- `equipment.ai.prediction` (175 LOC): Audit trail of AI inferences and proposed action tokens.
- `equipment.ai.chat` (260 LOC): Conversational assistant session handling.
- `equipment.maintenance.report.wizard` (190 LOC): Transient wizard for filtered PDF report generation.

## 1.5 Realization & Key Capabilities of the CMMS Module
- **Maintenance Order State Machine:** Enforces a strict 5-stage lifecycle: *Draft* → *Submitted* → *Waiting Approval* → *In Progress* → *Done* (or *Cancelled*).
- **Automated Warehouse Stock Deduction:** When an order transitions to "Done", the system verifies all spare part lines. For storable items, a `stock.move` is dynamically created against the workshop maintenance location and immediately processed via `_action_done()`, updating physical quants instantly.
- **Mobile QR Code Field Portal:** Each equipment record automatically generates a unique QR code pointing to `/equipment/QR?token=...`. Machine operators scan the sticker with any mobile browser to inspect specifications, emergency lockout procedures, and file an incident in three taps.

## 1.6 Advanced Algorithmic Engine: Dynamic Health Score & Secure AI Assistance
### Mathematical Health Score Formulation
Asset health is computed through a deterministic 100-point algorithm across 5 industrial dimensions:
$$\text{Health Score} = 0.20 \times \text{Score}_{\text{Age}} + 0.25 \times \text{Score}_{\text{Frequency}} + 0.20 \times \text{Score}_{\text{Downtime}} + 0.25 \times \text{Score}_{\text{Adherence}} + 0.10 \times \text{Score}_{\text{Warranty}}$$

- **Asset Age ($\text{Score}_{\text{Age}}$):** Evaluates service age relative to expected depreciation lifecycle (e.g., 10 years).
- **Failure Frequency ($\text{Score}_{\text{Frequency}}$):** Penalizes machines experiencing multiple corrective breakdowns within the trailing 90 days.
- **Cumulative Downtime ($\text{Score}_{\text{Downtime}}$):** Measures percentage of available runtime vs. outage hours.
- **Preventive Adherence ($\text{Score}_{\text{Adherence}}$):** Ratio of preventive inspections completed on schedule vs. overdue tickets.
- **Warranty Status ($\text{Score}_{\text{Warranty}}$):** 100 points for active manufacturer warranty, gradually scaling down post-expiry.

From this score, the system derives an immediate **Failure Probability $P(\text{fail})$**:
$$P(\text{fail}) = 1 - \frac{\text{Health Score}}{100}$$

### Zero-Dependency BYO-LLM Architecture & Anti-Hallucination Barrier
To empower technicians with conversational diagnostics (e.g., *"What is the status of Compressor CP-102?"* or *"Generate an urgent repair ticket for high spindle vibration"*), an integration gateway with the Google Gemini 2.5 Flash API was engineered.

**Write-Gating Security Pattern:**
The language model possesses zero direct access to PostgreSQL or Python system commands. The LLM functions purely via bounded tool calling. Any mutative action (creating or modifying a work order) is intercepted by the Odoo backend and returned as a "Pending Action Token". A human operator must visually verify the extracted parameters and click "Confirm" in Odoo before any transaction is written to the database.

## 1.7 Technical Challenges & Migration to Odoo 18.0
Developing directly on **Odoo 18.0 Community** introduced key architectural breaking changes:
1. **Kanban Card Redesign:** Deprecation of `<div class="oe_kanban_global_click">` and `<t t-name="kanban-box">`, replaced with `<t t-name="card">` and modern CSS utility classes.
2. **Product Model Evolution:** The historical `type = 'product'` for storable items was removed in Odoo 18; the platform now requires `type = 'consu'` paired with `is_storable = True`.
3. **ORM `_read_group` Modernization:** The ORM now returns structured tuples instead of dictionaries, requiring an explicit `__count` aggregator.
4. **Elimination of Enterprise Tags:** Proprietary tags like `<gantt>` crash Odoo Community on boot; these were replaced with responsive native calendar views.

## 1.8 Quality Assurance, Automated Testing & Defect Post-Mortem
The system was validated through an exhaustive quality assurance regimen:
- **138 Backend Unit & Integration Tests:** Written using Odoo's native `TransactionCase`, achieving 100% pass rates across state transitions, stock deductions, and mathematical calculations.
- **46 LLM Mock Tests:** Validating system resilience under network drops, malformed JSON responses, and HTTP 402 quota limits (observed during Cerebras evaluation).
- **32 Playwright End-to-End Tests:** Verifying the full browser workflow in Chromium from authentication to PDF generation.
- **15 Documented Real-World Bugs Resolved:** Including the technician record rule issue where omitting `perm_read="0"` inadvertently filtered manager-level queries.

## 1.9 Conclusion & Future Industrial Roadmap
This internship project successfully delivered an enterprise-ready maintenance suite for IT-Koncept SA's client base on Odoo 18 Community.
Planned Phase 2 extensions include:
1. **Industrial IoT Telemetry:** MQTT and OPC-UA connectors to ingest real-time vibration and temperature data directly from physical sensors.
2. **Supervised Machine Learning:** Training Random Forest and XGBoost models on the feature vectors extracted in `equipment_ai_data.py` to calculate dynamic Remaining Useful Life (RUL).

---

# PART II: COMPLETE PRESENTATION SCRIPT & SPEECH (SLIDE BY SLIDE)

*Target presentation duration: 20 to 25 minutes, followed by 15 minutes of Q&A.*

---

### Opening Address & Greetings (~1 minute)
> "Good morning, esteemed members of the evaluation committee, advisors, and mentors.
> 
> It is an honor to present the results of my software engineering internship project today. My name is Youssef Benyouness, and this work was conducted during my internship at IT-Koncept SA under the supervision of Mr. Aymen Alaya, Project Director.
> 
> The project is titled:
> **'Design and Implementation of an Advanced Equipment Maintenance Management System for Odoo 18.0 Community Edition with Secure AI Assistant Integration'**.
> 
> Let us begin by reviewing the agenda and the core industrial context."

---

### Slide 1: Title & Project Identification (~1 minute)
> "This opening slide introduces the project framework.
> Our objective was to engineer a comprehensive, enterprise-ready maintenance module for Odoo 18 Community, bridging the gap between expensive proprietary CMMS suites and the limited ticketing capabilities of native open-source ERPs.
> The completed deliverable comprises 55 source files, over 6,800 lines of code, and a testing harness of 138 automated backend tests."

---

### Slide 2: Host Company — IT-Koncept SA (~1.5 minutes)
> "A brief overview of our host enterprise: IT-Koncept SA.
> Established in 2013 in Nyon, Switzerland, IT-Koncept is a certified Odoo Integration Partner with over a decade of continuous service in digital transformation. Operating within the Business-Koncept group, the company is led by Alain Lacroix and Florian Frossard.
> 
> The company pairs its Swiss headquarters with a high-performance software engineering hub in Tunis, IT-Koncept Tunisia. With more than eight years of specialized Odoo expertise across versions 7 through 18, IT-Koncept delivers custom ERP integrations for demanding clients across Switzerland and North Africa. This project directly enriches their vertical product portfolio."

---

### Slide 3: Industrial Context & Problem Statement (~1.5 minutes)
> "Now let us examine the industrial motivation behind this system.
> In manufacturing plants, unscheduled equipment downtime is an immense cost driver, causing up to a 20% loss in productivity and averaging $260,000 per hour of downtime in heavy process environments.
> 
> Our baseline analysis revealed three critical bottlenecks among SMEs:
> 1. The spreadsheet trap: Service logs scattered across Excel files or paper notebooks make it impossible to compute MTBF or MTTR reliably.
> 2. The inventory disconnect: Technicians replace bearings or seals during an emergency, but warehouse stock is never updated in real time, leading to critical stockouts during the next failure.
> 3. Lack of mobile shop floor tooling for operators on the plant floor."

---

### Slide 4: Scope & Functional Architecture (~1 minute)
> "To resolve these challenges, we defined an ambitious yet fully achievable scope tailored to Odoo 18 Community Edition, without relying on paid Enterprise features.
> Our module encompasses the full maintenance lifecycle: a multi-tier physical asset registry, automated preventive maintenance, corrective repair management with SLA escalation, live warehouse spare parts stock deduction, a deterministic 100-point asset health scoring engine, 7 professional PDF reports, and a mobile QR code field portal."

---

### Slide 5: 4-Tier Software Architecture (~1.5 minutes)
> "On the architectural side, we enforced a clean separation of concerns across four layers:
> - The Presentation Tier utilizes OWL 2.0 for dynamic UI components, Odoo 18 XML views, and QWeb for high-fidelity PDF generation.
> - The Business Logic Tier brings together 14 Python ORM models handling state machines, SLA timers, reliability metrics, and LLM integrations.
> - The Data Tier relies on PostgreSQL 15, applying SQL integrity constraints and foreign key indexes.
> - Finally, the Integration Tier natively leverages core Odoo mixins like `stock.move` for warehouse deduction and `mail.thread` for full audit trails."

---

### Slide 6: Data Modeling & Entity-Relationship Schema (~1.5 minutes)
> "This slide illustrates our entity-relationship model.
> The central entity is `equipment.equipment`, which connects the physical plant hierarchy `equipment.location` (from Site down to Bay) and the shop floor Work Center.
> Maintenance activities are driven by `equipment.maintenance.order`, which supports both template-driven recurring preventive orders and operator-reported corrective tickets.
> Each order manages safety checklists via `equipment.checklist.item` and consumed replacement components via `equipment.spare.part.line`, linked directly to Odoo's product catalog."

---

### Slide 7: Maintenance State Machine & Workflow (~1.5 minutes)
> "Here we observe the operational lifecycle of a work order, governed by a 5-phase finite state machine:
> 1. Draft: Initiated manually or automatically by the preventive scheduler.
> 2. Submitted: Scoped with priority and SLA resolution deadlines.
> 3. Waiting Approval: Reviewed by the maintenance supervisor for resource assignment.
> 4. In Progress: Technicians perform the physical repair, complete safety checklists, and record labor hours.
> 5. Done: Upon completion, machine downtime is archived, reliability KPIs are updated, and spare parts are automatically deducted from warehouse inventory."

---

### Slide 8: Algorithmic Health Score Engine (~2 minutes)
> "A core engineering innovation in our module is the deterministic asset health engine.
> Rather than relying on subjective opinions, we developed a 100-point mathematical formula combining five measurable industrial factors:
> - 20% weighting on asset age relative to nominal lifespan.
> - 25% on recent failure frequency within the trailing 90 days.
> - 20% on cumulative downtime percentage.
> - 25% on preventive schedule adherence.
> - 10% on remaining manufacturer warranty coverage.
> 
> This yields a dynamic Health Score between 0 and 100, which mathematically produces the failure probability $P(\text{fail})$. Both metrics update automatically and render on the asset dashboard."

---

### Slide 9: BYO-LLM Architecture & Gemini Integration (~1.5 minutes)
> "To assist floor technicians with instant troubleshooting, we designed a Bring-Your-Own-LLM integration layer.
> Rather than bloating the server with heavy third-party SDKs that introduce dependency conflicts, we built our HTTP client using Python's standard `urllib`.
> 
> The architecture natively supports the Google Gemini 2.5 Flash API as well as OpenAI-compatible providers like Cerebras. In our live test harness, Gemini 2.5 Flash achieved an exceptional average round-trip latency of 1.9 seconds."

---

### Slide 10: AI Safety Architecture & Write Gating (~1.5 minutes)
> "When integrating generative AI into an enterprise ERP, security is paramount. We implemented a zero-trust safety pattern:
> The language model is completely sandboxed. It cannot execute raw SQL queries, shell commands, or arbitrary Python scripts.
> All communication happens through bounded tool calling.
> 
> Crucially, we enforce Write Gating: the LLM cannot commit any write or creation transaction on its own. When an action is requested, the system generates a pending action preview card. A verified human user must explicitly click 'Confirm' in Odoo to commit the record."

---

### Slide 11: Academic Transparency & AI Scope Clarification (~1 minute)
> "In the spirit of technical clarity, we emphasize the precise boundaries of our AI layer:
> - State transitions and business logic are 100% deterministic.
> - Health scores and cost forecasts are driven by mathematical formulas and weighted moving averages, not local neural networks.
> - The generative AI layer is specifically focused on natural language processing: parsing maintenance requests and summarizing technician notes via Gemini.
> We also implemented the feature extraction pipeline `equipment_ai_data.py` to prepare structured training datasets for future supervised machine learning."

---

### Slide 12: Odoo 18.0 Migration & Breaking Changes (~1.5 minutes)
> "Developing directly on Odoo 18.0 presented significant engineering hurdles due to architectural breaking changes:
> - Kanban views were rewritten from scratch: legacy templates were replaced with modern `<t t-name="card">` components.
> - Storable product modeling changed: `type='product'` was deprecated in favor of `type='consu'` combined with `is_storable=True`.
> - The ORM's `_read_group` now returns structured tuples rather than dictionaries, requiring our custom `odoo_compat.py` helper.
> - All proprietary Enterprise elements like `<gantt>` were eliminated to maintain native compatibility with Odoo Community."

---

### Slide 13: Role-Based Access Control (RBAC) & Data Security (~1.5 minutes)
> "Access governance is enforced through a 5-tier RBAC model: Administrator, Maintenance Manager, Technician, Operator, and Reader.
> We configured 37 access control list rules in `ir.model.access.csv` along with row-level Record Rules.
> For example, technicians are restricted to viewing and updating only their assigned orders. We resolved a common Odoo pitfall by configuring the technician rule with `perm_read='0'`, ensuring it does not unintentionally restrict manager-level queries."

---

### Slide 14: Automated Background Scheduled Actions (~1 minute)
> "System autonomy is maintained by 4 background cron jobs:
> 1. The recurring preventive order generator, which evaluates run counters and calendar intervals to create tickets in advance.
> 2. The warranty expiration watchdog, notifying managers 30 days prior to warranty lapse.
> 3. The SLA compliance monitor, detecting overdue tickets and triggering escalation notices.
> 4. The safety stock replenishment monitor, flagging critical components that drop below reorder thresholds."

---

### Slide 15: Quality Assurance, Automated Tests & Verification (~1.5 minutes)
> "Our quality assurance strategy incorporates three rigorous testing layers:
> - 138 automated backend unit and integration tests under Odoo's `TransactionCase`, all passing with 100% success.
> - 46 LLM mock and fault-injection tests validating graceful degradation under network drops and API quotas.
> - 32 Playwright end-to-end scenarios recording browser user journeys without regressions.
> This ensures long-term operational stability for IT-Koncept's client deployments."

---

### Slide 16: Problem Solving & Engineering Post-Mortem (~1.5 minutes)
> "Throughout the project lifecycle, we identified and documented 15 real-world engineering bugs across the ORM, security rules, and network boundaries.
> For instance, we diagnosed an HTTP 402 Payment Required response from Cerebras during quota stress tests, while verifying that authentication succeeded in 646 milliseconds.
> These lessons were systematically documented to strengthen future development cycles."

---

### Slide 17: Tangible Deliverables & System Artifacts (~1 minute)
> "The concrete deliverables of this internship project include:
> - The live executive dashboard tracking MTBF and MTTR metrics in real time.
> - Seven professional QWeb PDF reports, including technician work orders, equipment lifecycle sheets, and cost audits.
> - The lightweight mobile QR code portal accessible instantly on the shop floor without requiring app installations."

---

### Slide 18: Conclusion & Future Engineering Roadmap (~1.5 minutes)
> "In conclusion, this internship project at IT-Koncept SA achieved all of its core objectives: delivering an advanced, robust, and secure maintenance suite for Odoo 18 Community Edition.
> 
> On a professional level, this experience provided deep mastery of enterprise ERP internals, the intricacies of Odoo 18, and production-safe architectures for generative AI.
> 
> For our Phase 2 roadmap, we look forward to integrating physical IoT telemetry over MQTT and training supervised machine learning models to forecast Remaining Useful Life (RUL).
> 
> I extend my sincere gratitude to my advisor Mr. Aymen Alaya, to the leadership of IT-Koncept SA, and to the faculty of iTEAM University.
> 
> Thank you for your time and attention. I look forward to your questions."

---

# PART III: ESSENTIAL KNOWLEDGE & HIGH-IMPACT PROJECT INSIGHTS

## 3.1 Tricky Evaluation Questions & Bulletproof Technical Answers

### Question 1: "Why build a custom module when Odoo already includes a Maintenance module?"
**Bulletproof Answer:**
"Odoo Community's native `maintenance` module is strictly a basic ticketing Kanban. It lacks essential industrial capabilities:
1. No spare parts management or inventory link (`stock.move` is completely absent).
2. No physical plant location hierarchy (Site, Building, Floor, Bay).
3. No safety and compliance checklist tracking.
4. No automated calculation of reliability metrics (MTBF, MTTR) or asset health scoring.
Our module provides an enterprise-grade CMMS suite on Odoo Community, eliminating the need for expensive Enterprise licensing."

### Question 2: "You mention AI, but your health score is a weighted mathematical formula. Isn't calling it AI misleading?"
**Bulletproof Answer:**
"We explicitly maintain complete technical transparency on this distinction.
The Health Score and cost projections are **deterministic statistical algorithms**, which are essential in manufacturing where every maintenance decision must be auditable and explainable.
The Generative AI layer is applied where it excels: natural language comprehension, parsing freeform operator incident reports, querying maintenance documentation, and formatting diagnostic summaries via the Gemini 2.5 Flash API."

### Question 3: "How do you guarantee that the LLM will not corrupt or delete critical ERP data?"
**Bulletproof Answer:**
"Through our strict **Write Gating** architecture. The LLM operates in an isolated sandbox with zero access to raw SQL, shell terminals, or direct ORM write methods. When a user asks the assistant to create or modify a work order, the LLM outputs a structured action intent. The Odoo system intercepts this payload and renders a visual confirmation dialog. No write transaction occurs until an authenticated human operator clicks 'Confirm'."

### Question 4: "Why use Python's standard `urllib` instead of the official `google-generativeai` SDK?"
**Bulletproof Answer:**
"For two decisive enterprise production reasons:
1. **Zero External Dependencies:** `urllib` is built into the Python 3.12 standard library. This ensures the module can be deployed on any Odoo instance without running complex `pip install` commands that risk dependency collisions with Odoo's runtime.
2. **Deterministic Control:** We have direct control over network timeouts, HTTP retry logic, and latency measurement without third-party abstraction overhead."

### Question 5: "What are the most critical breaking changes in Odoo 18 compared to previous versions?"
**Bulletproof Answer:**
"Four major shifts:
1. **Kanban Architecture:** The replacement of `<t t-name="kanban-box">` with `<t t-name="card">` and modern CSS utility classes.
2. **Product Modeling:** The removal of `type='product'`, replaced with `type='consu'` combined with the boolean `is_storable=True`.
3. **ORM `_read_group`:** Queries return tuples rather than dictionaries and require the explicit `__count` aggregate field.
4. **Dynamic Visibility:** The transition from legacy `attrs="{'invisible': ...}"` to native Python expressions such as `invisible="..."` and `column_invisible="..."`."

## 3.2 Core Metrics & Figures to Memorize
- **14 ORM models** developed from scratch
- **55 files** in the module package structure
- **6,853 lines of code** (Python, XML, JavaScript, CSS)
- **138 backend tests** (100% pass rate)
- **46 LLM mock and resilience tests**
- **32 Playwright E2E tests**
- **15 documented bugs** analyzed and resolved
- **1.9 seconds** average response latency with Gemini 2.5 Flash
- **5 RBAC security roles** (Admin, Manager, Technician, Operator, Reader)
- **37 ACL rules** defined in `ir.model.access.csv`
- **4 automated background cron jobs**
- **7 print-ready QWeb PDF reports**

---

# PART IV: PRACTICAL TESTING GUIDE — EVERYTHING TO TRY IN THE SYSTEM

This guide outlines step-by-step procedures to test and demonstrate all major features in an active Odoo 18 instance.

---

## 4.1 Scenario 1: Multi-Tier Location Hierarchy & Asset Registry
1. **Navigate to:** **Equipment Maintenance** → **Configuration** → **Locations**.
2. **Create Site:** Click *New*, name it `Tunis Manufacturing Plant`, set Type to `Site`. Save.
3. **Create Building:** Create a new location `Building A - Machining`, set Parent to `Tunis Manufacturing Plant`, Type to `Building`.
4. **Create Bay:** Create `CNC Milling Line - Bay 04`, set Parent to `Building A - Machining`.
5. **Create Equipment Record:** Navigate to **Equipment** → **All Equipment** → *New*.
   - Name: `CNC Milling Machine Haas VF-2`.
   - Category: `Machining Tools`.
   - Location: `CNC Milling Line - Bay 04`.
   - Purchase Date: 2 years prior.
   - Purchase Value: `120,000 USD`.
   - Criticality: Set to `High`.
   - Save.
6. **Expected Outcome:** The asset is registered, an automated QR code is generated, and the initial Health Score is computed.

---

## 4.2 Scenario 2: Automated Preventive Maintenance Generation & Execution
1. **Navigate to:** **Maintenance** → **Configuration** → **Preventive Templates**.
2. **Create Template:** Click *New*.
   - Title: `30-Day Hydraulic Fluid & Seal Inspection`.
   - Target Equipment: `CNC Milling Machine Haas VF-2`.
   - Trigger Mode: `Time-Based (Days)`.
   - Interval: `30 days`.
   - Assigned Technician: Select a technician user.
   - Save.
3. **Trigger Scheduled Action:** Navigate to **Settings** → **Technical** → **Scheduled Actions** → locate `Recurring Preventive Maintenance Generator` → Click *Run Manually*.
4. **Expected Outcome:** A new work order is automatically generated in **Maintenance Orders** in *Draft* status, tagged as *Preventive* with pre-populated inspection checklists.

---

## 4.3 Scenario 3: Corrective Repair Order & SLA Tracking
1. **Submit Incident:** Log in as an Operator. Navigate to **Maintenance Orders** → *New*.
   - Equipment: `CNC Milling Machine Haas VF-2`.
   - Priority: `Urgent (3 stars)`.
   - Maintenance Type: `Corrective`.
   - Description: `Spindle overheating and abnormal vibration during high-speed cycle`.
   - Click *Submit*.
2. **Manager Approval:** Log in as Maintenance Manager.
   - Open the submitted order. Notice the automated SLA resolution target calculated from asset criticality.
   - Assign a technician and click *Approve*.
3. **Technician Execution:** Log in as Technician.
   - Open order, click *Start Work* (status updates to *In Progress*).
   - Check off safety checklist items: *Lockout/Tagout confirmed*, *Safety goggles worn*.
   - Log labor duration (e.g., 2.5 hours).
   - Click *Complete*.
4. **Expected Outcome:** The order transitions to *Done*, downtime duration is logged, and the machine's MTTR is recalculated.

---

## 4.4 Scenario 4: Real-Time Spare Parts Stock Deduction (`stock.quant`)
1. **Pre-check:** In the Inventory module, verify that a part named `Hydraulic Filter HF-200` exists with `type='consu'` and `is_storable=True`, having an on-hand quantity of 10 units in the main warehouse.
2. **Attach to Work Order:**
   - In an active maintenance order, navigate to the **Spare Parts** tab.
   - Add line: Product = `Hydraulic Filter HF-200`, Quantity = `2`.
   - Observe the green *In Stock* availability badge.
3. **Complete Order:** Click *Complete Order*.
4. **Verify Inventory:**
   - Return to **Inventory** → **Stock Moves** → locate `Hydraulic Filter HF-200`.
   - Verify that on-hand quantity decreased from 10 to 8 units.
   - Inspect the confirmed `stock.move` linked to the maintenance order reference.

---

## 4.5 Scenario 5: Dynamic Health Score Recalculation
1. **Initial State:** Open `CNC Milling Machine Haas VF-2` and record the current Health Score (e.g., 88/100).
2. **Simulate Outages:** Create and complete 3 consecutive urgent corrective orders with 48 hours of cumulative downtime over the last 7 days.
3. **Trigger Recalculation:** Click *Recalculate Health Score* on the asset form.
4. **Expected Outcome:**
   - The health gauge drops into the orange/red zone (e.g., 46/100).
   - Failure probability $P(\text{fail})$ increases to 54%.
   - The system displays a priority warning: *Immediate comprehensive overhaul recommended*.

---

## 4.6 Scenario 6: Mobile QR Code Field Access (`/equipment/QR`)
1. **Access Link:** From the asset form, copy the QR portal URL (e.g., `http://[SERVER_IP]:8069/equipment/QR?id=1`).
2. **Open in Mobile Browser:** Open on a smartphone or Chrome DevTools Device Mode.
3. **Expected Outcome:**
   - A streamlined, responsive mobile interface renders without heavy ERP headers.
   - Operational status, warranty state, and last service date are visible.
   - A quick-action button *Report Problem* allows floor operators to log an incident directly with photo uploads.

---

## 4.7 Scenario 7: Natural Language AI Assistant with Write Gating Safety
1. **Configuration:** In **Configuration** → **AI Settings**, ensure Google Gemini is active with a valid API key.
2. **Read Query:**
   - Open the Maintenance Assistant chat.
   - Type: *"Which asset caused the highest downtime this month?"*
   - Verify that the model responds in natural language with accurate PostgreSQL data.
3. **Write Gating Test:**
   - Type: *"Create an urgent corrective work order for Haas VF-2 due to hydraulic pressure loss"*.
   - **Verified Behavior:** The system does NOT write directly to the database. It displays a preview card with extracted parameters (Asset, Priority, Title).
   - The order remains pending until the user clicks *Confirm Action*.

---

## 4.8 Scenario 8: Role-Based Access Control (RBAC) & Technician Record Rules
1. **Technician Test:**
   - Log in as `technician1`.
   - Open **Maintenance Orders**.
   - Verify they can only view tickets assigned to them (or unassigned tickets).
   - Verify that administrative menus like **AI Configuration** are completely hidden.
2. **Manager Test:**
   - Log in as `manager1`.
   - Verify full visibility across all plant orders, cost reports, and technician assignments.

---

## 4.9 Scenario 9: Manual Execution of 4 Scheduled Background Cron Jobs
1. **Access:** Activate developer mode (`?debug=1`), go to **Settings** → **Technical** → **Automation** → **Scheduled Actions**.
2. **Run Each Cron:**
   - `Generate Recurring Preventive Orders`: Scans upcoming 7-day windows and instantiates work orders.
   - `Check Equipment Warranties`: Flags assets expiring within 30 days and posts chatter alerts.
   - `SLA Overdue Monitor`: Marks late orders with a red *Overdue* badge and notifies supervisors.
   - `Spare Parts Reorder Monitor`: Evaluates safety stock thresholds and raises replenishment alerts.

---

## 4.10 Scenario 10: Generating 7 High-Fidelity QWeb PDF Reports
1. **Technician Work Order:**
   - Open a maintenance order → Click *Print* → **Technician Job Card**.
   - Verify the formatted PDF output with signature blocks and required parts checklist.
2. **Asset Service History Sheet:**
   - Open an asset record → Click *Print* → **Lifecycle & Maintenance History Report**.
   - Verify complete service logs, lifetime spare parts costs, and availability metrics.

---

## 4.11 Scenario 11: Running the Complete Automated Test Suites via CLI
1. **Run Odoo Backend Tests:**
   ```bash
   odoo-bin -c /etc/odoo/odoo.conf -d odoo_test_db -i equipment_maintenance --test-enable --stop-after-init
   ```
   Verify that all **138 unit and integration tests** pass successfully (`OK`).

2. **Run LLM Simulation & Resilience Tests:**
   ```bash
   python3 -m unittest discover -s equipment_maintenance/tests -p "test_ai_*.py"
   ```
   Verify that all **46 mock tests** pass.

3. **Run Playwright End-to-End Tests:**
   ```bash
   npx playwright test --project=chromium
   ```
   Verify that all **32 browser scenarios** execute and pass without regressions.

---
*End of Internship Project Report & Presentation Guide.*
