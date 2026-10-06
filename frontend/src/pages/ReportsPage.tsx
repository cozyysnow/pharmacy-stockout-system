import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, FileText, BarChart3, AlertOctagon } from 'lucide-react';

export function ReportsPage() {
  const reports = [
    { title: 'Current Inventory Status', desc: 'Detailed on-hand balances, safety buffers, reorder points and coverage', icon: FileText },
    { title: 'Stock-Out Risk Audit', desc: 'Complete breakdown of high and medium risk medicines with explainability notes', icon: AlertOctagon },
    { title: 'Replenishment Orders Schedule', desc: 'Recommended reorders with MOQ calculations and supplier lead times', icon: Download },
    { title: 'Model Accuracy & Forecast Performance', desc: 'Backtest metrics (MAE, RMSE, WAPE) across all horizons (h=1 to 30)', icon: BarChart3 },
  ];

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate and export operational reports, audit logs, and prediction benchmarks"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <Card key={i} className="p-5 flex items-start justify-between">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                <r.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">{r.desc}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              CSV
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
