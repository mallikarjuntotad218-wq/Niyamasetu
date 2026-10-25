import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-[#142332] text-emerald-800 dark:text-emerald-300';
        let iconClass = 'text-emerald-600 dark:text-emerald-400';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-200 dark:border-rose-900 bg-white dark:bg-[#142332] text-rose-800 dark:text-rose-300';
          iconClass = 'text-rose-600 dark:text-rose-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5]';
          iconClass = 'text-[#238C88] dark:text-[#65D5C5]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg ${borderClass} transition-all transform animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 shrink-0 ${iconClass}`} />
              <p className="text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5]">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-white p-1 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
