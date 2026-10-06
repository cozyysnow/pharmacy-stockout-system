import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg bg-white transition-all transform animate-in slide-in-from-bottom-2 duration-200',
              t.type === 'success' && 'border-emerald-200 text-emerald-950',
              t.type === 'warning' && 'border-amber-200 text-amber-950',
              t.type === 'error' && 'border-rose-200 text-rose-950',
              t.type === 'info' && 'border-sky-200 text-sky-950'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600" />}
              {t.type === 'info' && <Info className="w-4 h-4 text-sky-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900">{t.title}</p>
              {t.message && <p className="text-xs text-slate-600 mt-0.5">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
