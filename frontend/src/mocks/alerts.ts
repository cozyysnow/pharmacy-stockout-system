import { Alert } from '@/types';

export const mockAlerts: Alert[] = [
  {
    "alert_id": "ALT-001",
    "alert_type": "HIGH_RISK",
    "severity": "CRITICAL",
    "medicine_id": 10,
    "medicine_code": "MED-APY-002",
    "medicine_name": "Paracetamol 650 mg Tablet",
    "title": "Stock-out predicted in 3.1 days",
    "message": "Stock coverage (3.1 days) is less than supplier lead time (3 days). Lead time demand is 214 units against on-hand 292.",
    "is_acknowledged": false,
    "created_at": "2025-12-31T06:30:00Z"
  },
  {
    "alert_id": "ALT-002",
    "alert_type": "LOW_STOCK",
    "severity": "CRITICAL",
    "medicine_id": 14,
    "medicine_code": "MED-ABX-002",
    "medicine_name": "Amoxicillin + Clavulanic Acid 625 mg Tablet",
    "title": "Inventory below safety stock buffer",
    "message": "Current stock is 110 units, below configured safety stock threshold of 163 units.",
    "is_acknowledged": false,
    "created_at": "2025-12-31T07:15:00Z"
  },
  {
    "alert_id": "ALT-003",
    "alert_type": "REPLENISHMENT_REQUIRED",
    "severity": "WARNING",
    "medicine_id": 24,
    "medicine_code": "MED-AHS-002",
    "medicine_name": "Levocetirizine 5 mg Tablet",
    "title": "Replenishment recommendation ready for review",
    "message": "Recommended order: 120 units from Bharat Medicare Ltd (MOQ multiple).",
    "is_acknowledged": false,
    "created_at": "2025-12-31T08:00:00Z"
  },
  {
    "alert_id": "ALT-004",
    "alert_type": "DEMAND_SPIKE",
    "severity": "WARNING",
    "medicine_id": 2,
    "medicine_code": "MED-ANL-002",
    "medicine_name": "Ibuprofen 400 mg Tablet",
    "title": "7-day rolling demand spike (+38%)",
    "message": "Recent sales surged above forecast band. Consider re-evaluating safety stock buffer.",
    "is_acknowledged": true,
    "created_at": "2025-12-30T14:20:00Z"
  },
  {
    "alert_id": "ALT-005",
    "alert_type": "FORECAST_DEVIATION",
    "severity": "INFO",
    "medicine_id": 23,
    "medicine_code": "MED-AHS-001",
    "medicine_name": "Cetirizine 10 mg Tablet",
    "title": "Forecast deviation within acceptable bound",
    "message": "Observed actual demand deviated by 8.4% from GBM predicted value (WAPE < 10%).",
    "is_acknowledged": true,
    "created_at": "2025-12-29T11:00:00Z"
  }
];
