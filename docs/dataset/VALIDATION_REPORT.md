PHARMACY STOCK-OUT PREDICTION & INVENTORY DECISION SUPPORT SYSTEM
DATASET VALIDATION REPORT
==============================================================================
Validation was executed on the CSV exactly as saved to disk (re-read with pandas).

1. DATASET SUMMARY
  File                      : pharmacy_stockout_dataset.csv
  Total rows                : 155,210
  Total columns             : 72
  Number of medicines       : 85  (11 categories)
  Number of suppliers       : 15
  Date range                : 2021-01-01 to 2025-12-31  (1826 days, 1826 daily records per medicine)
  Total quantity sold       : 5,067,888 units
  Total unmet demand        : 100,883 units (1.95% of demand)
  Total sales value         : INR 209,498,157.75
  Stock-out events          : 2,590  (1.67% of rows)
  Medicines with >=1 stock-out: 85; worst medicine rate = 6.8% of days
  Replenishment required    : 5,423 rows (3.49%)

2. STOCK-OUT RISK DISTRIBUTION (stockout_risk)
  LOW    :  117,175  (75.49%)
  MEDIUM :   27,168  (17.50%)
  HIGH   :   10,867  (7.00%)
  Rule: risk_score < 25.54 -> LOW ; 25.54 <= risk_score < 49.77 -> MEDIUM ; risk_score >= 49.77 -> HIGH
  Stock-out events by risk class: LOW=0, MEDIUM=0, HIGH=2590
  Class overlap (mean values): LOW: coverage=17.0d, avail=449; MEDIUM: coverage=8.3d, avail=191; HIGH: coverage=2.2d, avail=59
  Rows with available_stock < required_stock: 34.1%; of those HIGH=20.5%; of the rest HIGH=0.0%

3. MISSING VALUES / DUPLICATES
  Missing value count       : 0
  Duplicate record_id       : 0
  Duplicate medicine+date   : 0
  Fully duplicated rows     : 0

4. DATA-LEAKAGE CHECKS
  * lag_k_day(t)  = demand_quantity(t-k)            -> strictly earlier days only
  * rolling_*(t)  = mean/std of demand_quantity(t-1 ... t-w), window excludes day t
  * predicted_daily_demand(t) = blend of trailing 7/14/30-day means (ending day t) x weekday factor x seasonal factor x trend x noise,
    all estimated from data up to and including day t only (expanding history). It never sees day t+1 or later.
  * historical_stockout_frequency(t) = share of stock-out days in t-90 ... t-1
  * next_day_demand / forecast_7_day_demand are TARGETS (demand on t+1 / sum of t+1..t+7); never use them as features.
  * For the last 7 rows of each medicine the targets use hidden demand for 2026-01-01..07 (no rows exist for those dates).
  Causal truncation test: features rebuilt from data truncated at 40 random cut-off dates matched full-run values in every checked cell (mismatches: 0 of 40800 cells).
  Forecast is not a copy of the target: exact matches 106 rows; MAE(predicted_daily_demand vs next_day_demand)=8.72; corr=0.911

