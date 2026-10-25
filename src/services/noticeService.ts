import { INITIAL_NOTICES } from '../data/mockNotices';
import {
  ActionPlanTask,
  AppSettings,
  Notice,
  NoticeStatus,
  ResponseDraftRecord,
  UrgencyLevel
} from '../types/notice';

const STORAGE_KEY_NOTICES = 'notice_desk_notices_v1';
const STORAGE_KEY_CUSTOM_TASKS = 'notice_desk_custom_tasks_v1';
const STORAGE_KEY_SETTINGS = 'notice_desk_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  businessName: 'Apex Precision Technologies Pvt. Ltd.',
  ein: 'AAACA9921M',
  gstinOrPan: '29AABCU9603R1ZM',
  stateOfIncorporation: 'Karnataka, India',
  registeredAgent: 'K. S. Narayanan & Associates (PCS)',
  primaryEmail: 'compliance@apextech.co.in',
  notificationAdvanceDays: 7,
  emailAlertsEnabled: true,
  smsUrgentAlertsEnabled: true,
  retentionDays: 90,
  highContrastTables: false,
  interfaceLanguage: 'en',
  explanationLanguage: 'en',
  autoDetectSource: true,
  appearance: 'system'
};

// Helper to calculate urgency from date
export function computeUrgency(deadlineDate: string | null): UrgencyLevel {
  if (!deadlineDate) return 'not_identified';
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 14) return 'urgent';
  return 'upcoming';
}

export function formatDaysRemaining(deadlineDate: string | null): { text: string; isPast: boolean } {
  if (!deadlineDate) return { text: 'No deadline stated', isPast: false };
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `${Math.abs(diffDays)} days overdue`, isPast: true };
  }
  if (diffDays === 0) {
    return { text: 'Due today', isPast: false };
  }
  if (diffDays === 1) {
    return { text: '1 day remaining', isPast: false };
  }
  return { text: `${diffDays} days remaining`, isPast: false };
}

export class NoticeService {
  static getNotices(): Notice[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTICES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    this.saveNotices(INITIAL_NOTICES);
    return INITIAL_NOTICES;
  }

  static getNoticeById(id: string): Notice | undefined {
    const list = this.getNotices();
    return list.find((n) => n.id === id);
  }

  static saveNotices(notices: Notice[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_NOTICES, JSON.stringify(notices));
    } catch (e) {
      console.warn('Failed to save notices to localStorage', e);
    }
  }

  static updateNoticeStatus(id: string, status: NoticeStatus): Notice | undefined {
    const list = this.getNotices();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], status };
      this.saveNotices(list);
      return list[idx];
    }
    return undefined;
  }

  static toggleDocumentChecklist(noticeId: string, docId: string): Notice | undefined {
    const list = this.getNotices();
    const notice = list.find((n) => n.id === noticeId);
    if (notice) {
      notice.documentChecklist = notice.documentChecklist.map((item) =>
        item.id === docId ? { ...item, collected: !item.collected } : item
      );
      this.saveNotices(list);
      return notice;
    }
    return undefined;
  }

  static toggleMandatoryAction(noticeId: string, actionId: string): Notice | undefined {
    const list = this.getNotices();
    const notice = list.find((n) => n.id === noticeId);
    if (notice) {
      notice.mandatoryActions = notice.mandatoryActions.map((a) =>
        a.id === actionId ? { ...a, completed: !a.completed } : a
      );
      this.saveNotices(list);
      return notice;
    }
    return undefined;
  }

  static toggleSuggestedPrep(noticeId: string, prepId: string): Notice | undefined {
    const list = this.getNotices();
    const notice = list.find((n) => n.id === noticeId);
    if (notice) {
      notice.suggestedPreparations = notice.suggestedPreparations.map((p) =>
        p.id === prepId ? { ...p, completed: !p.completed } : p
      );
      this.saveNotices(list);
      return notice;
    }
    return undefined;
  }

  static saveDraftResponse(noticeId: string, draft: ResponseDraftRecord): Notice | undefined {
    const list = this.getNotices();
    const notice = list.find((n) => n.id === noticeId);
    if (notice) {
      const existingDrafts = notice.draftResponses || [];
      const idx = existingDrafts.findIndex((d) => d.id === draft.id);
      if (idx !== -1) {
        existingDrafts[idx] = draft;
      } else {
        existingDrafts.unshift(draft);
      }
      notice.draftResponses = existingDrafts;
      notice.status = 'response_drafted';
      this.saveNotices(list);
      return notice;
    }
    return undefined;
  }

  static addNotice(newNotice: Notice): void {
    const list = this.getNotices();
    // Prepend new notice
    const updated = [newNotice, ...list.filter((n) => n.id !== newNotice.id)];
    this.saveNotices(updated);
  }

  static deleteNotice(id: string): void {
    const list = this.getNotices();
    const updated = list.filter((n) => n.id !== id);
    this.saveNotices(updated);
  }

  // Action Plans aggregating
  static getAllActionPlanTasks(): ActionPlanTask[] {
    const notices = this.getNotices();
    const tasks: ActionPlanTask[] = [];

    notices.forEach((notice) => {
      notice.mandatoryActions.forEach((action) => {
        tasks.push({
          id: `task-m-${action.id}`,
          noticeId: notice.id,
          noticeTitle: notice.title,
          title: action.title,
          description: action.description,
          dueDate: action.deadline,
          completed: action.completed,
          type: 'mandatory',
          category: notice.category
        });
      });

      notice.suggestedPreparations.forEach((prep) => {
        tasks.push({
          id: `task-s-${prep.id}`,
          noticeId: notice.id,
          noticeTitle: notice.title,
          title: prep.title,
          description: prep.description,
          dueDate: null,
          completed: prep.completed,
          type: 'suggested',
          category: notice.category
        });
      });
    });

    // Custom tasks
    try {
      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM_TASKS);
      if (customStr) {
        const custom: ActionPlanTask[] = JSON.parse(customStr);
        tasks.push(...custom);
      }
    } catch {
      // ignore
    }

    return tasks;
  }

  static toggleActionPlanTask(task: ActionPlanTask): void {
    if (task.id.startsWith('task-m-')) {
      const actionId = task.id.replace('task-m-', '');
      this.toggleMandatoryAction(task.noticeId, actionId);
    } else if (task.id.startsWith('task-s-')) {
      const prepId = task.id.replace('task-s-', '');
      this.toggleSuggestedPrep(task.noticeId, prepId);
    } else {
      // Custom task toggle
      try {
        const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM_TASKS);
        let custom: ActionPlanTask[] = customStr ? JSON.parse(customStr) : [];
        custom = custom.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t));
        localStorage.setItem(STORAGE_KEY_CUSTOM_TASKS, JSON.stringify(custom));
      } catch {
        // ignore
      }
    }
  }

  static addCustomTask(task: ActionPlanTask): void {
    try {
      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM_TASKS);
      const custom: ActionPlanTask[] = customStr ? JSON.parse(customStr) : [];
      custom.push(task);
      localStorage.setItem(STORAGE_KEY_CUSTOM_TASKS, JSON.stringify(custom));
    } catch {
      // ignore
    }
  }

  // Settings
  static getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  static resetAllData(): void {
    localStorage.removeItem(STORAGE_KEY_NOTICES);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_TASKS);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
  }
}
