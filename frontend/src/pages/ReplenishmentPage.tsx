import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { RiskBadge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/Modal';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Check, X, ShoppingCart } from 'lucide-react';

export function ReplenishmentPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Replenishment Decision Support"
        subtitle="Automated reorder recommendations. All actions require manual review and staff sign-off."
      />

      <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-900">
        <strong>Human-in-the-Loop Safeguard:</strong> This system does not automatically place orders or communicate with external vendors. Marking an order placed updates the internal open-order inventory ledger.
      </div>

      <Tabs
        tabs={[
          { id: 'pending', label: 'Pending Review', badge: '5' },
          { id: 'accepted', label: 'Accepted', badge: '2' },
          { id: 'ordered', label: 'Order Placed (Manual)', badge: '4' },
          { id: 'dismissed', label: 'Dismissed' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead isNumeric>Lead Time</TableHead>
                <TableHead isNumeric>Current Stock</TableHead>
                <TableHead isNumeric>Required Stock</TableHead>
                <TableHead isNumeric>Recommended Qty (MOQ)</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Staff Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Azithromycin 500 mg Tablet</TableCell>
                <TableCell>MediSource Logistics</TableCell>
                <TableCell isNumeric>5 days</TableCell>
                <TableCell isNumeric>45</TableCell>
                <TableCell isNumeric>210</TableCell>
                <TableCell isNumeric className="font-bold text-teal-800">180 units (MOQ: 20)</TableCell>
                <TableCell><RiskBadge level="HIGH" /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button size="sm" variant="primary" leftIcon={<Check className="w-3.5 h-3.5" />}>
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                      onClick={() => setOrderModalOpen(true)}
                    >
                      Mark Ordered
                    </Button>
                    <Button size="sm" variant="ghost" leftIcon={<X className="w-3.5 h-3.5" />}>
                      Dismiss
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        onConfirm={() => {
          alert('Recorded manual purchase order! Open order quantity updated.');
          setOrderModalOpen(false);
        }}
        title="Record Manual Purchase Order"
        message="Are you sure you want to mark this recommendation as Ordered? This will increment the medicine's Open Order Quantity by 180 units. NOTE: No vendor will be contacted."
        confirmText="Confirm Manual Order"
      />
    </div>
  );
}
