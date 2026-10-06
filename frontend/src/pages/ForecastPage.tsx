import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { RefreshCw, Play } from 'lucide-react';

export function ForecastPage() {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <div>
      <PageHeader
        title="Demand Forecasting & Model Evaluation"
        subtitle="Chronologically-validated multi-step demand predictions across 85 medicines"
        actions={
          <Button size="sm" leftIcon={<Play className="w-4 h-4" />}>
            Generate New Forecasts
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'comparison', label: 'Model Benchmark & Comparison' },
          { id: 'forecasts', label: 'Medicine Forecast Viewer' },
          { id: 'backtest', label: 'Chronological Backtest Evaluation' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === 'comparison' && (
        <Card>
          <CardHeader
            title="Model Evaluation Benchmark (Test Horizon h=1 to 30 Days)"
            subtitle="Comparing candidate models against simple baselines on held-out 2025 test dataset"
          />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model / Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead isNumeric>Test MAE (h=1)</TableHead>
                  <TableHead isNumeric>Multi-Step MAE (30d)</TableHead>
                  <TableHead isNumeric>RMSE</TableHead>
                  <TableHead isNumeric>WAPE (%)</TableHead>
                  <TableHead>Selection Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-teal-50/40">
                  <TableCell className="font-semibold text-teal-900">HistGradientBoosting (Documented)</TableCell>
                  <TableCell><Badge variant="secondary">Global ML</Badge></TableCell>
                  <TableCell isNumeric className="font-bold text-teal-800">8.072</TableCell>
                  <TableCell isNumeric className="font-bold text-teal-800">9.450</TableCell>
                  <TableCell isNumeric>12.84</TableCell>
                  <TableCell isNumeric>13.4%</TableCell>
                  <TableCell><Badge variant="success">Active Production Model</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-900">Random Forest Regressor</TableCell>
                  <TableCell><Badge variant="default">Global ML</Badge></TableCell>
                  <TableCell isNumeric>8.310</TableCell>
                  <TableCell isNumeric>9.820</TableCell>
                  <TableCell isNumeric>13.12</TableCell>
                  <TableCell isNumeric>14.1%</TableCell>
                  <TableCell><Badge variant="outline">Candidate</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-900">Linear Regression (Lags+Rolling)</TableCell>
                  <TableCell><Badge variant="default">Linear Reference</Badge></TableCell>
                  <TableCell isNumeric>9.140</TableCell>
                  <TableCell isNumeric>11.050</TableCell>
                  <TableCell isNumeric>14.20</TableCell>
                  <TableCell isNumeric>16.2%</TableCell>
                  <TableCell><Badge variant="outline">Candidate</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-600">Rolling Mean (7-Day Baseline)</TableCell>
                  <TableCell><Badge variant="outline">Baseline</Badge></TableCell>
                  <TableCell isNumeric>8.552</TableCell>
                  <TableCell isNumeric>10.120</TableCell>
                  <TableCell isNumeric>13.68</TableCell>
                  <TableCell isNumeric>14.8%</TableCell>
                  <TableCell><span className="text-xs text-slate-400">Baseline</span></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-600">Naive Lag-1 Baseline</TableCell>
                  <TableCell><Badge variant="outline">Baseline</Badge></TableCell>
                  <TableCell isNumeric>10.984</TableCell>
                  <TableCell isNumeric>14.230</TableCell>
                  <TableCell isNumeric>17.45</TableCell>
                  <TableCell isNumeric>19.5%</TableCell>
                  <TableCell><span className="text-xs text-slate-400">Baseline</span></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab !== 'comparison' && (
        <Card>
          <CardHeader title="Medicine Forecast Explorer" />
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs">
              [Phase 2/6: Interactive Multi-Step Forecast Chart with Prediction Intervals & Shaded Lead-Time Window]
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
