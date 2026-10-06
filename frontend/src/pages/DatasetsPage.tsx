import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Database, CheckCircle2, FileSpreadsheet, HardDrive, ShieldCheck } from 'lucide-react';

export function DatasetsPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [activeTab, setActiveTab] = useState('pipeline');

  const steps = [
    { num: 1, title: 'Source', desc: 'Bundled CSV' },
    { num: 2, title: 'Preview', desc: '155k rows' },
    { num: 3, title: 'Schema Check', desc: '72 Columns' },
    { num: 4, title: 'Validation', desc: '17/17 Checks' },
    { num: 5, title: 'Column Map', desc: 'Field mapping' },
    { num: 6, title: 'Preprocess', desc: 'Feature prep' },
    { num: 7, title: 'DB Ingest', desc: 'PostgreSQL' },
  ];

  return (
    <div>
      <PageHeader
        title="Dataset Management & Studio"
        subtitle="Inspect, validate, and ingest historical pharmacy demand & inventory records (2021–2025)"
      />

      <Tabs
        tabs={[
          { id: 'pipeline', label: '7-Step Ingestion Stepper' },
          { id: 'validation', label: '17 Validation Checks Report' },
          { id: 'stats', label: 'Dataset Statistics & Summary' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {/* Stepper navigation bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {steps.map((s) => {
          const isActive = s.num === activeStep;
          const isDone = s.num < activeStep;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isActive
                  ? 'border-teal-700 bg-teal-50/50 shadow-xs ring-1 ring-teal-700'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">Step 0{s.num}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">{s.title}</div>
              <div className="text-[10px] text-slate-500">{s.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Step View Card */}
      <Card>
        <CardHeader
          title={`Step ${activeStep}: ${steps[activeStep - 1].title}`}
          subtitle="Validated local dataset: data/raw/pharmacy_stockout_dataset.csv"
          action={
            <div className="flex gap-2">
              {activeStep > 1 && (
                <Button size="sm" variant="outline" onClick={() => setActiveStep(activeStep - 1)}>
                  Previous Step
                </Button>
              )}
              {activeStep < 7 && (
                <Button size="sm" onClick={() => setActiveStep(activeStep + 1)}>
                  Next Step →
                </Button>
              )}
            </div>
          }
        />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block">Total Records</span>
              <span className="text-sm font-bold text-slate-900">155,210 rows</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Medicines / Suppliers</span>
              <span className="text-sm font-bold text-slate-900">85 meds / 15 supp</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Date Range</span>
              <span className="text-sm font-bold text-slate-900">2021-01-01 to 2025-12-31</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Validation Status</span>
              <Badge variant="success">17/17 Checks Passed</Badge>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            The dataset file is located at <code className="text-teal-800 bg-slate-100 px-1 py-0.5 rounded font-mono">data/raw/pharmacy_stockout_dataset.csv</code>.
            Schema includes 72 columns encompassing observed demand, unmet shortage demand, stock levels, lead times, safety stocks, and historical stock-outs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
