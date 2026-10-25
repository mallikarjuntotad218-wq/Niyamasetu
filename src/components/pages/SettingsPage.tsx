import React, { useState } from 'react';
import {
  Building2,
  Bell,
  Shield,
  Trash2,
  RefreshCw,
  Save,
  Lock,
  Sun,
  Moon,
  Monitor,
  Languages
} from 'lucide-react';
import { AppSettings } from '../../types/notice';
import { NoticeService } from '../../services/noticeService';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSelector } from '../common/LanguageSelector';

interface SettingsPageProps {
  settings: AppSettings;
  onSettingsSaved: (newSettings: AppSettings) => void;
  onResetVault: () => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
  onOpenNotificationCenter?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onSettingsSaved,
  onResetVault,
  onShowToast,
  onOpenNotificationCenter
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [showPurgeDialog, setShowPurgeDialog] = useState<boolean>(false);
  const [showResetDialog, setShowResetDialog] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    NoticeService.saveSettings(formData);
    onSettingsSaved(formData);
    onShowToast('Settings and entity details updated successfully', 'success');
  };

  const handlePurgeConfirm = () => {
    NoticeService.resetAllData();
    onResetVault();
    setShowPurgeDialog(false);
    onShowToast('All client-stored document data has been permanently purged', 'info');
  };

  const handleResetConfirm = () => {
    NoticeService.resetAllData();
    onResetVault();
    setShowResetDialog(false);
    onShowToast('Vault reset to default demonstration notices', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-page-title text-[#172C35] dark:text-[#ECF5F5]">
          System Settings & Entity Configuration
        </h1>
        <p className="mt-0.5 text-xs text-[#5F7279] dark:text-[#A6BBC3]">
          Manage your business identity profile, response draft variables, theme appearance, and data retention rules.
        </p>
      </div>

      {/* Theme Preference Section */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-[#65D5C5]" />
          ) : (
            <Sun className="w-4 h-4 text-[#238C88]" />
          )}
          <h2 className="text-section-heading text-[#172C35] dark:text-[#ECF5F5]">
            Appearance & Premium Prism Theme
          </h2>
        </div>
        <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3]">
          Choose between Premium Prism Day (airy, soft mint and aqua) or Premium Prism Night (cinematic deep teal and navy).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Day Mode Card */}
          <div
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              theme === 'light'
                ? 'border-[#238C88] bg-[#EAF5F0] ring-2 ring-[#238C88]/20 shadow-xs'
                : 'border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] hover:bg-[#EAF5F0]/50 dark:hover:bg-[#1B3040]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#238C88]" />
                <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                  Premium Prism Day
                </span>
              </div>
              {theme === 'light' && (
                <span className="text-[10px] font-bold text-[#238C88] bg-[#B6E6D9]/50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">
              Airy mint, aqua, and lavender accents with crisp daylight contrast on #F5FAF7.
            </p>
          </div>

          {/* Night Mode Card */}
          <div
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              theme === 'dark'
                ? 'border-[#65D5C5] bg-[#1B3040] ring-2 ring-[#65D5C5]/20 shadow-xs'
                : 'border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#142332] hover:bg-[#EAF5F0]/50 dark:hover:bg-[#1B3040]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#65D5C5]" />
                <span className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                  Premium Prism Night
                </span>
              </div>
              {theme === 'dark' && (
                <span className="text-[10px] font-bold text-[#65D5C5] bg-[#65D5C5]/20 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed">
              Deep navy #0D1722 with atmospheric teal glow and soft lavender facets for low-light focus.
            </p>
          </div>
        </div>

        {/* Indian Language Localization Selector in Settings */}
        <div className="mt-4 pt-4 border-t border-[#DCE9E5]/60 dark:border-[#294251] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5] flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#238C88] dark:text-[#65D5C5]" />
              Official Indian Language
            </h3>
            <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
              Configure language for notice summaries, checklists, and statutory transmittals (23 languages supported).
            </p>
          </div>

          <LanguageSelector
            onLanguageChange={(lang) => {
              onShowToast(`Interface language set to ${lang.name} (${lang.nativeName})`, 'info');
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Business Entity Profile */}
        <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
            <Building2 className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
            <h2 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
              Business Entity & Statutory Profile
            </h2>
          </div>
          <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3]">
            These values automatically populate response templates, transmittal headers, and formal extension requests.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 text-[#172C35] dark:text-[#ECF5F5] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30"
                placeholder="e.g. Apex Precision Technologies LLC"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                Employer Identification Number (EIN)
              </label>
              <input
                type="text"
                value={formData.ein}
                onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 text-[#172C35] dark:text-[#ECF5F5] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30 font-mono"
                placeholder="XX-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                State of Organization / Incorporation
              </label>
              <input
                type="text"
                value={formData.stateOfIncorporation}
                onChange={(e) => setFormData({ ...formData, stateOfIncorporation: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 text-[#172C35] dark:text-[#ECF5F5] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30"
                placeholder="e.g. California"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                Registered Agent of Record
              </label>
              <input
                type="text"
                value={formData.registeredAgent}
                onChange={(e) => setFormData({ ...formData, registeredAgent: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 text-[#172C35] dark:text-[#ECF5F5] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30"
                placeholder="e.g. National Registered Agents, Inc."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] mb-1">
                Primary Compliance Contact Email
              </label>
              <input
                type="email"
                value={formData.primaryEmail}
                onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-[#EAF5F0]/50 dark:bg-[#0D1722]/60 text-[#172C35] dark:text-[#ECF5F5] focus:bg-white dark:focus:bg-[#142332] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30"
                placeholder="compliance@company.com"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Notification & Deadline Alerts */}
        <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
            <Bell className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
            <h2 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
              Deadline Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251]">
              <div>
                <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Advance Deadline Warning</h4>
                <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                  Notify primary contact before statutory or cure response dates.
                </p>
              </div>
              <select
                value={formData.notificationAdvanceDays}
                onChange={(e) =>
                  setFormData({ ...formData, notificationAdvanceDays: Number(e.target.value) })
                }
                className="text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] rounded-xl px-2.5 py-1 cursor-pointer"
              >
                <option value={3}>3 Days in advance</option>
                <option value={7}>7 Days in advance</option>
                <option value={14}>14 Days in advance</option>
                <option value={30}>30 Days in advance</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251]">
              <div>
                <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Email Alerts for Critical Notices</h4>
                <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                  Deliver verified analysis summaries directly to compliance email.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.emailAlertsEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, emailAlertsEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#238C88] rounded border-[#DCE9E5] dark:border-[#294251] focus:ring-[#238C88] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251]">
              <div>
                <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Urgent SMS Emergency Flags</h4>
                <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                  Trigger high-priority text alerts for 10-day cure notices and stop-work citations.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.smsUrgentAlertsEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, smsUrgentAlertsEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#238C88] rounded border-[#DCE9E5] dark:border-[#294251] focus:ring-[#238C88] cursor-pointer"
              />
            </div>

            {onOpenNotificationCenter && (
              <div className="pt-3 border-t border-[#DCE9E5]/60 dark:border-[#294251] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
                    Notification Scheduler & Mock Service Worker Daemon
                  </h4>
                  <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                    Configure scan frequency, trigger test dispatches, and inspect delivered email logs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenNotificationCenter}
                  className="px-3 py-1.5 text-xs font-semibold text-[#238C88] dark:text-[#65D5C5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#DCE9E5] dark:hover:bg-[#203A49] border border-[#DCE9E5] dark:border-[#294251] rounded-xl cursor-pointer transition-colors shrink-0"
                >
                  Open Scheduler Console →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Privacy & Data Retention */}
        <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-[#DCE9E5] dark:border-[#294251] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#DCE9E5]/60 dark:border-[#294251]">
            <Shield className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5]" />
            <h2 className="text-sm font-bold text-[#172C35] dark:text-[#ECF5F5]">
              Privacy, Security & Document Retention
            </h2>
          </div>

          <div className="p-3.5 rounded-xl bg-[#EAF5F0] dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] text-xs text-[#238C88] dark:text-[#65D5C5] space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Client Vault Safeguards
            </p>
            <p className="text-[#5F7279] dark:text-[#A6BBC3] leading-relaxed text-[11px]">
              Uploaded notice metadata and extracted draft replies are stored in your isolated client-side browser cache and local storage. No document text is utilized to train public foundation models.
            </p>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF5F0]/60 dark:bg-[#1B3040]/60 border border-[#DCE9E5] dark:border-[#294251]">
            <div>
              <h4 className="text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">Document Retention Policy</h4>
              <p className="text-[11px] text-[#5F7279] dark:text-[#A6BBC3]">
                Automatically purge notice records after resolution or stated period.
              </p>
            </div>
            <select
              value={formData.retentionDays}
              onChange={(e) =>
                setFormData({ ...formData, retentionDays: Number(e.target.value) })
              }
              className="text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-white dark:bg-[#142332] border border-[#DCE9E5] dark:border-[#294251] rounded-xl px-2.5 py-1 cursor-pointer"
            >
              <option value={30}>30 Days</option>
              <option value={90}>90 Days (Recommended)</option>
              <option value={365}>1 Year</option>
              <option value={0}>Retain Indefinitely</option>
            </select>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white dark:text-[#0D1722] bg-linear-to-r from-[#238C88] to-[#172C35] dark:from-[#65D5C5] dark:to-[#238C88] hover:opacity-95 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#B6E6D9] dark:text-[#0D1722]" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-white/90 dark:bg-[#142332]/90 backdrop-blur-md rounded-2xl border border-rose-200/80 dark:border-rose-900/60 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
          <Trash2 className="w-4 h-4" />
          <h3 className="text-sm font-bold">Data Management & Reset Controls</h3>
        </div>
        <p className="text-xs text-[#5F7279] dark:text-[#A6BBC3]">
          Reset demonstration notices or permanently wipe all cached documents and custom action plans.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowResetDialog(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#172C35] dark:text-[#ECF5F5] bg-[#EAF5F0] dark:bg-[#1B3040] hover:bg-[#E3F2EC] dark:hover:bg-[#203A49] border border-[#DCE9E5] dark:border-[#294251] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#5F7279] dark:text-[#A6BBC3]" />
            <span>Reset Demo Notices</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPurgeDialog(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Purge All Vault Data</span>
          </button>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={showResetDialog}
        title="Reset Demo Notices?"
        message="This will restore the original 6 realistic demonstration notices (IRS Letter 5071C, OSHA Citation, CDTFA Audit, Lease Notice, etc.) and clear any custom uploads."
        confirmLabel="Reset Demo Data"
        cancelLabel="Cancel"
        variant="warning"
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetDialog(false)}
      />

      {/* Confirm Purge Dialog */}
      <ConfirmDialog
        isOpen={showPurgeDialog}
        title="Permanently Purge All Data?"
        message="This action is irreversible. All saved notices, extracted checklists, custom action plans, and response drafts will be completely removed from your browser storage."
        confirmLabel="Purge Everything"
        cancelLabel="Keep Data"
        variant="danger"
        onConfirm={handlePurgeConfirm}
        onCancel={() => setShowPurgeDialog(false)}
      />
    </div>
  );
};
