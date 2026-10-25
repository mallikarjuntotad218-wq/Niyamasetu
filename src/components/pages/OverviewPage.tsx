import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  Upload,
  ChevronRight,
  Building2,
  Info,
  Mail,
  Send
} from 'lucide-react';
import { Notice } from '../../types/notice';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import { formatDaysRemaining } from '../../services/noticeService';

interface OverviewPageProps {
  notices: Notice[];
  onSelectNotice: (noticeId: string) => void;
  onNavigateUpload: () => void;
  onNavigateNotices: (filterCategory?: string) => void;
  onNavigateActions: () => void;
  onOpenNotificationCenter?: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  notices,
  onSelectNotice,
  onNavigateUpload,
  onNavigateNotices,
  onNavigateActions,
  onOpenNotificationCenter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tableSearch, setTableSearch] = useState<string>('');

  // Metrics
  const totalNotices = notices.length;
  const needsAttention = notices.filter((n) => n.status === 'needs_attention').length;
  const upcomingDeadlines = notices.filter(
    (n) => (n.urgency === 'urgent' || n.urgency === 'upcoming') && n.deadlineDate
  ).length;
  const awaitingReview = notices.filter((n) => n.status === 'under_review').length;

  // Time-sensitive notices sorted by deadline
  const timeSensitiveNotices = notices
    .filter((n) => n.deadlineDate !== null)
    .sort((a, b) => {
      const dateA = new Date(a.deadlineDate!).getTime();
      const dateB = new Date(b.deadlineDate!).getTime();
      return dateA - dateB;
    })
    .slice(0, 3);

  // Filtered recent notices table
  const filteredNotices = notices.filter((n) => {
    const matchesCategory =
      selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch =
      tableSearch.trim() === '' ||
      n.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
      n.issuingAuthority.toLowerCase().includes(tableSearch.toLowerCase()) ||
      n.referenceNumber.toLowerCase().includes(tableSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner with Premium Prism Accents */}
      <div className="relative rounded-2xl overflow-hidden border border-[#DCE9E5] dark:border-[#294251] bg-white/85 dark:bg-[#142332]/85 backdrop-blur-xl p-6 sm:p-8 shadow-xs">
        {/* Soft atmospheric gradient in corner */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-linear-to-br from-[#DDF3D2]/35 via-[#B6E6D9]/25 to-[#C8B0F0]/20 dark:from-[#238C88]/20 dark:via-[#1B3040]/30 dark:to-[#B9A5F5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Small Business Legal Defense & Compliance</span>
            </div>
            <h1 className="text-page-title font-extrabold text-[#172C35] dark:text-[#ECF5F5]">
              Know what your notice means. Know what to do next.
            </h1>
            <p className="mt-2 text-sm text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">
              Upload state, federal, or commercial legal notices to extract verified statutory
              deadlines, translate legalese into plain English, organize document checklists,
              and draft counsel-ready responses.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onNavigateUpload}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm text-white dark:text-[#0D1722] bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] hover:opacity-95 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#B6E6D9] dark:text-[#0D1722]" />
              <span>Analyze a Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Notices"
          value={totalNotices}
          subtext="Saved and cataloged in vault"
          icon={FileText}
          onClick={() => onNavigateNotices()}
        />
        <MetricCard
          label="Needs Attention"
          value={needsAttention}
          subtext="Require response or abatement"
          icon={AlertTriangle}
          badgeText={needsAttention > 0 ? 'Action Needed' : undefined}
          badgeVariant="critical"
          accentBorder={needsAttention > 0}
          onClick={() => onNavigateNotices()}
        />
        <MetricCard
          label="Upcoming Deadlines"
          value={upcomingDeadlines}
          subtext="Verified dates within 45 days"
          icon={Calendar}
          badgeText="Time Sensitive"
          badgeVariant="warning"
          onClick={() => onNavigateNotices()}
        />
        <MetricCard
          label="Awaiting Review"
          value={awaitingReview}
          subtext="Under CPA or counsel review"
          icon={Clock}
          badgeText="Pending"
          badgeVariant="info"
          onClick={() => onNavigateNotices()}
        />
      </div>

      {/* Upcoming Deadlines Focus Section */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCE9E5]/60 dark:border-[#294251] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-section-heading text-[#172C35] dark:text-[#ECF5F5]">
                Time-Sensitive Deadlines
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
                Critical Priority
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
              Statutory and contractual dates extracted with original source quotes. Never missed.
            </p>
          </div>

          <button
            onClick={onNavigateActions}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline transition-colors cursor-pointer"
          >
            <span>View All Action Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Automated Deadline Notification Daemon Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-linear-to-r from-[#EAF5F0] to-[#E3F2EC] dark:from-[#1B3040] dark:to-[#142332] border border-[#DCE9E5] dark:border-[#294251] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#238C88]/15 dark:bg-[#65D5C5]/15 text-[#238C88] dark:text-[#65D5C5] shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                  Automated Deadline Email Service Active
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Mock Service Worker Online
                </span>
              </div>
              <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                Monitors statutory thresholds (14d, 7d, 3d, 1d) & simulates email dispatch via browser service worker interceptor.
              </p>
            </div>
          </div>

          {onOpenNotificationCenter && (
            <button
              onClick={onOpenNotificationCenter}
              className="px-3 py-1.5 text-xs font-semibold text-white dark:text-[#0D1722] bg-[#238C88] dark:bg-[#65D5C5] hover:opacity-90 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5"
            >
              <span>Email Dispatcher & Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeSensitiveNotices.map((notice) => {
            const timeInfo = formatDaysRemaining(notice.deadlineDate);
            return (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice.id)}
                className="group relative p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88] dark:hover:border-[#65D5C5] bg-white dark:bg-[#142332] transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-[#5F7279] dark:text-[#A6BBC3] truncate">
                      {notice.issuingAuthority}
                    </span>
                    <UrgencyBadge urgency={notice.urgency} daysRemainingText={timeInfo.text} />
                  </div>

                  <h3 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5] group-hover:text-[#238C88] dark:group-hover:text-[#65D5C5] transition-colors line-clamp-2">
                    {notice.title}
                  </h3>

                  <div className="mt-3 p-2.5 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5]/60 dark:border-[#294251] text-xs">
                    <p className="text-[11px] font-semibold text-[#5F7279] dark:text-[#A6BBC3] mb-0.5">
                      Statutory Due Date:
                    </p>
                    <p className="font-bold text-[#172C35] dark:text-[#ECF5F5] tabular-nums">
                      {notice.deadlineDate
                        ? new Date(notice.deadlineDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Unspecified'}
                    </p>
                    <p className="mt-1 text-[11px] text-[#5F7279] dark:text-[#A6BBC3] line-clamp-2 italic">
                      &quot;{notice.deadlineSource}&quot;
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DCE9E5]/60 dark:border-[#294251] flex items-center justify-between text-xs font-semibold text-[#238C88] dark:text-[#65D5C5]">
                  <span>Review Evidence & Steps</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Notices Table */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
          <div>
            <h2 className="text-section-heading text-[#172C35] dark:text-[#ECF5F5]">Recent Notices</h2>
            <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] mt-0.5">
              Parsed legal communications, authority classifications, and current response status.
            </p>
          </div>

          {/* Table Filters & Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-[#EAF5F0]/70 dark:bg-[#1B3040]/70 border border-[#DCE9E5] dark:border-[#294251] text-xs">
              {['all', 'Tax & Financial', 'Regulatory & Labor', 'Commercial Contract'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white dark:bg-[#142332] text-[#172C35] dark:text-[#ECF5F5] shadow-xs'
                      : 'text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5]'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigateNotices()}
              className="px-3 py-1.5 rounded-xl border border-[#DCE9E5] dark:border-[#294251] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] transition-colors cursor-pointer"
            >
              Full Vault
            </button>
          </div>
        </div>

        {/* Table markup with accessibility and clean typography */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DCE9E5] dark:border-[#294251] text-[#5F7279] dark:text-[#A6BBC3] font-semibold uppercase tracking-wider text-[11px] bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50">
                <th scope="col" className="py-3 px-4">Notice Title & Reference</th>
                <th scope="col" className="py-3 px-4">Issuing Authority</th>
                <th scope="col" className="py-3 px-4">Category</th>
                <th scope="col" className="py-3 px-4">Date Received</th>
                <th scope="col" className="py-3 px-4">Verified Deadline</th>
                <th scope="col" className="py-3 px-4">Status</th>
                <th scope="col" className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE9E5]/60 dark:divide-[#294251] text-[#172C35] dark:text-[#ECF5F5]">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((n) => {
                  const deadlineInfo = formatDaysRemaining(n.deadlineDate);
                  return (
                    <tr
                      key={n.id}
                      className="hover:bg-[#EAF5F0]/60 dark:hover:bg-[#1B3040]/60 transition-colors cursor-pointer group"
                      onClick={() => onSelectNotice(n.id)}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#172C35] dark:text-[#ECF5F5] max-w-xs">
                        <p className="truncate group-hover:text-[#238C88] dark:group-hover:text-[#65D5C5] transition-colors">
                          {n.title}
                        </p>
                        <p className="text-[11px] font-normal text-[#5F7279] dark:text-[#A6BBC3] truncate mt-0.5 font-mono">
                          {n.referenceNumber}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#172C35] dark:text-[#ECF5F5] truncate max-w-[200px]">
                        {n.issuingAuthority}
                      </td>
                      <td className="py-3.5 px-4 text-[#5F7279] dark:text-[#A6BBC3]">
                        {n.category}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-[#5F7279] dark:text-[#A6BBC3]">
                        {n.receivedDate}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums">
                        {n.deadlineDate ? (
                          <div>
                            <span className="font-semibold text-[#172C35] dark:text-[#ECF5F5]">
                              {n.deadlineDate}
                            </span>
                            <span
                              className={`block text-[10px] font-semibold ${
                                deadlineInfo.isPast
                                  ? 'text-rose-600 dark:text-rose-400 font-bold'
                                  : 'text-amber-700 dark:text-amber-400'
                              }`}
                            >
                              {deadlineInfo.text}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic">Not specified</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={n.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectNotice(n.id);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:bg-[#238C88] hover:text-white dark:hover:bg-[#65D5C5] dark:hover:text-[#0D1722] rounded-lg border border-[#DCE9E5] dark:border-[#294251] transition-all cursor-pointer shadow-2xs"
                        >
                          View Analysis
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#5F7279] dark:text-[#A6BBC3]">
                    <Info className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    No notices match the selected category filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
