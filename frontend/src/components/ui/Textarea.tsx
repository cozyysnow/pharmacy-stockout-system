import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  helperText,
  error,
  id,
  disabled,
  rows = 3,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold text-slate-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        rows={rows}
        className={cn(
          'w-full rounded-lg border bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-2xs',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-600',
          'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-y',
          error
            ? 'border-rose-300 focus:border-rose-600 focus:ring-rose-200'
            : 'border-slate-300 hover:border-slate-400',
          className
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600 font-semibold">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
