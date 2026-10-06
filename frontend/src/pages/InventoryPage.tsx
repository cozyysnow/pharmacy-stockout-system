import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Filter } from 'lucide-react';
import { RiskBadge, StockStatusBadge } from '@/components/ui/Badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';

export function InventoryPage() {
  return (
    <div>
      <PageHeader
        title="Current Inventory"
        subtitle="Live on-hand balances, safety stock, lead times, and coverage calculations"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export CSV
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead isNumeric>Current Stock</TableHead>
                <TableHead isNumeric>Safety Stock</TableHead>
                <TableHead isNumeric>Open Orders</TableHead>
                <TableHead isNumeric>Coverage Days</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Paracetamol 650 mg Tablet</TableCell>
                <TableCell>Antipyretics</TableCell>
                <TableCell isNumeric>292</TableCell>
                <TableCell isNumeric>101</TableCell>
                <TableCell isNumeric>1,355</TableCell>
                <TableCell isNumeric>3.1 days</TableCell>
                <TableCell><RiskBadge level="HIGH" /></TableCell>
                <TableCell><StockStatusBadge status="IN_STOCK" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Amoxicillin 500 mg Capsule</TableCell>
                <TableCell>Antibiotics</TableCell>
                <TableCell isNumeric>540</TableCell>
                <TableCell isNumeric>120</TableCell>
                <TableCell isNumeric>0</TableCell>
                <TableCell isNumeric>14.2 days</TableCell>
                <TableCell><RiskBadge level="LOW" /></TableCell>
                <TableCell><StockStatusBadge status="IN_STOCK" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Metformin 500 mg Tablet</TableCell>
                <TableCell>Antidiabetics</TableCell>
                <TableCell isNumeric>180</TableCell>
                <TableCell isNumeric>150</TableCell>
                <TableCell isNumeric>300</TableCell>
                <TableCell isNumeric>6.5 days</TableCell>
                <TableCell><RiskBadge level="MEDIUM" /></TableCell>
                <TableCell><StockStatusBadge status="LOW_STOCK" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
