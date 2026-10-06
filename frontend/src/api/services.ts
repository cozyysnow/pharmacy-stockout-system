import { apiClient, USE_MOCKS } from './client';
import {
  InventoryItem,
  Medicine,
  Supplier,
  Transaction,
  MedicineForecast,
  ModelComparisonMetric,
  RiskAssessment,
  ReplenishmentRecommendation,
  Alert,
  DatasetSummary,
  ValidationCheckItem,
  DashboardKpiSummary,
} from '@/types';
import {
  mockInventory,
  mockMedicines,
  mockSuppliers,
  mockTransactions,
  mockRiskAssessments,
  mockReplenishments,
  mockAlerts,
  mockModelComparisons,
  mockDatasetSummary,
  mockValidationChecks,
  getMockForecastForMedicine,
} from '@/mocks';

// In-memory state for live mock mutations
let inventoryState = [...mockInventory];
let transactionsState = [...mockTransactions];
let replenishmentsState = [...mockReplenishments];
let alertsState = [...mockAlerts];
let medicinesState = [...mockMedicines];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// ==========================================
// 1. Dashboard Service
// ==========================================
export const dashboardService = {
  async getKpis(): Promise<DashboardKpiSummary> {
    if (USE_MOCKS) {
      await delay(150);
      const highRisk = inventoryState.filter(i => i.risk_level === 'HIGH').length;
      const medRisk = inventoryState.filter(i => i.risk_level === 'MEDIUM').length;
      const lowRisk = inventoryState.filter(i => i.risk_level === 'LOW').length;
      const totalUnits = inventoryState.reduce((acc, i) => acc + i.current_stock, 0);
      const replPending = replenishmentsState.filter(r => r.status === 'PENDING').length;
      const unackAlerts = alertsState.filter(a => !a.is_acknowledged).length;

      return {
        total_medicines: medicinesState.length,
        total_stock_units: totalUnits,
        high_risk_count: highRisk,
        medium_risk_count: medRisk,
        low_risk_count: lowRisk,
        replenishment_needed_count: replPending,
        open_alerts_count: unackAlerts,
        as_of_date: '2025-12-31',
        active_model_name: 'HistGradientBoostingRegressor (Multi-Horizon)',
        model_trained_date: '2025-12-31',
        last_risk_run_timestamp: '2025-12-31T18:00:00Z',
      };
    }
    const res = await apiClient.get<DashboardKpiSummary>('/dashboard/kpis');
    return res.data;
  },

  async getRecentActivity() {
    if (USE_MOCKS) {
      await delay(100);
      return {
        recent_transactions: transactionsState.slice(0, 5),
        urgent_risks: riskAssessmentsState().filter(r => r.risk_level === 'HIGH').slice(0, 5),
        top_alerts: alertsState.filter(a => !a.is_acknowledged).slice(0, 4),
      };
    }
    const res = await apiClient.get('/dashboard/recent-activity');
    return res.data;
  }
};

// Helper to keep risk assessments reactive with inventory state
function riskAssessmentsState(): RiskAssessment[] {
  return mockRiskAssessments.map(r => {
    const inv = inventoryState.find(i => i.medicine_id === r.medicine_id);
    if (!inv) return r;
    return {
      ...r,
      current_stock: inv.current_stock,
      open_order_qty: inv.open_order_qty,
      coverage_days: inv.coverage_days,
      risk_level: inv.risk_level,
      shortfall_qty: inv.shortfall_qty,
    };
  });
}

