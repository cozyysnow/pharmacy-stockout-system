import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'accent' | 'success' | 'warning' | 'critical' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'border border-slate-300 text-slate-700 bg-white shadow-2xs',
    accent: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    critical: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  const sizes = {
    sm: 'text-[11px] font-semibold px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-0.8',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border select-none gap-1.5 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export function RiskBadge({ level, showIcon = true, className }: { level: RiskLevel; showIcon?: boolean; className?: string }) {
  if (level === 'HIGH') {
    return (
      <Badge variant="critical" className={cn('tracking-wide font-bold', className)}>
        {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
        <span>HIGH RISK</span>
      </Badge>
    );
  }
  if (level === 'MEDIUM') {
    return (
      <Badge variant="warning" className={cn('tracking-wide font-bold', className)}>
        {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
        <span>MEDIUM RISK</span>
      </Badge>
    );
  }
  return (
    <Badge variant="success" className={cn('tracking-wide font-bold', className)}>
      {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
      <span>LOW RISK</span>
    </Badge>
  );
}

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export function StockStatusBadge({ status, className }: { status: StockStatus; className?: string }) {
  if (status === 'OUT_OF_STOCK') {
    return (
      <Badge variant="critical" className={cn('font-semibold', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
        <span>Out of Stock</span>
      </Badge>
    );
  }
  if (status === 'LOW_STOCK') {
    return (
      <Badge variant="warning" className={cn('font-semibold', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
        <span>Low Stock</span>
      </Badge>
    );
  }
  return (
    <Badge variant="success" className={cn('font-semibold', className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
      <span>In Stock</span>
    </Badge>
  );
}
