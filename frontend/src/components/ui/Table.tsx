import React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-2xs">
      <table className={cn('w-full text-left border-collapse text-xs sm:text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-slate-100 bg-white', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('hover:bg-slate-50/80 transition-colors', className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, isNumeric, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & { isNumeric?: boolean }) {
  return (
    <th className={cn('px-4 py-3 select-none text-slate-600', isNumeric && 'text-right', className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className, isNumeric, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & { isNumeric?: boolean }) {
  return (
    <td className={cn('px-4 py-3 text-slate-800 whitespace-nowrap', isNumeric && 'text-right tabular-nums', className)} {...props}>
      {children}
    </td>
  );
}
