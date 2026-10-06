import React from 'react';
import { Search, Bell, Calendar, Menu, Sparkles, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  onToggleSidebar: () => void;
  unreadAlertsCount?: number;
  asOfDate?: string;
  userName?: string;
  userRole?: string;
}

export function Header({
  onToggleSidebar,
  unreadAlertsCount = 3,
  asOfDate = '2025-12-31',
  userName = 'Dr. Sharma',
  userRole = 'Lead Clinical Pharmacist',
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-3 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search medicine, SKU, category, supplier..."
            className="w-full rounded-md border border-slate-200 bg-slate-50/80 pl-8 pr-12 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15 focus:border-teal-700 transition-all shadow-2xs"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded pointer-events-none">
            Ctrl+K
          </span>
        </div>
      </div>

      {/* Right: Operational Status, Data-as-of badge, Alerts, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Active ML Engine Model Chip */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-[11px] font-bold">
          <Sparkles className="w-3 h-3 text-teal-700" />
          <span>Active Model: <span className="font-extrabold text-teal-900">HistGBM (Multi-Horizon)</span></span>
        </div>

        {/* Data As Of Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>Data as of: <strong className="text-slate-900 font-bold">{asOfDate}</strong></span>
        </div>

        {/* Alerts Bell */}
        <Link
          to="/alerts"
          className="relative p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Clinical Alerts Center"
          aria-label="View alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white shadow-2xs animate-pulse">
              {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
            </span>
          )}
        </Link>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2.5 border-l border-slate-200">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B132B] text-teal-400 font-bold text-xs shadow-2xs border border-slate-700">
            {userName.charAt(0)}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {userName}
            </div>
            <div className="text-[10px] text-teal-700 font-bold tracking-tight">
              {userRole}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
