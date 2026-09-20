# Presentation Alignment Prompt — Debate-Ready Defense of the Equipment Maintenance System (CMMS)
**Project:** Odoo 18.0 Community Equipment Maintenance Management System
**Author:** Youssef Benyouness — Host: IT-Koncept SA (Nyon, Switzerland / Tunis, Tunisia)
**Purpose:** Align the 18-slide interactive defense presentation with the most debated, attacked, and questioned instances a Master's evaluation jury will raise. Use this prompt to stress-test every slide against hostile questioning *before* the defense.
**Companion document:** [Presentation Strategic Evaluation Report] (slide-by-slide grades) · [FINAL_REPORT.md] (engineering evidence)

---

## 0. How to Use This Prompt

1. **Before the defense:** Walk every section below and force yourself to answer each "Likely Jury Attack" aloud in ≤ 90 seconds, without looking at notes.
2. **During rehearsal:** Have a colleague play the jury using only the "Attack Questions" lists. Any answer that takes > 90 seconds or contains "um, basically" marks a slide that needs rehearsal.
3. **Rule of the defense:** Every claim must land on one of three anchors — **on-disk evidence** (test logs, JSON results, videos), **live demo** (keypad-driven slides), or **code inspection** (file + line of logic you can open on demand). Never answer from memory alone when evidence exists.

**The three laws of this defense:**
- **Law 1 — Honesty is the strategy.** The report voluntarily downgrades its own "AI" features to "statistical heuristics." Saying *"this is not machine learning, and here is exactly why that is the correct engineering choice"* earns more jury trust than any buzzword.
- **Law 2 — The blocker is documented, not hidden.** Cerebras generation is BLOCKED by an external HTTP 402 quota error. Presenting a documented external blocker beats pretending it works. One blocked item, explicitly marked, surrounded by 216 passing tests.
- **Law 3 — Numbers are exact or not said.** It is **138** backend tests, not 159. Correct the number proactively on Slide 15 before anyone asks. Juries forgive corrections; they do not forgive discovered inflation.

---

## 1. The #1 Debated Instance: "Is this really AI / Machine Learning?"

**Slides concerned:** 8 (Health Score), 11 (AI Technical Classification), 4 (Objectives), 18 (Future Horizon)
**Severity:** HIGHEST — this is the single most likely deep-dive attack zone.

### The honest position (memorize this hierarchy)

| Layer | What it actually is | Proof |
|---|---|---|
| Health Score | Deterministic rule-based scoring | Component scoring formula, no training data involved |
| Failure Prediction | Statistical — 6-component **weighted risk score** | No scikit-learn / TensorFlow / PyTorch anywhere in the codebase |
| Smart Scheduling | Rule-based triggers (overdue / threshold) | Odoo cron + deterministic conditions |
| Cost Forecasting | Statistical — weighted moving average + seasonal factor | Formula-driven, fully explainable per output |
| Replacement Advisor | Statistical — deterministic scoring (lifespan, health, payback) | Scoring rubric, reproducible by hand |
| Depreciation | Statistical — straight-line computation | Accounting formula |
| NL Logger + Chat Assistant | **Genuine LLM** (Gemini verified live 6/6 on 2026-09-06) | `tests/live_api_results.json` — real API requests, latency ~1.9s avg |
| Intent Classification | LLM + keyword rules | Gemini live test: intent=status classified correctly |
| Anomaly Detection | **NOT IMPLEMENTED** — excluded per requirements | Stated openly in the report |

### Likely jury attacks & scripted defenses

**Attack 1.1:** *"You call these features 'AI Prediction' but they are just formulas. Isn't that misleading?"*
**Defense:** "The report labels them exactly as they are — Section 7 of the final report is titled 'AI Reality Check' and classifies every feature as Rule-Based, Statistical, or LLM. Weighted risk scoring over MTBF/MTTR, completion history, and downtime is the correct choice for a system with **no production history yet**: a trained model needs data volume we deliberately did not fake. The architecture is ML-ready — `equipment_ai_data.py` already extracts the feature vectors — so a future scikit-learn model drops into the same interface."

