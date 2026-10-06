import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { KpiCard, Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, RiskBadge, StockStatusBadge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Drawer } from '@/components/ui/Drawer';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { TableSkeleton, CardSkeleton } from '@/components/feedback/Skeleton';
import { useToast } from '@/components/feedback/Toast';
import {
  Pill,
  Boxes,
  AlertTriangle,
  Truck,
  Bell,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  Download,
  Activity,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ReferenceLine,
} from 'recharts';
import {
  dashboardService,
  inventoryService,
  riskService,
  alertsService,
  forecastService,
  medicinesService,
} from '@/api';
import {
  DashboardKpiSummary,
  InventoryItem,
  RiskAssessment,
  Alert,
  MedicineForecast,
  Medicine,
} from '@/types';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { addToast } = useToast();

  // State
  const [loading, setLoading] = useState(true);
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [kpis, setKpis] = useState<DashboardKpiSummary | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [riskList, setRiskList] = useState<RiskAssessment[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Interactive filters & selections
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMedicineId, setSelectedMedicineId] = useState<number>(10); // Default Paracetamol 650mg
  const [forecastData, setForecastData] = useState<MedicineForecast | null>(null);
  const [activeHorizon, setActiveHorizon] = useState<number>(30);

  // Drawer state for explainability
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRiskItem, setSelectedRiskItem] = useState<RiskAssessment | null>(null);

  // Load initial dashboard data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [kpiRes, invRes, riskRes, alertRes, medRes, catRes] = await Promise.all([
          dashboardService.getKpis(),
          inventoryService.getInventory(),
          riskService.getRiskAssessments(),
          alertsService.getAlerts(),
          medicinesService.getMedicines(),
          medicinesService.getCategories(),
        ]);

        setKpis(kpiRes);
        setInventory(invRes);
        setRiskList(riskRes);
        setAlerts(alertRes);
        setMedicines(medRes);
        setCategories(catRes);

        // Load default forecast
        const fcRes = await forecastService.getForecast(10);
        setForecastData(fcRes);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        addToast({
          type: 'error',
          title: 'Data Load Failed',
          message: 'Could not fetch current inventory telemetry.',
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [addToast]);

  // Load forecast when selected medicine changes
  const handleMedicineChange = async (medId: number) => {
    setSelectedMedicineId(medId);
    try {
      const fc = await forecastService.getForecast(medId);
      setForecastData(fc);
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger simulated risk run
  const handleRunRiskAnalysis = async () => {
    setRunningAnalysis(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const updatedKpis = await dashboardService.getKpis();
      setKpis({
        ...updatedKpis,
        last_risk_run_timestamp: new Date().toISOString(),
      });
      addToast({
        type: 'success',
        title: 'Risk Analysis Completed',
        message: 'Re-evaluated 85 medicines against multi-step forecasts and lead times.',
      });
    } finally {
      setRunningAnalysis(false);
    }
  };

  // Acknowledge alert inline
  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      await alertsService.acknowledgeAlert(alertId);
      setAlerts(prev =>
        prev.map(a => (a.alert_id === alertId ? { ...a, is_acknowledged: true } : a))
      );
      addToast({
        type: 'info',
        title: 'Alert Acknowledged',
        message: `Alert ${alertId} was marked acknowledged.`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Export inventory CSV
  const handleExportCsv = () => {
    const headers = ['Medicine ID,Code,Name,Category,Stock,Safety Stock,Coverage Days,Lead Time,Risk Level'];
    const rows = inventory.map(i =>
      `"${i.medicine_id}","${i.medicine_code}","${i.medicine_name}","${i.category}",${i.current_stock},${i.safety_stock},${i.coverage_days},${i.lead_time_days},"${i.risk_level}"`
    );
    const blob = new Blob([[headers.join('\n'), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pharmastock_snapshot_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    addToast({
      type: 'success',
      title: 'Snapshot Exported',
      message: 'Inventory telemetry CSV downloaded successfully.',
    });
  };

  // Computed: Filtered top 10 high-risk items
  const filteredRiskItems = useMemo(() => {
    let items = riskList;
    if (selectedCategory !== 'all') {
      items = items.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    return items.slice(0, 10);
  }, [riskList, selectedCategory]);

  // Computed: Risk distribution donut data
  const riskDonutData = useMemo(() => {
    const high = inventory.filter(i => i.risk_level === 'HIGH').length;
    const med = inventory.filter(i => i.risk_level === 'MEDIUM').length;
    const low = inventory.filter(i => i.risk_level === 'LOW').length;
    return [
      { name: 'High Risk', value: high, color: '#E11D48' },
      { name: 'Medium Risk', value: med, color: '#F59E0B' },
      { name: 'Safe / Low Risk', value: low, color: '#10B981' },
    ];
  }, [inventory]);

  // Computed: Stock Coverage Distribution histogram
  const coverageDistributionData = useMemo(() => {
    const buckets = {
      '< 3 Days': 0,
      '3-7 Days': 0,
      '7-14 Days': 0,
      '14-30 Days': 0,
      '> 30 Days': 0,
    };

    inventory.forEach(item => {
      const c = item.coverage_days;
      if (c < 3) buckets['< 3 Days']++;
      else if (c <= 7) buckets['3-7 Days']++;
      else if (c <= 14) buckets['7-14 Days']++;
      else if (c <= 30) buckets['14-30 Days']++;
      else buckets['> 30 Days']++;
    });

    return [
      { bucket: '< 3d (Critical)', count: buckets['< 3 Days'], color: '#E11D48' },
      { bucket: '3-7d (Tight)', count: buckets['3-7 Days'], color: '#F59E0B' },
      { bucket: '7-14d (Stable)', count: buckets['7-14 Days'], color: '#0F766E' },
      { bucket: '14-30d (Healthy)', count: buckets['14-30 Days'], color: '#10B981' },
      { bucket: '> 30d (Ample)', count: buckets['> 30 Days'], color: '#0284C7' },
    ];
  }, [inventory]);

  // Computed: Top therapeutic categories by volume and high risk
  const categoryStatsData = useMemo(() => {
    const map = new Map<string, { totalUnits: number; highRiskCount: number }>();
    inventory.forEach(i => {
      const cur = map.get(i.category) || { totalUnits: 0, highRiskCount: 0 };
      cur.totalUnits += i.current_stock;
      if (i.risk_level === 'HIGH') cur.highRiskCount += 1;
      map.set(i.category, cur);
    });

    return Array.from(map.entries())
      .map(([cat, val]) => ({
        category: cat,
        totalStock: val.totalUnits,
        highRisk: val.highRiskCount,
      }))
      .sort((a, b) => b.totalStock - a.totalStock)
      .slice(0, 6);
  }, [inventory]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <TableSkeleton rows={8} cols={7} />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Page Header & Operational Action Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full">
              Hospital Operations Command Center
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-semibold text-slate-500">
              Last Run: {kpis?.last_risk_run_timestamp ? new Date(kpis.last_risk_run_timestamp).toLocaleTimeString() : '18:00 UTC'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Inventory Operations & Stock-Out Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
            Real-time stock monitoring, lead-time demand buffers, and ML-assisted replenishment decision support.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportCsv}
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${runningAnalysis ? 'animate-spin' : ''}`} />}
            isLoading={runningAnalysis}
            onClick={handleRunRiskAnalysis}
          >
            Run Risk Engine
          </Button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards (Compact & High Contrast) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          title="Catalogue Size"
          value={kpis?.total_medicines || 85}
          subtitle="Across 11 classes"
          icon={<Pill className="w-4 h-4 text-slate-700" />}
        />
        <KpiCard
          title="On-Hand Units"
          value={kpis?.total_stock_units.toLocaleString() || '42,850'}
          subtitle="Dispensary balance"
          icon={<Boxes className="w-4 h-4 text-slate-700" />}
        />
        <KpiCard
          title="High Stockout Risk"
          value={kpis?.high_risk_count || 12}
          subtitle="Coverage < Lead Time"
          icon={<AlertTriangle className="w-4 h-4 text-rose-600" />}
          variant="critical"
          delta={{ value: '14.1% of items', isPositive: false }}
        />
        <KpiCard
          title="Medium Risk"
          value={kpis?.medium_risk_count || 18}
          subtitle="Near safety buffer"
          icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
          variant="warning"
        />
        <KpiCard
          title="Replenishments"
          value={kpis?.replenishment_needed_count || 5}
          subtitle="Action pending"
          icon={<Truck className="w-4 h-4 text-sky-700" />}
          variant="default"
        />
        <KpiCard
          title="Active Alerts"
          value={kpis?.open_alerts_count || 3}
          subtitle="Exceptions flagged"
          icon={<Bell className="w-4 h-4 text-rose-600" />}
          variant="critical"
        />
      </div>

      {/* 3. Row 1 Visual Intelligence: 90-Day Forecast Chart & Risk Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Forecast Chart (Col-span 2) */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-700" />
                <span>Demand Forecast & Historical Trend (90 Days Actual + 30 Days Predicted)</span>
              </div>
            }
            subtitle="Actual quantity sold vs multi-horizon GBM forecast with 80% confidence interval"
            action={
              <div className="flex items-center gap-2">
                <select
                  value={selectedMedicineId}
                  onChange={e => handleMedicineChange(Number(e.target.value))}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-2xs focus:border-teal-600 focus:outline-none"
                >
                  {medicines.slice(0, 15).map(m => (
                    <option key={m.medicine_id} value={m.medicine_id}>
                      {m.medicine_name} ({m.medicine_code})
                    </option>
                  ))}
                </select>
              </div>
            }
          />
          <CardContent className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-1 bg-teal-700 rounded-full" />
                  Historical Demand (Oct–Dec 2025)
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-1 bg-sky-600 rounded-full border-dashed" />
                  Predicted Demand (Jan 2026)
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-2 bg-sky-200/60 rounded" />
                  80% Prediction Band
                </span>
              </div>
              <div className="font-semibold text-slate-700">
                Tier: <span className="text-teal-700">{forecastData?.category}</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={forecastData?.time_series || []}
                  margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="actualColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="bandColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={str => str.slice(5)}
                    interval={15}
                  />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0B132B] text-white p-2.5 rounded-lg text-xs shadow-md border border-slate-700 space-y-1">
                          <p className="font-bold text-slate-300">{d.date}</p>
                          {d.actual_demand !== undefined && !d.is_future && (
                            <p className="text-teal-400 font-semibold">
                              Actual Sold: <span className="tabular-nums font-mono">{d.actual_demand} units</span>
                            </p>
                          )}
                          {d.is_future && (
                            <>
                              <p className="text-sky-300 font-semibold">
                                Forecast: <span className="tabular-nums font-mono">{d.predicted_demand} units</span>
                              </p>
                              <p className="text-[10px] text-slate-400">
                                80% Band: {d.lower_bound} – {d.upper_bound} units
                              </p>
                            </>
                          )}
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    x="2025-12-31"
                    stroke="#E11D48"
                    strokeDasharray="3 3"
                    label={{ value: 'As-Of Date (Today)', position: 'insideTopLeft', fill: '#E11D48', fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual_demand"
                    stroke="#0F766E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#actualColor)"
                    name="Actual Demand"
                  />
                  <Area
                    type="monotone"
                    dataKey="upper_bound"
                    stroke="none"
                    fillOpacity={1}
                    fill="url(#bandColor)"
                    name="Upper Bound"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted_demand"
                    stroke="#0284C7"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                    name="Forecast"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stock-Out Risk Donut (Col-span 1) */}
        <Card className="flex flex-col">
          <CardHeader
            title="Stock-Out Risk Breakdown"
            subtitle="Categorized across 85 active medicines"
            action={
              <Link to="/risk" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                View Risk Queue <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
          <CardContent className="flex-1 flex flex-col justify-between pt-0">
            <div className="relative h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDonutData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {riskDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0];
                      return (
                        <div className="bg-[#0B132B] text-white px-2.5 py-1 rounded text-xs">
                          {d.name}: <strong className="tabular-nums">{d.value} items</strong> ({((Number(d.value) / 85) * 100).toFixed(1)}%)
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Donut Center Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-rose-600 leading-none">12</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight mt-0.5">High Risk</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Critical / High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-600 tabular-nums">12</span>
                  <span className="text-[11px] text-slate-400">14.1%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-800">Medium Risk (Warning)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-700 tabular-nums">18</span>
                  <span className="text-[11px] text-slate-400">21.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800">Low Risk / Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-700 tabular-nums">55</span>
                  <span className="text-[11px] text-slate-400">64.7%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Row 2 Operational Histograms & Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coverage Days Distribution */}
        <Card>
          <CardHeader
            title="Stock Coverage Distribution"
            subtitle="Item count grouped by days until depletion at current daily demand"
          />
          <CardContent className="pt-1">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coverageDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="bucket" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} allowDecimals={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0B132B] text-white px-2.5 py-1.5 rounded text-xs shadow">
                          <p className="font-semibold text-slate-300">{d.bucket}</p>
                          <p className="font-bold text-white tabular-nums">{d.count} medicines</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {coverageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Inventory Breakdown */}
        <Card>
          <CardHeader
            title="Inventory Volume by Category"
            subtitle="Total units in stock across top therapeutic categories"
          />
          <CardContent className="pt-1">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStatsData} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 10, fill: '#334155' }} width={80} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0B132B] text-white px-2.5 py-1.5 rounded text-xs shadow">
                          <p className="font-bold">{d.category}</p>
                          <p className="text-teal-300">Total Stock: {d.totalStock.toLocaleString()} units</p>
                          <p className="text-rose-400">High Risk: {d.highRisk} items</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="totalStock" fill="#0F766E" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Row 3: Top 10 Critical Risk Items & Live Alerts Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Top 10 Critical Stock-Out Risks (Span 2) */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Priority Stock-Out Risk Queue"
            subtitle="Medicines where stock coverage days is less than or near supplier lead time"
            action={
              <div className="flex items-center gap-2">
                <Select
                  options={[
                    { value: 'all', label: 'All Categories' },
                    ...categories.map(c => ({ value: c, label: c })),
                  ]}
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="py-1 text-xs"
                />
                <Link to="/risk">
                  <Button size="sm" variant="outline">
                    Full Risk Matrix
                  </Button>
                </Link>
              </div>
            }
          />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine & Code</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead isNumeric>On-Hand</TableHead>
                  <TableHead isNumeric>Lead Time</TableHead>
                  <TableHead isNumeric>Coverage</TableHead>
                  <TableHead>Risk Classification</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRiskItems.map(item => {
                  const isHigh = item.risk_level === 'HIGH';
                  return (
                    <TableRow key={item.medicine_id}>
                      <TableCell>
                        <div className="font-bold text-slate-900 leading-tight">
                          {item.medicine_name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {item.medicine_code} • {item.supplier_name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell isNumeric className="font-bold">
                        {item.current_stock.toLocaleString()}
                        <div className="text-[10px] text-slate-400 font-normal">
                          req: {item.required_stock}
                        </div>
                      </TableCell>
                      <TableCell isNumeric className="font-semibold text-slate-700">
                        {item.lead_time_days} days
                      </TableCell>
                      <TableCell isNumeric>
                        <div className="flex flex-col items-end">
                          <span className={`font-black ${isHigh ? 'text-rose-600' : 'text-amber-700'}`}>
                            {item.coverage_days} days
                          </span>
                          {/* Mini visual indicator */}
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full ${isHigh ? 'bg-rose-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, (item.coverage_days / (item.lead_time_days * 2)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RiskBadge level={item.risk_level} />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRiskItem(item);
                            setDrawerOpen(true);
                          }}
                        >
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Real-Time Operational Alerts (Span 1) */}
        <Card className="flex flex-col">
          <CardHeader
            title="Operational Alerts"
            subtitle="Exceptions requiring pharmacy review"
            action={
              <Link to="/alerts" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                All Alerts ({alerts.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
          <CardContent className="p-0 flex-1 divide-y divide-slate-100">
            {alerts.slice(0, 5).map(alert => (
              <div
                key={alert.alert_id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${alert.is_acknowledged ? 'bg-white opacity-70' : 'bg-slate-50/60 hover:bg-slate-100/60'
                  }`}
              >
                <div className="mt-0.5 shrink-0">
                  {alert.severity === 'CRITICAL' ? (
                    <div className="p-1 rounded bg-rose-100 text-rose-700">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                  ) : alert.severity === 'WARNING' ? (
                    <div className="p-1 rounded bg-amber-100 text-amber-700">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="p-1 rounded bg-sky-100 text-sky-700">
                      <Info className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {alert.medicine_name || alert.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                    {alert.message}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-slate-400">
                      {alert.alert_type}
                    </span>
                    {!alert.is_acknowledged ? (
                      <button
                        onClick={() => handleAcknowledgeAlert(alert.alert_id)}
                        className="text-[11px] font-bold text-teal-700 hover:text-teal-900 hover:underline"
                      >
                        Acknowledge
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ack
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 6. Drill-down Explainability Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedRiskItem?.medicine_name || 'Calculation Drilldown'}
        subtitle={`SKU: ${selectedRiskItem?.medicine_code} • Supplier: ${selectedRiskItem?.supplier_name}`}
        footer={
          <div className="flex items-center justify-between w-full">
            <Link to={`/medicines/${selectedRiskItem?.medicine_id}`}>
              <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Full Medicine Profile
              </Button>
            </Link>
            <Button size="sm" onClick={() => setDrawerOpen(false)}>
              Close Panel
            </Button>
          </div>
        }
      >
        {selectedRiskItem && (
          <div className="space-y-4">
            {/* Urgency Badge Strip */}
            <div className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 border-slate-200">
              <span className="text-xs font-bold text-slate-700">Stockout Risk Level:</span>
              <RiskBadge level={selectedRiskItem.risk_level} />
            </div>

            {/* Formula Chain Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Explainability & Calculation Chain
              </h4>
              <div className="p-3.5 rounded-lg bg-[#0B132B] text-slate-200 font-mono text-xs space-y-2 shadow-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Current Balance:</span>
                  <span className="text-white font-bold">{selectedRiskItem.current_stock} units</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Expected Daily Demand:</span>
                  <span className="text-white font-bold">{selectedRiskItem.expected_daily_demand} units/day</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Stock Coverage:</span>
                  <span className={`font-bold ${selectedRiskItem.coverage_days < selectedRiskItem.lead_time_days ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {selectedRiskItem.coverage_days} days
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Supplier Lead Time:</span>
                  <span className="text-white font-bold">{selectedRiskItem.lead_time_days} days</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Lead-Time Demand (LTD):</span>
                  <span className="text-white font-bold">{selectedRiskItem.lead_time_demand} units</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Safety Buffer:</span>
                  <span className="text-white font-bold">{selectedRiskItem.safety_stock} units</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Required Stock (LTD + SS):</span>
                  <span className="text-white font-bold">{selectedRiskItem.required_stock} units</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-amber-400 font-bold">Calculated Shortfall:</span>
                  <span className="text-amber-300 font-bold">{selectedRiskItem.shortfall_qty} units</span>
                </div>
              </div>
            </div>

            {/* Natural Language Insights */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Clinical Context & Recommendations
              </h4>
              <ul className="space-y-1.5">
                {selectedRiskItem.explanation_points.map((point, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-md border border-slate-200 bg-white text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                  >
                    <Info className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
