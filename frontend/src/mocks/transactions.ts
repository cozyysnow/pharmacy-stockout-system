import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    "transaction_id": "TXN-2025-10492",
    "transaction_date": "2025-12-31T16:45:00Z",
    "medicine_id": 10,
    "medicine_code": "MED-APY-002",
    "medicine_name": "Paracetamol 650 mg Tablet",
    "transaction_type": "SALE",
    "quantity": -20,
    "resulting_stock": 292,
    "reference_no": "INV-89211",
    "notes": "Counter sale prescription dispensing",
    "user_name": "Pooja Verma"
  },
  {
    "transaction_id": "TXN-2025-10491",
    "transaction_date": "2025-12-31T15:10:00Z",
    "medicine_id": 13,
    "medicine_code": "MED-ABX-001",
    "medicine_name": "Amoxicillin 500 mg Capsule",
    "transaction_type": "PURCHASE",
    "quantity": 100,
    "resulting_stock": 540,
    "reference_no": "PO-2025-013",
    "notes": "Receipt of wholesale shipment from Panipat Wholesale Drugs",
    "user_name": "Dr. Sharma"
  },
  {
    "transaction_id": "TXN-2025-10490",
    "transaction_date": "2025-12-31T13:20:00Z",
    "medicine_id": 2,
    "medicine_code": "MED-ANL-002",
    "medicine_name": "Ibuprofen 400 mg Tablet",
    "transaction_type": "SALE",
    "quantity": -15,
    "resulting_stock": 360,
    "reference_no": "INV-89205",
    "notes": "Outpatient prescription",
    "user_name": "Pooja Verma"
  },
  {
    "transaction_id": "TXN-2025-10489",
    "transaction_date": "2025-12-31T11:05:00Z",
    "medicine_id": 7,
    "medicine_code": "MED-ANL-007",
    "medicine_name": "Aspirin 75 mg Tablet",
    "transaction_type": "ADJUSTMENT",
    "quantity": -4,
    "resulting_stock": 312,
    "reference_no": "AUD-2025-44",
    "notes": "Physical audit reconciliation variance",
    "user_name": "Dr. Sharma"
  },
  {
    "transaction_id": "TXN-2025-10488",
    "transaction_date": "2025-12-30T17:30:00Z",
    "medicine_id": 11,
    "medicine_code": "MED-APY-003",
    "medicine_name": "Paracetamol 125 mg/5 ml Syrup",
    "transaction_type": "DAMAGED",
    "quantity": -2,
    "resulting_stock": 94,
    "reference_no": "DMG-102",
    "notes": "Packaging leakage during shelf restocking",
    "user_name": "Pooja Verma"
  },
  {
    "transaction_id": "TXN-2025-10487",
    "transaction_date": "2025-12-30T14:15:00Z",
    "medicine_id": 23,
    "medicine_code": "MED-AHS-001",
    "medicine_name": "Cetirizine 10 mg Tablet",
    "transaction_type": "SALE",
    "quantity": -30,
    "resulting_stock": 410,
    "reference_no": "INV-89190",
    "notes": "Regular prescription sales",
    "user_name": "Pooja Verma"
  }
];
