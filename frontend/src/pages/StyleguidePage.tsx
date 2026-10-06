import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardContent, CardFooter, KpiCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, RiskBadge, StockStatusBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Tabs } from '@/components/ui/Tabs';
import { Tooltip } from '@/components/ui/Tooltip';
import { Pagination } from '@/components/ui/Pagination';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Skeleton, TableSkeleton, CardSkeleton } from '@/components/feedback/Skeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { useToast } from '@/components/feedback/Toast';
import {
  Boxes,
  Pill,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Mail,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Layers,
  HelpCircle,
} from 'lucide-react';

export function StyleguidePage() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [pillsTab, setPillsTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-10 pb-12">
      <PageHeader
        title="PharmaStock IQ — UI Design System & Component Styleguide"
        subtitle="Phase 1 Deliverable: Interactive catalog of design tokens, primitives, feedback states, and layout shells"
        actions={
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                addToast({
                  type: 'info',
                  title: 'Notification Triggered',
                  message: 'This is a test notification from the styleguide showcase.',
                });
              }}
            >
              Trigger Toast
            </Button>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              Open Sample Modal
            </Button>
          </div>
        }
      />

      {/* 1. Design Tokens & Palette */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          1. Color Hierarchy & Design Tokens (Professional Neutral & Targeted Emerald Accent)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-lg bg-emerald-600 text-white text-xs shadow-xs">
            <div className="font-bold">Primary Accent</div>
            <div className="text-[11px] opacity-90 mt-1">#059669 (Emerald)</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-900 text-white text-xs shadow-xs">
            <div className="font-bold">Dark Charcoal</div>
            <div className="text-[11px] text-slate-400 mt-1">#0F172A (Primary Text)</div>
          </div>
          <div className="p-3.5 rounded-lg bg-white text-slate-900 border border-slate-200 text-xs shadow-2xs">
            <div className="font-bold">Neutral Off-White</div>
            <div className="text-[11px] text-slate-500 mt-1">#F8FAFC (App BG)</div>
          </div>
          <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs">
            <div className="font-bold">Status: LOW RISK</div>
            <div className="text-[11px] text-emerald-700 mt-1">#059669 / Soft Mint</div>
          </div>
          <div className="p-3.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs">
            <div className="font-bold">Status: MEDIUM</div>
            <div className="text-[11px] text-amber-700 mt-1">#D97706 / Warm Amber</div>
          </div>
          <div className="p-3.5 rounded-lg bg-rose-50 text-rose-900 border border-rose-200 text-xs">
            <div className="font-bold">Status: HIGH RISK</div>
            <div className="text-[11px] text-rose-700 mt-1">#DC2626 / Crisp Red</div>
          </div>
        </div>
      </section>

      {/* 2. Buttons */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">2. Button Components & Variants</h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Teal</Button>
              <Button variant="secondary">Secondary Slate</Button>
              <Button variant="outline">Outline Border</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Action</Button>
              <Button isLoading>Processing...</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
              <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>Small Size</Button>
              <Button size="md" leftIcon={<RefreshCw className="w-4 h-4" />}>Medium Size</Button>
              <Button size="lg" rightIcon={<CheckCircle2 className="w-5 h-5" />}>Large Size</Button>
              <Button disabled>Disabled State</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Badges */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">3. Status & Stock-Out Risk Badges</h2>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-2">Stock-Out Risk Badges (Accessible with Icons)</span>
              <div className="flex flex-wrap items-center gap-3">
                <RiskBadge level="LOW" />
                <RiskBadge level="MEDIUM" />
                <RiskBadge level="HIGH" />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block mb-2">Instantaneous Stock Status Badges</span>
              <div className="flex flex-wrap items-center gap-3">
                <StockStatusBadge status="IN_STOCK" />
                <StockStatusBadge status="LOW_STOCK" />
                <StockStatusBadge status="OUT_OF_STOCK" />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block mb-2">Generic Tag Badges</span>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="critical">Critical</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. KPI Cards */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">4. KPI Metric Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Medicines"
            value="85"
            subtitle="11 categories"
            icon={<Pill className="w-5 h-5 text-slate-700" />}
            delta={{ value: '+2 new', isPositive: true }}
          />
          <KpiCard
            title="Current Stock Units"
            value="42,850"
            subtitle="Pharmacy on-hand"
            icon={<Boxes className="w-5 h-5 text-slate-700" />}
          />
          <KpiCard
            title="High-Risk Items"
            value="12"
            subtitle="Coverage < Lead Time"
            icon={<AlertTriangle className="w-5 h-5 text-rose-700" />}
            variant="critical"
            delta={{ value: 'Urgent attention', isPositive: false }}
          />
          <KpiCard
            title="Replenishment Orders"
            value="5"
            subtitle="Action required"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-700" />}
            variant="success"
          />
        </div>
      </section>

      {/* 5. Form Inputs */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">5. Form Controls (Input, Select, Textarea & Tooltips)</h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Standard Text Input"
                placeholder="e.g. Paracetamol"
                helperText="Helper description text"
              />
              <Input
                label="Input with Icon"
                placeholder="Search catalogue..."
                leftIcon={<Search className="w-4 h-4" />}
              />
              <Input
                label="Input with Error State"
                defaultValue="Invalid Stock Level -5"
                error="Quantity must be a positive integer"
              />
              <Select
                label="Category Selector"
                options={[
                  { value: 'antipyretics', label: 'Antipyretics' },
                  { value: 'antibiotics', label: 'Antibiotics' },
                  { value: 'analgesics', label: 'Analgesics' },
                ]}
              />
              <Select
                label="Select with Error"
                error="Supplier selection is required"
                options={[{ value: '', label: 'Select a supplier...' }]}
              />
              <Input
                label="Disabled Control"
                disabled
                defaultValue="Read-only system field"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <Textarea
                label="Audit & Adjustment Notes"
                placeholder="Enter stock audit justification..."
                helperText="Required for manual inventory adjustments"
              />
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Tooltips & Context Help</label>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Tooltip content="Expected Daily Demand is calculated over rolling 30-day sales">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 cursor-help">
                      <HelpCircle className="w-3.5 h-3.5 text-teal-700" /> Hover for Metric Tooltip (Top)
                    </span>
                  </Tooltip>
                  <Tooltip position="right" content="Stockout risk exceeds critical threshold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-medium text-rose-700 bg-rose-50 cursor-help">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Right Tooltip
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 6. Tabs, Tables & Pagination */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">6. Tabs, Data Table & Pagination</h2>
        <Card>
          <CardHeader
            title="Medicine Stock Ledger"
            action={
              <Tabs
                variant="pills"
                tabs={[
                  { id: 'all', label: 'All Items' },
                  { id: 'critical', label: 'High Risk' },
                ]}
                activeTab={pillsTab}
                onChange={setPillsTab}
              />
            }
          />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead isNumeric>On-Hand</TableHead>
                  <TableHead isNumeric>Safety Stock</TableHead>
                  <TableHead isNumeric>Coverage</TableHead>
                  <TableHead>Risk Classification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-slate-900">Paracetamol 650 mg Tablet</TableCell>
                  <TableCell>Antipyretics</TableCell>
                  <TableCell isNumeric>292</TableCell>
                  <TableCell isNumeric>101</TableCell>
                  <TableCell isNumeric className="font-bold text-rose-600">3.1 days</TableCell>
                  <TableCell><RiskBadge level="HIGH" /></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setDrawerOpen(true)}>
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-slate-900">Amoxicillin 500 mg Capsule</TableCell>
                  <TableCell>Antibiotics</TableCell>
                  <TableCell isNumeric>540</TableCell>
                  <TableCell isNumeric>120</TableCell>
                  <TableCell isNumeric className="text-emerald-600">14.2 days</TableCell>
                  <TableCell><RiskBadge level="LOW" /></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setDrawerOpen(true)}>
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Pagination
              currentPage={currentPage}
              totalPages={9}
              totalItems={85}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
      </section>

      {/* 7. Feedback States (Loading, Empty, Error) */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">7. Feedback States (Loading, Empty & Error)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <LoadingState message="Fetching forecast calculations..." />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <EmptyState
                title="No Open Alerts"
                description="All inventory alerts have been acknowledged or resolved."
                actionLabel="View History"
                onAction={() => alert('View history clicked')}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <ErrorState
                title="API Connection Failed"
                message="Could not reach the prediction service on localhost:8000."
                technicalHint="ECONNREFUSED 127.0.0.1:8000"
                onRetry={() => alert('Retrying connection...')}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 8. Skeletons */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">8. Skeleton Loaders (No bare spinners)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardSkeleton />
          <TableSkeleton rows={3} cols={3} />
        </div>
      </section>

      {/* 9. Interactive Dialogs & Drawers */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">9. Modals, Confirm Dialogs & Drawers</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>Open Confirm Dialog</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Side Drawer</Button>
        </div>
      </section>

      {/* Sample Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Interactive Dialog Example"
        subtitle="Accessible dialog with backdrop blur and escape key handling"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>
              Save Changes
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          This modal dialog supports full keyboard navigation, escape-key closing, focus traps, and responsive sizing across mobile and desktop.
        </p>
      </Modal>

      {/* Sample Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          addToast({ type: 'success', title: 'Action Confirmed', message: 'Item was removed.' });
          setConfirmOpen(false);
        }}
        title="Delete Record"
        message="Are you sure you want to deactivate this item? This action will not remove historical transaction logs."
        isDestructive
        confirmText="Deactivate"
      />

      {/* Sample Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Medicine Explainability Drawer"
        subtitle="Drill-down side panel for detailed calculation inspection"
        footer={
          <Button size="sm" onClick={() => setDrawerOpen(false)}>
            Close Drawer
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed">
            <strong className="text-slate-900">Explainability Rule:</strong> Stock coverage is calculated as <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-800">Current Stock / Expected Daily Demand</code>.
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-700 space-y-1">
            <p>On-Hand Balance: 292 units</p>
            <p>Lead Time: 3 days</p>
            <p>Safety Buffer: 101 units</p>
            <p>Coverage: 3.1 days</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
