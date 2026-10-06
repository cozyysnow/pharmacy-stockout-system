import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertCircle } from 'lucide-react';

export function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <Header
          onToggleSidebar={() => setIsOpenMobile(!isOpenMobile)}
          unreadAlertsCount={3}
          asOfDate="2025-12-31"
        />

        {/* Page Container with Compact Professional Spacing */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 max-w-[1536px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Persistent Limitation Notice (Section 6.3) */}
        <footer className="border-t border-slate-200/90 bg-white py-2 px-4 text-center text-[11px] text-slate-500">
          <div className="flex items-center justify-center gap-1.5 max-w-4xl mx-auto">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong>Decision support only.</strong> Stock-out predictions and replenishment advice require clinical pharmacist verification. No automated purchasing.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
