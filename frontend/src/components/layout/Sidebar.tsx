import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Pill,
  ArrowLeftRight,
  TrendingUp,
  AlertTriangle,
  Truck,
  Bell,
  Database,
  FileBarChart,
  Settings,
  Palette,
  ChevronLeft,
  ChevronRight,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: 'critical' | 'warning' | 'default';
}

const mainNav: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory Ledger', href: '/inventory', icon: Boxes },
  { name: 'Medicines & Suppliers', href: '/medicines', icon: Pill },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Demand Forecasting', href: '/forecast', icon: TrendingUp },
  { name: 'Stock-Out Risk', href: '/risk', icon: AlertTriangle, badge: '12', badgeVariant: 'critical' },
  { name: 'Replenishment', href: '/replenishment', icon: Truck, badge: '5', badgeVariant: 'warning' },
  { name: 'Alerts Center', href: '/alerts', icon: Bell, badge: '3', badgeVariant: 'critical' },
];

const secondaryNav: NavItem[] = [
  { name: 'Dataset Studio', href: '/datasets', icon: Database },
  { name: 'Reports & Export', href: '/reports', icon: FileBarChart },
  { name: 'System Settings', href: '/settings', icon: Settings },
  { name: 'UI Styleguide', href: '/_styleguide', icon: Palette },
];

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container - Deep Navy Healthcare Operations */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-800 bg-[#0B132B] text-slate-300 transition-all duration-200 ease-in-out lg:static shrink-0 select-none',
          isCollapsed ? 'w-[72px]' : 'w-60',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-800/80 px-3.5">
          <NavLink to="/" className="flex items-center gap-2.5 overflow-hidden group">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 group-hover:bg-teal-500/25 transition-colors shadow-2xs">
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight text-white uppercase">
                    PharmaStock
                  </span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    IQ
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">
                  Hospital Operations
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5">
          {/* Main section */}
          <div>
            {!isCollapsed && (
              <p className="px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Core Operations
              </p>
            )}
            <nav className="space-y-0.5">
              {mainNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-teal-500/15 text-white font-bold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r-full before:bg-teal-400 shadow-2xs'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white',
                      isCollapsed && 'justify-center px-2 py-2'
                    )
                  }
                  title={isCollapsed ? item.name : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      {!isCollapsed && <span className="flex-1 truncate">{item.name}</span>}
                      {!isCollapsed && item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-black px-1.5 py-0.2 rounded-full border shrink-0',
                            item.badgeVariant === 'critical'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : item.badgeVariant === 'warning'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* System & Analytics section */}
          <div>
            {!isCollapsed && (
              <p className="px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Intelligence & Setup
              </p>
            )}
            <nav className="space-y-0.5">
              {secondaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-teal-500/15 text-white font-bold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r-full before:bg-teal-400 shadow-2xs'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white',
                      isCollapsed && 'justify-center px-2 py-2'
                    )
                  }
                  title={isCollapsed ? item.name : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      {!isCollapsed && <span className="flex-1 truncate">{item.name}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer info card */}
        {!isCollapsed && (
          <div className="p-2.5 border-t border-slate-800/80 bg-slate-900/60 m-2 rounded-lg text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div className="text-[10px] font-bold text-slate-200">Decision Engine Active</div>
            </div>
            <p className="text-[9px] text-slate-400 mt-1 leading-snug">
              Human-in-the-loop validation active. Automated supplier dispatch disabled.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
