import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <Loader2 className="w-7 h-7 animate-spin text-teal-700 mb-2.5" />
      <p className="text-xs font-medium text-slate-500">{message}</p>
    </div>
  );
}
