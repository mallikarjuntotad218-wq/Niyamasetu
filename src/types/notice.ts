export type AuthorityType =
  | 'IRS / Federal Tax'
  | 'State Tax & Revenue'
  | 'Labor & Workplace Safety (OSHA)'
  | 'Commercial & Real Estate'
  | 'Licensing & Municipal'
  | 'Regulatory & Labor'
  | 'Ministry of Corporate Affairs (ROC)'
  | 'EPFO / Labor Court'
  | 'GST & Indirect Tax'
  | 'Income Tax Department (ITD)';

export type NoticeCategory =
  | 'Tax & Financial'
  | 'Regulatory & Labor'
  | 'Commercial Contract'
  | 'Municipal & Licensing';

export type UrgencyLevel =
  | 'urgent'
  | 'upcoming'
  | 'under_review'
  | 'not_identified'
  | 'overdue';

export type NoticeStatus =
  | 'needs_attention'
  | 'under_review'
  | 'in_progress'
  | 'response_drafted'
  | 'resolved';

export interface MandatoryAction {
  id: string;
  title: string;
  deadline: string;
  description: string;
  statutoryRef?: string;
  completed: boolean;
}

export interface SuggestedPreparation {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  completed: boolean;
}

export interface DocumentChecklistItem {
  id: string;
  name: string;
  description: string;
  collected: boolean;
  mandatory: boolean;
  locationHint: string;
}

export interface LegalCitation {
  code: string;
  title: string;
  excerpt: string;
  plainMeaning: string;
}

export interface MissingOrUncertainItem {
  item: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  suggestedVerification: string;
}

export interface SourceSnippet {
  id: string;
  section: string;
  page: number;
  originalText: string;
  verifiedFact: string;
}

export interface Notice {
  id: string;
  title: string;
  issuingAuthority: string;
  authorityType: AuthorityType;
  category: NoticeCategory;
  referenceNumber: string;
  receivedDate: string;
  issueDate: string;
  deadlineDate: string | null;
  deadlineSource: string;
  deadlineType?: 'strict_statutory' | 'business_days' | 'calendar_days' | 'unspecified';
  urgency: UrgencyLevel;
  status: NoticeStatus;
  confidenceScore: number;
  plainLanguageSummary: string;
  whyIssued: {
    trigger: string;
    officialRationale: string;
    businessRisk: string;
  };
  mandatoryActions: MandatoryAction[];
  suggestedPreparations: SuggestedPreparation[];
  documentChecklist: DocumentChecklistItem[];
  legalCitations: LegalCitation[];
  missingOrUncertain: MissingOrUncertainItem[];
  sourceSnippets: SourceSnippet[];
  rawText?: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  pdfUrl?: string;
  highlightedSnippetId?: string;
  draftResponses?: ResponseDraftRecord[];
}

export interface ResponseDraftRecord {
  id: string;
  templateType: 'extension' | 'clarification' | 'dispute' | 'cure_compliance';
  title: string;
  content: string;
  updatedAt: string;
  status: 'draft' | 'reviewed' | 'finalized';
}

export interface ActionPlanTask {
  id: string;
  noticeId: string;
  noticeTitle: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
  type: 'mandatory' | 'suggested';
  category: NoticeCategory;
}

export interface AppSettings {
  businessName: string;
  ein: string;
  gstinOrPan?: string;
  stateOfIncorporation: string;
  registeredAgent: string;
  primaryEmail: string;
  notificationAdvanceDays: number;
  emailAlertsEnabled: boolean;
  smsUrgentAlertsEnabled: boolean;
  retentionDays: number;
  highContrastTables: boolean;
  interfaceLanguage: string;
  explanationLanguage: string;
  autoDetectSource: boolean;
  appearance: 'light' | 'dark' | 'system';
}
