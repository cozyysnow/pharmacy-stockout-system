import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Download, Filter } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Transaction Ledger"
        subtitle="Immutable record of stock movements (Sales, Purchases, Returns, Adjustments, Write-offs)"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export Ledger
            </Button>
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
              Record Transaction
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead isNumeric>Quantity</TableHead>
                <TableHead isNumeric>Balance After</TableHead>
                <TableHead>Reference / Reason</TableHead>
                <TableHead>Recorded By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-xs text-slate-500">2025-12-31 16:45</TableCell>
                <TableCell><Badge variant="secondary">SALE</Badge></TableCell>
                <TableCell className="font-semibold text-slate-900">Paracetamol 650 mg Tablet</TableCell>
                <TableCell isNumeric className="font-semibold text-rose-600">-81</TableCell>
                <TableCell isNumeric>292</TableCell>
                <TableCell className="text-xs text-slate-500">Counter Dispense</TableCell>
                <TableCell className="text-xs text-slate-700">Staff (S. Verma)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs text-slate-500">2025-12-30 11:20</TableCell>
                <TableCell><Badge variant="success">PURCHASE</Badge></TableCell>
                <TableCell className="font-semibold text-slate-900">Amoxicillin 500 mg Capsule</TableCell>
                <TableCell isNumeric className="font-semibold text-emerald-600">+250</TableCell>
                <TableCell isNumeric>540</TableCell>
                <TableCell className="text-xs text-slate-500">PO-2025-1049 Delivery</TableCell>
                <TableCell className="text-xs text-slate-700">Manager</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Transaction Modal Preview */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Inventory Transaction"
        subtitle="Atomically updates stock balance; negative stock is strictly blocked"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { alert('Transaction created (Phase 4 integration)'); setIsModalOpen(false); }}>
              Confirm Transaction
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Transaction Type"
            options={[
              { value: 'SALE', label: 'SALE (Dispense to Customer)' },
              { value: 'PURCHASE', label: 'PURCHASE (Receive Stock from Supplier)' },
              { value: 'CUSTOMER_RETURN', label: 'CUSTOMER_RETURN (Stock Restocked)' },
              { value: 'SUPPLIER_RETURN', label: 'SUPPLIER_RETURN (Returned to Supplier)' },
              { value: 'ADJUSTMENT', label: 'ADJUSTMENT (Audit Correction with Reason)' },
              { value: 'DAMAGED', label: 'DAMAGED (Write-off Damaged Stock)' },
              { value: 'EXPIRED', label: 'EXPIRED (Write-off Expired Stock)' },
            ]}
          />
          <Input label="Medicine" placeholder="Select medicine..." defaultValue="Paracetamol 650 mg Tablet" />
          <Input label="Quantity (units)" type="number" min="1" placeholder="Enter positive quantity..." defaultValue="10" />
          <Input label="Reason / Notes" placeholder="e.g., Physical count adjustment, counter sale invoice..." />
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800">
            <strong>Stock Preview:</strong> Current on hand: 292 → Resulting balance: 282 units.
          </div>
        </div>
      </Modal>
    </div>
  );
}
