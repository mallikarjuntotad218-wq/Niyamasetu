import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Send,
  RefreshCw,
  Play,
  Pause,
  Clock,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Trash2,
  Eye,
  Sliders,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Inbox
} from 'lucide-react';
import {
  notificationSchedulerService,
  DispatchedEmail,
  SchedulerConfig,
  SchedulerState
} from '../../services/notificationSchedulerService';
import { getMockWorkerStatus, subscribeWorkerStatus, MockWorkerStatus } from '../../workers/mockNotificationWorker';
import { Notice } from '../../types/notice';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notices: Notice[];
  onSelectNotice: (noticeId: string) => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notices,
  onSelectNotice,
  onShowToast
}) => {
  const [emails, setEmails] = useState<DispatchedEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<DispatchedEmail | null>(null);
  const [schedulerState, setSchedulerState] = useState<SchedulerState>(
    notificationSchedulerService.getSchedulerState()
  );
  const [config, setConfig] = useState<SchedulerConfig>(notificationSchedulerService.getConfig());
  const [workerStatus, setWorkerStatus] = useState<MockWorkerStatus>(getMockWorkerStatus());

  const [activeTab, setActiveTab] = useState<'emails' | 'settings'>('emails');
  const [previewMode, setPreviewMode] = useState<'rendered' | 'payload'>('rendered');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedNoticeForTest, setSelectedNoticeForTest] = useState<string>(
    notices[0]?.id || ''
  );
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  // Load emails & subscribe to scheduler state changes
  useEffect(() => {
    const refresh = () => {
      const list = notificationSchedulerService.getDispatchedEmails();
      setEmails(list);
      setSchedulerState(notificationSchedulerService.getSchedulerState());
      setConfig(notificationSchedulerService.getConfig());
    };

    refresh();
    const unsubScheduler = notificationSchedulerService.subscribe(refresh);
    const unsubWorker = subscribeWorkerStatus(setWorkerStatus);

    return () => {
      unsubScheduler();
      unsubWorker();
    };
  }, []);

  // Set default selected email when list changes
  useEffect(() => {
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails, selectedEmail]);

  if (!isOpen) return null;

  const handleTriggerScan = async () => {
    setIsScanning(true);
    try {
      const result = await notificationSchedulerService.runScanNow();
      if (result.dispatched > 0) {
        onShowToast(
          `Scheduler scan completed: ${result.dispatched} deadline email(s) dispatched via Mock SW!`,
          'success'
        );
      } else {
        onShowToast(
          `Scheduler scan completed: Scanned ${result.scanned} notices. No new milestone thresholds breached today.`,
          'info'
        );
      }
    } catch {
      onShowToast('Failed to execute scheduler scan.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSendManualTest = async () => {
    if (!selectedNoticeForTest) return;
    setIsScanning(true);
    try {
      const sent = await notificationSchedulerService.sendManualNoticeAlert(selectedNoticeForTest);
      if (sent) {
        setSelectedEmail(sent);
        onShowToast(`Simulated alert dispatched to ${sent.recipientEmail} via Mock Service Worker!`, 'success');
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleToggleScheduler = () => {
    const newConfig = { ...config, enabled: !config.enabled };
    setConfig(newConfig);
    notificationSchedulerService.saveConfig(newConfig);
    if (newConfig.enabled) {
      notificationSchedulerService.startScheduler();
      onShowToast('Automated deadline scanner started.', 'success');
    } else {
      notificationSchedulerService.stopScheduler();
      onShowToast('Automated deadline scanner paused.', 'info');
    }
  };

  const handleIntervalChange = (seconds: number) => {
    const updated = { ...config, scanIntervalSeconds: seconds };
    setConfig(updated);
    notificationSchedulerService.saveConfig(updated);
    onShowToast(`Scan interval adjusted to ${seconds}s`, 'info');
  };

  const handleAdvanceDaysChange = (days: number) => {
    const updated = { ...config, advanceDays: days };
    setConfig(updated);
    notificationSchedulerService.saveConfig(updated);
    onShowToast(`Advance warning threshold set to ${days} days`, 'info');
  };

  const handleTargetEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    notificationSchedulerService.saveConfig(config);
    onShowToast('Compliance notification recipient updated', 'success');
  };

  const handleClearAll = () => {
    notificationSchedulerService.clearHistory();
    setSelectedEmail(null);
    onShowToast('Dispatched notification history cleared', 'info');
  };

  const handleSelectEmailItem = (email: DispatchedEmail) => {
    setSelectedEmail(email);
    if (!email.read) {
      notificationSchedulerService.markAsRead(email.id);
    }
  };

  const filteredEmails = emails.filter((e) => {
    if (filterUrgency === 'all') return true;
    if (filterUrgency === 'urgent') return e.urgency === 'urgent' || e.urgency === 'overdue';
    if (filterUrgency === 'upcoming') return e.urgency === 'upcoming';
    if (filterUrgency === 'test') return e.milestone === 'manual_test';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0D1722]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-6xl h-[92vh] max-h-[850px] bg-white dark:bg-[#142332] rounded-2xl shadow-2xl border border-[#DCE9E5] dark:border-[#294251] flex flex-col overflow-hidden text-[#172C35] dark:text-[#ECF5F5] transition-colors">
        
        {/* Top Header & Live Service Worker Status */}
        <div className="px-5 py-4 bg-[#EAF5F0]/70 dark:bg-[#1B3040]/70 border-b border-[#DCE9E5] dark:border-[#294251] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] flex items-center justify-center text-white dark:text-[#0D1722] shadow-sm shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] truncate">
                  Automated Deadline Notification Dispatcher
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Mock Service Worker Active
                </span>
              </div>
              <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] truncate">
                Automated scheduler checks notice deadlines & dispatches rich legal warning emails to compliance officers
              </p>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#238C88] dark:bg-[#65D5C5] dark:text-[#0D1722] hover:opacity-90 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              title="Audit notice deadlines right now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isScanning ? 'Scanning...' : 'Scan & Dispatch Now'}</span>
              <span className="sm:hidden">Scan</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'emails' ? 'settings' : 'emails')}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#238C88] bg-[#238C88]/10 text-[#238C88] dark:text-[#65D5C5]'
                  : 'border-[#DCE9E5] dark:border-[#294251] text-[#5F7279] dark:text-[#A6BBC3] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040]'
              }`}
              title="Scheduler parameters"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden md:inline">Scheduler Settings</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-white rounded-xl hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Service Worker & Scheduler Monitor Bar */}
        <div className="px-5 py-2.5 bg-white dark:bg-[#142332] border-b border-[#DCE9E5] dark:border-[#294251] flex flex-wrap items-center justify-between text-xs gap-3 shrink-0">
          <div className="flex items-center gap-4 text-[#5F7279] dark:text-[#A6BBC3]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#172C35] dark:text-[#ECF5F5]">Scheduler:</span>
              <span className={`inline-flex items-center gap-1 font-bold ${schedulerState.isRunning ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {schedulerState.isRunning ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Running
                  </>
                ) : (
                  'Paused'
                )}
              </span>
            </div>

            {schedulerState.isRunning && (
              <div className="flex items-center gap-1 font-mono text-[11px] bg-[#EAF5F0] dark:bg-[#1B3040] px-2 py-0.5 rounded-lg border border-[#DCE9E5] dark:border-[#294251]">
                <Clock className="w-3 h-3 text-[#238C88] dark:text-[#65D5C5]" />
                Next scan in <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">{schedulerState.secondsUntilNextScan}s</span>
              </div>
            )}

            <div className="hidden md:flex items-center gap-1 text-[11px]">
              <span>Frequency:</span>
              <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">{config.scanIntervalSeconds}s</span>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[11px]">
              <span>Advance Window:</span>
              <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">{config.advanceDays} days</span>
            </div>
          </div>

          {/* Quick Instant Test Trigger */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3] hidden sm:inline">Demo Notice:</span>
            <select
              value={selectedNoticeForTest}
              onChange={(e) => setSelectedNoticeForTest(e.target.value)}
              className="text-xs bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] rounded-xl px-2.5 py-1 text-[#172C35] dark:text-[#ECF5F5] font-medium max-w-[200px] truncate"
            >
              {notices.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title} ({n.referenceNumber})
                </option>
              ))}
            </select>

            <button
              onClick={handleSendManualTest}
              disabled={isScanning}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#DCE9E5] dark:hover:bg-[#294251] border border-[#DCE9E5] dark:border-[#294251] rounded-xl cursor-pointer transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Send Test</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'settings' ? (
          /* Scheduler Configuration View */
          <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-6">
            <div className="bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
                    Automated Background Daemon
                  </h3>
                  <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                    Controls whether the periodic browser timer scans active notices for upcoming deadlines.
                  </p>
                </div>
                <button
                  onClick={handleToggleScheduler}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    config.enabled
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {config.enabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {config.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Scan Interval */}
              <div className="pt-3 border-t border-[#DCE9E5] dark:border-[#294251]">
                <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-2">
                  Demonstration Scan Interval:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: '15s (Rapid Demo)', value: 15 },
                    { label: '30s (Default)', value: 30 },
                    { label: '60s (Standard)', value: 60 },
                    { label: '5m (Production)', value: 300 }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleIntervalChange(opt.value)}
                      className={`p-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                        config.scanIntervalSeconds === opt.value
                          ? 'border-[#238C88] dark:border-[#65D5C5] bg-[#238C88]/10 text-[#238C88] dark:text-[#65D5C5] font-bold'
                          : 'border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] text-[#5F7279] dark:text-[#A6BBC3]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advance Days */}
              <div className="pt-3 border-t border-[#DCE9E5] dark:border-[#294251]">
                <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-2">
                  Advance Notification Window:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '3 Days in advance', value: 3 },
                    { label: '7 Days in advance', value: 7 },
                    { label: '14 Days in advance', value: 14 }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAdvanceDaysChange(opt.value)}
                      className={`p-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                        config.advanceDays === opt.value
                          ? 'border-[#238C88] dark:border-[#65D5C5] bg-[#238C88]/10 text-[#238C88] dark:text-[#65D5C5] font-bold'
                          : 'border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] text-[#5F7279] dark:text-[#A6BBC3]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Email Form */}
              <form onSubmit={handleTargetEmailChange} className="pt-3 border-t border-[#DCE9E5] dark:border-[#294251]">
                <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                  Primary Compliance Notification Recipient:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={config.targetEmail}
                    onChange={(e) => setConfig({ ...config, targetEmail: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] text-[#172C35] dark:text-[#ECF5F5] focus:outline-none focus:ring-2 focus:ring-[#238C88]"
                    placeholder="compliance@company.com"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#238C88] hover:opacity-90 rounded-xl cursor-pointer"
                  >
                    Save Recipient
                  </button>
                </div>
              </form>
            </div>

            {/* Architecture Telemetry Box */}
            <div className="bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] uppercase tracking-wider">
                  Mock Service Worker Architecture Specs
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50 border border-[#DCE9E5] dark:border-[#294251]">
                  <span className="text-[#5F7279] dark:text-[#A6BBC3]">Dispatch Endpoint:</span>
                  <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    POST /api/notifications/dispatch-email
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50 border border-[#DCE9E5] dark:border-[#294251]">
                  <span className="text-[#5F7279] dark:text-[#A6BBC3]">Interceptor Mode:</span>
                  <div className="font-bold text-[#172C35] dark:text-[#ECF5F5] mt-0.5">
                    {workerStatus.mode === 'dual' ? 'Dual (ServiceWorker + Fetch Interceptor)' : 'Fetch Interceptor Gateway'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50 border border-[#DCE9E5] dark:border-[#294251]">
                  <span className="text-[#5F7279] dark:text-[#A6BBC3]">Simulated Gateway Latency:</span>
                  <div className="font-bold text-[#172C35] dark:text-[#ECF5F5] mt-0.5">
                    ~280ms - 310ms (Real-time network simulation)
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50 border border-[#DCE9E5] dark:border-[#294251]">
                  <span className="text-[#5F7279] dark:text-[#A6BBC3]">Total Network Interceptions:</span>
                  <div className="font-mono font-bold text-[#238C88] dark:text-[#65D5C5] mt-0.5">
                    {workerStatus.totalIntercepted} requests intercepted
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setActiveTab('emails')}
                className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline cursor-pointer"
              >
                ← Return to Dispatched Emails Log
              </button>
            </div>
          </div>
        ) : (
          /* Main Inbox / Email Preview Split Screen */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            
            {/* Left Column: Dispatched Emails List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-[#DCE9E5] dark:border-[#294251] flex flex-col shrink-0 bg-[#F5FAF7]/40 dark:bg-[#0D1722]/40">
              
              {/* Filter bar */}
              <div className="p-3 border-b border-[#DCE9E5] dark:border-[#294251] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-semibold">
                  {['all', 'urgent', 'upcoming', 'test'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterUrgency(f)}
                      className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                        filterUrgency === f
                          ? 'bg-[#238C88] text-white dark:bg-[#65D5C5] dark:text-[#0D1722]'
                          : 'text-[#5F7279] dark:text-[#A6BBC3] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {emails.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                    title="Clear log"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Email List Items */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#DCE9E5]/60 dark:divide-[#294251]/60">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((item) => {
                    const isSelected = selectedEmail?.id === item.id;
                    const dateFormatted = new Date(item.dispatchedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    let milestoneBadge = (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        {item.milestone}
                      </span>
                    );

                    if (item.milestone === 'overdue') {
                      milestoneBadge = (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900">
                          OVERDUE
                        </span>
                      );
                    } else if (item.milestone === 'due_today' || item.milestone === '1_day') {
                      milestoneBadge = (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-900">
                          CRITICAL 24H
                        </span>
                      );
                    } else if (item.milestone === '3_day') {
                      milestoneBadge = (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          3 DAYS
                        </span>
                      );
                    } else if (item.milestone === 'manual_test') {
                      milestoneBadge = (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          TEST DEMO
                        </span>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectEmailItem(item)}
                        className={`p-3 cursor-pointer transition-colors text-left relative ${
                          isSelected
                            ? 'bg-[#EAF5F0] dark:bg-[#1B3040] border-l-4 border-[#238C88] dark:border-[#65D5C5]'
                            : 'hover:bg-[#EAF5F0]/50 dark:hover:bg-[#1B3040]/40'
                        }`}
                      >
                        {!item.read && (
                          <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#238C88] dark:bg-[#65D5C5]" />
                        )}

                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 truncate">
                            {milestoneBadge}
                            <span className="text-[10px] text-[#5F7279] dark:text-[#A6BBC3] truncate">
                              {item.issuingAuthority}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#5F7279] dark:text-[#A6BBC3] shrink-0">
                            {dateFormatted}
                          </span>
                        </div>

                        <p className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] truncate leading-tight mb-1">
                          {item.subject}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                          <span className="truncate max-w-[170px] font-mono text-[10px]">
                            {item.recipientEmail}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            200 OK
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-[#5F7279] dark:text-[#A6BBC3] space-y-2">
                    <Inbox className="w-8 h-8 mx-auto text-[#5F7279]/50" />
                    <p className="font-semibold">No emails dispatched yet</p>
                    <p className="text-[11px]">
                      Click &quot;Scan & Dispatch Now&quot; or &quot;Send Test&quot; above to trigger simulated deadline notifications via Mock Service Worker.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Interactive Email Preview / Webmail Simulation */}
            <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#142332]">
              {selectedEmail ? (
                <>
                  {/* Webmail Client Header Bar */}
                  <div className="p-4 border-b border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/30 dark:bg-[#1B3040]/30 flex flex-wrap items-center justify-between gap-2 shrink-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                          To: {selectedEmail.recipientEmail}
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                          Status: Delivered ({selectedEmail.deliveryProvider})
                        </span>
                      </div>
                      <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] mt-0.5 font-mono text-[11px] truncate">
                        Message-ID: {selectedEmail.messageId} · Sent: {new Date(selectedEmail.dispatchedAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Mode toggles & Notice Action */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center p-0.5 rounded-xl bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] text-xs font-medium">
                        <button
                          onClick={() => setPreviewMode('rendered')}
                          className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                            previewMode === 'rendered'
                              ? 'bg-white dark:bg-[#142332] text-[#172C35] dark:text-[#ECF5F5] font-bold shadow-2xs'
                              : 'text-[#5F7279] dark:text-[#A6BBC3]'
                          }`}
                        >
                          Rendered HTML
                        </button>
                        <button
                          onClick={() => setPreviewMode('payload')}
                          className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                            previewMode === 'payload'
                              ? 'bg-white dark:bg-[#142332] text-[#172C35] dark:text-[#ECF5F5] font-bold shadow-2xs'
                              : 'text-[#5F7279] dark:text-[#A6BBC3]'
                          }`}
                        >
                          SW Telemetry JSON
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          onSelectNotice(selectedEmail.noticeId);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#238C88] hover:opacity-90 rounded-xl cursor-pointer shadow-xs"
                      >
                        <span>Open Notice</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rendered Email Preview or Raw Telemetry */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5FAF7] dark:bg-[#0D1722]/70">
                    {previewMode === 'rendered' ? (
                      <div className="max-w-2xl mx-auto shadow-md rounded-2xl overflow-hidden border border-[#DCE9E5] dark:border-[#294251]">
                        <iframe
                          title="Email Preview"
                          srcDoc={selectedEmail.htmlBody}
                          className="w-full h-[600px] border-none bg-white"
                          sandbox="allow-same-origin"
                        />
                      </div>
                    ) : (
                      <div className="max-w-2xl mx-auto bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto space-y-3">
                        <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                          <span>// Mock Service Worker Network Interception Receipt</span>
                          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">HTTP 200 OK</span>
                        </div>
                        <pre className="text-slate-200">
                          {JSON.stringify(
                            {
                              request: {
                                method: 'POST',
                                url: '/api/notifications/dispatch-email',
                                interceptedBy: 'public/mockServiceWorker.js'
                              },
                              receipt: {
                                messageId: selectedEmail.messageId,
                                recipient: selectedEmail.recipientEmail,
                                status: selectedEmail.status,
                                milestone: selectedEmail.milestone,
                                urgency: selectedEmail.urgency,
                                daysRemaining: selectedEmail.daysRemaining,
                                deliveryProvider: selectedEmail.deliveryProvider,
                                timestamp: selectedEmail.dispatchedAt,
                                smtpCode: '250 2.0.0 OK (Queued for simulated delivery)'
                              },
                              plainTextPreview: selectedEmail.textSummary
                            },
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#5F7279] dark:text-[#A6BBC3]">
                  <Mail className="w-12 h-12 text-[#238C88]/40 mb-3" />
                  <h3 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
                    No Email Selected
                  </h3>
                  <p className="text-xs max-w-sm mt-1">
                    Select an email notification from the left log to inspect its executive HTML rendering and delivery receipt.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
