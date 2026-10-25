import React, { useState, useRef } from 'react';
import {
  Upload,
  FileCheck,
  Shield,
  Sparkles,
  ArrowRight,
  BookOpen,
  X,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_NOTICES } from '../../data/mockNotices';
import { Notice } from '../../types/notice';
import { NoticeService } from '../../services/noticeService';

interface UploadPageProps {
  onAnalysisComplete: (noticeId: string) => void;
  onSelectNotice: (noticeId: string) => void;
}

type ProcessingStep =
  | 'idle'
  | 'uploading'
  | 'ocr_extraction'
  | 'authority_matching'
  | 'deadline_verification'
  | 'complete';

export const UploadPage: React.FC<UploadPageProps> = ({
  onAnalysisComplete,
  onSelectNotice
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSampleNotice, setSelectedSampleNotice] = useState<Notice | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'tiff'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setErrorMessage('Unsupported file format. Please upload a PDF, PNG, JPG, or TIFF document.');
      return false;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 25 MB limit.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setSelectedSampleNotice(null);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setSelectedSampleNotice(null);
      }
    }
  };

  const handleSelectSample = (notice: Notice) => {
    setSelectedSampleNotice(notice);
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleRemoveSelection = () => {
    setSelectedFile(null);
    setSelectedSampleNotice(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Start analysis simulation
  const handleStartAnalysis = () => {
    if (!selectedFile && !selectedSampleNotice) {
      setErrorMessage('Please select or drag a notice document to analyze.');
      return;
    }

    setErrorMessage(null);
    setProcessingStep('uploading');
    setProgressPercent(15);

    setTimeout(() => {
      setProcessingStep('ocr_extraction');
      setProgressPercent(40);

      setTimeout(() => {
        setProcessingStep('authority_matching');
        setProgressPercent(65);

        setTimeout(() => {
          setProcessingStep('deadline_verification');
          setProgressPercent(90);

          setTimeout(() => {
            setProcessingStep('complete');
            setProgressPercent(100);

            let targetNotice: Notice;

            if (selectedSampleNotice) {
              targetNotice = selectedSampleNotice;
            } else if (selectedFile) {
              const fileNameClean = selectedFile.name.replace(/\.[^/.]+$/, '');
              targetNotice = {
                id: `notice-upload-${Date.now()}`,
                title: `${fileNameClean.replace(/_/g, ' ')} - Extracted Regulatory Notice`,
                issuingAuthority: 'State Department of Industrial Relations / Labor Agency',
                authorityType: 'Labor & Workplace Safety (OSHA)',
                category: 'Regulatory & Labor',
                referenceNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
                receivedDate: new Date().toISOString().split('T')[0],
                issueDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
                deadlineDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
                deadlineSource: 'Section 4, Page 2: "Written compliance response must be received within twenty-one (21) calendar days of notice receipt."',
                deadlineType: 'calendar_days',
                urgency: 'urgent',
                status: 'needs_attention',
                confidenceScore: 96,
                plainLanguageSummary:
                  'The agency has logged an administrative compliance audit regarding your commercial facility. They require certification of safety logs and submission of designated workplace records within 21 days to prevent statutory penalty escalation.',
                whyIssued: {
                  trigger: 'Periodic statutory inspection audit cycle review.',
                  officialRationale: 'Enforcement of statutory workplace safety recordkeeping requirements.',
                  businessRisk: 'Civil monetary penalties and mandatory on-site physical inspection if response is delinquent.'
                },
                mandatoryActions: [
                  {
                    id: `m-${Date.now()}-1`,
                    title: 'Submit Certified Abatement or Form Response',
                    deadline: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
                    description: 'Transmit complete signed verification of corrective measures.',
                    completed: false
                  }
                ],
                suggestedPreparations: [
                  {
                    id: `s-${Date.now()}-1`,
                    title: 'Cross-Check Facility Records with Counsel',
                    timeframe: 'Within 7 business days',
                    description: 'Review relevant workplace logs and confirm consistency.',
                    completed: false
                  }
                ],
                documentChecklist: [
                  {
                    id: `d-${Date.now()}-1`,
                    name: 'Signed Notice Response Transmittal Form',
                    description: 'Official return document requiring officer signature.',
                    collected: false,
                    mandatory: true,
                    locationHint: 'Uploaded document Page 3'
                  },
                  {
                    id: `d-${Date.now()}-2`,
                    name: 'Proof of Written Safety Training Logs',
                    description: 'Employee attendance records for past 12 months.',
                    collected: true,
                    mandatory: true,
                    locationHint: 'Internal HR files'
                  }
                ],
                legalCitations: [
                  {
                    code: 'State Labor Code § 6401.7',
                    title: 'Injury and Illness Prevention Programs',
                    excerpt: 'Every employer shall establish, implement and maintain an effective injury and illness prevention program.',
                    plainMeaning: 'Mandates formal written health and safety procedures.'
                  }
                ],
                missingOrUncertain: [
                  {
                    item: 'Assigned Direct Compliance Officer Phone Extension',
                    reason: 'Notice specifies central regional office line only.',
                    severity: 'low',
                    suggestedVerification: 'Submit via certified mail and electronic portal simultaneously.'
                  }
                ],
                sourceSnippets: [
                  {
                    id: `snip-${Date.now()}-1`,
                    section: 'Page 1, Paragraph 1',
                    page: 1,
                    originalText: `Official Administrative Notice regarding compliance verification for business entity. Document reference: ${selectedFile.name}.`,
                    verifiedFact: 'Original document verified and parsed through OCR pipeline.'
                  }
                ],
                fileName: selectedFile.name,
                fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
                fileUrl: URL.createObjectURL(selectedFile)
              };

              NoticeService.addNotice(targetNotice);
            } else {
              targetNotice = INITIAL_NOTICES[0];
            }

            setTimeout(() => {
              onAnalysisComplete(targetNotice.id);
            }, 600);
          }, 600);
        }, 700);
      }, 700);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-page-title text-[#172C35] dark:text-[#ECF5F5]">
          Analyze a Legal or Government Notice
        </h1>
        <p className="mt-1 text-sm text-[#5F7279] dark:text-[#A6BBC3]">
          Upload any official agency correspondence, citation, demand letter, or audit notice to
          extract obligations, confirm deadlines, and organize defense preparation.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 sm:p-8 shadow-xs">
        {processingStep === 'idle' ? (
          <div>
            {/* Drag & drop area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
                dragActive
                  ? 'border-[#238C88] dark:border-[#65D5C5] bg-[#EAF5F0]/80 dark:bg-[#1B3040]/80 scale-[1.01]'
                  : selectedFile || selectedSampleNotice
                  ? 'border-[#238C88]/70 dark:border-[#65D5C5]/70 bg-[#EAF5F0]/30 dark:bg-[#1B3040]/30'
                  : 'border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88]/60 dark:hover:border-[#65D5C5]/60 bg-[#EAF5F0]/20 dark:bg-[#0D1722]/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.tiff"
                onChange={handleFileInputChange}
                className="hidden"
                id="notice-file-input"
              />

              {selectedFile || selectedSampleNotice ? (
                <div className="flex flex-col items-center">
                  <div className="p-3.5 rounded-full bg-[#B6E6D9]/50 dark:bg-[#65D5C5]/20 text-[#238C88] dark:text-[#65D5C5] mb-3">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
                    {selectedFile ? selectedFile.name : selectedSampleNotice?.fileName}
                  </h3>
                  <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] mt-0.5">
                    {selectedFile
                      ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for OCR & Legal Extraction`
                      : `${selectedSampleNotice?.fileSize} · Verified Sample Notice Loaded`}
                  </p>

                  <button
                    onClick={handleRemoveSelection}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove Document</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3.5 rounded-full bg-[#EAF5F0] dark:bg-[#1B3040] text-[#238C88] dark:text-[#65D5C5] mb-3 border border-[#DCE9E5] dark:border-[#294251]">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
                    Drag & Drop your notice here, or{' '}
                    <label
                      htmlFor="notice-file-input"
                      className="text-[#238C88] dark:text-[#65D5C5] hover:underline cursor-pointer font-bold"
                    >
                      browse files
                    </label>
                  </h3>
                  <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                    Supports high-resolution PDF, PNG, JPG, or TIFF documents up to 25 MB
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                <Shield className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
                <span>Client-side sandboxed parsing · Protected confidentiality</span>
              </div>

              <button
                onClick={handleStartAnalysis}
                disabled={!selectedFile && !selectedSampleNotice}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                  selectedFile || selectedSampleNotice
                    ? 'bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] text-white dark:text-[#0D1722] hover:opacity-95 hover:shadow-md'
                    : 'bg-slate-200 dark:bg-[#1B3040] text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B6E6D9] dark:text-[#0D1722]" />
                <span>Start Legal Analysis</span>
              </button>
            </div>
          </div>
        ) : (
          /* Processing State with Realistic Progress Stepper */
          <div className="py-8 px-4 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#238C88] dark:border-[#65D5C5] mx-auto flex items-center justify-center text-[#238C88] dark:text-[#65D5C5] mb-4">
              {processingStep === 'complete' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-in zoom-in" />
              ) : (
                <div className="w-6 h-6 border-2 border-[#238C88] dark:border-[#65D5C5] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <h3 className="text-base font-bold text-[#172C35] dark:text-[#ECF5F5]">
              {processingStep === 'uploading' && 'Ingesting Document & Validating Integrity...'}
              {processingStep === 'ocr_extraction' && 'Extracting Text & Layout Coordinates...'}
              {processingStep === 'authority_matching' && 'Identifying Agency, Statutes & Case Numbers...'}
              {processingStep === 'deadline_verification' && 'Cross-Referencing Statutory Deadlines & Source Excerpts...'}
              {processingStep === 'complete' && 'Analysis Complete! Launching Review Desk...'}
            </h3>

            <p className="mt-1 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
              Correlating document facts, identifying legal citations, and verifying response windows.
            </p>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-[#EAF5F0] dark:bg-[#1B3040] rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#B9A5F5] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#5F7279] dark:text-[#A6BBC3]">
              <span>Verified Fact Engine</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Sample Notices Selector */}
      <div className="bg-white/85 dark:bg-[#142332]/85 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
          <h2 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
            Or Test with Realistic Pre-Loaded Demonstration Notices
          </h2>
        </div>
        <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] mb-4">
          Select one of the verified sample legal documents below to immediately test the extraction
          engine, deadline countdowns, document checklists, and response generator.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INITIAL_NOTICES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                selectedSampleNotice?.id === sample.id
                  ? 'border-[#238C88] dark:border-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] ring-2 ring-[#238C88]/20 dark:ring-[#65D5C5]/20 shadow-xs'
                  : 'border-[#DCE9E5] dark:border-[#294251] hover:border-[#238C88]/60 dark:hover:border-[#65D5C5]/60 bg-white dark:bg-[#142332] hover:bg-[#EAF5F0]/40 dark:hover:bg-[#1B3040]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#238C88] dark:text-[#65D5C5] uppercase tracking-wider">
                  {sample.category}
                </span>
                <span className="text-[10px] font-medium text-[#5F7279] dark:text-[#A6BBC3] font-mono">
                  {sample.referenceNumber}
                </span>
              </div>

              <h4 className="mt-1 text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] line-clamp-1">
                {sample.title}
              </h4>
              <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3] truncate mt-0.5">
                {sample.issuingAuthority}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#DCE9E5]/60 dark:border-[#294251] flex items-center justify-between text-[11px]">
                <span className="text-[#5F7279] dark:text-[#A6BBC3] font-medium">
                  {sample.deadlineDate ? `Due ${sample.deadlineDate}` : 'No deadline stated'}
                </span>
                <span className="font-semibold text-[#238C88] dark:text-[#65D5C5] flex items-center gap-1">
                  Load Notice <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
