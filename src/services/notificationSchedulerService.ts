import { Notice, UrgencyLevel } from '../types/notice';
import { NoticeService, formatDaysRemaining } from './noticeService';
import { initMockNotificationWorker, dispatchNotificationApi } from '../workers/mockNotificationWorker';

export interface DispatchedEmail {
  id: string;
  noticeId: string;
  noticeTitle: string;
  referenceNumber: string;
  issuingAuthority: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  milestone: 'overdue' | 'due_today' | '1_day' | '3_day' | '7_day' | '14_day' | 'manual_test';
  urgency: UrgencyLevel;
  daysRemaining: number;
  deadlineDate: string | null;
  statuteOrSection?: string;
  exposureSummary?: string;
  htmlBody: string;
  textSummary: string;
  dispatchedAt: string;
  status: 'delivered' | 'pending' | 'failed';
  messageId: string;
  deliveryProvider: string;
  read: boolean;
}

export interface SchedulerConfig {
  enabled: boolean;
  scanIntervalSeconds: number; // e.g. 15, 30, 60, 300
  advanceDays: number; // e.g. 7
  targetEmail: string;
}

export interface SchedulerState {
  isRunning: boolean;
  lastScanAt: string | null;
  nextScanAt: string | null;
  secondsUntilNextScan: number;
  totalScanned: number;
  totalDispatched: number;
}

const STORAGE_KEY_EMAILS = 'niyamsetu_dispatched_emails_v1';
const STORAGE_KEY_CONFIG = 'niyamsetu_scheduler_config_v1';
const STORAGE_KEY_SENT_LOG = 'niyamsetu_sent_milestones_v1';

class NotificationSchedulerService {
  private timerId: number | null = null;
  private countdownTimerId: number | null = null;
  private secondsRemaining: number = 30;
  private lastScanTimestamp: string | null = null;
  private totalNoticesScannedCount: number = 0;
  private listeners = new Set<() => void>();

  constructor() {
    // Initialize mock service worker and fetch interceptor
    initMockNotificationWorker();
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  }

  public getConfig(): SchedulerConfig {
    const settings = NoticeService.getSettings();
    try {
      const data = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }

    const initial: SchedulerConfig = {
      enabled: settings.emailAlertsEnabled ?? true,
      scanIntervalSeconds: 30, // 30s for lively interactive demonstration
      advanceDays: settings.notificationAdvanceDays || 7,
      targetEmail: settings.primaryEmail || 'compliance@apextech.co.in'
    };
    this.saveConfig(initial);
    return initial;
  }

  public saveConfig(config: SchedulerConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save scheduler config', e);
    }
    this.notify();

