import React from 'react';
import {
  AlertTriangle,
  CalendarClock,
  Clock,
  FileQuestion,
  ShieldAlert
} from 'lucide-react';
import { UrgencyLevel } from '../../types/notice';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  daysRemainingText?: string;
  showIcon?: boolean;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({
  urgency,
  daysRemainingText,
  showIcon = true
}) => {
  switch (urgency) {
    case 'overdue':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 dark:text-rose-200 bg-rose-100/90 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800/80 px-2.5 py-1 rounded-md tabular-nums">
          {showIcon && <ShieldAlert className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 shrink-0" />}
          Overdue {daysRemainingText ? `(${daysRemainingText})` : ''}
        </span>
      );
    case 'urgent':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1 rounded-md tabular-nums">
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />}
          Urgent {daysRemainingText ? `· ${daysRemainingText}` : ''}
        </span>
      );
    case 'upcoming':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] px-2.5 py-1 rounded-md tabular-nums">
          {showIcon && <CalendarClock className="w-3.5 h-3.5 text-[#238C88] dark:text-[#65D5C5] shrink-0" />}
          Upcoming {daysRemainingText ? `· ${daysRemainingText}` : ''}
        </span>
      );
    case 'under_review':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 px-2.5 py-1 rounded-md">
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />}
          Under Review
        </span>
      );
    case 'not_identified':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5F7279] dark:text-[#A6BBC3] bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251] px-2.5 py-1 rounded-md">
          {showIcon && <FileQuestion className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />}
          Deadline Not Identified
        </span>
      );
  }
};
