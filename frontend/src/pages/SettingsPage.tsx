import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Info, Shield, Users, Sliders, Cpu } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('thresholds');

  return (
    <div>
      <PageHeader
        title="Settings & System Configuration"
        subtitle="Manage stock-out thresholds, user permissions, and view system provenance"
      />

      <Tabs
        tabs={[
          { id: 'thresholds', label: 'Risk & Alert Thresholds', icon: <Sliders className="w-4 h-4" /> },
          { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
          { id: 'model', label: 'ML Model Settings', icon: <Cpu className="w-4 h-4" /> },
          { id: 'about', label: 'About & Disclaimer', icon: <Info className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === 'thresholds' && (
        <Card>
          <CardHeader
            title="Operational Thresholds"
            subtitle="Configurable parameters for risk scores and alert triggers"
          />
          <CardContent className="space-y-4 max-w-xl">
            <Input
              label="High Risk Score Cutoff"
              defaultValue="49.77"
              helperText="Medicines with risk_score >= 49.77 are classified as HIGH RISK"
            />
            <Input
              label="Medium Risk Score Cutoff"
              defaultValue="25.54"
              helperText="Medicines with 25.54 <= risk_score < 49.77 are classified as MEDIUM RISK"
            />
            <Input
              label="Demand Spike Threshold (%)"
              defaultValue="30"
              helperText="Trigger alert when 7-day forecast exceeds 28-day baseline by this percentage"
            />
            <div className="pt-2">
              <Button size="sm">Save Thresholds</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'about' && (
        <Card>
          <CardHeader
            title="System Provenance & Clinical Notice"
            subtitle="PharmaStock IQ — Version 1.0.0 (B.Tech Live Project)"
          />
          <CardContent className="space-y-3 text-xs text-slate-600 leading-relaxed max-w-3xl">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
              <strong className="block mb-1">Mandatory Operational Disclaimer:</strong>
              This application is an inventory decision-support tool designed strictly for pharmacy staff. It provides no clinical, prescription, dosage, or medical treatment advice. All replenishment and purchase orders must be approved by authorized personnel.
            </div>
            <p>
              <strong>Dataset Provenance:</strong> Validated pharmacy dataset comprising 155,210 daily records spanning 2021-01-01 to 2025-12-31 across 85 medicines, 11 categories, and 15 suppliers.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab !== 'thresholds' && activeTab !== 'about' && (
        <Card>
          <CardContent className="p-6 text-xs text-slate-500">
            [Settings Tab Configured: Active role-based controls available in Phase 3/4]
          </CardContent>
        </Card>
      )}
    </div>
  );
}