5. VALIDATION RESULTS (17 checks)
  [PASS]  1. Duplicate record IDs
          0 duplicates
  [PASS]  2. Duplicate medicine/date combinations
          0 duplicates
  [PASS]  3. Missing values
          0 missing cells across 72 columns
  [PASS]  4. Invalid dates / date coverage
          2021-01-01 to 2025-12-31; every medicine has 1826-1826 daily records (expected 1826)
  [PASS]  5. Invalid medicine IDs
          85 distinct medicine_ids, all present in medicines master
  [PASS]  6. Invalid supplier IDs
          15 distinct supplier_ids, all present in suppliers master
  [PASS]  7. Negative / inconsistent prices
          0 violations (also checks selling_price > unit_cost and unit_price == selling_price); total_sales == quantity_sold*unit_price: True
  [PASS]  8. Impossible quantities
          0 violations (negatives, sold > sellable stock, reserved > on-hand, etc.)
  [PASS]  9. Inventory calculation (closing = opening+purchase+return+adj-sold-damaged-expired; opening[t]=closing[t-1])
          0 accounting errors, 0 day-to-day continuity breaks
  [PASS] 10. Stock coverage (available_stock / predicted_daily_demand, capped at 365, no inf)
          0 errors; min predicted demand = 0.22
  [PASS] 11. Lead-time demand
          0 errors
  [PASS] 12. Required stock
          0 errors
  [PASS] 13. Replenishment quantity / flag (MOQ multiples, net of open orders)
          0 errors
  [PASS] 14. Risk labels (thresholds on risk_score, monotonic vs coverage, logical vs shortfall)
          0 label/score mismatches; P(HIGH | available<required)=0.205 vs P(HIGH | available>=required)=0.000; monotonic=True
  [PASS] 15. Future-data leakage
          lag mismatches=0; rolling mismatches=0; causal truncation test mismatches=0/40800 cells (40 random cut-off days, all 85 medicines); next_day_demand==next row demand_quantity mismatches=0; forecast_7_day_demand mismatches=0; predicted==actual rows=106 (0.07%); corr(pred,next_day)=0.911
  [PASS] 16. Extreme unrealistic outliers
          max daily demand / medicine mean = 10.6x; max demand / prior-30d mean = 10.5x; max coverage 196 days
  [PASS] 17. Medicine-supplier relationships & static master data consistency
          0 violations (supplier, lead time, MOQ, reliability, price, reorder level, safety stock constant per medicine)

  Overall: 17/17 checks passed

  Additional sanity checks:
   - [PASS] Purchases imply last_purchase_days_ago == 0
   - [PASS] Stock-out events have unmet_demand > 0 and available_stock small
   - [PASS] Stock-out rows: median available_stock=0, share with available_stock<=safety_stock=100.0%, share HIGH=100.0%
   - [PASS] Actual delivery days vary around supplier lead time
   - [PASS] Weekend uplift for paracetamol (reference-driven): weekend/weekday mean sales = 1.146

6. ML READINESS CHECK (informational, HistGradientBoosting, chronological 70/15/15 split by date)
  Split: train 2021-01-01..2024-07-01 (108630), val 2024-07-02..2025-04-01 (23290), test 2025-04-02..2025-12-31 (23290)
  Task 1 forecasting  (target next_day_demand), test MAE:
     GBM on the documented feature list  : 8.072
     naive lag_1_day baseline            : 10.984
     rolling_mean_7 baseline             : 8.552
     predicted_daily_demand (app baseline): 8.652
  Task 2 risk classification (target stockout_risk), test set: accuracy=0.895, macro-F1=0.802, per-class recall={'HIGH': 0.736, 'LOW': 0.966, 'MEDIUM': 0.654}
  (Not perfect by design: risk_score includes measurement noise plus factors not in the feature list, e.g. on_order_quantity.)

7. MONTHLY / YEARLY PATTERN CHECK (units sold)
  Winter/pollution peak & monsoon trough visible in respiratory/antipyretic categories:
   Antipyretics     : peak month= 1, trough month= 6, peak/trough ratio=2.19
   Respiratory      : peak month=12, trough month= 7, peak/trough ratio=2.32
   Antihistamines   : peak month= 5, trough month=12, peak/trough ratio=3.45
   Gastrointestinal : peak month= 6, trough month= 2, peak/trough ratio=1.48
   Cardiovascular   : peak month= 3, trough month= 2, peak/trough ratio=1.15

NOTES
  * All suppliers, manufacturers and stock records are synthetic. No patient / prescription information exists in the data.
  * quantity_sold is real sales (limited by stock). unmet_demand = requests that could not be served. demand_quantity = quantity_sold + unmet_demand
    is the demand series used for every lag / rolling feature and both targets, so stock-outs do not censor the forecasting problem.