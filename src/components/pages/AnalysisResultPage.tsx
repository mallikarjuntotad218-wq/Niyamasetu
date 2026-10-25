import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileCheck2,
  FileSignature,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Bookmark,
  Share2,
  Printer,
  Scale,
  ListTodo,
  Layers,
  ArrowLeft,
  Eye,
  CheckSquare,
  Square,
  Columns2,
  Maximize2,
  Minimize2,
  Sparkles,
  FileCode2,
  FileSpreadsheet
} from 'lucide-react';
import { Notice, NoticeStatus } from '../../types/notice';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import { formatDaysRemaining, NoticeService } from '../../services/noticeService';
import { NoticePdfViewer } from '../common/NoticePdfViewer';

interface AnalysisResultPageProps {
  notice: Notice;
  onBack: () => void;
  onNavigateResponseAssistant: (noticeId: string) => void;
  onNavigateActionPlans: () => void;
  onNoticeUpdated: (updatedNotice: Notice) => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const AnalysisResultPage: React.FC<AnalysisResultPageProps> = ({
  notice,
  onBack,
  onNavigateResponseAssistant,
  onNavigateActionPlans,
  onNoticeUpdated,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'why_issued' | 'steps' | 'documents' | 'legal' | 'missing' | 'evidence'
  >('summary');

  // Layout mode: 'split' (side-by-side: PDF + Analysis), 'analysis_only', or 'pdf_only'
  const [viewLayout, setViewLayout] = useState<'split' | 'analysis_only' | 'pdf_only'>('split');
  // In mobile/tablet when split is selected, toggle between Document and Analysis tabs
  const [mobileActivePane, setMobileActivePane] = useState<'document' | 'analysis'>('analysis');
  // Synchronized snippet highlight in PDF viewer
  const [highlightedSnippetId, setHighlightedSnippetId] = useState<string | undefined>(undefined);

  const deadlineInfo = formatDaysRemaining(notice.deadlineDate);

  const handleToggleDoc = (docId: string) => {
    const updated = NoticeService.toggleDocumentChecklist(notice.id, docId);
    if (updated) {
      onNoticeUpdated(updated);
      onShowToast('Document checklist item updated', 'success');
    }
  };

  const handleToggleAction = (actionId: string) => {
    const updated = NoticeService.toggleMandatoryAction(notice.id, actionId);
    if (updated) {
      onNoticeUpdated(updated);
      onShowToast('Action item updated', 'success');
    }
  };

  const handleTogglePrep = (prepId: string) => {
    const updated = NoticeService.toggleSuggestedPrep(notice.id, prepId);
    if (updated) {
      onNoticeUpdated(updated);
      onShowToast('Preparation step updated', 'success');
    }
  };

  const handleStatusChange = (newStatus: NoticeStatus) => {
    const updated = NoticeService.updateNoticeStatus(notice.id, newStatus);
    if (updated) {
      onNoticeUpdated(updated);
      onShowToast(`Notice status updated to ${newStatus.replace('_', ' ')}`, 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Jump to snippet or citation in the PDF viewer
  const handleInspectSnippet = (snippetId?: string) => {
    if (snippetId) {
      setHighlightedSnippetId(snippetId);
    }
    if (viewLayout === 'analysis_only') {
      setViewLayout('split');
    }
    setMobileActivePane('document');
    onShowToast('Navigated to corresponding clause in PDF Document', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Bar with Back action, Layout switchers & Quick actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#238C88] dark:hover:text-[#65D5C5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notices Vault</span>
        </button>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Side-by-Side View Mode Selector */}
          <div className="flex items-center bg-[#EAF5F0] dark:bg-[#1B3040] p-1 rounded-xl border border-[#DCE9E5] dark:border-[#294251]">
            <button
              onClick={() => setViewLayout('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewLayout === 'split'
                  ? 'bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5] shadow-xs'
                  : 'text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5]'
              }`}
              title="View PDF Document and Extracted Analysis Side-by-Side"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>

            <button
              onClick={() => setViewLayout('pdf_only')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewLayout === 'pdf_only'
                  ? 'bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5] shadow-xs'
                  : 'text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5]'
              }`}
              title="Full-Width PDF Document"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PDF Focus</span>
            </button>

            <button
              onClick={() => setViewLayout('analysis_only')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewLayout === 'analysis_only'
                  ? 'bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5] shadow-xs'
                  : 'text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5]'
              }`}
              title="Full-Width Analysis Report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analysis Focus</span>
            </button>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
            <span>Status:</span>
            <select
              value={notice.status}
              onChange={(e) => handleStatusChange(e.target.value as NoticeStatus)}
              className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 dark:focus:ring-[#65D5C5]/40 cursor-pointer"
            >
              <option value="needs_attention">Needs Attention</option>
              <option value="under_review">Under Review</option>
              <option value="in_progress">In Progress</option>
              <option value="response_drafted">Response Drafted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#5F7279] dark:text-[#A6BBC3]" />
            <span className="hidden sm:inline">Print Report</span>
          </button>

          <button
            onClick={() => onNavigateResponseAssistant(notice.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-[#0D1722] bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] hover:opacity-95 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileSignature className="w-3.5 h-3.5 text-[#B6E6D9] dark:text-[#0D1722]" />
            <span>Draft Response</span>
          </button>
        </div>
      </div>

      {/* Primary Notice Header Card */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs relative overflow-hidden">
        {/* Subtle prism accent gradient on top right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[#B6E6D9]/30 dark:from-[#65D5C5]/15 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] px-2.5 py-0.5 rounded-lg border border-[#DCE9E5] dark:border-[#294251]">
                {notice.authorityType}
              </span>
              <span className="text-xs text-[#DCE9E5] dark:text-[#294251]">·</span>
              <span className="text-xs font-semibold text-[#5F7279] dark:text-[#A6BBC3]">
                Category: {notice.category}
              </span>
              <span className="text-xs text-[#DCE9E5] dark:text-[#294251]">·</span>
              <span className="text-xs font-mono font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0]/60 dark:bg-[#1B3040] px-2 py-0.5 rounded-md border border-[#DCE9E5]/60 dark:border-[#294251]">
                Ref: {notice.referenceNumber}
              </span>
            </div>

            <h1 className="text-page-title text-[#172C35] dark:text-[#ECF5F5]">
              {notice.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5F7279] dark:text-[#A6BBC3] pt-1">
              <div>
                <span>Issuing Authority: </span>
                <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">{notice.issuingAuthority}</span>
              </div>
              <div>
                <span>Issue Date: </span>
                <span className="font-bold text-[#172C35] dark:text-[#ECF5F5] tabular-nums">{notice.issueDate}</span>
              </div>
              <div>
                <span>Received Date: </span>
                <span className="font-bold text-[#172C35] dark:text-[#ECF5F5] tabular-nums">{notice.receivedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-lg border border-emerald-200/70 dark:border-emerald-900/60 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{notice.confidenceScore}% Verification Confidence</span>
              </div>
            </div>
          </div>

          {/* Deadline / Urgency Callout Block */}
          <div className="shrink-0 lg:w-72 p-4 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F7279] dark:text-[#A6BBC3]">
                  Response Deadline
                </span>
                <UrgencyBadge urgency={notice.urgency} />
              </div>

              <div className="text-lg font-bold text-[#172C35] dark:text-[#ECF5F5] tabular-nums">
                {notice.deadlineDate
                  ? new Date(notice.deadlineDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'No Fixed Date Stated'}
              </div>

              <p className="mt-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                {deadlineInfo.text}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#DCE9E5] dark:border-[#294251] text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#172C35] dark:text-[#ECF5F5]">Source Quote:</span>
                <button
                  onClick={() => handleInspectSnippet()}
                  className="text-[10px] text-[#238C88] dark:text-[#65D5C5] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>View in PDF</span>
                </button>
              </div>
              <span className="italic line-clamp-2 mt-0.5">&quot;{notice.deadlineSource}&quot;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Segmented Switcher when in Split Mode */}
      {viewLayout === 'split' && (
        <div className="flex lg:hidden items-center bg-[#EAF5F0] dark:bg-[#1B3040] p-1 rounded-xl border border-[#DCE9E5] dark:border-[#294251]">
          <button
            onClick={() => setMobileActivePane('document')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileActivePane === 'document'
                ? 'bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5] shadow-xs'
                : 'text-[#5F7279] dark:text-[#A6BBC3]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Uploaded Notice PDF</span>
          </button>
          <button
            onClick={() => setMobileActivePane('analysis')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileActivePane === 'analysis'
                ? 'bg-white dark:bg-[#142332] text-[#238C88] dark:text-[#65D5C5] shadow-xs'
                : 'text-[#5F7279] dark:text-[#A6BBC3]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extracted Legal Analysis</span>
          </button>
        </div>
      )}

      {/* Main Content Workspace: PDF Viewer & Analysis Results */}
      <div
        className={`grid gap-6 ${
          viewLayout === 'split'
            ? 'grid-cols-1 lg:grid-cols-12'
            : 'grid-cols-1'
        }`}
      >
        {/* PDF VIEWER COLUMN */}
        {(viewLayout === 'pdf_only' ||
          (viewLayout === 'split' && (mobileActivePane === 'document' || window.innerWidth >= 1024))) && (
          <div
            className={`space-y-4 ${
              viewLayout === 'pdf_only'
                ? 'col-span-12'
                : 'col-span-12 lg:col-span-6 xl:col-span-7'
            } ${
              viewLayout === 'split' && mobileActivePane === 'analysis' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-section-heading text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                <span>Uploaded Notice Document (PDF)</span>
              </h2>
              <div className="text-xs text-[#5F7279] dark:text-[#A6BBC3] flex items-center gap-2">
                <span className="hidden sm:inline">Interactive High-Res Document Viewer</span>
                <button
                  onClick={() => setViewLayout(viewLayout === 'pdf_only' ? 'split' : 'pdf_only')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title={viewLayout === 'pdf_only' ? 'Restore Split View' : 'Expand PDF Full Width'}
                >
                  {viewLayout === 'pdf_only' ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <NoticePdfViewer
              notice={notice}
              highlightedSnippetId={highlightedSnippetId}
              onSelectSnippet={(id) => setHighlightedSnippetId(id)}
              className="sticky top-4"
            />
          </div>
        )}

        {/* ANALYSIS RESULTS COLUMN */}
        {(viewLayout === 'analysis_only' ||
          (viewLayout === 'split' && (mobileActivePane === 'analysis' || window.innerWidth >= 1024))) && (
          <div
            className={`space-y-6 ${
              viewLayout === 'analysis_only'
                ? 'col-span-12'
                : 'col-span-12 lg:col-span-6 xl:col-span-5'
            } ${
              viewLayout === 'split' && mobileActivePane === 'document' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Tab Navigation for Review Categories */}
            <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-3 shadow-xs">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: 'summary', label: 'Summary', icon: FileText },
                  { id: 'why_issued', label: 'Why Issued', icon: Scale },
                  { id: 'steps', label: 'Next Steps', icon: CheckSquare },
                  { id: 'documents', label: 'Checklist', icon: ListTodo },
                  { id: 'legal', label: 'Citations', icon: ShieldCheck },
                  { id: 'missing', label: 'Missing Info', icon: HelpCircle },
                  { id: 'evidence', label: 'Evidence', icon: Search }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#238C88] text-white dark:bg-[#65D5C5] dark:text-[#0D1722] shadow-xs'
                          : 'text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#172C35] dark:hover:text-[#ECF5F5] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B6E6D9] dark:text-[#0D1722]' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Analysis Tab Panel Container */}
            <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs">
              {/* TAB 1: PLAIN-LANGUAGE SUMMARY */}
              {activeTab === 'summary' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                        Executive Plain-Language Translation
                      </h2>
                      <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                        Synthesized for management: What does this notice actually state without complex legalese?
                      </p>
                    </div>

                    <button
                      onClick={() => handleInspectSnippet()}
                      className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in PDF</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-xl bg-linear-to-r from-[#EAF5F0] to-white dark:from-[#1B3040] dark:to-[#142332] border border-[#DCE9E5] dark:border-[#294251] text-body leading-relaxed text-[#172C35] dark:text-[#ECF5F5] font-normal">
                    {notice.plainLanguageSummary}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332]">
                      <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] uppercase tracking-wider mb-2">
                        Document Facts (Explicitly In Notice Text)
                      </h4>
                      <ul className="text-xs space-y-2 text-[#5F7279] dark:text-[#A6BBC3]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Issuing Body: {notice.issuingAuthority}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Reference / DIN Code: {notice.referenceNumber}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>Verified Response Deadline: {notice.deadlineDate || 'Unspecified in notice'}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60">
                      <h4 className="text-xs font-bold text-[#238C88] dark:text-[#65D5C5] uppercase tracking-wider mb-2">
                        Recommended Immediate Action
                      </h4>
                      <p className="text-xs text-[#172C35] dark:text-[#ECF5F5] leading-relaxed">
                        Review the mandatory checklist items and generate a formal counsel-reviewed response draft
                        or 30-day extension before {notice.deadlineDate || 'expiration'}.
                      </p>
                      <button
                        onClick={() => onNavigateResponseAssistant(notice.id)}
                        className="mt-3 text-xs font-bold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Launch Response Assistant</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WHY ISSUED & RISKS */}
              {activeTab === 'why_issued' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                        Why This Notice Was Issued & Associated Risks
                      </h2>
                      <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                        Extracted rationale from the document text versus practical commercial liabilities.
                      </p>
                    </div>

                    <button
                      onClick={() => handleInspectSnippet(notice.sourceSnippets[0]?.id)}
                      className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Highlight in PDF</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#5F7279] dark:text-[#A6BBC3] uppercase tracking-wider">
                          Specific Trigger Event
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          OCR Verified Fact
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] leading-relaxed">
                        {notice.whyIssued.trigger}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50">
                      <span className="text-[11px] font-bold text-[#238C88] dark:text-[#65D5C5] uppercase tracking-wider">
                        Official Agency Rationale
                      </span>
                      <p className="mt-2 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] leading-relaxed">
                        {notice.whyIssued.officialRationale}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/40">
                      <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        Business & Financial Risk
                      </span>
                      <p className="mt-2 text-xs font-bold text-rose-900 dark:text-rose-200 leading-relaxed">
                        {notice.whyIssued.businessRisk}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NEXT STEPS & ACTIONS */}
              {activeTab === 'steps' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                        Required & Suggested Action Steps
                      </h2>
                      <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                        Differentiating mandatory statutory requirements from recommended preparations.
                      </p>
                    </div>

                    <button
                      onClick={onNavigateActionPlans}
                      className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open in Action Plans</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Mandatory Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/60">
                        Mandatory Legal Obligations
                      </span>
                    </div>

                    <div className="space-y-3">
                      {notice.mandatoryActions.map((action) => (
                        <div
                          key={action.id}
                          onClick={() => handleToggleAction(action.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            action.completed
                              ? 'bg-[#EAF5F0]/40 dark:bg-[#1B3040]/40 border-[#DCE9E5] dark:border-[#294251] text-slate-400 dark:text-slate-500'
                              : 'bg-white dark:bg-[#142332] border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88] dark:hover:border-[#65D5C5] shadow-2xs'
                          }`}
                        >
                          <button
                            className="mt-0.5 text-slate-400"
                            aria-label={action.completed ? 'Mark incomplete' : 'Mark completed'}
                          >
                            {action.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <h4
                                className={`text-xs font-bold ${
                                  action.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-[#172C35] dark:text-[#ECF5F5]'
                                }`}
                              >
                                {action.title}
                              </h4>
                              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded shrink-0 tabular-nums">
                                Due: {action.deadline}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Preparations */}
                  <div className="pt-4 border-t border-[#DCE9E5]/60 dark:border-[#294251]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] px-2 py-0.5 rounded border border-[#DCE9E5] dark:border-[#294251]">
                        Suggested Strategic Preparations
                      </span>
                    </div>

                    <div className="space-y-3">
                      {notice.suggestedPreparations.map((prep) => (
                        <div
                          key={prep.id}
                          onClick={() => handleTogglePrep(prep.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            prep.completed
                              ? 'bg-[#EAF5F0]/40 dark:bg-[#1B3040]/40 border-[#DCE9E5] dark:border-[#294251] text-slate-400 dark:text-slate-500'
                              : 'bg-white dark:bg-[#142332] border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88] dark:hover:border-[#65D5C5] shadow-2xs'
                          }`}
                        >
                          <button
                            className="mt-0.5 text-slate-400"
                            aria-label={prep.completed ? 'Mark incomplete' : 'Mark completed'}
                          >
                            {prep.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <h4
                                className={`text-xs font-bold ${
                                  prep.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-[#172C35] dark:text-[#ECF5F5]'
                                }`}
                              >
                                {prep.title}
                              </h4>
                              <span className="text-[11px] font-medium text-[#5F7279] dark:text-[#A6BBC3] shrink-0">
                                {prep.timeframe}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">
                              {prep.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DOCUMENT CHECKLIST */}
              {activeTab === 'documents' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                        Required Document & Evidence Checklist
                      </h2>
                      <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                        Track records required by the authority before transmitting your formal reply.
                      </p>
                    </div>
                    <button
                      onClick={() => handleInspectSnippet()}
                      className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in PDF</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notice.documentChecklist.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleToggleDoc(doc.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          doc.collected
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/60 shadow-2xs'
                            : 'bg-white dark:bg-[#142332] border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88] dark:hover:border-[#65D5C5]'
                        }`}
                      >
                        <button
                          className="mt-0.5"
                          aria-label={doc.collected ? 'Mark uncollected' : 'Mark collected'}
                        >
                          {doc.collected ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`text-xs font-bold ${
                                doc.collected ? 'text-emerald-900 dark:text-emerald-200' : 'text-[#172C35] dark:text-[#ECF5F5]'
                              }`}
                            >
                              {doc.name}
                            </h4>
                            {doc.mandatory ? (
                              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                                Mandatory
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-[#5F7279] dark:text-[#A6BBC3] bg-[#EAF5F0] dark:bg-[#1B3040] px-1.5 py-0.5 rounded">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">{doc.description}</p>
                          <div className="mt-2 text-[11px] text-slate-400">
                            <span className="font-semibold text-[#5F7279] dark:text-[#A6BBC3]">Likely Location: </span>
                            <span>{doc.locationHint}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LEGAL CITATIONS */}
              {activeTab === 'legal' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                        Identified Statutory & Regulatory Citations
                      </h2>
                      <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                        Statutory sections cited in notice, translated into business impact.
                      </p>
                    </div>

                    <button
                      onClick={() => handleInspectSnippet()}
                      className="text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Jump to Citations in PDF</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {notice.legalCitations.map((citation, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] px-2.5 py-1 rounded-lg border border-[#DCE9E5] dark:border-[#294251]">
                            {citation.code}
                          </span>
                          <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">{citation.title}</span>
                        </div>

                        <blockquote className="p-3 rounded-xl bg-[#EAF5F0]/50 dark:bg-[#1B3040]/50 border-l-2 border-[#238C88] dark:border-[#65D5C5] text-xs font-mono text-[#172C35] dark:text-[#ECF5F5] italic">
                          &quot;{citation.excerpt}&quot;
                        </blockquote>

                        <div className="flex items-center justify-between text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                          <div>
                            <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">Impact: </span>
                            <span>{citation.plainMeaning}</span>
                          </div>
                          <button
                            onClick={() => handleInspectSnippet(notice.sourceSnippets[0]?.id)}
                            className="text-[11px] font-bold text-[#238C88] dark:text-[#65D5C5] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                          >
                            <Search className="w-3 h-3" />
                            <span>PDF Page 2</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: UNCERTAIN / MISSING INFORMATION */}
              {activeTab === 'missing' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      Uncertain or Missing Information Audit
                    </h2>
                    <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                      Critical transparency: Facts that the document does NOT clarify, requiring verification.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {notice.missingOrUncertain.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-amber-200/70 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/30 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            {item.item}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              item.severity === 'high'
                                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                            }`}
                          >
                            {item.severity} uncertainty
                          </span>
                        </div>
                        <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">{item.reason}</p>
                        <div className="pt-1 text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                          <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">Suggested Action: </span>
                          <span>{item.suggestedVerification}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SOURCE EVIDENCE INSPECTOR */}
              {activeTab === 'evidence' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                      Original Document Evidence & Extracted Fact Quotes
                    </h2>
                    <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                      Inspect the exact text snippets that ground and substantiate each verified fact.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {notice.sourceSnippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="p-4 rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] space-y-2.5 hover:border-[#238C88] dark:hover:border-[#65D5C5] transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] px-2.5 py-0.5 rounded-lg">
                            {snippet.section} (Page {snippet.page})
                          </span>
                          <button
                            onClick={() => handleInspectSnippet(snippet.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#238C88] dark:text-[#65D5C5] hover:underline cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Jump to Page {snippet.page} in PDF</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-[#EAF5F0]/40 dark:bg-[#1B3040]/50 font-mono text-xs text-[#172C35] dark:text-[#ECF5F5] border-l-2 border-[#238C88] dark:border-[#65D5C5]">
                          &quot;{snippet.originalText}&quot;
                        </div>

                        <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                          <span className="font-bold text-[#172C35] dark:text-[#ECF5F5]">Extracted Conclusion: </span>
                          {snippet.verifiedFact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Callouts */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#1B3040] dark:to-[#142332] text-white border border-[#DCE9E5]/60 dark:border-[#294251] gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-[#B6E6D9] dark:text-[#65D5C5]">
            Ready to prepare an official defense or clarification letter?
          </h3>
          <p className="text-xs text-slate-200 dark:text-[#A6BBC3] mt-0.5">
            Use the Response Assistant to generate an extension request, formal dispute, or documentation transmittal.
          </p>
        </div>

        <button
          onClick={() => onNavigateResponseAssistant(notice.id)}
          className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#172C35] bg-white hover:bg-[#B6E6D9] dark:bg-[#65D5C5] dark:text-[#0D1722] dark:hover:bg-[#8eeddf] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <FileSignature className="w-4 h-4 text-[#238C88] dark:text-[#0D1722]" />
          <span>Launch Response Assistant</span>
        </button>
      </div>
    </div>
  );
};