**Attack 1.2:** *"Why not use scikit-learn anyway? It's one pip install."*
**Defense:** "Two reasons. First, synthetic training data would produce a model that learns my demo data's noise — scientifically worthless and indefensible in this room. Second, Odoo Community deployments favor zero-extra-dependency stacks; the entire module runs on the standard library plus Odoo. The honest heuristic ships today; the honest ML model ships when real history accumulates. That is the roadmap stated on Slide 18."

**Attack 1.3:** *"Prove the LLM parts are real and not mocked."*
**Defense:** "Three levels of evidence. Level 1: six live Gemini tests executed 2026-09-06 against `gemini-2.5-flash` — authentication, generation, structured output, maintenance extraction, assistant query, intent classification — all passed, recorded in machine-readable `tests/live_api_results.json`. Level 2: 46 deterministic mock tests validate every failure path — 401, 403, 429, timeout, malformed JSON. Level 3: the E2E videos show the NL logger parsing a natural-language sentence into a structured maintenance order through the real UI."

**Attack 1.4:** *"Why was anomaly detection excluded?"*
**Defense:** "It was scoped out per the requirements agreement. Anomaly detection without a labeled failure dataset is guesswork; we preferred to ship five honest, testable statistical features over one pseudo-ML feature. It is listed as 'NOT IMPLEMENTED' in the report rather than silently dropped."

---

## 2. The #2 Debated Instance: LLM Safety — "Can the AI break my database?"

**Slides concerned:** 10 (AI Safety & Write Gating), 9 (BYO-LLM Architecture), 13 (RBAC)
**Severity:** HIGHEST — security questions are where juries test engineering maturity.

### The defense architecture (memorize the chain)

```
User input → NL logger / Chat assistant → provider.generate() / structured_output()
→ JSON schema validation → fixed tool-table routing (get_equipment, create_order, …)
→ ir.model.access + security group checks → [write ops] PREVIEW → explicit human
confirmation → execution → audit record in equipment.ai.prediction
```

### Likely jury attacks & scripted defenses

**Attack 2.1:** *"What stops the LLM from executing arbitrary SQL or Python?"*
**Defense:** "Nothing is 'stopped' — it is **architecturally impossible**. The model output never reaches `safe_eval`, the ORM, or the shell. Intent classification maps the reply to a **fixed, hard-coded tool table** — named functions with fixed signatures written by me. The LLM chooses *which* tool; it never constructs *how* the tool runs. There is no dynamic eval of model output and no domain construction from LLM text. Verified by code inspection and by tests."

**Attack 2.2:** *"What if the LLM hallucinates an order creation?"*
**Defense:** "Every write follows a three-gate path: Gate 1, structured output is schema-validated before anything happens; Gate 2, the tool implementation re-checks permissions via `ir.model.access` and security groups — the LLM inherits zero privileges of its own; Gate 3, the write is presented as a **preview with a Pending Action Token** and executes only on an explicit human click. The full-demo E2E spec asserts that an *unconfirmed* write creates zero records. Hallucination can produce a wrong preview; it cannot produce a write."

**Attack 2.3:** *"Where is the audit trail?"*
**Defense:** "Every assistant and NL interaction — including rejected and unconfirmed ones — is recorded in `equipment.ai.prediction`. The E2E suite verifies the audit trail end-to-end. An administrator can replay exactly what the AI proposed, what the human confirmed, and what was executed."

**Attack 2.4:** *"Why BYO-LLM with urllib instead of the official SDKs?"*
**Defense:** "Slide 9's core argument. Zero third-party dependencies means: no supply-chain surface, no SDK version drift inside Docker, ~50-line auditable HTTP clients I can read in one screen, and trivial deployment to air-gapped industrial sites. Both providers (Gemini REST, Cerebras OpenAI-compatible) are thin request/response shapers over `urllib`, handling 401/403/429/timeout/malformed-JSON identically. The 46 mock tests prove both code paths. When the jury asks 'what about reliability?' — the answer is the retry/backoff added after transient 429s during the first live run."

**Attack 2.5:** *"Where are the API keys?"*
**Defense:** "`password=True` fields, visible only to the manager security group, never printed, logged, committed, or embedded in any video, screenshot, trace, or report. Live tests sourced keys from `~/.zshrc` at runtime; the evidence JSON stores only SET/NOT-SET flags and results. No secret appears anywhere in the repository."

