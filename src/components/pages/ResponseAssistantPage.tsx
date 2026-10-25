import React, { useState, useEffect } from 'react';
import {
  FileSignature,
  Copy,
  Download,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  RefreshCw,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { AppSettings, Notice, ResponseDraftRecord } from '../../types/notice';
import {
  generateDraftResponse,
  RESPONSE_TEMPLATES,
  ResponseTemplateType
} from '../../services/templateService';
import { NoticeService } from '../../services/noticeService';

interface ResponseAssistantPageProps {
  notices: Notice[];
  preselectedNoticeId?: string | null;
  settings: AppSettings;
  onNoticeUpdated: (notice: Notice) => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const ResponseAssistantPage: React.FC<ResponseAssistantPageProps> = ({
  notices,
  preselectedNoticeId,
  settings,
  onNoticeUpdated,
  onShowToast
}) => {
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>(
    preselectedNoticeId || notices[0]?.id || ''
  );
  const [templateType, setTemplateType] = useState<ResponseTemplateType>('extension');
  const [draftContent, setDraftContent] = useState<string>('');
  const [draftStatus, setDraftStatus] = useState<'draft' | 'reviewed' | 'finalized'>('draft');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedNotice = notices.find((n) => n.id === selectedNoticeId);

  useEffect(() => {
    if (selectedNotice) {
      const existing = selectedNotice.draftResponses?.find(
        (d) => d.templateType === templateType
      );
      if (existing) {
        setDraftContent(existing.content);
        setDraftStatus(existing.status);
      } else {
        const generated = generateDraftResponse(templateType, selectedNotice, settings);
        setDraftContent(generated);
        setDraftStatus('draft');
      }
    }
  }, [selectedNoticeId, templateType, selectedNotice, settings]);

  const handleRegenerate = () => {
    if (selectedNotice) {
      const generated = generateDraftResponse(templateType, selectedNotice, settings);
      setDraftContent(generated);
      onShowToast('Draft regenerated from notice facts', 'info');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draftContent);
      setIsCopied(true);
      onShowToast('Draft response copied to clipboard', 'success');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      onShowToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDownload = () => {
    if (!selectedNotice) return;
    const blob = new Blob([draftContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Response_Draft_${selectedNotice.referenceNumber}_${templateType}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Draft text file downloaded', 'success');
  };

  const handleSaveDraft = () => {
    if (!selectedNotice) return;

    const draftRecord: ResponseDraftRecord = {
      id: `draft-${templateType}-${Date.now()}`,
      templateType,
      title: `${RESPONSE_TEMPLATES.find((t) => t.type === templateType)?.title}`,
      content: draftContent,
      updatedAt: new Date().toISOString(),
      status: draftStatus
    };

    const updated = NoticeService.saveDraftResponse(selectedNotice.id, draftRecord);
    if (updated) {
      onNoticeUpdated(updated);
      onShowToast('Draft response saved to notice record', 'success');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-page-title text-[#172C35] dark:text-[#ECF5F5]">
            Response Assistant & Formal Draft Workspace
          </h1>
          <p className="mt-0.5 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
            Generate structured response templates grounded in verified notice citations, facts, and authority guidelines.
          </p>
        </div>

        {/* Notice Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5F7279] dark:text-[#A6BBC3] font-semibold hidden sm:inline">Active Notice:</span>
          <select
            value={selectedNoticeId}
            onChange={(e) => setSelectedNoticeId(e.target.value)}
            className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 dark:focus:ring-[#65D5C5]/40 shadow-xs max-w-xs truncate cursor-pointer"
          >
            {notices.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title.length > 40 ? `${n.title.slice(0, 40)}...` : n.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Legal Review Disclaimer Alert Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-900/60 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="font-bold">
            NiyamSetu provides administrative draft structuring, NOT formal legal advice.
          </p>
          <p className="mt-0.5 text-amber-800 dark:text-amber-300">
            Every administrative response carries legal effect and binds your business entity. Prior to
            signing or mailing, verify all factual statements, dates, and amounts with your CPA or qualified legal counsel.
          </p>
        </div>
      </div>

      {/* Template Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {RESPONSE_TEMPLATES.map((tmpl) => {
          const isSelected = templateType === tmpl.type;
          return (
            <button
              key={tmpl.type}
              onClick={() => setTemplateType(tmpl.type)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#238C88] dark:border-[#65D5C5] bg-white dark:bg-[#142332] ring-2 ring-[#238C88]/20 dark:ring-[#65D5C5]/20 shadow-xs'
                  : 'border-[#DCE9E5] dark:border-[#294251] bg-white/70 dark:bg-[#142332]/70 hover:bg-white dark:hover:bg-[#142332] hover:border-[#238C88]/50 dark:hover:border-[#65D5C5]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#238C88] dark:text-[#65D5C5]">
                  Template
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#238C88] dark:bg-[#65D5C5]" />
                )}
              </div>
              <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] line-clamp-1">{tmpl.title}</h4>
              <p className="mt-1 text-[11px] text-[#5F7279] dark:text-[#A6BBC3] line-clamp-2 leading-snug">
                {tmpl.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Draft Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white/95 dark:bg-[#142332]/95 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-5 shadow-xs flex flex-col h-full">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Draft Editor</span>
                <span className="text-[#DCE9E5] dark:text-[#294251]">·</span>
                <select
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value as any)}
                  className="text-[11px] font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] rounded-lg px-2 py-0.5 cursor-pointer"
                >
                  <option value="draft">Status: In Draft</option>
                  <option value="reviewed">Status: Under CPA / Counsel Review</option>
                  <option value="finalized">Status: Finalized for Signature</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRegenerate}
                  className="p-1.5 text-[#5F7279] dark:text-[#A6BBC3] hover:text-[#238C88] dark:hover:text-[#65D5C5] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold cursor-pointer"
                  title="Reset to template defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#E3F2EC] dark:hover:bg-[#203A49] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#E3F2EC] dark:hover:bg-[#203A49] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>

                <button
                  onClick={handleSaveDraft}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white dark:text-[#0D1722] bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] hover:opacity-95 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#B6E6D9] dark:text-[#0D1722]" />
                  <span>Save Draft</span>
                </button>
              </div>
            </div>

            {/* Editable Text Area */}
            <div className="mt-4 flex-1">
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                rows={22}
                className="w-full p-4 font-mono text-xs leading-relaxed text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0]/30 dark:bg-[#0D1722]/50 rounded-xl border border-[#DCE9E5] dark:border-[#294251] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30 resize-y"
                placeholder="Draft content..."
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[#5F7279] dark:text-[#A6BBC3] font-mono">
              <span>{draftContent.length} characters · {draftContent.split(/\s+/).filter(Boolean).length} words</span>
              <span>Fill in all bracketed [UPPERCASE] items prior to submission</span>
            </div>
          </div>
        </div>

        {/* Right Column: Context & Evidence Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Notice Core Facts Card */}
          {selectedNotice ? (
            <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#238C88] dark:text-[#65D5C5] uppercase tracking-wider">
                  Associated Notice Details
                </span>
                <h3 className="mt-1 text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                  {selectedNotice.title}
                </h3>
              </div>

              <div className="text-xs space-y-2 border-t border-[#DCE9E5]/60 dark:border-[#294251] pt-3 text-[#5F7279] dark:text-[#A6BBC3]">
                <div className="flex justify-between">
                  <span>Authority:</span>
                  <span className="font-bold text-[#172C35] dark:text-[#ECF5F5] text-right truncate max-w-[160px]">
                    {selectedNotice.issuingAuthority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ref Code:</span>
                  <span className="font-mono text-[#172C35] dark:text-[#ECF5F5]">{selectedNotice.referenceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span className="font-bold text-rose-700 dark:text-rose-400">
                    {selectedNotice.deadlineDate || 'Unspecified'}
                  </span>
                </div>
              </div>

              {/* Citations to invoke */}
              <div className="pt-3 border-t border-[#DCE9E5]/60 dark:border-[#294251]">
                <span className="text-[11px] font-bold text-[#172C35] dark:text-[#ECF5F5] uppercase tracking-wider block mb-2">
                  Key Statutory Citations
                </span>
                <div className="space-y-1.5">
                  {selectedNotice.legalCitations.map((c, i) => (
                    <div key={i} className="p-2 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251] text-[11px]">
                      <span className="font-mono font-bold text-[#238C88] dark:text-[#65D5C5]">{c.code}</span>
                      <p className="text-[#5F7279] dark:text-[#A6BBC3] mt-0.5 text-[10px]">{c.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Information Callout */}
              {selectedNotice.missingOrUncertain.length > 0 && (
                <div className="pt-3 border-t border-[#DCE9E5]/60 dark:border-[#294251]">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider block mb-2 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Verify Before Sending
                  </span>
                  <div className="space-y-1.5">
                    {selectedNotice.missingOrUncertain.map((m, i) => (
                      <div key={i} className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200">
                        <span className="font-semibold">{m.item}</span>
                        <p className="text-[10px] text-amber-800 dark:text-amber-300 mt-0.5">{m.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Exhibits to Attach */}
              <div className="pt-3 border-t border-[#DCE9E5]/60 dark:border-[#294251]">
                <span className="text-[11px] font-bold text-[#172C35] dark:text-[#ECF5F5] uppercase tracking-wider block mb-2">
                  Document Checklist
                </span>
                <div className="space-y-1">
                  {selectedNotice.documentChecklist.map((d) => (
                    <div key={d.id} className="flex items-center gap-2 text-[11px]">
                      <span className={`w-1.5 h-1.5 rounded-full ${d.collected ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      <span className={d.collected ? 'text-[#172C35] dark:text-[#ECF5F5] font-semibold' : 'text-[#5F7279] dark:text-[#A6BBC3]'}>
                        {d.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#5F7279] dark:text-[#A6BBC3] bg-white dark:bg-[#142332] rounded-2xl border border-[#DCE9E5] dark:border-[#294251]">
              No notice selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
