import { ValidationCheckItem } from '@/types';

export const mockValidationChecks: ValidationCheckItem[] = [
  {
    "id": "CHK-01",
    "name": "Total Record Count",
    "description": "Verify exact 155,210 rows across 5 years",
    "expected": "155,210 rows",
    "actual": "155,210 rows",
    "status": "PASSED"
  },
  {
    "id": "CHK-02",
    "name": "Missing Values Check",
    "description": "Zero null/missing cells across all 72 columns",
    "expected": "0 missing values",
    "actual": "0 missing values",
    "status": "PASSED"
  },
  {
    "id": "CHK-03",
    "name": "Unique Medicine-Date Tuples",
    "description": "Ensure no duplicate records for same medicine and date",
    "expected": "155,210 unique pairs",
    "actual": "155,210 unique pairs",
    "status": "PASSED"
  },
  {
    "id": "CHK-04",
    "name": "Medicine Catalogue Count",
    "description": "85 unique medicine IDs across 11 categories",
    "expected": "85 medicines",
    "actual": "85 medicines",
    "status": "PASSED"
  },
  {
    "id": "CHK-05",
    "name": "Supplier Master Count",
    "description": "15 active wholesale distribution suppliers",
    "expected": "15 suppliers",
    "actual": "15 suppliers",
    "status": "PASSED"
  },
  {
    "id": "CHK-06",
    "name": "Contiguous Daily Index",
    "description": "Exactly 1,826 calendar days per medicine (2021-2025)",
    "expected": "1,826 days each",
    "actual": "1,826 days each",
    "status": "PASSED"
  },
  {
    "id": "CHK-07",
    "name": "Non-negative Demand",
    "description": "Verify quantity_sold >= 0 and unmet_demand >= 0",
    "expected": ">= 0 for all rows",
    "actual": ">= 0 (min: 0)",
    "status": "PASSED"
  },
  {
    "id": "CHK-08",
    "name": "Total Quantity Sold Sum",
    "description": "Aggregated sales over 5-year observation period",
    "expected": "5,067,888 units",
    "actual": "5,067,888 units",
    "status": "PASSED"
  },
  {
    "id": "CHK-09",
    "name": "Total Unmet Demand Sum",
    "description": "Aggregated unfulfilled customer requests",
    "expected": "100,883 units",
    "actual": "100,883 units",
    "status": "PASSED"
  },
  {
    "id": "CHK-10",
    "name": "Stockout Instances Count",
    "description": "Days where closing inventory reached zero",
    "expected": "2,590 occurrences",
    "actual": "2,590 occurrences",
    "status": "PASSED"
  },
  {
    "id": "CHK-11",
    "name": "Inventory Balance Equation",
    "description": "closing_stock == opening_stock + receipts - sales",
    "expected": "100% consistent",
    "actual": "100% consistent (0 variances)",
    "status": "PASSED"
  },
  {
    "id": "CHK-12",
    "name": "Stock Coverage Formula",
    "description": "closing_stock / daily_demand consistency check",
    "expected": "Exact match",
    "actual": "Exact match",
    "status": "PASSED"
  },
  {
    "id": "CHK-13",
    "name": "Replenishment Formula Verification",
    "description": "MOQ and lead time demand alignment",
    "expected": "Consistent logic",
    "actual": "Consistent logic",
    "status": "PASSED"
  },
  {
    "id": "CHK-14",
    "name": "Target Leakage Verification",
    "description": "Features do not reference future timestamps",
    "expected": "0 leakage indicators",
    "actual": "0 leakage indicators",
    "status": "PASSED"
  },
  {
    "id": "CHK-15",
    "name": "Pricing Non-negativity",
    "description": "unit_cost > 0 and selling_price > unit_cost",
    "expected": "All margins positive",
    "actual": "All margins positive",
    "status": "PASSED"
  },
  {
    "id": "CHK-16",
    "name": "Risk Classification Thresholds",
    "description": "LOW/MEDIUM/HIGH criteria consistent with lead times",
    "expected": "0 mismatches",
    "actual": "0 mismatches",
    "status": "PASSED"
  },
  {
    "id": "CHK-17",
    "name": "Lead Time Consistency",
    "description": "Lead time per supplier strictly within 2 to 14 days",
    "expected": "2 to 14 days",
    "actual": "2 to 14 days",
    "status": "PASSED"
  }
];
