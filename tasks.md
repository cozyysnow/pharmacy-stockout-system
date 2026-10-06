# PharmaStock IQ — Implementation Tasks & Progress Tracker

> **Source of Truth:** [req.md](file:///c:/Users/kc/Downloads/live/req.md)  
> **Status:** In Progress — Phase 1 (UI Foundation)  
> **Approach:** Strict Phase-by-Phase Execution with Human-in-the-Loop Verification

---

## Phase Overview & Progress Summary

| Phase | Description | Status | Target Delivery |
|---|---|:---:|---|
| **Phase 1** | UI Foundation & Design System (`frontend/`, design tokens, AppShell, components, `/_styleguide`) | 🟢 COMPLETED | Phase 1 |
| **Phase 2** | Complete UI Screens with Realistic Mocks (13 pages, charts, tables, filters, contract export) | 🟡 IN PROGRESS | Phase 2 |
| **Phase 3** | Backend Foundation (FastAPI, Alembic, Auth JWT, RBAC, Core DB session, seed admin) | ⚪ PENDING | Phase 3 |
| **Phase 4** | Database & Core Business Logic (CRUD for medicines, suppliers, inventory, transactions ledger) | ⚪ PENDING | Phase 4 |
| **Phase 5** | Dataset Integration & Validation Pipeline (155,210 rows, 17 validation checks, idempotent import) | ⚪ PENDING | Phase 5 |
| **Phase 6** | Demand Forecasting ML Pipeline (Baselines, GBM, multi-step horizons h=1,7,14,30, leakage tests) | ⚪ PENDING | Phase 6 |
| **Phase 7** | Stock-Out Risk & Decision Support Engine (Coverage, LTD, required stock, explainability chain) | ⚪ PENDING | Phase 7 |
| **Phase 8** | Alerts & Human Replenishment Workflow (Dedup alerts, PENDING/ACCEPTED/ORDER_PLACED workflow) | ⚪ PENDING | Phase 8 |
| **Phase 9** | Full Frontend/Backend Integration (Wired to live APIs, `VITE_USE_MOCKS=false`, real telemetry) | ⚪ PENDING | Phase 9 |
| **Phase 10** | Testing, Hardening & Final Polish (Unit/integration suites, edge-cases, README, demo script) | ⚪ PENDING | Phase 10 |

---

## Detailed Task Breakdown

### Phase 1 — UI Foundation (COMPLETED)
- [x] **1.1 Frontend Scaffolding**
  - [x] Initialize Vite + React 18 + TypeScript (strict mode) in `frontend/`
  - [x] Configure Tailwind CSS with medical/clinical color palette (Teal `#0F766E`, Slate, Light Gray `#F5F7F8`, Risk badges: Low/Medium/High)
  - [x] Setup Lucide icons, `clsx`, `tailwind-merge`
- [x] **1.2 App Shell & Navigation**
  - [x] Implement `AppShell` with responsive sidebar (collapsible, active routes, role badges)
  - [x] Implement top `Header` ("Data as of: <as_of_date>" badge, global search bar, alerts bell counter, user profile menu)
  - [x] Implement `PageHeader` with title, subtitle, breadcrumbs, action slots
  - [x] Configure React Router for all 13 application routes with clean placeholder views:
    - `/` (Dashboard)
    - `/inventory` (Inventory List)
    - `/medicines` (Medicines & Suppliers)
    - `/medicines/:id` (Medicine Details & Explainability)
    - `/transactions` (Transactions Ledger)
    - `/forecast` (Demand Forecast & Model Comparison)
    - `/risk` (Stock-out Risk Analysis)
    - `/replenishment` (Replenishment Recommendations)
    - `/alerts` (Alerts Center)
    - `/datasets` (Dataset Management & Validation)
    - `/reports` (Reports & Analytics)
    - `/settings` (Settings & Configuration)
    - `/login` (Login Screen)
- [x] **1.3 Reusable Component Library**
  - [x] `components/ui/Button` (primary, secondary, ghost, destructive, outline, loading state)
  - [x] `components/ui/Card` (Header, Content, Footer, Stat/KPI variant)
  - [x] `components/ui/Badge` (RiskBadge: LOW, MEDIUM, HIGH; StockStatusBadge: IN_STOCK, LOW_STOCK, OUT_OF_STOCK)
  - [x] `components/ui/Input`, `Select`, `Textarea` with label, helper, and error states
  - [x] `components/ui/Modal` and `Drawer` with backdrop and accessibility focus
  - [x] `components/ui/Table` (styled, zebra-striping, hover states, right-aligned numerics)
  - [x] `components/ui/Tabs`, `Tooltip`, `Pagination`
  - [x] `components/feedback/SkeletonLoader`, `EmptyState`, `ErrorState`, `LoadingState`
  - [x] Toast notification provider / hook
- [x] **1.4 Styleguide Showcase**
  - [x] Create `/_styleguide` developer route showcasing all UI components, buttons, inputs, badges, cards, modals, empty states, and responsive breakpoints
- [x] **1.5 Phase 1 Exit Verification**
  - [x] Verify `npm run dev` and `npm run build` without TypeScript or lint errors
  - [x] Validate responsive behavior at 1440px, 1024px, 768px, and 390px widths
  - [x] Human review of visual design and component ergonomics

---

### Phase 2 — Complete UI Screens (Mock Data)
- [x] **2.1 API Service Layer & Mock Framework**
  - [x] Create `src/types/` matching backend schemas in Section 22/23
  - [x] Build `src/api/` client and mock handlers gated by `VITE_USE_MOCKS=true`
  - [x] Realistic mock fixtures in `frontend/src/mocks/` (85 medicines, 15 suppliers, 11 categories)
- [ ] **2.2 Screen Implementations**
  - [ ] `/login` (Authentication with demo user switcher)
  - [ ] `/` (Dashboard with 6 KPI cards, risk donut, coverage distribution bar chart, 90-day demand trend chart, top 10 risk table)
  - [ ] `/inventory` (Inventory table with safety stock, reorder levels, coverage bars, CSV export)
  - [ ] `/medicines` & `/medicines/:id` (Details, demand history chart, explainability breakdown)
  - [ ] `/transactions` (Ledger table, New Transaction modal with stock preview)
  - [ ] `/forecast` (Medicine picker, multi-horizon forecasts, model comparison table)
  - [ ] `/risk` (Risk ranking table, score progress bar, explainability drawer)
  - [ ] `/replenishment` (Pending/Accepted/Ordered tabs, manual order placement modal)
  - [ ] `/alerts` (Alert list with filters, bulk acknowledge, header bell badge)
  - [ ] `/datasets` (7-step stepper: Source -> Preview -> Schema -> Validation -> Mapping -> Preprocess -> Import)
  - [ ] `/reports` (Report generator with CSV export)
  - [ ] `/settings` (Threshold configurations, user manager table)
- [ ] **2.3 Export API Contract**
  - [ ] Generate `docs/api-contract.md` listing endpoints, methods, request payloads, and TypeScript response models
- [ ] **2.4 Phase 2 Exit Verification**
  - [ ] All 13 routes navigate smoothly with full loading/empty/error states

---

### Phase 3 — Backend Foundation
- [ ] **3.1 Backend Scaffold & Configuration**
  - [ ] Python project structure under `backend/` with `requirements.txt`
  - [ ] Pydantic Settings configuration (`.env` loading)
  - [ ] Structured logging & global exception handler
- [ ] **3.2 Database Engine & Migrations**
  - [ ] SQLAlchemy 2.0 engine + async/psycopg setup
  - [ ] Alembic setup with initial migration schema
- [ ] **3.3 Authentication & RBAC**
  - [ ] Password hashing (bcrypt / argon2) and JWT token generator
  - [ ] Endpoints: `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `GET /api/v1/auth/me`
  - [ ] Role-based dependencies (`require_role` for Admin, Manager, Staff)
  - [ ] CLI seed script `python scripts/seed_admin.py`
- [ ] **3.4 Phase 3 Exit Verification**
  - [ ] Uvicorn server launches, `/docs` Swagger loads, pytest tests pass for auth and RBAC

---

### Phase 4 — Database & Core Application
- [ ] **4.1 Domain Models & Migrations**
  - [ ] Categories, Suppliers, Medicines, InventoryCurrent, Transactions tables
  - [ ] Check constraints (`current_stock >= 0`, `open_order_qty >= 0`)
- [ ] **4.2 Inventory Ledger Services**
  - [ ] Transaction processing with atomic row locking (`SELECT ... FOR UPDATE`)
  - [ ] Stock effects for SALE, PURCHASE, RETURNS, ADJUSTMENT, DAMAGED, EXPIRED
  - [ ] Open order quantity reduction on PURCHASE
- [ ] **4.3 CRUD APIs**
  - [ ] Endpoints for medicines, suppliers, inventory, transactions
- [ ] **4.4 Phase 4 Exit Verification**
  - [ ] Unit tests verifying stock ledger calculations, negative stock rejection, transaction rollback

---

### Phase 5 — Dataset Integration & Pipeline
- [ ] **5.1 Dataset Preprocessing & Ingestion**
  - [ ] Dataset storage under `data/raw/pharmacy_stockout_dataset.csv`
  - [ ] Column classification document `docs/dataset/COLUMN_CLASSIFICATION.md`
  - [ ] Schema verifier (72 columns) & 17 runtime checks from validation report
  - [ ] High-performance bulk importer into PostgreSQL (`daily_records`, `inventory_current`)
  - [ ] Verification of baseline figures: 155,210 rows, 5,067,888 sold, 100,883 unmet, 2,590 stockouts
- [ ] **5.2 Phase 5 Exit Verification**
  - [ ] Idempotent import test; dataset statistics endpoint matches documented figures

---

### Phase 6 — Machine Learning Demand Forecasting
- [ ] **6.1 Preprocessing & Feature Engineering**
  - [ ] `backend/app/ml/` module
  - [ ] Leakage-free lag features (1, 2, 3, 7, 14, 21, 28) and rolling stats (`shift(1)`)
  - [ ] Calendar features (day of week, month, quarter, weekend)
- [ ] **6.2 Chronological Split & Baselines**
  - [ ] Train (2021-2023), Validation (2024), Test (2025)
  - [ ] Baselines: Naive lag-1, seasonal lag-7, rolling means
- [ ] **6.3 ML Model Evaluation & Selection**
  - [ ] Linear Regression, Random Forest, Gradient Boosting (`HistGradientBoostingRegressor`)
  - [ ] Horizons: h = 1, 7, 14, 30 days
  - [ ] Metrics: MAE, RMSE, MAPE (non-zero), WAPE
  - [ ] Leakage validation test suite
  - [ ] Model artifact persistence (`ml_artifacts/`) and database registry (`ml_runs`, `forecasts`)
- [ ] **6.4 Phase 6 Exit Verification**
  - [ ] Reproducibility check: GBM test MAE ~ 8.072 vs baseline lag-1 ~ 10.984; CLI train script runs cleanly

---

### Phase 7 — Stock-Out Risk & Decision Support
- [ ] **7.1 Calculation Chain**
  - [ ] Expected daily demand & Stock coverage days (`current_stock / expected_daily_demand`)
  - [ ] Lead-time demand (`LTD = sum(predicted_demand_1..L)`)
  - [ ] Safety stock (`SS = dataset value` or `z * sigma * sqrt(L)`)
  - [ ] Required stock (`LTD + SS`) and shortfall (`max(0, required_stock - inventory_position)`)
  - [ ] Stock-out risk classification (LOW / MEDIUM / HIGH based on validated thresholds)
  - [ ] Risk explanation template generator
- [ ] **7.2 Risk Service & APIs**
  - [ ] `POST /api/v1/risk/run` and `GET /api/v1/risk`
  - [ ] Cross-check tool validating against dataset risk labels
- [ ] **7.3 Phase 7 Exit Verification**
  - [ ] Hand-calculated test cases match calculations; edge cases (0 stock, 0 demand) verified

---

### Phase 8 — Alerts & Replenishment Recommendations
- [ ] **8.1 Alert Engine**
  - [ ] 5 Alert types: HIGH_RISK, LOW_STOCK, REPLENISHMENT_REQUIRED, DEMAND_SPIKE, FORECAST_DEVIATION
  - [ ] De-duplication keying and auto-resolve logic
- [ ] **8.2 Replenishment Decision Support**
  - [ ] Recommendation formula: `qty = max(raw_need, MOQ)`, rounded to MOQ multiples
  - [ ] Workflow state machine: `PENDING -> ACCEPTED / DISMISSED -> ORDER_PLACED (manual)`
  - [ ] Confirm zero external vendor calls; manual order placement updates `open_order_qty`
- [ ] **8.3 Phase 8 Exit Verification**
  - [ ] Alert generation unit tests; workflow transitions verified

---

### Phase 9 — Frontend & Backend Integration
- [ ] **9.1 Wire Live APIs**
  - [ ] Switch `VITE_USE_MOCKS=false`
  - [ ] Connect TanStack Query to FastAPI endpoints
  - [ ] Verify Dashboard, Inventory, Medicines, Transactions, Forecasts, Risk, Replenishment, Alerts
- [ ] **9.2 Phase 9 Exit Verification**
  - [ ] Zero mock imports in production paths; real numbers reflected from PostgreSQL

---

### Phase 10 — Testing, Hardening & Documentation
- [ ] **10.1 Full Regression Suite**
  - [ ] Pytest suite (>80% coverage on core logic)
  - [ ] Frontend unit & integration tests
- [ ] **10.2 Edge Case & Security Validation**
  - [ ] Concurrency locking, negative stock attempts, token expiry
- [ ] **10.3 Documentation & Demo**
  - [ ] Top-level `README.md` with step-by-step setup (no Docker)
  - [ ] Postman collection JSON committed
  - [ ] Demo run-through script for presentation