// ==========================================
// 2. Inventory Service
// ==========================================
export const inventoryService = {
  async getInventory(params?: {
    search?: string;
    category?: string;
    risk?: string;
    stockStatus?: string;
  }): Promise<InventoryItem[]> {
    if (USE_MOCKS) {
      await delay(200);
      let items = [...inventoryState];
      if (params?.search) {
        const q = params.search.toLowerCase();
        items = items.filter(
          i => i.medicine_name.toLowerCase().includes(q) || i.medicine_code.toLowerCase().includes(q)
        );
      }
      if (params?.category && params.category !== 'all') {
        items = items.filter(i => i.category.toLowerCase() === params.category!.toLowerCase());
      }
      if (params?.risk && params.risk !== 'all') {
        items = items.filter(i => i.risk_level === params.risk);
      }
      if (params?.stockStatus && params.stockStatus !== 'all') {
        items = items.filter(i => i.stock_status === params.stockStatus);
      }
      return items;
    }
    const res = await apiClient.get<InventoryItem[]>('/inventory', { params });
    return res.data;
  },

  async getInventoryItem(id: number): Promise<InventoryItem | undefined> {
    if (USE_MOCKS) {
      await delay(100);
      return inventoryState.find(i => i.medicine_id === id);
    }
    const res = await apiClient.get<InventoryItem>(`/inventory/${id}`);
    return res.data;
  }
};

// ==========================================
// 3. Medicines & Suppliers Service
// ==========================================
export const medicinesService = {
  async getMedicines(params?: { search?: string; category?: string }): Promise<Medicine[]> {
    if (USE_MOCKS) {
      await delay(150);
      let list = [...medicinesState];
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(m => m.medicine_name.toLowerCase().includes(q) || m.medicine_code.toLowerCase().includes(q));
      }
      if (params?.category && params.category !== 'all') {
        list = list.filter(m => m.category.toLowerCase() === params.category!.toLowerCase());
      }
      return list;
    }
    const res = await apiClient.get<Medicine[]>('/medicines', { params });
    return res.data;
  },

  async getMedicine(id: number): Promise<Medicine | undefined> {
    if (USE_MOCKS) {
      await delay(100);
      return medicinesState.find(m => m.medicine_id === id);
    }
    const res = await apiClient.get<Medicine>(`/medicines/${id}`);
    return res.data;
  },

  async getSuppliers(): Promise<Supplier[]> {
    if (USE_MOCKS) {
      await delay(100);
      return mockSuppliers;
    }
    const res = await apiClient.get<Supplier[]>('/suppliers');
    return res.data;
  },

  async getCategories(): Promise<string[]> {
    if (USE_MOCKS) {
      await delay(50);
      return Array.from(new Set(mockMedicines.map(m => m.category))).sort();
    }
    const res = await apiClient.get<string[]>('/categories');
    return res.data;
  }
};

