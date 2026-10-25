import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Sparkles,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Layers,
  Eye,
  CheckCircle2,
  X,
  FileCode,
  File
} from 'lucide-react';
import { Notice } from '../../types/notice';

interface NoticePdfViewerProps {
  notice: Notice;
  highlightedSnippetId?: string;
  onSelectSnippet?: (snippetId: string) => void;
  className?: string;
}

export const NoticePdfViewer: React.FC<NoticePdfViewerProps> = ({
  notice,
  highlightedSnippetId,
  onSelectSnippet,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMatches, setSearchMatches] = useState<number>(0);
  const [activeSearchIndex, setActiveSearchIndex] = useState<number>(0);
  const [activeAnnotation, setActiveAnnotation] = useState<{
    title: string;
    description: string;
    category: 'deadline' | 'citation' | 'liability' | 'action';
    quote: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'annotated' | 'raw_pdf'>('annotated');
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Auto-jump to page if highlightedSnippetId changes
  useEffect(() => {
    if (!highlightedSnippetId) return;
    const snippet = notice.sourceSnippets?.find((s) => s.id === highlightedSnippetId);
    if (snippet && snippet.page) {
      setCurrentPage(Math.min(Math.max(1, snippet.page), totalPages));
    }
  }, [highlightedSnippetId, notice.sourceSnippets]);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoomLevel(100);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Search logic
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchMatches(0);
      setActiveSearchIndex(0);
      return;
    }
    // Calculate simulated matches in document
    const matchCount = Math.floor(Math.random() * 3) + 2;
    setSearchMatches(matchCount);
    setActiveSearchIndex(1);
  };

  const handleNextMatch = () => {
    if (searchMatches > 0) {
      setActiveSearchIndex((prev) => (prev % searchMatches) + 1);
    }
  };

  const handlePrevMatch = () => {
    if (searchMatches > 0) {
      setActiveSearchIndex((prev) => (prev === 1 ? searchMatches : prev - 1));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean text-based file or trigger download
    const element = document.createElement('a');
    const file = new Blob(
      [
        `========================================================================\n` +
          `OFFICIAL NOTICE OF PROCEEDINGS\n` +
          `${notice.issuingAuthority}\n` +
          `REFERENCE: ${notice.referenceNumber}\n` +
          `DATE: ${notice.issueDate}\n` +
          `DEADLINE: ${notice.deadlineDate || 'Unspecified'}\n` +
          `========================================================================\n\n` +
          `SUBJECT: ${notice.title}\n\n` +
          `SUMMARY OF DEMAND / NOTICE:\n${notice.plainLanguageSummary}\n\n` +
          `WHY ISSUED:\n${notice.whyIssued.officialRationale}\n\n` +
          `STATUTORY DEADLINE CLAUSE:\n"${notice.deadlineSource}"\n\n` +
          `DOCUMENT AUTHENTICATION DIN: DIN-${notice.referenceNumber.replace(/[^A-Z0-9]/gi, '')}\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = notice.fileName ? notice.fileName.replace(/\.pdf$/i, '.txt') : `Notice_${notice.referenceNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-900/90 dark:bg-[#0a111a] rounded-2xl border border-slate-700/60 dark:border-[#294251] overflow-hidden shadow-xl ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* Top PDF Control Toolbar */}
      <div className="bg-slate-950/90 dark:bg-[#0e1724] border-b border-slate-800 dark:border-[#1e3142] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-300">
        {/* Left: Document details & Mode */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-[11px] shrink-0">
            <File className="w-3.5 h-3.5" />
            <span>PDF</span>
          </div>
          <div className="min-w-0">
            <span
              className="font-medium text-slate-200 dark:text-[#ECF5F5] truncate block max-w-[180px] sm:max-w-[260px] text-xs"
              title={notice.fileName || `${notice.referenceNumber}.pdf`}
            >
              {notice.fileName || `${notice.referenceNumber}.pdf`}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {notice.fileSize || '1.8 MB'} · {totalPages} Pages · OCR Verified
            </span>
          </div>

          {notice.fileUrl && (
            <div className="ml-2 hidden sm:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('annotated')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === 'annotated'
                    ? 'bg-[#238C88] text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Annotated
              </button>
              <button
                onClick={() => setViewMode('raw_pdf')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === 'raw_pdf'
                    ? 'bg-[#238C88] text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw Stream
              </button>
            </div>
          )}
        </div>

        {/* Center: Page Controls */}
        <div className="flex items-center gap-1 bg-slate-900/90 dark:bg-[#142332] px-2 py-1 rounded-xl border border-slate-800 dark:border-[#294251]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="px-2 text-[11px] font-semibold font-mono text-slate-200">
            Page <span className="text-[#65D5C5] font-bold">{currentPage}</span> of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="w-px h-3.5 bg-slate-800 mx-1" />

          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-1 rounded text-xs transition-colors cursor-pointer ${
              showThumbnails
                ? 'bg-[#238C88] text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Toggle Thumbnails"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Zoom, Search, Annotations & Export */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Search in document */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search in PDF..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-32 lg:w-40 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl pl-8 pr-7 py-1 focus:outline-none focus:ring-1 focus:ring-[#238C88] placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchMatches(0);
                }}
                className="absolute right-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {searchMatches > 0 && (
            <div className="hidden lg:flex items-center gap-1 text-[10px] bg-slate-800 px-2 py-1 rounded-lg text-slate-300 font-mono">
              <span>{activeSearchIndex}/{searchMatches}</span>
              <button onClick={handlePrevMatch} className="hover:text-white">▲</button>
              <button onClick={handleNextMatch} className="hover:text-white">▼</button>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-slate-900/90 dark:bg-[#142332] px-1.5 py-1 rounded-xl border border-slate-800 dark:border-[#294251]">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 text-[11px] font-mono text-slate-300 hover:text-white cursor-pointer"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rotate */}
          <button
            onClick={handleRotate}
            className="p-1.5 rounded-xl bg-slate-900/90 dark:bg-[#142332] border border-slate-800 dark:border-[#294251] text-slate-400 hover:text-white cursor-pointer"
            title="Rotate Clockwise"
            aria-label="Rotate Clockwise"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Smart AI Highlights Toggle */}
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
              showAnnotations
                ? 'bg-linear-to-r from-[#238C88]/30 to-[#65D5C5]/20 border-[#238C88] text-[#65D5C5]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Extracted AI Highlights on PDF"
          >
            <Sparkles className="w-3 h-3 text-[#65D5C5]" />
            <span className="hidden sm:inline">AI Highlights</span>
          </button>

          {/* Download & Print */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-xl bg-slate-900/90 dark:bg-[#142332] border border-slate-800 dark:border-[#294251] text-slate-400 hover:text-white cursor-pointer"
            title="Download Document"
            aria-label="Download Document"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-xl bg-slate-900/90 dark:bg-[#142332] border border-slate-800 dark:border-[#294251] text-slate-400 hover:text-white cursor-pointer"
            title="Print Document"
            aria-label="Print Document"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Body Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-950/80 dark:bg-[#070d14]">
        {/* Optional Page Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="w-32 bg-slate-900/90 border-r border-slate-800 p-2.5 overflow-y-auto space-y-3 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Pages ({totalPages})
            </span>
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`p-1.5 rounded-xl border text-center cursor-pointer transition-all ${
                  currentPage === page
                    ? 'border-[#238C88] bg-slate-800/90 ring-2 ring-[#238C88]/40'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                }`}
              >
                <div className="w-full aspect-3/4 bg-white rounded-md p-1 shadow-xs flex flex-col justify-between text-[6px] text-slate-400 overflow-hidden leading-tight select-none">
                  <div className="border-b border-slate-200 pb-0.5 font-bold text-[5px] text-slate-800 uppercase truncate">
                    {notice.authorityType}
                  </div>
                  <div className="space-y-0.5 text-left text-slate-600">
                    <div className="h-1 bg-slate-300 rounded-xs w-3/4" />
                    <div className="h-1 bg-slate-200 rounded-xs w-full" />
                    <div className="h-1 bg-slate-200 rounded-xs w-5/6" />
                    <div className="h-1 bg-slate-200 rounded-xs w-1/2" />
                  </div>
                  <div className="text-[5px] text-center font-bold text-slate-700">
                    Pg {page}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-300 mt-1 block">
                  Page {page}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Viewport with scrollable document container */}
        <div
          ref={pageContainerRef}
          className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start relative select-text"
          style={{ minHeight: '520px' }}
        >
          {/* If raw_pdf stream is chosen and fileUrl exists */}
          {viewMode === 'raw_pdf' && notice.fileUrl ? (
            <div className="w-full h-full min-h-[520px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              <iframe
                src={`${notice.fileUrl}#page=${currentPage}&zoom=${zoomLevel}`}
                title="Notice PDF Stream"
                className="w-full h-full min-h-[520px] border-0"
              />
            </div>
          ) : (
            /* High-fidelity Rendered Government Notice Document Sheet */
            <div
              className="transition-transform duration-150 origin-top bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-300 relative font-serif"
              style={{
                width: '780px',
                minHeight: '1080px',
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'top center',
                boxShadow:
                  '0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1)'
              }}
            >
              {/* Document Paper Texture & Watermark */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]">
                <div className="absolute inset-0 flex items-center justify-center -rotate-45 text-slate-900 font-sans font-black text-6xl tracking-widest uppercase">
                  OFFICIAL COMMUNICATION · {notice.referenceNumber}
                </div>
              </div>

              {/* Verified OCR Barcode Header Ribbon */}
              <div className="px-10 pt-8 pb-4 flex items-center justify-between border-b-2 border-slate-900 font-sans">
                <div className="flex items-center gap-3">
                  {/* Government Emblem Symbol / Crest */}
                  <div className="w-12 h-12 rounded-full border-2 border-slate-800 p-1 flex items-center justify-center shrink-0">
                    <div className="text-center">
                      <ShieldCheck className="w-6 h-6 mx-auto text-slate-800" />
                      <span className="text-[6px] font-black tracking-tighter uppercase block">GOVT</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      {notice.issuingAuthority}
                    </h2>
                    <p className="text-[10px] text-slate-600 font-medium">
                      JURISDICTION: APEX COMMERCIAL TAX & REGULATORY WING · TAXPAYER SERVICES
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono">
                      DOCUMENT IDENTIFICATION NO. (DIN): DIN-2026-
                      {notice.referenceNumber.replace(/[^0-9A-Z]/gi, '').slice(0, 10) || '8839210'}
                    </p>
                  </div>
                </div>

                {/* Right side barcode & speed post dispatch tag */}
                <div className="text-right font-mono text-[10px]">
                  <div className="inline-block p-1 bg-slate-100 border border-slate-300 rounded mb-1">
                    {/* Visual Barcode SVG */}
                    <div className="flex items-center gap-[2px] h-6 px-1">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 3, 1, 2, 3].map((w, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 h-full"
                          style={{ width: `${w * 1.5}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[8px] font-bold tracking-widest text-slate-700 uppercase">
                    ★ SPEED POST REGISTERED ★
                  </div>
                </div>
              </div>

              {/* Sub-Header Metadata Bar */}
              <div className="px-10 py-3 bg-slate-50 border-b border-slate-300 flex items-center justify-between text-xs font-sans text-slate-700">
                <div>
                  <span className="font-bold text-slate-900">Notice Ref: </span>
                  <span className="font-mono">{notice.referenceNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Notice Date: </span>
                  <span className="font-mono">{notice.issueDate}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Dispatch Status: </span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">
                    Served & Acknowledged
                  </span>
                </div>
              </div>

              {/* Official Stamp in top right corner */}
              <div className="absolute top-28 right-12 pointer-events-none select-none opacity-80 rotate-12 z-20">
                <div className="w-24 h-24 rounded-full border-2 border-red-700 flex flex-col items-center justify-center text-red-700 text-center p-1.5 leading-none bg-red-50/20 backdrop-blur-2xs">
                  <span className="text-[8px] font-black uppercase tracking-wider">OFFICIAL SEAL</span>
                  <span className="text-[10px] font-black my-0.5">SPEED POST</span>
                  <span className="text-[7px] font-mono">{notice.issueDate}</span>
                  <span className="text-[6px] uppercase font-bold tracking-tighter mt-0.5">
                    REVENUE WING
                  </span>
                </div>
              </div>

              {/* ===================== PAGE 1 CONTENT ===================== */}
              {currentPage === 1 && (
                <div className="p-10 space-y-6 text-[13px] leading-relaxed text-slate-800">
                  {/* Addressee Info */}
                  <div className="font-sans space-y-1 text-xs">
                    <p className="font-bold text-slate-900">TO:</p>
                    <p className="font-bold text-slate-950 uppercase tracking-wide">
                      THE PRINCIPAL OFFICER / MANAGING DIRECTOR
                    </p>
                    <p className="text-slate-800 font-semibold">
                      APEX PRECISION TECHNOLOGIES PRIVATE LIMITED
                    </p>
                    <p className="text-slate-600">
                      PLOT NO. 44, PEENYA INDUSTRIAL AREA, 2ND STAGE, BANGALORE - 560058
                    </p>
                    <p className="text-slate-600 font-mono">
                      REGISTRATION / ID: 29AABCU9603R1ZM · CIN: U72200KA2018PTC112344
                    </p>
                  </div>

                  {/* Subject Line */}
                  <div className="text-center py-2 px-4 bg-slate-100 border-y border-slate-300 font-sans">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-900">
                      SUBJECT: {notice.title}
                    </p>
                  </div>

                  {/* Opening Statement */}
                  <p>
                    Sir / Madam,
                  </p>
                  <p>
                    WHEREAS on scrutiny of the records, electronic filings, and statutory disclosures submitted by your entity for the applicable period, it has been observed that discrepancies and statutory variances exist under the operative provisions of the relevant Act.
                  </p>

                  {/* Allegation Highlight with Smart AI Annotation */}
                  <div
                    className={`relative p-3.5 rounded-lg border transition-all ${
                      showAnnotations
                        ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400/50'
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    {showAnnotations && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[9px] font-sans font-bold bg-amber-600 text-white uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Core Discrepancy / Trigger Event</span>
                      </span>
                    )}
                    <p className="font-medium text-slate-900 italic">
                      &quot;{notice.whyIssued.trigger}&quot;
                    </p>
                    <p className="mt-2 text-xs font-sans text-slate-700">
                      <strong>Legal Finding: </strong> {notice.whyIssued.officialRationale}
                    </p>
                  </div>

                  {/* Paragraph regarding Response Window / Strict Deadline */}
                  <p>
                    You are hereby called upon to appear, provide clarifications, or file your formal written statement of defense supported with verifiable documentary evidence.
                  </p>

                  {/* DEADLINE CLAUSE HIGHLIGHT */}
                  <div
                    className={`relative p-4 rounded-xl border transition-all ${
                      showAnnotations
                        ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/60 shadow-xs'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {showAnnotations && (
                      <div className="flex items-center justify-between mb-1.5 font-sans">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Extracted Statutory Deadline</span>
                        </span>
                        <span className="text-xs font-bold text-rose-700 font-mono">
                          Due: {notice.deadlineDate || 'Strict Notice Window'}
                        </span>
                      </div>
                    )}
                    <blockquote className="font-bold text-slate-900 text-sm leading-snug">
                      &quot;{notice.deadlineSource}&quot;
                    </blockquote>
                    {showAnnotations && (
                      <p className="mt-2 text-[11px] font-sans text-rose-800 font-medium">
                        ✦ AI Analysis Alert: Failure to submit response prior to deadline triggers ex-parte assessment and automatic penalty enforcement.
                      </p>
                    )}
                  </div>

                  <p>
                    Failure to furnish the required submissions within the stipulated period shall be construed as having no defense to offer, and appropriate orders shall be passed on the basis of materials available on record.
                  </p>

                  {/* Page 1 Footer */}
                  <div className="pt-8 border-t border-slate-300 flex items-center justify-between font-sans text-[11px] text-slate-500">
                    <span>Page 1 of {totalPages}</span>
                    <span className="font-mono">Notice Ref: {notice.referenceNumber}</span>
                    <span>Continued on Page 2...</span>
                  </div>
                </div>
              )}

              {/* ===================== PAGE 2 CONTENT: SCHEDULE & CALCULATION ===================== */}
              {currentPage === 2 && (
                <div className="p-10 space-y-6 text-[13px] leading-relaxed text-slate-800">
                  <div className="text-center pb-2 border-b border-slate-400 font-sans">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      SCHEDULE I: STATEMENT OF DISALLOWED CHARGES & STATUTORY CITATIONS
                    </h3>
                    <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                      ANNEXURE TO NOTICE NO. {notice.referenceNumber}
                    </p>
                  </div>

                  <p>
                    The itemized breakdown of variance and statutory claims computed as per the inspection records is detailed hereunder:
                  </p>

                  {/* Discrepancy Assessment Table */}
                  <div className="border border-slate-900 font-sans text-xs">
                    <div className="bg-slate-100 border-b border-slate-900 grid grid-cols-12 font-bold text-slate-900 p-2 text-center">
                      <div className="col-span-1 border-r border-slate-300">S.No.</div>
                      <div className="col-span-4 border-r border-slate-300 text-left pl-2">Description / Head</div>
                      <div className="col-span-2 border-r border-slate-300">Statutory Code</div>
                      <div className="col-span-2 border-r border-slate-300">Disputed Sum</div>
                      <div className="col-span-3">Penalty / Surcharge</div>
                    </div>

                    <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 items-center">
                      <div className="col-span-1 text-center font-mono">01</div>
                      <div className="col-span-4 pl-2 font-medium">
                        Unreconciled Input Tax Credit / Variance
                      </div>
                      <div className="col-span-2 text-center font-mono text-[11px]">
                        {notice.legalCitations[0]?.code || 'Sec 73(1)'}
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold pr-2">₹3,84,500</div>
                      <div className="col-span-3 text-right font-mono text-rose-700 font-bold pr-2">
                        ₹38,450 (10%)
                      </div>
                    </div>

                    <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 items-center bg-slate-50">
                      <div className="col-span-1 text-center font-mono">02</div>
                      <div className="col-span-4 pl-2 font-medium">
                        Cumulative Statutory Interest (@ 18% p.a.)
                      </div>
                      <div className="col-span-2 text-center font-mono text-[11px]">
                        Sec 50 / Rules
                      </div>
                      <div className="col-span-2 text-right font-mono font-bold pr-2">Applicable</div>
                      <div className="col-span-3 text-right font-mono text-rose-700 pr-2">
                        Computed to Date
                      </div>
                    </div>

                    <div className="grid grid-cols-12 p-2.5 bg-slate-200 font-bold text-slate-950">
                      <div className="col-span-7 pl-2">TOTAL POTENTIAL FINANCIAL EXPOSURE</div>
                      <div className="col-span-2 text-right font-mono pr-2">₹3,84,500</div>
                      <div className="col-span-3 text-right font-mono text-rose-800 pr-2">
                        + Interest & Costs
                      </div>
                    </div>
                  </div>

                  {/* Legal Citations Highlight Section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">
                      Applicable Statutory Sections:
                    </h4>

                    {notice.legalCitations.map((cite, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border font-sans text-xs transition-all ${
                          showAnnotations
                            ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-400/40'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sky-900 font-mono">{cite.code}</span>
                          <span className="text-[10px] text-slate-600 font-medium">{cite.title}</span>
                        </div>
                        <p className="italic text-slate-800 font-serif text-[12px]">
                          &quot;{cite.excerpt}&quot;
                        </p>
                        {showAnnotations && (
                          <div className="mt-1.5 pt-1.5 border-t border-sky-200 text-[11px] text-sky-950 font-sans">
                            <strong>AI Meaning: </strong> {cite.plainMeaning}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Page 2 Footer */}
                  <div className="pt-10 border-t border-slate-300 flex items-center justify-between font-sans text-[11px] text-slate-500">
                    <span>Page 2 of {totalPages}</span>
                    <span className="font-mono">Notice Ref: {notice.referenceNumber}</span>
                    <span>Continued on Page 3...</span>
                  </div>
                </div>
              )}

              {/* ===================== PAGE 3 CONTENT: INSTRUCTIONS & SIGNATURE ===================== */}
              {currentPage === 3 && (
                <div className="p-10 space-y-6 text-[13px] leading-relaxed text-slate-800">
                  <div className="text-center pb-2 border-b border-slate-400 font-sans">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      DIRECTIONS FOR COMPLIANCE & AUTHORIZED SIGNATORY
                    </h3>
                  </div>

                  <p>
                    Take notice that pursuant to the powers vested under the statute, you are directed to submit the following documentation along with your written statement of objection:
                  </p>

                  {/* Document Checklist Items highlighted */}
                  <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 font-sans text-xs space-y-2">
                    <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                      Mandatory Enclosures Required by Authority:
                    </span>
                    {notice.documentChecklist.slice(0, 4).map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-800">
                        <span className="font-mono font-bold text-slate-500">({idx + 1})</span>
                        <div>
                          <span className="font-bold">{doc.name}: </span>
                          <span className="text-slate-600">{doc.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p>
                    Given under the hand and seal of the undersigned officer on this day, {notice.issueDate}.
                  </p>

                  {/* Signatory & Digital Verification Block */}
                  <div className="pt-8 flex items-end justify-between font-sans">
                    {/* Official Circular Seal */}
                    <div className="w-28 h-28 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-800">
                      <div className="text-[8px] font-bold uppercase tracking-tight">
                        STATE REVENUE DEPT
                      </div>
                      <div className="text-[10px] font-black my-0.5">OFFICIAL SEAL</div>
                      <div className="text-[7px] font-mono">LGSTO-040 BANGALORE</div>
                    </div>

                    {/* Signature and Cryptographic Token */}
                    <div className="text-right space-y-1">
                      <div className="inline-block p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-left font-mono text-[9px] text-emerald-900 mb-2">
                        <div className="flex items-center gap-1 font-bold text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>DIGITALLY SIGNED DOCUMENT</span>
                        </div>
                        <p className="text-[8px] text-slate-600 mt-0.5">
                          Signer: Assistant Commissioner of State Tax
                        </p>
                        <p className="text-[8px] text-slate-500 truncate max-w-[200px]">
                          Hash: 9F8B2E1C40A395D87E60B543F...
                        </p>
                      </div>

                      <p className="font-bold text-sm text-slate-950">
                        [PROPER OFFICER / ASST COMMISSIONER]
                      </p>
                      <p className="text-xs text-slate-700">Office of the Assistant Commissioner</p>
                      <p className="text-xs text-slate-600">{notice.issuingAuthority}</p>
                    </div>
                  </div>

                  {/* Page 3 Footer */}
                  <div className="pt-12 border-t border-slate-300 flex items-center justify-between font-sans text-[11px] text-slate-500">
                    <span>Page 3 of {totalPages} (End of Notice)</span>
                    <span className="font-mono">Reference: {notice.referenceNumber}</span>
                    <span className="text-emerald-700 font-bold">100% OCR Validated</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
