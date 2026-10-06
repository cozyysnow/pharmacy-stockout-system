import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskBadge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { RefreshCw, Info } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';

export function RiskPage() {
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Stock-Out Risk Classification"
        subtitle="Identifies medicines facing potential stock-outs before lead times elapse"
        actions={
          <Button size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Run Risk Analysis
          </Button>
        }
      />

      {/* Risk Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
          <div className="text-xs font-semibold text-rose-800 uppercase">High Risk (Urgent)</div>
          <div className="text-2xl font-bold text-rose-900 mt-1">12 Medicines</div>
          <div className="text-xs text-rose-700 mt-1">Coverage &lt; Supplier Lead Time</div>
        </div>
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
          <div className="text-xs font-semibold text-amber-800 uppercase">Medium Risk (Warning)</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">18 Medicines</div>
          <div className="text-xs text-amber-700 mt-1">Stock eats into safety buffer</div>
        </div>
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
          <div className="text-xs font-semibold text-emerald-800 uppercase">Low Risk (Adequate)</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">55 Medicines</div>
          <div className="text-xs text-emerald-700 mt-1">Above required safety threshold</div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead isNumeric>On-Hand</TableHead>
                <TableHead isNumeric>Exp. Daily Demand</TableHead>
                <TableHead isNumeric>Coverage</TableHead>
                <TableHead isNumeric>Lead Time</TableHead>
                <TableHead isNumeric>Required Stock</TableHead>
                <TableHead>Risk Classification</TableHead>
                <TableHead>Drill Down</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Paracetamol 650 mg Tablet</TableCell>
                <TableCell isNumeric>292</TableCell>
                <TableCell isNumeric>90.7/day</TableCell>
                <TableCell isNumeric className="font-bold text-rose-600">3.1 days</TableCell>
                <TableCell isNumeric>3 days</TableCell>
                <TableCell isNumeric>373.1</TableCell>
                <TableCell><RiskBadge level="HIGH" /></TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Info className="w-3.5 h-3.5" />}
                    onClick={() => setSelectedMedicine('Paracetamol 650 mg Tablet')}
                  >
                    Explain
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Explainability Drawer */}
      <Drawer
        isOpen={!!selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
        title={selectedMedicine}
        subtitle="Stock-Out Risk Decision Explainability Chain"
      >
        <div className="space-y-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
            <span className="text-xs font-bold text-rose-900 block">Risk Diagnosis: HIGH RISK</span>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Current on-hand stock of 292 units will be exhausted in ~3.1 days under forecast demand of 90.7 units/day. The supplier lead time is 3 days. A delayed replenishment risks an immediate stock-out.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-4">
            <h4 className="text-xs font-semibold text-slate-700 uppercase">Calculation Steps</h4>
            <div className="space-y-1.5 font-mono text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <p>• Lead-Time Demand (LTD) = 90.7 × 3 = 272.1 units</p>
              <p>• Safety Stock (SS) = 101 units</p>
              <p>• Required Stock = LTD + SS = 373.1 units</p>
              <p>• Shortfall = max(0, 373.1 - (292 + 1355)) = 0 units (PO covers future)</p>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
