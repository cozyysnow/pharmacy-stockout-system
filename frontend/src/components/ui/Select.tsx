import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  helperText,
  error,
  options = [],
  id,
  disabled,
  children,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-slate-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            'w-full appearance-none rounded-lg border bg-white px-3.5 py-2 pr-9 text-xs sm:text-sm text-slate-900 shadow-2xs',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-600',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            error
              ? 'border-rose-300 focus:border-rose-600 focus:ring-rose-200'
              : 'border-slate-300 hover:border-slate-400',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-900">
              {opt.label}
            </option>
          ))}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600 font-semibold">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
