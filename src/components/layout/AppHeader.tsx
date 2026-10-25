import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Mail,
  Upload,
  ShieldAlert,
  Calendar,
  X,
  ChevronDown
} from 'lucide-react';
import { Notice } from '../../types/notice';
import { formatDaysRemaining } from '../../services/noticeService';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import { IndianLanguage } from '../../data/indianLanguages';
import { NiyamSetuLogo } from '../common/NiyamSetuLogo';

interface AppHeaderProps {
  onOpenMobileSidebar: () => void;
  onNavigateOverview?: () => void;
  onNavigateUpload: () => void;
  onSelectNotice: (noticeId: string) => void;
  notices: Notice[];
  breadcrumbs: { label: string; onClick?: () => void }[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  businessName: string;
  onLanguageChange?: (language: IndianLanguage) => void;
  onOpenNotificationCenter?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenMobileSidebar,
  onNavigateOverview,
  onNavigateUpload,
  onSelectNotice,
  notices,
  breadcrumbs,
  searchQuery,
  onSearchChange,
  businessName,
  onLanguageChange,
  onOpenNotificationCenter
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Urgent notices for notification center
  const urgentNotices = notices.filter(
    (n) => n.urgency === 'urgent' || n.urgency === 'overdue'
  );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Filtered search results for quick preview
  const searchResults = searchQuery.trim()
    ? notices.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md border-b border-[#DCE9E5] dark:border-[#294251] px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4 shrink-0 transition-colors duration-200">
      {/* Left: Mobile hamburger + NiyamSetu Brand on mobile, Breadcrumbs on desktop */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Button (Accessible 44x44px target) */}
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden flex items-center justify-center w-10 h-10 -ml-1 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-white hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile NiyamSetu Compact Brand */}
        <div className="md:hidden flex items-center">
          <NiyamSetuLogo
            variant="compact"
            size="sm"
            onClick={onNavigateOverview}
          />
        </div>

        {/* Desktop Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-xs text-[#5F7279] dark:text-[#A6BBC3] truncate">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-[#DCE9E5] dark:text-[#294251]">/</span>}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="hover:text-[#238C88] dark:hover:text-[#65D5C5] font-semibold transition-colors cursor-pointer truncate max-w-[160px] lg:max-w-none text-left"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-[#172C35] dark:text-[#ECF5F5] font-bold truncate max-w-[200px] lg:max-w-none">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Middle: Universal Search Bar (Desktop) */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#5F7279] dark:text-[#A6BBC3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search notices by keyword, agency, or reference #..."
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30 focus:border-[#238C88] dark:focus:border-[#65D5C5] transition-all text-[#172C35] dark:text-[#ECF5F5] placeholder-[#5F7279] dark:placeholder-[#A6BBC3]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-white cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Search Dropdown */}
        {isSearchFocused && searchQuery.trim() && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#142332] rounded-xl shadow-xl border border-[#DCE9E5] dark:border-[#294251] overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-2 bg-[#EAF5F0]/60 dark:bg-[#1B3040] border-b border-[#DCE9E5] dark:border-[#294251] flex items-center justify-between text-[11px] text-[#5F7279] dark:text-[#A6BBC3] font-semibold">
              <span>Matching Notices ({searchResults.length})</span>
              <span>Press Esc to close</span>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-[#DCE9E5]/60 dark:divide-[#294251]">
              {searchResults.length > 0 ? (
                searchResults.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      onSelectNotice(n.id);
                      setIsSearchFocused(false);
                      onSearchChange('');
                    }}
                    className="w-full p-2.5 text-left hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] transition-colors flex items-start justify-between gap-2 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] truncate">{n.title}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                        <span>{n.issuingAuthority}</span>
                        <span>·</span>
                        <span className="font-mono">{n.referenceNumber}</span>
                      </div>
                    </div>
                    {n.deadlineDate && (
                      <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded shrink-0">
                        {formatDaysRemaining(n.deadlineDate).text}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                  No matching notices found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Actions: Mobile search toggle + Language Selector + Theme Toggle + Upload + Alerts + User */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Search Icon Toggle */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-white hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-xl transition-colors cursor-pointer"
          aria-label="Toggle search input"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Searchable 23 Indian Languages Selector */}
        <LanguageSelector onLanguageChange={onLanguageChange} />

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Primary Action Button: Analyze Notice */}
        <button
          onClick={onNavigateUpload}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white dark:text-[#0D1722] bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] hover:opacity-90 rounded-xl shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-[#238C88]/50 cursor-pointer shrink-0"
        >
          <Upload className="w-3.5 h-3.5 text-[#B6E6D9] dark:text-[#0D1722]" />
          <span className="hidden sm:inline">Analyze Notice</span>
          <span className="sm:hidden text-[11px]">Upload</span>
        </button>

        {/* Automated Email Scheduler & Dispatcher Quick Button */}
        {onOpenNotificationCenter && (
          <button
            onClick={onOpenNotificationCenter}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#DCE9E5] dark:hover:bg-[#203A49] border border-[#DCE9E5] dark:border-[#294251] rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs"
            title="Automated Deadline Email Scheduler & Mock Service Worker Dispatcher"
          >
            <Mail className="w-3.5 h-3.5 text-[#238C88] dark:text-[#65D5C5]" />
            <span className="hidden lg:inline">Email Dispatcher</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center w-9 h-9 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#DCE9E5] dark:hover:border-[#294251]"
            aria-label="View urgent alerts"
          >
            <Bell className="w-4 h-4" />
            {urgentNotices.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-[#142332]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-84 bg-white dark:bg-[#142332] rounded-2xl shadow-xl border border-[#DCE9E5] dark:border-[#294251] overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="px-4 py-3 bg-[#EAF5F0]/60 dark:bg-[#1B3040] border-b border-[#DCE9E5] dark:border-[#294251] flex items-center justify-between">
                <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Urgent Notice Alerts</span>
                <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60">
                  {urgentNotices.length} active
                </span>
              </div>

              {/* Email Scheduler Status Callout */}
              {onOpenNotificationCenter && (
                <div className="px-3.5 py-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-semibold text-[11px] truncate">Mock SW Email Scheduler</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenNotificationCenter();
                    }}
                    className="text-[11px] font-bold text-[#238C88] dark:text-[#65D5C5] hover:underline cursor-pointer shrink-0"
                  >
                    Open Dispatcher →
                  </button>
                </div>
              )}

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE9E5]/60 dark:divide-[#294251]">
                {urgentNotices.length > 0 ? (
                  urgentNotices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => {
                        onSelectNotice(notice.id);
                        setShowNotifications(false);
                      }}
                      className="p-3 hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] leading-snug truncate">
                            {notice.title}
                          </p>
                          <div className="mt-1 flex items-center justify-between text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                            <span className="truncate">{notice.issuingAuthority}</span>
                            <span className="font-bold text-rose-600 dark:text-rose-400 shrink-0">
                              {formatDaysRemaining(notice.deadlineDate).text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    All notice deadlines currently on track.
                  </div>
                )}
              </div>
              <div className="p-2.5 bg-[#EAF5F0]/40 dark:bg-[#1B3040]/40 border-t border-[#DCE9E5] dark:border-[#294251] flex items-center justify-between text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                <span>Deadlines calculated from verified notice text</span>
                {onOpenNotificationCenter && (
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenNotificationCenter();
                    }}
                    className="font-bold text-[#238C88] dark:text-[#65D5C5] hover:underline cursor-pointer"
                  >
                    View Logs
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User / Entity Quick Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1.5 p-1 hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-xl transition-colors text-slate-700 dark:text-slate-200 cursor-pointer border border-transparent hover:border-[#DCE9E5] dark:hover:border-[#294251]"
            aria-label="User account menu"
          >
            <div className="w-7 h-7 rounded-xl bg-[#238C88] text-white dark:bg-[#65D5C5] dark:text-[#0D1722] font-bold text-xs flex items-center justify-center shrink-0">
              NS
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#5F7279] dark:text-[#A6BBC3] hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#142332] rounded-2xl shadow-xl border border-[#DCE9E5] dark:border-[#294251] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
                <p className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] truncate">{businessName}</p>
                <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">Verified Business Account</p>
              </div>
              <div className="py-1 text-xs">
                <div className="px-3.5 py-1.5 text-[#5F7279] dark:text-[#A6BBC3] flex items-center justify-between">
                  <span>Data Vault</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="px-3.5 py-1.5 text-[#5F7279] dark:text-[#A6BBC3] flex items-center justify-between">
                  <span>Verification Rules</span>
                  <span className="text-[10px] text-slate-400 font-mono">v2.4 (Strict)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay Bar */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#142332] border-b border-[#DCE9E5] dark:border-[#294251] p-3 shadow-lg z-30 animate-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 text-[#5F7279] dark:text-[#A6BBC3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notices..."
              autoFocus
              className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722] text-[#172C35] dark:text-[#ECF5F5] focus:outline-none focus:ring-2 focus:ring-[#238C88]"
            />
            <button
              onClick={() => {
                setShowMobileSearch(false);
                onSearchChange('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#5F7279] dark:text-[#A6BBC3]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
