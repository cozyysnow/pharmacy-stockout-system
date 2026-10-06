import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { MedicinesPage } from '@/pages/MedicinesPage';
import { MedicineDetailsPage } from '@/pages/MedicineDetailsPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { ForecastPage } from '@/pages/ForecastPage';
import { RiskPage } from '@/pages/RiskPage';
import { ReplenishmentPage } from '@/pages/ReplenishmentPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { DatasetsPage } from '@/pages/DatasetsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { LoginPage } from '@/pages/LoginPage';
import { StyleguidePage } from '@/pages/StyleguidePage';
import { ErrorState } from '@/components/feedback/ErrorState';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppShell />,
    errorElement: (
      <div className="p-8 max-w-lg mx-auto">
        <ErrorState
          title="Page Navigation Error"
          message="An unexpected route rendering error occurred."
          onRetry={() => window.location.reload()}
        />
      </div>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'medicines', element: <MedicinesPage /> },
      { path: 'medicines/:id', element: <MedicineDetailsPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'forecast', element: <ForecastPage /> },
      { path: 'risk', element: <RiskPage /> },
      { path: 'replenishment', element: <ReplenishmentPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'datasets', element: <DatasetsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '_styleguide', element: <StyleguidePage /> },
      {
        path: '*',
        element: (
          <div className="py-12">
            <ErrorState
              title="404 — Page Not Found"
              message="The requested section does not exist in the application."
            />
          </div>
        ),
      },
    ],
  },
]);