---

## 3. The #3 Debated Instance: The Cerebras 402 Blocker — "Your feature doesn't work"

**Slides concerned:** 11 (AI Classification), 15 (Testing), 18 (Future)
**Severity:** HIGH — if handled defensively, it damages credibility; if handled per Law 2, it demonstrates process maturity.

### Scripted handling (deliver proactively, don't wait to be asked)

"One integration is externally blocked and I will show you exactly why that is a property of the provider, not the code. On 2026-09-06, Cerebras authentication was verified live — a real HTTP request, 646 ms. Every generation call returned **HTTP 402 Payment Required: account quota exhausted**, returned by the Cerebras API itself. The provider code path is byte-for-byte identical in structure to Gemini's apart from request/response shaping, and is covered by the same 46 mock tests. Gemini — the same interface, the same tool table — passed 6/6 live. So: interface proven, one provider proven live, second provider blocked by quota, fix is 'top up the account' and re-run `tests/test_llm_live_api.py`."

### Likely jury attacks

**Attack 3.1:** *"So you can't demonstrate multi-provider?"*
**Defense:** "I can demonstrate the **provider abstraction** — the factory switches Gemini/Cerebras by configuration. Live verification of provider #2 is a billing operation away, and the recommendation is in Section 18 of the report next to adding OpenAI/Anthropic/Ollama behind the same interface."

**Attack 3.2:** *"Why include a provider you couldn't fully test?"*
**Defense:** "Because BYO-LLM is a stated requirement, and a two-provider abstraction with one fully live-verified and one mock-covered is stronger evidence of a working abstraction than a single hard-coded provider. The blocked marker is a deliberate honesty artifact — this report marks what is blocked instead of inflating what passes."

---

## 4. The #4 Debated Instance: Test Numbers & Verification Integrity

**Slides concerned:** 15 (QA & Testing), 16 (Bug Post-Mortem)
**Severity:** HIGH — number questions are cheap to ask and costly to fumble.

### The canonical numbers (say these exactly)

| Suite | Result | Evidence on disk |
|---|---|---|
| Backend (Odoo 18 Community, Docker, fresh DB) | **138 passed / 0 failed / 0 errors**, exit code 0 | `equipment_maintenance/.bt_final.log` |
| LLM provider mock tests (unittest) | **46 passed / 0 failed** | `tests/test_llm_providers.py` |
| Gemini live API tests (2026-09-06) | **6 passed / 0 failed** | `tests/live_api_results.json` |
| Cerebras live | **auth passed / generation BLOCKED (HTTP 402)** | same JSON |
| Playwright E2E | **32 passed / 0 failed / 0 skipped**, 16 spec files | `artifacts/playwright-report/index.html` |
| Full demo scenario | **PASS**, 1.1 min, 20 steps, every step asserts real outcomes | `artifacts/videos/full-system-demo.webm` |
| Demo videos | 2 recorded (2.9 MB full system, 1.3 MB AI/LLM) | `artifacts/videos/` |

### Likely jury attacks

**Attack 4.1:** *"Earlier you said 159 tests. Which is it?"*
**Defense (proactive, on Slide 15):** "An earlier interim report claimed 159. The final report corrects this: the test module contains exactly **138 test methods**, and the final verified run executes exactly 138 with exit code 0. I state the verified number and the log is on disk. You do not need to trust me — you can grep the log."

**Attack 4.2:** *"Why do you need E2E if you have 138 backend tests?"*
**Defense:** "Because the backend suite is green while the UI is broken — that is precisely what happened. The E2E campaign surfaced **10 real product bugs the backend suite could not catch**: dialog actions closing before showing results (Odoo treats truthy returns as 'close dialog'), an Enterprise-only `gantt` view_mode 500-ing the whole action, record rules with implicit `perm_read=True` silently filtering admin reads, `_read_group` tuple-returns breaking computed fields on Odoo 18. Each fix has a regression test. E2E is not decoration; it is how this module became shippable."