// ==========================================
// 4. Transactions Ledger Service
// ==========================================
export const transactionsService = {
  async getTransactions(params?: {
    search?: string;
    type?: string;
    medicineId?: number;
  }): Promise<Transaction[]> {
    if (USE_MOCKS) {
      await delay(180);
      let list = [...transactionsState];
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(t => t.medicine_name.toLowerCase().includes(q) || t.transaction_id.toLowerCase().includes(q));
      }
      if (params?.type && params.type !== 'all') {
        list = list.filter(t => t.transaction_type === params.type);
      }
      if (params?.medicineId) {
        list = list.filter(t => t.medicine_id === params.medicineId);
      }
      return list;
    }
    const res = await apiClient.get<Transaction[]>('/transactions', { params });
    return res.data;
  },

  async createTransaction(payload: {
    medicine_id: number;
    transaction_type: Transaction['transaction_type'];
    quantity: number;
    reference_no?: string;
    notes?: string;
  }): Promise<Transaction> {
    if (USE_MOCKS) {
      await delay(250);
      const medicine = medicinesState.find(m => m.medicine_id === payload.medicine_id);
      if (!medicine) throw new Error('Medicine not found');

      const invIndex = inventoryState.findIndex(i => i.medicine_id === payload.medicine_id);
      if (invIndex === -1) throw new Error('Inventory record not found');

      const currentStock = inventoryState[invIndex].current_stock;
      
      // Stock delta rule
      let delta = payload.quantity;
      if (['SALE', 'ADJUSTMENT', 'DAMAGED', 'EXPIRED'].includes(payload.transaction_type)) {
        delta = -Math.abs(payload.quantity);
      } else {
        delta = Math.abs(payload.quantity);
      }

      const resultingStock = currentStock + delta;
      if (resultingStock < 0) {
        throw new Error(`Insufficient stock. Current on-hand is ${currentStock}, operation would result in negative stock.`);
      }

      // Update inventory position
      const expectedDaily = inventoryState[invIndex].expected_daily_demand;
      const coverageDays = expectedDaily > 0 ? Number((resultingStock / expectedDaily).toFixed(1)) : 0;
      const leadTime = inventoryState[invIndex].lead_time_days;
      const requiredStock = inventoryState[invIndex].required_stock;
      const openOrders = inventoryState[invIndex].open_order_qty;

      let riskLevel: InventoryItem['risk_level'] = 'LOW';
      if (coverageDays < leadTime) {
        riskLevel = 'HIGH';
      } else if (coverageDays < leadTime * 1.5) {
        riskLevel = 'MEDIUM';
      }

      inventoryState[invIndex] = {
        ...inventoryState[invIndex],
        current_stock: resultingStock,
        coverage_days: coverageDays,
        shortfall_qty: Math.max(0, Number((requiredStock - (resultingStock + openOrders)).toFixed(1))),
        risk_level: riskLevel,
        stock_status: resultingStock === 0 ? 'OUT_OF_STOCK' : resultingStock < inventoryState[invIndex].safety_stock ? 'LOW_STOCK' : 'IN_STOCK',
        last_updated: new Date().toISOString(),
      };

      const newTxn: Transaction = {
        transaction_id: `TXN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        transaction_date: new Date().toISOString(),
        medicine_id: medicine.medicine_id,
        medicine_code: medicine.medicine_code,
        medicine_name: medicine.medicine_name,
        transaction_type: payload.transaction_type,
        quantity: delta,
        resulting_stock: resultingStock,
        reference_no: payload.reference_no,
        notes: payload.notes,
        user_name: 'Dr. Sharma',
      };

      transactionsState.unshift(newTxn);
      return newTxn;
    }

    const res = await apiClient.post<Transaction>('/transactions', payload);
    return res.data;
  }
};

// ==========================================
// 5. Demand Forecast Service
// ==========================================
export const forecastService = {
  async getForecast(medicineId: number): Promise<MedicineForecast> {
    if (USE_MOCKS) {
      await delay(200);
      return getMockForecastForMedicine(medicineId);
    }
    const res = await apiClient.get<MedicineForecast>(`/forecasts/${medicineId}`);
    return res.data;
  },

  async getModelComparisons(): Promise<ModelComparisonMetric[]> {
    if (USE_MOCKS) {
      await delay(150);
      return mockModelComparisons;
    }
    const res = await apiClient.get<ModelComparisonMetric[]>('/forecasts/models');
    return res.data;
  }
};

// ==========================================
// 6. Stock-Out Risk Service
// ==========================================
export const riskService = {
  async getRiskAssessments(params?: { riskLevel?: string; category?: string }): Promise<RiskAssessment[]> {
    if (USE_MOCKS) {
      await delay(180);
      let list = riskAssessmentsState();
      if (params?.riskLevel && params.riskLevel !== 'all') {
        list = list.filter(r => r.risk_level === params.riskLevel);
      }
      if (params?.category && params.category !== 'all') {
        list = list.filter(r => r.category.toLowerCase() === params.category!.toLowerCase());
      }
      return list.sort((a, b) => b.risk_score - a.risk_score);
    }
    const res = await apiClient.get<RiskAssessment[]>('/risk', { params });
    return res.data;
  },

  async getRiskForMedicine(id: number): Promise<RiskAssessment | undefined> {
    if (USE_MOCKS) {
      await delay(100);
      return riskAssessmentsState().find(r => r.medicine_id === id);
    }
    const res = await apiClient.get<RiskAssessment>(`/risk/${id}`);
    return res.data;
  }
};

// ==========================================
// 7. Replenishment Service
// ==========================================
export const replenishmentService = {
  async getRecommendations(params?: { status?: string }): Promise<ReplenishmentRecommendation[]> {
    if (USE_MOCKS) {
      await delay(180);
      let list = [...replenishmentsState];
      if (params?.status && params.status !== 'all') {
        list = list.filter(r => r.status === params.status);
      }
      return list;
    }
    const res = await apiClient.get<ReplenishmentRecommendation[]>('/replenishment', { params });
    return res.data;
  },

  async updateStatus(
    id: string,
    status: ReplenishmentRecommendation['status'],
    details?: { orderPlacedQty?: number; poReference?: string }
  ): Promise<ReplenishmentRecommendation> {
    if (USE_MOCKS) {
      await delay(200);
      const index = replenishmentsState.findIndex(r => r.id === id);
      if (index === -1) throw new Error('Recommendation not found');

      const updated: ReplenishmentRecommendation = {
        ...replenishmentsState[index],
        status,
        order_placed_qty: details?.orderPlacedQty,
        po_reference: details?.poReference,
      };

      replenishmentsState[index] = updated;

      // If status is ORDER_PLACED, update open_order_qty in inventory
      if (status === 'ORDER_PLACED' && details?.orderPlacedQty) {
        const medId = updated.medicine_id;
        const invIndex = inventoryState.findIndex(i => i.medicine_id === medId);
        if (invIndex !== -1) {
          inventoryState[invIndex].open_order_qty += details.orderPlacedQty;
        }
      }

      return updated;
    }
    const res = await apiClient.patch<ReplenishmentRecommendation>(`/replenishment/${id}`, { status, ...details });
    return res.data;
  }
};

// ==========================================
// 8. Alerts Service
// ==========================================
export const alertsService = {
  async getAlerts(params?: { severity?: string; unreadOnly?: boolean }): Promise<Alert[]> {
    if (USE_MOCKS) {
      await delay(120);
      let list = [...alertsState];
      if (params?.severity && params.severity !== 'all') {
        list = list.filter(a => a.severity === params.severity);
      }
      if (params?.unreadOnly) {
        list = list.filter(a => !a.is_acknowledged);
      }
      return list;
    }
    const res = await apiClient.get<Alert[]>('/alerts', { params });
    return res.data;
  },

  async acknowledgeAlert(id: string): Promise<Alert> {
    if (USE_MOCKS) {
      await delay(100);
      const index = alertsState.findIndex(a => a.alert_id === id);
      if (index === -1) throw new Error('Alert not found');
      alertsState[index] = { ...alertsState[index], is_acknowledged: true };
      return alertsState[index];
    }
    const res = await apiClient.post<Alert>(`/alerts/${id}/ack`);
    return res.data;
  },

  async bulkAcknowledge(): Promise<void> {
    if (USE_MOCKS) {
      await delay(150);
      alertsState = alertsState.map(a => ({ ...a, is_acknowledged: true }));
      return;
    }
    await apiClient.post('/alerts/bulk-ack');
  }
};

// ==========================================
// 9. Dataset Management Service
// ==========================================
export const datasetsService = {
  async getSummary(): Promise<DatasetSummary> {
    if (USE_MOCKS) {
      await delay(120);
      return mockDatasetSummary;
    }
    const res = await apiClient.get<DatasetSummary>('/dataset/summary');
    return res.data;
  },

  async getValidationChecks(): Promise<ValidationCheckItem[]> {
    if (USE_MOCKS) {
      await delay(150);
      return mockValidationChecks;
    }
    const res = await apiClient.get<ValidationCheckItem[]>('/dataset/validation-checks');
    return res.data;
  }
};
