import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  technicalHint?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Failed to load data',
  message = 'An unexpected error occurred while processing your request.',
  technicalHint,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-rose-200 bg-rose-50/30',
        className
      )}
    >
      <div className="p-3 bg-rose-100 rounded-full text-rose-600 mb-3.5">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-rose-900">{title}</h4>
      <p className="text-xs text-rose-700/80 mt-1 max-w-sm leading-relaxed">{message}</p>
      {technicalHint && (
        <code className="mt-2 text-[11px] bg-rose-100/70 text-rose-800 px-2.5 py-1 rounded font-mono">
          {technicalHint}
        </code>
      )}
      {onRetry && (
        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}
