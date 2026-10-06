export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
export type TransactionType = 'SALE' | 'PURCHASE' | 'RETURNS' | 'ADJUSTMENT' | 'DAMAGED' | 'EXPIRED';
export type AlertType = 'HIGH_RISK' | 'LOW_STOCK' | 'REPLENISHMENT_REQUIRED' | 'DEMAND_SPIKE' | 'FORECAST_DEVIATION';
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type ReplenishmentStatus = 'PENDING' | 'ACCEPTED' | 'DISMISSED' | 'ORDER_PLACED';
export type UserRole = 'ADMIN' | 'PHARMACY_STAFF' | 'READ_ONLY';

export interface Supplier {
  supplier_id: string;
  supplier_name: string;
  supplier_location: string;
  average_lead_time_days: number;
  minimum_order_quantity: number;
  reliability_score: number;
}

export interface Medicine {
  medicine_id: number;
  medicine_code: string;
  medicine_name: string;
  generic_name: string;
  category: string;
  dosage_form: string;
  strength: string;
  manufacturer: string;
  supplier_id: string;
  unit_cost: number;
  selling_price: number;
  demand_tier: 'High' | 'Medium' | 'Low';
  reorder_level: number;
  safety_stock: number;
  is_active?: boolean;
}

export interface InventoryItem {
  medicine_id: number;
  medicine_code: string;
  medicine_name: string;
  category: string;
  supplier_id: string;
  supplier_name: string;
  current_stock: number;
  safety_stock: number;
  reorder_level: number;
  open_order_qty: number;
  expected_daily_demand: number;
  coverage_days: number;
  lead_time_days: number;
  lead_time_demand: number;
  required_stock: number;
  shortfall_qty: number;
  risk_level: RiskLevel;
  stock_status: StockStatus;
  last_updated: string;
}

export interface Transaction {
  transaction_id: string;
  transaction_date: string;
  medicine_id: number;
  medicine_code: string;
  medicine_name: string;
  transaction_type: TransactionType;
  quantity: number;
  resulting_stock: number;
  reference_no?: string;
  notes?: string;
  user_name: string;
}

export interface ForecastDataPoint {
  date: string;
  actual_demand?: number;
  predicted_demand: number;
  lower_bound?: number;
  upper_bound?: number;
  is_future: boolean;
}

export interface ForecastHorizonSummary {
  horizon_days: number;
  expected_total_demand: number;
  expected_daily_demand: number;
  lower_bound: number;
  upper_bound: number;
}

export interface MedicineForecast {
  medicine_id: number;
  medicine_name: string;
  medicine_code: string;
  category: string;
  as_of_date: string;
  model_name: string;
  model_version: string;
  trained_date: string;
  horizons: Record<number, ForecastHorizonSummary>;
  time_series: ForecastDataPoint[];
}

export interface ModelComparisonMetric {
  model_id: string;
  model_name: string;
  model_type: 'GBM' | 'RANDOM_FOREST' | 'LINEAR_REGRESSION' | 'BASELINE_NAIVE' | 'BASELINE_SEASONAL';
  horizon_days: number;
  mae: number;
  rmse: number;
  mape: number;
  wape: number;
  is_selected: boolean;
  training_time_seconds: number;
}

export interface RiskAssessment {
  medicine_id: number;
  medicine_code: string;
  medicine_name: string;
  category: string;
  supplier_id: string;
  supplier_name: string;
  current_stock: number;
  open_order_qty: number;
  expected_daily_demand: number;
  coverage_days: number;
  lead_time_days: number;
  lead_time_demand: number;
  safety_stock: number;
  required_stock: number;
  shortfall_qty: number;
  risk_level: RiskLevel;
  risk_score: number; // 0 to 100
  urgency: 'CRITICAL' | 'WARNING' | 'NORMAL';
  priority: number;
  explanation_points: string[];
}

export interface ReplenishmentRecommendation {
  id: string;
  medicine_id: number;
  medicine_code: string;
  medicine_name: string;
  category: string;
  supplier_id: string;
  supplier_name: string;
  current_stock: number;
  open_order_qty: number;
  expected_daily_demand: number;
  coverage_days: number;
  lead_time_days: number;
  lead_time_demand: number;
  safety_stock: number;
  required_stock: number;
  moq: number;
  raw_need: number;
  recommended_qty: number;
  risk_level: RiskLevel;
  urgency_flag: boolean;
  status: ReplenishmentStatus;
  explanation: string;
  created_at: string;
  order_placed_qty?: number | null;
  po_reference?: string | null;
}

export interface Alert {
  alert_id: string;
  alert_type: AlertType;
  severity: AlertSeverity;
  medicine_id?: number;
  medicine_code?: string;
  medicine_name?: string;
  title: string;
  message: string;
  is_acknowledged: boolean;
  created_at: string;
}

export interface ValidationCheckItem {
  id: string;
  name: string;
  description: string;
  expected: string;
  actual: string;
  status: 'PASSED' | 'FAILED' | 'WARNING';
}

export interface DatasetSummary {
  total_records: number;
  date_range_start: string;
  date_range_end: string;
  total_medicines: number;
  total_categories: number;
  total_suppliers: number;
  total_units_sold: number;
  total_unmet_demand: number;
  total_stockout_occurrences: number;
  validation_status: 'PASSED' | 'FAILED';
  checks_passed: number;
  checks_total: number;
  as_of_date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface DashboardKpiSummary {
  total_medicines: number;
  total_stock_units: number;
  high_risk_count: number;
  medium_risk_count: number;
  low_risk_count: number;
  replenishment_needed_count: number;
  open_alerts_count: number;
  as_of_date: string;
  active_model_name: string;
  model_trained_date: string;
  last_risk_run_timestamp: string;
}