**Attack 4.3:** *"Are 32 E2E tests enough for production?"*
**Defense:** "They are scenario-complete, not path-complete: 16 spec files covering login, dashboard, equipment CRUD, QR, orders, templates, spare parts, multi-site, AI config, NL logger, chat assistant, analytics, calendar, PDF, and the two demo scenarios. Every test asserts actual outcomes — RPC responses, records existing in the database, rendered data — not screenshot comparisons. The known residual risks are documented in Section 16."

---

## 5. The #5 Debated Instance: Odoo 18 Community vs Enterprise

**Slides concerned:** 3 (Problem — zero license cost), 12 (Odoo 18 Migration Refactoring), 16 (Bug #4)
**Severity:** MEDIUM-HIGH — a jury member who knows Odoo will probe this.

### Likely jury attacks & scripted defenses

**Attack 5.1:** *"Why Community and not Enterprise? Enterprise has gantt, IoT hooks, better UI."*
**Defense:** "Three reasons. **Cost:** the entire value proposition on Slide 3 is zero license cost against $260k/hr downtime — Enterprise licensing would change the business case. **Target market:** IT-Koncept SA's industrial clients in North Africa and Swiss SMEs need deployable, ownable systems, not per-user subscriptions. **Technical:** everything in scope was achievable on Community — the one gap, the Gantt view, was detected, root-caused (`web_gantt` is Enterprise-only; its presence in `view_mode` 500'd the entire `load_views` RPC), and replaced with a planning/list adaptation. That bug is Post-Mortem #4 — an Enterprise dependency discovered and engineered around, not purchased away."

**Attack 5.2:** *"What else did Odoo 18 break?"*
**Defense (Slide 12 material):** "Four migration landmines, all root-caused: (1) `_read_group` on Odoo 18 returns tuples and requires an aggregate method per field — order counts, the AI service, and PDF reports crashed; fixed with a version-safe `read_group_counts()` helper in `odoo_compat.py` and 6 migrated call sites. (2) `product.template.type='product'` is no longer valid — demo data switched to `consu` + `is_storable=True`. (3) Kanban `<t t-name="card">` syntax changes. (4) The Enterprise gantt issue above. The compat layer means Odoo 17 support is designed-in, and an Odoo 19 CI matrix is a recommendation."

**Attack 5.3:** *"Is this module maintainable by someone other than you?"*
**Defense:** "14 models with single responsibilities, a provider abstraction with a factory, a centralized compatibility layer isolating version quirks, 45 ACL entries with 5 documented security groups, and a test suite that encodes the behavior. Section 17 lists honest technical debt — urllib instead of requests/httpx, Odoo-18-specific E2E selectors — so the next maintainer inherits a map, not a mystery."

---

## 6. The #6 Debated Instance: The Health Score — "Is the math sound?"

**Slides concerned:** 8 (live calculator), 4, 11
**Severity:** MEDIUM-HIGH — you will be asked to derive it on the spot; the slide has live sliders for exactly this reason.

### The formula (derive it live, don't recite it)

$$	ext{Health} = 0.20 	imes 	ext{Age} + 0.25 	imes 	ext{Frequency} + 0.20 	imes 	ext{Downtime} + 0.25 	imes 	ext{Adherence} + 0.10 	imes 	ext{Warranty}$$

**Talking points:**
- **Weights sum to 1.0** — say this aloud; it proves normalization.
- **Frequency (0.25) and Adherence (0.25) are the heaviest** because maintenance discipline dominates industrial failure modes; Age (0.20) and Downtime (0.20) capture wear and history; Warranty (0.10) is the smallest because it is a binary/legal signal, not a condition signal.
- **Every weight is defensible and adjustable** — the jury should attack the weights themselves, not the opacity: each input is observable, each weight is a business decision, and the engine exposes `0.58` critical-probability output for a critical preset.
- **Zero black-box:** press preset key `3` (Critical Hazard, $P(	ext{fail}) = 0.58$) live and walk the jury through which slider moved the score — this is the anti-"AI opacity" moment.

**Attack 6.1:** *"Where do these weights come from?"*
**Defense:** "They are expert-weighted starting values, documented as such, tuned against the demo dataset's MTBF/MTTR behavior. They are configuration, not training — which is precisely the point of Slide 11's honesty card. In production, these become calibrated against real failure history, and `equipment_ai_data.py` already extracts the vectors for that calibration."

**Attack 6.2:** *"What about equipment with no history?"*
**Defense:** "Guarded. MTBF/MTTR zero-division on new equipment was Bug #2 — fixed with zero-division guards and sensible defaults; missing completion dates fall back through a computation chain (Bug #3). The engine degrades gracefully to age-and-warranty scoring when history is absent."

---

## 7. The #7 Debated Instance: Security & the Record-Rule Bug

**Slides concerned:** 13 (RBAC & Record Rules), 10, 16 (Bug #6)
**Severity:** MEDIUM — admitting your own bug here is a strength.

### Scripted narrative

"Five security groups — Admin, Manager, Technician, Operator, Viewer — with 45 ACL entries and record rules per model. And I want to show you a bug I found *because* of E2E, because it demonstrates the security model is actually tested rather than assumed. Three 'write-own' record rules omitted the `perm_read` flag; Odoo defaults omitted flags to `True`, so the rules silently filtered **reads** — an admin could not see technicians' spare-part consumption lines. The rules were *designed* as write/unlink-only. One attribute — `perm_read='0'` — fixed it, and the E2E spare-parts spec plus RPC probes now guard it. Lesson: Odoo's rule engine defaults are a trap, and only an end-to-end read probe caught it."

**Attack 7.1:** *"Could the LLM escalate privileges through the tools?"*
**Defense:** "Tools execute inside the Odoo request context of the logged-in user. The LLM proposes; the user's own permissions dispose. A Viewer-group user chatting with the assistant cannot create an order — the tool's `ir.model.access` check denies it, the same as if they clicked the button."

---

## 8. The #8 Debated Instance: Scope & Business Value

**Slides concerned:** 1–4, 17, 18
**Severity:** MEDIUM — opening/closing attacks.

**Attack 8.1:** *"There are open-source CMMS tools already. Why build on Odoo?"*
**Defense:** "Because maintenance does not live in a vacuum — it lives next to procurement, inventory, accounting, and HR. Building on Odoo means spare-part consumption is already `stock.quant`, purchase orders are native, and the client owns one system, not five integrations. The module adds 14 purpose-built models on top of that backbone. A standalone CMMS would have rebuilt what Odoo already proves at enterprise scale."

**Attack 8.2:** *"What is actually deployed/used?"*
**Defense:** "The deliverable is a verified engineering artifact: 138-test green suite, 32 E2E browser tests, 2 demo videos, 7 QWeb PDF report templates, a mobile QR portal at `/equipment/QR`, and a full 20-step demo scenario passing in 1.1 minutes. Production hardening items are listed openly in Section 16 — empty-database dashboard edge cases, Odoo 17 explicit testing, Cerebras quota. The Production Readiness score in the final assessment is 8/10 with those items named, not hidden."

**Attack 8.3:** *"What would you do with 3 more months?"*
**Defense (Slide 18 roadmap):** "In order: (1) real ML failure prediction once production history accumulates — the feature pipeline already exists; (2) IoT ingestion via MQTT/OPC-UA to feed it; (3) clear the Cerebras 402 and add OpenAI/Anthropic/Ollama behind the provider factory; (4) Odoo 19 CI matrix; (5) defensive empty-state views. Each item extends existing seams rather than opening new risk."

---

## 9. The #9 Debated Instance: Process Maturity — Bug Post-Mortems as Evidence

**Slides concerned:** 16 (15 bugs), 15
**Severity:** MEDIUM — distinguishes a senior engineer from a student.

**The meta-story:** "Fifteen documented problems, each with root cause, fix, and a regression test. The two I would highlight: **Bug #4** — the Gantt action 500 — because it shows requirements-level engineering around an Enterprise lock-in; and **Bug #11** — nine E2E specs silently passing wrong domains because JavaScript's comma operator evaluates `('f','=',x)` to just `x` — because it shows test code itself is code, with its own failure modes, and green tests were re-audited rather than trusted."

**Attack 9.1:** *"15 bugs means the code was buggy."*
**Defense:** "Fifteen *found* bugs means the verification system worked. Every one was caught by a layer designed to catch it — the backend suite, then mocks, then live APIs, then E2E, then the demo scenario — and every fix carries a regression test, which is why the final runs are 138/0, 46/0, 32/0. The number to judge is not 15; it is 0."

**Attack 9.2 (environment/infrastructure):** *"Several of these are WSL/Docker issues, not product issues."*
**Defense:** "Correct — items 13–15 are environment hardening: WSL idle teardowns killing the stack mid-run, an anonymous Docker volume wiping the database on `down`, a `pkill -f odoo.bin` self-matching its own session, Playwright version quirks. They are documented because reproducible infrastructure is part of the deliverable — `scripts/e2e-run.sh` now does named volumes, `--force-recreate`, consecutive-poll readiness, and bracketed pkill."

---

## 10. Slide-Level Alignment Checklist (cross-reference to Strategic Evaluation Report)

For each slide, the debated instances it must absorb and the hotkey move that answers it live:

| Slide | Debated instances covered | Live/keypad answer |
|---|---|---|
| 1 — Title | Identity, deliverables credibility | State 14 ORM models / 100% Odoo 18 Community in 24pt+ bold |
| 2 — IT-Koncept SA | "Why this host matters" | Pivot: 8+ years Odoo partner experience = technical driver |
| 3 — Problem | Community vs Enterprise, business case | Contrast $260k/hr downtime vs zero license cost |
| 4 — Objectives | Scope discipline (anomaly detection) | Checkmark badges; state exclusion proactively |
| 5 — 4-Tier Architecture | Framework choice | Keys `1`–`4`/`Space` step tiers hands-free |
| 6 — ORM Entities | Data model depth | Keys `8`/`2` step `equipment.equipment` → `equipment.spare.part.line` |
| 7 — State Machine | Workflow integrity | Key `4` = Phase 4 `stock.move._action_done()` deduction |
| 8 — Health Score | Math soundness, "AI?" | Key `3` Critical preset, derive formula aloud, show 0.58 |
| 9 — BYO-LLM | urllib vs SDKs, deployment | Emphasize zero-dependency Docker story |
| 10 — AI Safety | Arbitrary code, hallucinated writes | Keys `1`→`2`→`3`: Threat → 3-Tier Solution → Matrix |
| 11 — AI Classification | Honesty, Cerebras 402 | State Gemini live 6/6, Cerebras blocked-by-quota verbatim |
| 12 — Odoo 18 Migration | Version expertise | `is_storable`, `read_group` tuples, kanban card syntax |
| 13 — RBAC | Security, record-rule bug | Narrate Bug #6 (`perm_read='0'`) as tested security |
| 14 — Crons | Autonomy | 00:00 UTC preventive generation, low-stock reorder |
| 15 — QA | Numbers integrity | Say **138** proactively; 46 mock; 32 E2E; 402 story |
| 16 — Bug Post-Mortem | Process maturity | Highlight #4 and #11; "0 remaining" is the metric |
| 17 — Deliverables | Tangible value | QWeb PDF samples, `/equipment/QR` mobile portal |
| 18 — Conclusion | Future vision | Roadmap ordered; press `Q` for live Defense Q&A modal |

---

## 11. Debate Rehearsal Script (60-minute format)

1. **(10 min)** Full run-through with keypad only — no mouse. If a slide requires the mouse, mark it.
2. **(20 min)** Hostile round: jury plays only from Sections 1–9 attacks. Score each answer: evidence-anchored / memory-only / rambled.
3. **(10 min)** Numbers drill: recite the evidence table from Section 4 from memory, then verify against this document.
4. **(10 min)** Live-demo fallback plan: if localhost fails mid-defense, each interactive slide has a static fallback — confirm screenshots exist for Slides 5–10 states.
5. **(10 min)** Timing calibration: 18 slides, target 15–18 min of speech + demo moments. Slides 8, 10, 15 are the demo peaks; Slides 2, 14 are compressible.

---

*Prepared 2026-09-20. Aligns the interactive 3-Act defense (Slides 1–18) with the FINAL_REPORT evidence base and the Strategic Evaluation grading matrix.*
