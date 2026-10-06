import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { RiskBadge, StockStatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit3, Calculator, TrendingUp, History } from 'lucide-react';

export function MedicineDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <PageHeader
        title="Paracetamol 650 mg Tablet"
        subtitle="MED-APY-002 • Category: Antipyretics • Supplier: Sarthak Healthcare Supplies"
        breadcrumbs={[
          { label: 'Medicines', href: '/medicines' },
          { label: 'Paracetamol 650 mg' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/medicines">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
            </Link>
            <Button size="sm" variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>
              Edit Parameters
            </Button>
          </div>
        }
      />

      {/* Top Status Strip */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-white border border-slate-200 mb-6 shadow-xs">
        <div>
          <span className="text-xs text-slate-500 block">Stock-Out Risk</span>
          <RiskBadge level="HIGH" className="mt-1" />
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />
        <div>
          <span className="text-xs text-slate-500 block">Inventory Status</span>
          <StockStatusBadge status="IN_STOCK" className="mt-1" />
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />
        <div>
          <span className="text-xs text-slate-500 block">Current Stock</span>
          <span className="text-sm font-bold text-slate-900 tabular-nums">292 units</span>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />
        <div>
          <span className="text-xs text-slate-500 block">Lead Time</span>
          <span className="text-sm font-bold text-slate-900 tabular-nums">3 days</span>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />
        <div>
          <span className="text-xs text-slate-500 block">Coverage</span>
          <span className="text-sm font-bold text-rose-600 tabular-nums">3.1 days</span>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview & Decision' },
          { id: 'calculation', label: 'Explainability & Calculation Chain', icon: <Calculator className="w-4 h-4" /> },
          { id: 'history', label: 'Demand History', icon: <History className="w-4 h-4" /> },
          { id: 'forecast', label: 'Forecast Model', icon: <TrendingUp className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {/* Explainability Tab Preview */}
      {activeTab === 'calculation' ? (
        <Card>
          <CardHeader
            title="Step-by-Step Risk & Replenishment Calculation"
            subtitle="Transparent explainability chain derived from validated formulas"
          />
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div>1. Expected Daily Demand (d̂) = 90.7 units/day</div>
              <div>2. Stock Coverage = On-Hand Stock (281 avail) / d̂ = 3.1 days</div>
              <div>3. Lead-Time Demand (LTD) = d̂ × Lead Time (3 days) = 272.1 units</div>
              <div>4. Safety Stock (SS) = 101 units</div>
              <div>5. Required Stock = LTD + SS = 373.1 units</div>
              <div>6. Inventory Position = Current Stock (292) + Open Orders (1,355) = 1,647 units</div>
              <div className="text-teal-800 font-semibold pt-1 border-t border-slate-200">
                Decision: Open orders cover requirement. High risk flag triggered due to low immediate on-hand coverage (3.1 days).
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader
            title="Medicine Overview & Recommendations"
            subtitle="Inventory parameters and active decision recommendations"
          />
          <CardContent>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
              <strong>Staff Decision Notice:</strong> Open purchase order of 1,355 units is in transit from Sarthak Healthcare Supplies (expected in ~3 days). Once delivered, stock will rise to 1,647 units, resolving the stock-out risk.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
