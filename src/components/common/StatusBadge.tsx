import React from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import { NoticeStatus } from '../../types/notice';

interface StatusBadgeProps {
  status: NoticeStatus;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true }) => {
  switch (status) {
    case 'needs_attention':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 px-2.5 py-1 rounded-md">
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />}
          Needs Attention
        </span>
      );
    case 'under_review':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 px-2.5 py-1 rounded-md">
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />}
          Under Review
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] px-2.5 py-1 rounded-md">
          {showIcon && <Clock className="w-3.5 h-3.5 text-[#238C88] dark:text-[#65D5C5] shrink-0" />}
          In Progress
        </span>
      );
    case 'response_drafted':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D66B5] dark:text-[#B9A5F5] bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/60 px-2.5 py-1 rounded-md">
          {showIcon && <FileCheck2 className="w-3.5 h-3.5 text-[#6D66B5] dark:text-[#B9A5F5] shrink-0" />}
          Response Drafted
        </span>
      );
    case 'resolved':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 px-2.5 py-1 rounded-md">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
          Resolved
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5F7279] dark:text-[#A6BBC3] bg-slate-100 dark:bg-slate-800 border border-[#DCE9E5] dark:border-[#294251] px-2.5 py-1 rounded-md">
          {showIcon && <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
          Unknown
        </span>
      );
  }
};
