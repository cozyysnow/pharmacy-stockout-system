import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Tabs } from '@/components/ui/Tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Link } from 'react-router-dom';

export function MedicinesPage() {
  const [activeTab, setActiveTab] = useState('medicines');

  return (
    <div>
      <PageHeader
        title="Medicines & Suppliers"
        subtitle="Manage pharmacy catalogue, supplier master details, lead times, and reorder policies"
        actions={
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            {activeTab === 'medicines' ? 'Add Medicine' : 'Add Supplier'}
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'medicines', label: 'Medicines Catalogue', badge: '85' },
          { id: 'suppliers', label: 'Suppliers Master', badge: '15' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-4"
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead isNumeric>Lead Time</TableHead>
                <TableHead isNumeric>MOQ</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">MED-APY-002</TableCell>
                <TableCell className="font-semibold text-teal-800 hover:underline">
                  <Link to="/medicines/10">Paracetamol 650 mg Tablet</Link>
                </TableCell>
                <TableCell>Antipyretics</TableCell>
                <TableCell>Sarthak Healthcare</TableCell>
                <TableCell isNumeric>3 days</TableCell>
                <TableCell isNumeric>15</TableCell>
                <TableCell>
                  <Link to="/medicines/10" className="text-xs text-teal-700 hover:text-teal-900 font-medium">
                    View Details →
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