    // Restart timer with new interval if running
    if (this.timerId !== null) {
      this.restartScheduler();
    }
  }

  public getDispatchedEmails(): DispatchedEmail[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_EMAILS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return [];
  }

  private saveDispatchedEmails(emails: DispatchedEmail[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(emails));
    } catch (e) {
      console.warn('Failed to persist emails', e);
    }
    this.notify();
  }

  public markAsRead(id: string): void {
    const emails = this.getDispatchedEmails();
    const updated = emails.map((e) => (e.id === id ? { ...e, read: true } : e));
    this.saveDispatchedEmails(updated);
  }

  public markAllAsRead(): void {
    const emails = this.getDispatchedEmails();
    const updated = emails.map((e) => ({ ...e, read: true }));
    this.saveDispatchedEmails(updated);
  }

  public deleteEmail(id: string): void {
    const emails = this.getDispatchedEmails();
    this.saveDispatchedEmails(emails.filter((e) => e.id !== id));
  }

  public clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY_EMAILS);
    localStorage.removeItem(STORAGE_KEY_SENT_LOG);
    this.notify();
  }

  public getSchedulerState(): SchedulerState {
    const emails = this.getDispatchedEmails();
    const config = this.getConfig();

    const nextDate = this.lastScanTimestamp
      ? new Date(new Date(this.lastScanTimestamp).getTime() + config.scanIntervalSeconds * 1000).toISOString()
      : null;

    return {
      isRunning: this.timerId !== null && config.enabled,
      lastScanAt: this.lastScanTimestamp,
      nextScanAt: nextDate,
      secondsUntilNextScan: this.secondsRemaining,
      totalScanned: this.totalNoticesScannedCount,
      totalDispatched: emails.length
    };
  }

  /**
   * Starts the background scheduler loop.
   */
  public startScheduler(): void {
    if (this.timerId !== null) return;

    const config = this.getConfig();
    if (!config.enabled) return;

    this.secondsRemaining = config.scanIntervalSeconds;

    // Run an initial scan after a quick 2-second delay to seed demonstration
    setTimeout(() => {
      this.runScanNow();
    }, 2000);

    // Setup main interval
    this.timerId = window.setInterval(() => {
      this.runScanNow();
    }, config.scanIntervalSeconds * 1000);

    // Setup 1-second countdown ticker for UI responsiveness
    this.countdownTimerId = window.setInterval(() => {
      if (this.secondsRemaining > 0) {
        this.secondsRemaining--;
      } else {
        this.secondsRemaining = config.scanIntervalSeconds;
      }
      this.notify();
    }, 1000);

    this.notify();
  }

  public stopScheduler(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.countdownTimerId !== null) {
      clearInterval(this.countdownTimerId);
      this.countdownTimerId = null;
    }
    this.notify();
  }

  public restartScheduler(): void {
    this.stopScheduler();
    this.startScheduler();
  }

  /**
   * Scans notices, evaluates deadline proximity, and dispatches email alerts via Mock Service Worker.
   */
  public async runScanNow(): Promise<{ scanned: number; dispatched: number; newEmails: DispatchedEmail[] }> {
    const notices = NoticeService.getNotices();
    const config = this.getConfig();
    const settings = NoticeService.getSettings();

    this.lastScanTimestamp = new Date().toISOString();
    this.secondsRemaining = config.scanIntervalSeconds;
    this.totalNoticesScannedCount += notices.length;

    const newDispatches: DispatchedEmail[] = [];
    const sentMilestones = this.getSentMilestones();
    const todayKey = new Date().toISOString().split('T')[0];

    const targetRecipient = config.targetEmail || settings.primaryEmail || 'compliance@apextech.co.in';

    for (const notice of notices) {
      if (!notice.deadlineDate) continue;

      const now = new Date();
      const deadline = new Date(notice.deadlineDate);
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let milestone: DispatchedEmail['milestone'] | null = null;

      if (diffDays < 0) {
        milestone = 'overdue';
      } else if (diffDays === 0) {
        milestone = 'due_today';
      } else if (diffDays === 1) {
        milestone = '1_day';
      } else if (diffDays <= 3) {
        milestone = '3_day';
      } else if (diffDays <= config.advanceDays) {
        milestone = '7_day';
      }

      if (!milestone) continue;

      // Unique dispatch key: noticeId + milestone + date (to prevent duplicate spam on the same day)
      const dispatchKey = `${notice.id}_${milestone}_${todayKey}`;
      if (sentMilestones[dispatchKey]) {
        continue;
      }

      // Generate formatted email subject and content
      const emailPayload = this.buildEmailPayload(notice, milestone, diffDays, targetRecipient, settings.businessName);

      try {
        // Dispatched through the Mock Service Worker interceptor
        const response = await dispatchNotificationApi('/api/notifications/dispatch-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        if (response.ok) {
          const result = await response.json();
          const emailRecord: DispatchedEmail = {
            id: 'email_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            noticeId: notice.id,
            noticeTitle: notice.title,
            referenceNumber: notice.referenceNumber,
            issuingAuthority: notice.issuingAuthority,
            recipientEmail: targetRecipient,
            recipientName: settings.businessName || 'Compliance Officer',
            subject: emailPayload.subject,
            milestone,
            urgency: notice.urgency,
            daysRemaining: diffDays,
            deadlineDate: notice.deadlineDate,
            statuteOrSection: notice.legalCitations?.[0]?.code || notice.deadlineSource,
            exposureSummary: notice.whyIssued?.businessRisk,
            htmlBody: emailPayload.htmlBody,
            textSummary: emailPayload.textSummary,
            dispatchedAt: new Date().toISOString(),
            status: 'delivered',
            messageId: result.messageId || 'msg_' + Date.now(),
            deliveryProvider: result.provider || 'MockServiceWorker SMTP Gateway',
            read: false
          };

          newDispatches.push(emailRecord);
          sentMilestones[dispatchKey] = new Date().toISOString();
        }
      } catch (err) {
        console.error('Failed to dispatch alert via mock service worker:', err);
      }
    }

    if (newDispatches.length > 0) {
      const existing = this.getDispatchedEmails();
      this.saveDispatchedEmails([...newDispatches, ...existing]);
      this.saveSentMilestones(sentMilestones);
    }

    this.notify();
    return {
      scanned: notices.length,
      dispatched: newDispatches.length,
      newEmails: newDispatches
    };
  }

  /**
   * Sends a manual on-demand test email for a specific notice to immediately demonstrate the worker.
   */
  public async sendManualNoticeAlert(noticeId: string, customRecipient?: string): Promise<DispatchedEmail | null> {
    const notice = NoticeService.getNoticeById(noticeId);
    if (!notice) return null;

    const config = this.getConfig();
    const settings = NoticeService.getSettings();
    const targetRecipient = customRecipient || config.targetEmail || settings.primaryEmail || 'compliance@apextech.co.in';

    const now = new Date();
    const deadline = notice.deadlineDate ? new Date(notice.deadlineDate) : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const emailPayload = this.buildEmailPayload(
      notice,
      'manual_test',
      diffDays,
      targetRecipient,
      settings.businessName,
      true
    );

    try {
      const response = await dispatchNotificationApi('/api/notifications/dispatch-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload)
      });

      if (response.ok) {
        const result = await response.json();
        const emailRecord: DispatchedEmail = {
          id: 'email_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          noticeId: notice.id,
          noticeTitle: notice.title,
          referenceNumber: notice.referenceNumber,
          issuingAuthority: notice.issuingAuthority,
          recipientEmail: targetRecipient,
          recipientName: settings.businessName || 'Compliance Officer',
          subject: emailPayload.subject,
          milestone: 'manual_test',
          urgency: notice.urgency,
          daysRemaining: diffDays,
          deadlineDate: notice.deadlineDate,
          statuteOrSection: notice.legalCitations?.[0]?.code || notice.deadlineSource,
          exposureSummary: notice.whyIssued?.businessRisk,
          htmlBody: emailPayload.htmlBody,
          textSummary: emailPayload.textSummary,
          dispatchedAt: new Date().toISOString(),
          status: 'delivered',
          messageId: result.messageId || 'msg_' + Date.now(),
          deliveryProvider: result.provider || 'MockServiceWorker SMTP Gateway',
          read: false
        };

        const existing = this.getDispatchedEmails();
        this.saveDispatchedEmails([emailRecord, ...existing]);
        this.notify();
        return emailRecord;
      }
    } catch (err) {
      console.error('Manual test dispatch failed:', err);
    }
    return null;
  }

  private getSentMilestones(): Record<string, string> {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SENT_LOG);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return {};
  }

  private saveSentMilestones(milestones: Record<string, string>): void {
    try {
      localStorage.setItem(STORAGE_KEY_SENT_LOG, JSON.stringify(milestones));
    } catch {
      // ignore
    }
  }

  /**
   * Assembles an executive-ready, responsive HTML email template for legal notice alerts.
   */
  private buildEmailPayload(
    notice: Notice,
    milestone: DispatchedEmail['milestone'],
    daysRemaining: number,
    recipientEmail: string,
    businessName: string,
    isManualTest: boolean = false
  ) {
    let milestoneBadgeText = 'COMPLIANCE ALERT';
    let bannerBgColor = '#238C88';
    let bannerTextColor = '#ffffff';
    let urgencyPrefix = '[NiyamSetu Alert]';

    if (milestone === 'overdue') {
      milestoneBadgeText = 'STATUTORY DEADLINE LAPSED / OVERDUE';
      bannerBgColor = '#DC2626';
      urgencyPrefix = '🚨 [OVERDUE]';
    } else if (milestone === 'due_today') {
      milestoneBadgeText = 'ACTION REQUIRED TODAY';
      bannerBgColor = '#EA580C';
      urgencyPrefix = '⚠️ [DUE TODAY]';
    } else if (milestone === '1_day') {
      milestoneBadgeText = 'FINAL 24-HOUR WARNING';
      bannerBgColor = '#D97706';
      urgencyPrefix = '⚠️ [24H REMAINING]';
    } else if (milestone === '3_day') {
      milestoneBadgeText = 'CRITICAL 72-HOUR WINDOW';
      bannerBgColor = '#CA8A04';
      urgencyPrefix = '⚡ [3 DAYS REMAINING]';
    } else if (milestone === 'manual_test') {
      milestoneBadgeText = 'SIMULATED DEMO NOTIFICATION';
      bannerBgColor = '#238C88';
      urgencyPrefix = '🧪 [MOCK SW DEMO]';
    } else {
      milestoneBadgeText = 'UPCOMING STATUTORY DEADLINE';
      bannerBgColor = '#0F766E';
      urgencyPrefix = '📋 [UPCOMING DEADLINE]';
    }

    const daysText = formatDaysRemaining(notice.deadlineDate).text;
    const subject = `${urgencyPrefix} ${notice.issuingAuthority} - Ref: ${notice.referenceNumber} (${daysText})`;

    const primaryCitation = notice.legalCitations?.[0]?.code || 'Relevant Statutory Code';
    const riskText = notice.whyIssued?.businessRisk || 'Failure to comply may trigger statutory penalties or adverse enforcement.';
    const formattedDeadline = notice.deadlineDate
      ? new Date(notice.deadlineDate).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Immediate / As indicated in notice';

    const checklistRows = (notice.mandatoryActions || [])
      .slice(0, 3)
      .map(
        (action) => `
        <li style="margin-bottom: 8px; color: #172C35; font-size: 13px; line-height: 1.5;">
          <strong>${action.title}:</strong> ${action.description || 'Statutory requirement'}
        </li>`
      )
      .join('');

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5FAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #172C35;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5FAF7; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #DCE9E5; box-shadow: 0 4px 16px rgba(23, 44, 53, 0.06); overflow: hidden;">
          
          <!-- Top Brand Header -->
          <tr>
            <td style="background-color: #142332; padding: 20px 24px; border-bottom: 3px solid #238C88;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
                      Niyam<span style="color: #65D5C5;">Setu</span>
                    </span>
                    <span style="display: block; font-size: 11px; color: #A6BBC3; margin-top: 2px;">
                      Automated Legal Notice & Statutory Deadline Monitor
                    </span>
                  </td>
                  <td align="right">
                    <span style="background: rgba(101, 213, 197, 0.15); border: 1px solid #65D5C5; color: #65D5C5; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                      Verified Dispatch
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency Alert Banner -->
          <tr>
            <td style="background-color: ${bannerBgColor}; color: ${bannerTextColor}; padding: 14px 24px; text-align: left;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; display: inline-block;">
                      ${milestoneBadgeText}
                    </span>
                    <div style="font-size: 16px; font-weight: 700; margin-top: 4px;">
                      ${daysText} · Due ${formattedDeadline}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 24px;">
              <p style="font-size: 14px; line-height: 1.6; color: #172C35; margin-top: 0; margin-bottom: 16px;">
                Dear <strong>${businessName || 'Compliance Officer'}</strong>,
              </p>
              <p style="font-size: 13px; line-height: 1.6; color: #5F7279; margin-bottom: 20px;">
                This is an automated regulatory notification dispatched by the NiyamSetu deadline scheduling engine. The following official government notice requires immediate review and response:
              </p>

              <!-- Notice Metadata Card -->
              <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #EAF5F0; border-radius: 12px; border: 1px solid #DCE9E5; padding: 16px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; border-bottom: 1px solid #DCE9E5;">
                    <span style="font-size: 11px; font-weight: 600; color: #5F7279; text-transform: uppercase;">Notice Title</span>
                    <div style="font-size: 14px; font-weight: 700; color: #172C35; margin-top: 2px;">${notice.title}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #DCE9E5;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%">
                          <span style="font-size: 11px; font-weight: 600; color: #5F7279; text-transform: uppercase;">Issuing Authority</span>
                          <div style="font-size: 13px; font-weight: 600; color: #172C35; margin-top: 2px;">${notice.issuingAuthority}</div>
                        </td>
                        <td width="50%">
                          <span style="font-size: 11px; font-weight: 600; color: #5F7279; text-transform: uppercase;">Notice Reference #</span>
                          <div style="font-size: 13px; font-family: monospace; font-weight: 700; color: #238C88; margin-top: 2px;">${notice.referenceNumber}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%">
                          <span style="font-size: 11px; font-weight: 600; color: #5F7279; text-transform: uppercase;">Statutory Basis</span>
                          <div style="font-size: 12px; font-weight: 600; color: #172C35; margin-top: 2px;">${primaryCitation}</div>
                        </td>
                        <td width="50%">
                          <span style="font-size: 11px; font-weight: 600; color: #5F7279; text-transform: uppercase;">Target Deadline</span>
                          <div style="font-size: 12px; font-weight: 700; color: #DC2626; margin-top: 2px;">${formattedDeadline}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Business Risk & Legal Exposure -->
              <div style="background-color: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px;">
                <div style="font-size: 12px; font-weight: 700; color: #991B1B; text-transform: uppercase;">Enforcement & Exposure Advisory</div>
                <div style="font-size: 12px; color: #7F1D1D; line-height: 1.5; margin-top: 4px;">
                  ${riskText}
                </div>
              </div>

              ${checklistRows ? `
              <!-- Immediate Actions -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #172C35; text-transform: uppercase; margin-bottom: 8px;">
                  Priority Compliance Action Items
                </div>
                <ul style="margin: 0; padding-left: 20px;">
                  ${checklistRows}
                </ul>
              </div>` : ''}

              <!-- Direct Call to Action Button -->
              <div style="text-align: center; margin: 28px 0 16px;">
                <a href="#notice-${notice.id}" style="display: inline-block; background-color: #238C88; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 12px; box-shadow: 0 2px 8px rgba(35, 140, 136, 0.35);">
                  Review Notice & Draft Response in NiyamSetu →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer & Audit Trail -->
          <tr>
            <td style="background-color: #F8FAF9; padding: 18px 24px; border-top: 1px solid #DCE9E5; font-size: 11px; color: #5F7279; line-height: 1.5;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <strong>NiyamSetu Regulatory Compliance Vault</strong><br>
                    Generated automatically by the Browser Mock Service Worker Scheduling Daemon.<br>
                    Recipient: ${recipientEmail} | Node: Local Interceptor Engine
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="font-family: monospace; font-size: 10px; color: #8F9E9D;">
                      ID: ${notice.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textSummary = `
[NiyamSetu Compliance Notification]
Subject: ${subject}
Notice: ${notice.title}
Authority: ${notice.issuingAuthority}
Reference: ${notice.referenceNumber}
Deadline: ${formattedDeadline} (${daysText})
Statutory Basis: ${primaryCitation}
Business Risk: ${riskText}
Target Recipient: ${recipientEmail}
    `.trim();

    return {
      recipientEmail,
      subject,
      noticeId: notice.id,
      referenceNumber: notice.referenceNumber,
      urgency: notice.urgency,
      daysRemaining,
      milestone,
      htmlBody,
      textSummary
    };
  }
}

export const notificationSchedulerService = new NotificationSchedulerService();
