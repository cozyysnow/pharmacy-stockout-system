import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-slate-200 rounded-card shadow-xs transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({
  className,
  title,
  subtitle,
  action,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn('px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4', className)}
      {...props}
    >
      <div>
        {title && <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 leading-normal">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  delta?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  variant?: 'default' | 'critical' | 'warning' | 'success';
}

export function KpiCard({ title, value, subtitle, icon, delta, variant = 'default' }: KpiCardProps) {
  const iconVariants = {
    default: 'bg-slate-100 text-slate-700',
    critical: 'bg-rose-50 text-rose-700 border border-rose-200/70',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/70',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/70',
  };

  return (
    <Card className="p-4 sm:p-5 hover:shadow-cardHover transition-all">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
        {icon && (
          <div className={cn('p-2 rounded-lg shrink-0', iconVariants[variant])}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
        {value}
      </div>

      {(subtitle || delta) && (
        <div className="mt-3 flex items-center flex-wrap gap-2 text-xs">
          {delta && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.5 rounded text-[11px] border',
                delta.isNeutral
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : delta.isPositive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                  : 'bg-rose-50 text-rose-800 border-rose-200/80'
              )}
            >
              {delta.value}
            </span>
          )}
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
        </div>
      )}
    </Card>
  );
}
