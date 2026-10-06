import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, AlertTriangle, CheckCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AlertsPage() {
  return (
    <div>
      <PageHeader
        title="Alerts Center"
        subtitle="Active warnings for critical stock-outs, demand surges, and forecast discrepancies"
        actions={
          <Button size="sm" variant="outline" leftIcon={<CheckCheck className="w-4 h-4" />}>
            Acknowledge All
          </Button>
        }
      />

      <div className="space-y-3">
        {/* Alert Card 1 */}
        <Card className="border-l-4 border-l-rose-500">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-rose-100 text-rose-600 shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="critical">CRITICAL HIGH RISK</Badge>
                  <span className="text-xs text-slate-400">10 mins ago</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">
                  Paracetamol 650 mg Tablet — Stock-out predicted within 3.1 days
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Available stock: 281 units. Projected daily consumption: 90.7 units. Supplier lead time: 3 days.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Link to="/medicines/10">
                <Button size="sm" variant="outline">
                  View Medicine
                </Button>
              </Link>
              <Button size="sm" variant="secondary" leftIcon={<Check className="w-3.5 h-3.5" />}>
                Acknowledge
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Card 2 */}
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">DEMAND SPIKE</Badge>
                  <span className="text-xs text-slate-400">2 hours ago</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">
                  Cetirizine 10 mg Tablet — Demand surge (+42% over trailing 28 days)
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Forecast demand averages 145 units/day vs trailing baseline of 102 units/day.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Button size="sm" variant="secondary" leftIcon={<Check className="w-3.5 h-3.5" />}>
                Acknowledge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
