import { ModelComparisonMetric } from '@/types';

export const mockModelComparisons: ModelComparisonMetric[] = [
  {
    "model_id": "gbm_hist",
    "model_name": "HistGradientBoostingRegressor",
    "model_type": "GBM",
    "horizon_days": 1,
    "mae": 8.072,
    "rmse": 11.45,
    "mape": 14.2,
    "wape": 11.1,
    "is_selected": true,
    "training_time_seconds": 18.4
  },
  {
    "model_id": "gbm_hist_h7",
    "model_name": "HistGradientBoostingRegressor (Multi-step)",
    "model_type": "GBM",
    "horizon_days": 7,
    "mae": 9.314,
    "rmse": 13.08,
    "mape": 16.8,
    "wape": 12.9,
    "is_selected": true,
    "training_time_seconds": 24.1
  },
  {
    "model_id": "gbm_hist_h14",
    "model_name": "HistGradientBoostingRegressor (Multi-step)",
    "model_type": "GBM",
    "horizon_days": 14,
    "mae": 10.15,
    "rmse": 14.62,
    "mape": 18.5,
    "wape": 14.1,
    "is_selected": true,
    "training_time_seconds": 29.5
  },
  {
    "model_id": "gbm_hist_h30",
    "model_name": "HistGradientBoostingRegressor (Multi-step)",
    "model_type": "GBM",
    "horizon_days": 30,
    "mae": 11.24,
    "rmse": 16.12,
    "mape": 20.4,
    "wape": 15.6,
    "is_selected": true,
    "training_time_seconds": 36.2
  },
  {
    "model_id": "rf_regressor",
    "model_name": "RandomForestRegressor (100 trees)",
    "model_type": "RANDOM_FOREST",
    "horizon_days": 1,
    "mae": 8.64,
    "rmse": 12.19,
    "mape": 15.6,
    "wape": 12.0,
    "is_selected": false,
    "training_time_seconds": 45.8
  },
  {
    "model_id": "linear_ridge",
    "model_name": "Ridge Regression (Lag & Calendar Features)",
    "model_type": "LINEAR_REGRESSION",
    "horizon_days": 1,
    "mae": 9.48,
    "rmse": 13.25,
    "mape": 17.1,
    "wape": 13.2,
    "is_selected": false,
    "training_time_seconds": 4.2
  },
  {
    "model_id": "baseline_lag1",
    "model_name": "Na\u00efve Lag-1 Baseline",
    "model_type": "BASELINE_NAIVE",
    "horizon_days": 1,
    "mae": 10.984,
    "rmse": 15.82,
    "mape": 21.3,
    "wape": 15.4,
    "is_selected": false,
    "training_time_seconds": 0.2
  },
  {
    "model_id": "baseline_lag7",
    "model_name": "Seasonal Lag-7 Baseline (Day of Week)",
    "model_type": "BASELINE_SEASONAL",
    "horizon_days": 7,
    "mae": 11.89,
    "rmse": 16.94,
    "mape": 22.8,
    "wape": 16.7,
    "is_selected": false,
    "training_time_seconds": 0.2
  }
];
