import { MedicineForecast, ForecastDataPoint, ForecastHorizonSummary } from '@/types';
import { mockMedicines } from './medicines';

// Generate realistic time-series for a medicine around 2025-12-31 (last 90 days + 30 days forecast)
export function getMockForecastForMedicine(medicineId: number): MedicineForecast {
  const medicine = mockMedicines.find(m => m.medicine_id === medicineId) || mockMedicines[0];
  
  // Base daily demand based on demand tier
  const baseDemand = medicine.demand_tier === 'High' ? 65 : medicine.demand_tier === 'Medium' ? 28 : 8;
  const timeSeries: ForecastDataPoint[] = [];

  // Generate 90 days historical (Oct 2, 2025 to Dec 31, 2025)
  const startDate = new Date('2025-10-02');
  for (let i = 0; i < 90; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(startDate.getDate() + i);
    const dateStr = curDate.toISOString().split('T')[0];
    
    // Day of week seasonality (higher on Mon/Fri)
    const dayOfWeek = curDate.getDay();
    const seasonFactor = (dayOfWeek === 1 || dayOfWeek === 5) ? 1.25 : (dayOfWeek === 0) ? 0.75 : 1.0;
    const randomNoise = (Math.sin(i * 0.4) * 0.2 + (Math.random() - 0.5) * 0.25);
    const actual = Math.max(0, Math.round(baseDemand * seasonFactor * (1 + randomNoise)));

    timeSeries.push({
      date: dateStr,
      actual_demand: actual,
      predicted_demand: actual,
      is_future: false,
    });
  }

  // Generate 30 days future forecast (Jan 1, 2026 to Jan 30, 2026)
  const futureStartDate = new Date('2026-01-01');
  for (let i = 0; i < 30; i++) {
    const curDate = new Date(futureStartDate);
    curDate.setDate(futureStartDate.getDate() + i);
    const dateStr = curDate.toISOString().split('T')[0];

    const dayOfWeek = curDate.getDay();
    const seasonFactor = (dayOfWeek === 1 || dayOfWeek === 5) ? 1.22 : (dayOfWeek === 0) ? 0.78 : 1.0;
    const pred = Math.max(1, Math.round(baseDemand * seasonFactor));
    const margin = Math.round(pred * 0.18 + 2);

    timeSeries.push({
      date: dateStr,
      predicted_demand: pred,
      lower_bound: Math.max(0, pred - margin),
      upper_bound: pred + margin,
      is_future: true,
    });
  }

  const horizons: Record<number, ForecastHorizonSummary> = {
    1: {
      horizon_days: 1,
      expected_daily_demand: baseDemand,
      expected_total_demand: baseDemand,
      lower_bound: Math.round(baseDemand * 0.85),
      upper_bound: Math.round(baseDemand * 1.15),
    },
    7: {
      horizon_days: 7,
      expected_daily_demand: baseDemand,
      expected_total_demand: baseDemand * 7,
      lower_bound: Math.round(baseDemand * 7 * 0.88),
      upper_bound: Math.round(baseDemand * 7 * 1.12),
    },
    14: {
      horizon_days: 14,
      expected_daily_demand: baseDemand,
      expected_total_demand: baseDemand * 14,
      lower_bound: Math.round(baseDemand * 14 * 0.85),
      upper_bound: Math.round(baseDemand * 14 * 1.15),
    },
    30: {
      horizon_days: 30,
      expected_daily_demand: baseDemand,
      expected_total_demand: baseDemand * 30,
      lower_bound: Math.round(baseDemand * 30 * 0.82),
      upper_bound: Math.round(baseDemand * 30 * 1.18),
    },
  };

  return {
    medicine_id: medicine.medicine_id,
    medicine_name: medicine.medicine_name,
    medicine_code: medicine.medicine_code,
    category: medicine.category,
    as_of_date: '2025-12-31',
    model_name: 'HistGradientBoostingRegressor (Multi-Horizon)',
    model_version: 'v1.0.0-final',
    trained_date: '2025-12-31',
    horizons,
    time_series: timeSeries,
  };
}
