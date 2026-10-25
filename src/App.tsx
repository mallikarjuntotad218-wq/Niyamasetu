import React, { useState, useEffect } from 'react';
import { AuthGate } from './AuthGate';
import {
  AppSidebar,
  NavTab
} from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';
import { OverviewPage } from './components/pages/OverviewPage';
import { UploadPage } from './components/pages/UploadPage';
import { AnalysisResultPage } from './components/pages/AnalysisResultPage';
import { MyNoticesPage } from './components/pages/MyNoticesPage';
import { ActionPlansPage } from './components/pages/ActionPlansPage';
import { ResponseAssistantPage } from './components/pages/ResponseAssistantPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { NotificationCenterModal } from './components/notifications/NotificationCenterModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { Notice, ActionPlanTask, AppSettings } from './types/notice';
import { NoticeService } from './services/noticeService';
import { notificationSchedulerService } from './services/notificationSchedulerService';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [tasks, setTasks] = useState<ActionPlanTask[]>([]);
  const [settings, setSettings] = useState<AppSettings>(NoticeService.getSettings());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [categoryFilterNav, setCategoryFilterNav] = useState<string>('all');

  const { theme } = useTheme();

  // Load initial data
  const refreshData = () => {
    const loadedNotices = NoticeService.getNotices();
    const loadedTasks = NoticeService.getAllActionPlanTasks();
    const loadedSettings = NoticeService.getSettings();
    setNotices(loadedNotices);
    setTasks(loadedTasks);
    setSettings(loadedSettings);
  };

  useEffect(() => {
    refreshData();
    notificationSchedulerService.startScheduler();
    return () => {
      notificationSchedulerService.stopScheduler();
    };
  }, []);

  // Lock body scroll and listen for Escape key when mobile drawer is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileSidebarOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileSidebarOpen]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation handlers
  const handleSelectNotice = (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setActiveTab('notices');
  };

  const handleNavigateUpload = () => {
    setSelectedNoticeId(null);
    setActiveTab('analyze');
  };

  const handleNavigateOverview = () => {
    setSelectedNoticeId(null);
    setActiveTab('overview');
  };

  const handleNavigateNotices = (category?: string) => {
    setSelectedNoticeId(null);
    if (category) {
      setCategoryFilterNav(category);
    } else {
      setCategoryFilterNav('all');
    }
    setActiveTab('notices');
  };

  const handleNavigateActions = () => {
    setSelectedNoticeId(null);
    setActiveTab('actions');
  };

  const handleNavigateResponseAssistant = (noticeId?: string) => {
    if (noticeId) {
      setSelectedNoticeId(noticeId);
    }
    setActiveTab('responses');
  };

  const handleNoticeUpdated = (updatedNotice: Notice) => {
    const updatedList = notices.map((n) => (n.id === updatedNotice.id ? updatedNotice : n));
    setNotices(updatedList);
    setTasks(NoticeService.getAllActionPlanTasks());
  };

  const handleNoticeDeleted = (deletedId: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== deletedId));
    if (selectedNoticeId === deletedId) {
      setSelectedNoticeId(null);
    }
    setTasks(NoticeService.getAllActionPlanTasks());
  };

  const handleToggleTask = (task: ActionPlanTask) => {
    NoticeService.toggleActionPlanTask(task);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
    setNotices(NoticeService.getNotices());
    showToast(
      task.completed ? 'Task marked incomplete' : 'Task completed successfully',
      'success'
    );
  };

  const handleAddCustomTask = (task: ActionPlanTask) => {
    NoticeService.addCustomTask(task);
    setTasks(NoticeService.getAllActionPlanTasks());
  };

  const needsAttentionCount = notices.filter((n) => n.status === 'needs_attention').length;
  const pendingActionsCount = tasks.filter((t) => !t.completed).length;

  const currentSelectedNotice = selectedNoticeId
    ? notices.find((n) => n.id === selectedNoticeId)
    : null;

  // Breadcrumbs with NiyamSetu root
  const breadcrumbs: { label: string; onClick?: () => void }[] = [
    {
      label: 'NiyamSetu',
      onClick: () => {
        setSelectedNoticeId(null);
        setActiveTab('overview');
      }
    }
  ];

  if (activeTab === 'overview') {
    breadcrumbs.push({ label: 'Overview Dashboard' });
  } else if (activeTab === 'analyze') {
    breadcrumbs.push({ label: 'Analyze Notice' });
  } else if (activeTab === 'notices') {
    breadcrumbs.push({
      label: 'My Notices',
      onClick: currentSelectedNotice
        ? () => setSelectedNoticeId(null)
        : undefined
    });
    if (currentSelectedNotice) {
      breadcrumbs.push({ label: currentSelectedNotice.title });
    }
  } else if (activeTab === 'actions') {
    breadcrumbs.push({ label: 'Action Plans' });
  } else if (activeTab === 'responses') {
    breadcrumbs.push({ label: 'Response Assistant' });
    if (currentSelectedNotice) {
      breadcrumbs.push({ label: currentSelectedNotice.title });
    }
  } else if (activeTab === 'settings') {
    breadcrumbs.push({ label: 'Settings' });
  }

  return (
    <div className="relative h-screen max-h-screen overflow-hidden flex flex-col md:flex-row bg-[#F5FAF7] dark:bg-[#0D1722] text-[#172C35] dark:text-[#ECF5F5] font-sans antialiased selection:bg-[#B6E6D9] selection:text-[#126A78] dark:selection:bg-[#65D5C5]/30 dark:selection:text-[#65D5C5] transition-colors duration-200">
      {/* Premium Prism Ambient Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft geometric prism image layer */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
            theme === 'dark'
              ? 'opacity-[0.18] mix-blend-screen invert hue-rotate-180'
              : 'opacity-[0.14] mix-blend-multiply'
          }`}
          style={{ backgroundImage: `url('/assets/aistudio/image_e7e8be5e.png')` }}
        />

        {/* Ambient atmospheric lighting gradients */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#DDF3D2]/35 dark:bg-[#238C88]/15 rounded-full blur-[130px] transition-colors duration-300" />
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#B6E6D9]/30 dark:bg-[#65D5C5]/12 rounded-full blur-[140px] transition-colors duration-300" />
        <div className="absolute bottom-0 left-1/3 w-[650px] h-[650px] bg-[#C8B0F0]/20 dark:bg-[#B9A5F5]/12 rounded-full blur-[150px] transition-colors duration-300" />
      </div>

      {/* Desktop Stationary Sidebar & Mobile Drawer */}
      <AppSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'notices' && tab !== 'responses') {
            setSelectedNoticeId(null);
          }
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        needsAttentionCount={needsAttentionCount}
        pendingActionsCount={pendingActionsCount}
        businessName={settings.businessName}
        onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
      />

      {/* Main Workspace Area (Viewport height bounded, independent scrolling) */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Pinned Top Navigation Header */}
        <AppHeader
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigateOverview={handleNavigateOverview}
          onNavigateUpload={handleNavigateUpload}
          onSelectNotice={handleSelectNotice}
          notices={notices}
          breadcrumbs={breadcrumbs}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          businessName={settings.businessName}
          onLanguageChange={(lang) => {
            showToast(`Language set to ${lang.name} (${lang.nativeName})`, 'info');
          }}
          onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
        />

        {/* Independent Scrollable Workspace Content */}
        <main className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overscroll-contain">
          {activeTab === 'overview' && (
            <OverviewPage
              notices={notices}
              onSelectNotice={handleSelectNotice}
              onNavigateUpload={handleNavigateUpload}
              onNavigateNotices={handleNavigateNotices}
              onNavigateActions={handleNavigateActions}
              onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
            />
          )}

          {activeTab === 'analyze' && (
            <UploadPage
              onAnalysisComplete={(noticeId) => {
                refreshData();
                setSelectedNoticeId(noticeId);
                setActiveTab('notices');
                showToast('Notice analysis verified and loaded', 'success');
              }}
              onSelectNotice={handleSelectNotice}
            />
          )}

          {activeTab === 'notices' && (
            <>
              {currentSelectedNotice ? (
                <AnalysisResultPage
                  notice={currentSelectedNotice}
                  onBack={() => setSelectedNoticeId(null)}
                  onNavigateResponseAssistant={handleNavigateResponseAssistant}
                  onNavigateActionPlans={handleNavigateActions}
                  onNoticeUpdated={handleNoticeUpdated}
                  onShowToast={showToast}
                />
              ) : (
                <MyNoticesPage
                  notices={notices}
                  onSelectNotice={handleSelectNotice}
                  onNavigateUpload={handleNavigateUpload}
                  onNavigateResponseAssistant={handleNavigateResponseAssistant}
                  onNoticeDeleted={handleNoticeDeleted}
                  onNoticeStatusChanged={(id, status) => {
                    NoticeService.updateNoticeStatus(id, status);
                    refreshData();
                  }}
                  onShowToast={showToast}
                  initialCategoryFilter={categoryFilterNav}
                />
              )}
            </>
          )}

          {activeTab === 'actions' && (
            <ActionPlansPage
              tasks={tasks}
              notices={notices}
              onToggleTask={handleToggleTask}
              onSelectNotice={handleSelectNotice}
              onAddTask={handleAddCustomTask}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'responses' && (
            <ResponseAssistantPage
              notices={notices}
              preselectedNoticeId={selectedNoticeId}
              settings={settings}
              onNoticeUpdated={handleNoticeUpdated}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              settings={settings}
              onSettingsSaved={(newSettings) => {
                setSettings(newSettings);
              }}
              onResetVault={() => {
                refreshData();
                setSelectedNoticeId(null);
                setActiveTab('overview');
              }}
              onShowToast={showToast}
              onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Automated Deadline Notification & Mock Service Worker Modal */}
      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notices={notices}
        onSelectNotice={handleSelectNotice}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <AuthGate>
        <AppContent />
      </AuthGate>
    </ThemeProvider>
  );
}
