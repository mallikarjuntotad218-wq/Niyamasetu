import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number | string;
  subtext: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'critical' | 'warning' | 'info' | 'success';
  onClick?: () => void;
  accentBorder?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badgeText,
  badgeVariant = 'info',
  onClick,
  accentBorder = false
}) => {
  const getBadgeStyle = () => {
    switch (badgeVariant) {
      case 'critical':
        return 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/60';
      case 'warning':
        return 'text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900/60';
      case 'success':
        return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/60';
      case 'info':
      default:
        return 'text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] border-[#DCE9E5] dark:border-[#294251]';
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative p-5 rounded-xl transition-all duration-200 text-left bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md border ${
        accentBorder
          ? 'border-[#238C88] dark:border-[#65D5C5] shadow-sm'
          : 'border-[#DCE9E5] dark:border-[#294251] shadow-xs'
      } ${
        onClick
          ? 'cursor-pointer hover:border-[#238C88] dark:hover:border-[#65D5C5] hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 dark:focus:ring-[#65D5C5]/40'
          : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#5F7279] dark:text-[#A6BBC3]">
          {label}
        </span>
        <div className="p-2 rounded-lg bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] text-[#238C88] dark:text-[#65D5C5]">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#172C35] dark:text-[#ECF5F5] tracking-tight tabular-nums">
          {value}
        </span>
        {badgeText && (
          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${getBadgeStyle()}`}>
            {badgeText}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-[#5F7279] dark:text-[#A6BBC3] line-clamp-1">{subtext}</p>
    </div>
  );
};
