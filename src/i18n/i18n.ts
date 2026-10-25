import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES, getLanguage } from './languages';

export const enTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'Legal notice intelligence for Indian business owners',
    headline: 'Legal notices. Made clear.',
    supportingText: 'Understand the notice. Find your next step.',
    uploadCta: 'Upload a notice'
  },
  nav: {
    overview: 'Your overview',
    analyze: 'Analyze a notice',
    notices: 'Your notices',
    actions: 'Deadline tracker',
    responses: 'Draft a response',
    settings: 'Settings'
  },
  common: {
    loading: 'Loading...',
    searchPlaceholder: 'Search notices by authority, act, or reference #...',
    filter: 'Filter',
    all: 'All',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    view: 'Review',
    back: 'Back',
    status: 'Status',
    deadline: 'Deadline',
    category: 'Category',
    authority: 'Authority',
    reference: 'Reference #',
    received: 'Received',
    verified: 'Verified fact',
    interpretation: 'AI interpretation',
    disclaimerTitle: 'Verification required',
    disclaimerText: 'This summary and draft are for informational assistance only and do not constitute formal legal advice. Have your Chartered Accountant (CA) or advocate review before filing.',
    demoModeNotice: 'Demo Mode: Showing pre-extracted notice data. Connected to Client-side Legal NLP Engine.',
    activeNotice: 'Active Notice',
    noDeadlineStated: 'No deadline stated',
    dueToday: 'Due today',
    overdue: 'Overdue',
    daysRemaining: 'days remaining',
    dayRemaining: '1 day remaining'
  },
  dashboard: {
    title: 'Your overview',
    subtitle: 'Track legal notices, upcoming statutory deadlines, and compliance tasks.',
    kpiTotal: 'Total notices',
    kpiTotalSub: 'Cataloged in vault',
    kpiAttention: 'Needs attention',
    kpiAttentionSub: 'Require response or cure',
    kpiUpcoming: 'Upcoming deadlines',
    kpiUpcomingSub: 'Due within 30 days',
    kpiReview: 'Awaiting review',
    kpiReviewSub: 'Under CA or advocate review',
    timeSensitive: 'Time-sensitive deadlines',
    timeSensitiveSub: 'Statutory and cure dates from original text.',
    recentNotices: 'Recent notices',
    recentNoticesSub: 'Parsed legal notices, authorities, and status.',
    viewActionPlans: 'View deadline tracker',
    emptyNotices: 'No notices yet',
    allCategories: 'All Categories'
  },
  upload: {
    title: 'Analyze a notice',
    subtitle: 'Upload a government or legal notice to extract deadlines, plain-language meaning, and next steps.',
    dragDrop: 'Drag & drop your notice here, or',
    browseFiles: 'browse files',
    supportedFormats: 'Supports PDF, PNG, JPG, or TIFF up to 25 MB',
    analyzingState: 'Analyzing notice',
    extractedState: 'Notice text extracted',
    startAnalysisBtn: 'Analyze Notice',
    removeDocument: 'Remove document',
    privacyNote: 'Client-side sandboxing · Confidential business records',
    sampleNoticesTitle: 'Or try with realistic Indian notices',
    sampleNoticesSub: 'Test with authentic GST, Income Tax, EPFO, ROC, or Lease notices.'
  },
  analysis: {
    title: 'Notice overview',
    tabSummary: 'What it means',
    tabWhyIssued: 'Why it was issued',
    tabNextSteps: 'Your next steps',
    tabDocuments: 'Documents to prepare',
    tabLegal: 'Legal references',
    tabUncertain: 'Uncertain information',
    tabEvidence: 'Original source text',
    explanationLangLabel: 'Explanation language',
    inspectOriginalBtn: 'View original notice',
    draftResponseBtn: 'Draft a response',
    confidenceScore: 'Extraction confidence',
    mandatoryObligations: 'Mandatory statutory duties',
    suggestedSteps: 'Suggested strategic steps',
    statutoryDueDate: 'Statutory due date',
    sourceQuote: 'Source quote'
  },
  actions: {
    title: 'Deadline tracker',
    subtitle: 'Organized checklists separating mandatory statutory duties from strategic preparations.',
    addTask: 'Add custom task',
    overallProgress: 'Overall defense execution',
    completedOf: 'tasks completed across active notices',
    mandatorySection: 'Mandatory statutory duties',
    suggestedSection: 'Suggested defense preparations',
    noTasks: 'No tasks match the active filters.'
  },
  responses: {
    title: 'Draft a response',
    subtitle: 'Structured legal reply workspace grounded in verified notice citations.',
    templateLabel: 'Response template',
    copyText: 'Copy text',
    copied: 'Copied!',
    downloadText: 'Download .txt',
    saveDraft: 'Save draft',
    editorPlaceholder: 'Draft content...',
    charactersWords: 'characters · words',
    instructionsNote: 'Fill in all bracketed [UPPERCASE] items before sending.'
  },
  settings: {
    title: 'Settings',
    appearanceTitle: 'Appearance',
    appearanceSub: 'Choose how Notice on the Desk looks on your screen.',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    languagePreferences: 'Language preferences',
    interfaceLanguage: 'Interface language',
    explanationLanguage: 'Notice explanation language',
    explanationLanguageSub: 'Language used to summarize and translate legal notices.',
    autoDetect: 'Auto-detect notice source language',
    businessProfile: 'Business Entity & Statutory Profile',
    privacyTitle: 'Privacy and security',
    retentionTitle: 'Document retention policy',
    resetDemo: 'Reset demo notices',
    purgeData: 'Purge all vault data'
  }
};

// Hindi Translations
export const hiTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'भारतीय व्यापार स्वामियों के लिए कानूनी नोटिस सहायक',
    headline: 'कानूनी नोटिस। अब सरल और स्पष्ट।',
    supportingText: 'नोटिस को समझें। अपने अगले कदम जानें।',
    uploadCta: 'नोटिस अपलोड करें'
  },
  nav: {
    overview: 'आपका अवलोकन',
    analyze: 'नोटिस का विश्लेषण करें',
    notices: 'आपके नोटिस',
    actions: 'समय-सीमा ट्रैकर',
    responses: 'उत्तर का मसौदा तैयार करें',
    settings: 'सेटिंग्स'
  },
  common: {
    loading: 'लोड हो रहा है...',
    searchPlaceholder: 'प्राधिकरण, अधिनियम या संदर्भ संख्या से खोजें...',
    filter: 'फ़िल्टर',
    all: 'सभी',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    view: 'समीक्षा करें',
    back: 'वापस',
    status: 'स्थिति',
    deadline: 'अंतिम तिथि',
    category: 'श्रेणी',
    authority: 'प्राधिकरण',
    reference: 'संदर्भ सं.',
    received: 'प्राप्त',
    verified: 'सत्यापित तथ्य',
    interpretation: 'एआई व्याख्या',
    disclaimerTitle: 'सत्यापन आवश्यक',
    disclaimerText: 'यह सारांश केवल सूचनात्मक सहायता के लिए है और कानूनी सलाह नहीं है। दाखिल करने से पहले अपने सीए या वकील से समीक्षा कराएं।',
    demoModeNotice: 'डेमो मोड: पहले से निकाले गए नोटिस डेटा को प्रदर्शित कर रहा है।',
    activeNotice: 'सक्रिय नोटिस',
    noDeadlineStated: 'कोई अंतिम तिथि निर्दिष्ट नहीं',
    dueToday: 'आज देय',
    overdue: 'समय बीत चुका है',
    daysRemaining: 'दिन शेष',
    dayRemaining: '1 दिन शेष'
  },
  dashboard: {
    title: 'आपका अवलोकन',
    subtitle: 'कानूनी नोटिस, आगामी समय-सीमा और अनुपालन कार्यों को ट्रैक करें।',
    kpiTotal: 'कुल नोटिस',
    kpiTotalSub: 'वॉल्ट में दर्ज',
    kpiAttention: 'कार्रवाई आवश्यक',
    kpiAttentionSub: 'जवाब या सुधार आवश्यक',
    kpiUpcoming: 'आगामी समय-सीमाएं',
    kpiUpcomingSub: '30 दिनों के भीतर देय',
    kpiReview: 'समीक्षाधीन',
    kpiReviewSub: 'सीए या वकील की समीक्षा में',
    timeSensitive: 'अति-महत्वपूर्ण समय-सीमाएं',
    timeSensitiveSub: 'मूल दस्तावेज़ से निकाली गई कानूनी तिथियां।',
    recentNotices: 'हाल के नोटिस',
    recentNoticesSub: 'विश्लेषित कानूनी नोटिस और स्थिति।',
    viewActionPlans: 'समय-सीमा ट्रैकर देखें',
    emptyNotices: 'अभी कोई नोटिस नहीं है',
    allCategories: 'सभी श्रेणियां'
  },
  upload: {
    title: 'नोटिस का विश्लेषण करें',
    subtitle: 'सरकारी या कानूनी नोटिस अपलोड करें और समय-सीमा, सरल भाषा में अर्थ और अगले कदम जानें।',
    dragDrop: 'नोटिस को यहां खींचकर छोड़ें, या',
    browseFiles: 'फ़ाइलें चुनें',
    supportedFormats: 'PDF, PNG, JPG या TIFF (अधिकतम 25 MB)',
    analyzingState: 'नोटिस का विश्लेषण हो रहा है',
    extractedState: 'नोटिस का विवरण निकाला गया',
    startAnalysisBtn: 'विश्लेषण शुरू करें',
    removeDocument: 'दस्तावेज़ हटाएं',
    privacyNote: 'सुरक्षित सैंडबॉक्स · गोपनीय व्यापार रिकॉर्ड',
    sampleNoticesTitle: 'या नमूना भारतीय नोटिस के साथ आज़माएं',
    sampleNoticesSub: 'जीएसटी, आयकर, ईपीएफओ या कंपनी मामलों के नोटिस के साथ परीक्षण करें।'
  },
  analysis: {
    title: 'नोटिस का विवरण',
    tabSummary: 'इसका क्या अर्थ है',
    tabWhyIssued: 'यह क्यों जारी किया गया',
    tabNextSteps: 'आपके अगले कदम',
    tabDocuments: 'तैयार किए जाने वाले दस्तावेज़',
    tabLegal: 'कानूनी संदर्भ',
    tabUncertain: 'अस्पष्ट या अधूरी जानकारी',
    tabEvidence: 'मूल दस्तावेज़ अंश',
    explanationLangLabel: 'स्पष्टीकरण की भाषा',
    inspectOriginalBtn: 'मूल नोटिस देखें',
    draftResponseBtn: 'उत्तर का मसौदा बनाएं',
    confidenceScore: 'सत्यापन सटीकता',
    mandatoryObligations: 'अनिवार्य वैधानिक कर्तव्य',
    suggestedSteps: 'सुझाए गए रणनीतिक कदम',
    statutoryDueDate: 'वैधानिक देय तिथि',
    sourceQuote: 'स्रोत उद्धरण'
  },
  actions: {
    title: 'समय-सीमा ट्रैकर',
    subtitle: 'अनिवार्य कानूनी कर्तव्यों और रणनीतिक तैयारियों की व्यवस्थित चेकलिस्ट।',
    addTask: 'कस्टम कार्य जोड़ें',
    overallProgress: 'कुल अनुपालन प्रगति',
    completedOf: 'सक्रिय नोटिसों में पूरे किए गए कार्य',
    mandatorySection: 'अनिवार्य वैधानिक कर्तव्य',
    suggestedSection: 'सुझाए गए तैयारी कदम',
    noTasks: 'सक्रिय फ़िल्टर के साथ कोई कार्य नहीं मिला।'
  },
  responses: {
    title: 'उत्तर का मसौदा तैयार करें',
    subtitle: 'सत्यापित कानूनी उद्धरणों पर आधारित औपचारिक प्रतिक्रिया कार्यक्षेत्र।',
    templateLabel: 'प्रतिक्रिया टेम्पलेट',
    copyText: 'टेक्स्ट कॉपी करें',
    copied: 'कॉपी हो गया!',
    downloadText: 'डाउनलोड (.txt)',
    saveDraft: 'मसौदा सहेजें',
    editorPlaceholder: 'मसौदा सामग्री...',
    charactersWords: 'अक्षर · शब्द',
    instructionsNote: 'भेजने से पहले सभी कोष्ठक [बड़े अक्षरों] वाले स्थानों को भरें।'
  },
  settings: {
    title: 'सेटिंग्स',
    appearanceTitle: 'दिखावट (थीम)',
    appearanceSub: 'चुनें कि Notice on the Desk आपकी स्क्रीन पर कैसा दिखेगा।',
    themeLight: 'लाइट (हल्का)',
    themeDark: 'डार्क (गहरा)',
    themeSystem: 'सिस्टम के अनुसार',
    languagePreferences: 'भाषा प्राथमिकताएं',
    interfaceLanguage: 'इंटरफ़ेस भाषा',
    explanationLanguage: 'नोटिस स्पष्टीकरण भाषा',
    explanationLanguageSub: 'कानूनी नोटिस का सारांश और अनुवाद करने के लिए उपयोग की जाने वाली भाषा।',
    autoDetect: 'नोटिस की मूल भाषा स्वतः पहचानें',
    businessProfile: 'व्यावसायिक इकाई और वैधानिक प्रोफ़ाइल',
    privacyTitle: 'गोपनीयता और सुरक्षा',
    retentionTitle: 'दस्तावेज़ प्रतिधारण नीति',
    resetDemo: 'डेमो नोटिस रीसेट करें',
    purgeData: 'सभी डेटा मिटाएं'
  }
};

// Kannada Translations
export const knTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'ಭಾರತೀಯ ವ್ಯಾಪಾರ ಮಾಲೀಕರಿಗೆ ಕಾನೂನು ನೋಟಿಸ್ ಸಹಾಯಕ',
    headline: 'ಕಾನೂನು ನೋಟಿಸ್‌ಗಳು. ಈಗ ಸ್ಪಷ್ಟ ಮತ್ತು ಸರಳ.',
    supportingText: 'ನೋಟಿಸ್ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ನಿಮ್ಮ ಮುಂದಿನ ಹಂತ ಕಂಡುಕೊಳ್ಳಿ.',
    uploadCta: 'ನೋಟಿಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'
  },
  nav: {
    overview: 'ನಿಮ್ಮ ಅವಲೋಕನ',
    analyze: 'ನೋಟಿಸ್ ವಿಶ್ಲೇಷಿಸಿ',
    notices: 'ನಿಮ್ಮ ನೋಟಿಸ್‌ಗಳು',
    actions: 'ಗಡುವು ಟ್ರ್ಯಾಕರ್',
    responses: 'ಪ್ರತಿಕ್ರಿಯೆ ಕರಡು ರಚಿಸಿ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು'
  },
  common: {
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    searchPlaceholder: 'ಪ್ರಾಧಿಕಾರ, ಕಾಯ್ದೆ ಅಥವಾ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆಯಿಂದ ಹುಡುಕಿ...',
    filter: 'ಫಿಲ್ಟರ್',
    all: 'ಎಲ್ಲವೂ',
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    delete: 'ಅಳಿಸಿ',
    view: 'ಪರಿಶೀಲಿಸಿ',
    back: 'ಹಿಂದಕ್ಕೆ',
    status: 'ಸ್ಥಿತಿ',
    deadline: 'ಅಂತಿಮ ದಿನಾಂಕ',
    category: 'ವರ್ಗ',
    authority: 'ಪ್ರಾಧಿಕಾರ',
    reference: 'ಉಲ್ಲೇಖ ಸಂ.',
    received: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    verified: 'ದೃಢೀಕರಿಸಿದ ಸತ್ಯಾಂಶ',
    interpretation: 'ಎಐ ವ್ಯಾಖ್ಯಾನ',
    disclaimerTitle: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
    disclaimerText: 'ಈ ಸಾರಾಂಶವು ಕೇವಲ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ಸಲ್ಲಿಕೆಗೆ ಮುನ್ನ ನಿಮ್ಮ ಸಿಎ ಅಥವಾ ವಕೀಲರಿಂದ ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ.',
    demoModeNotice: 'ಡೆಮೊ ಮೋಡ್: ಮುಂಚಿತವಾಗಿ ವಿಶ್ಲೇಷಿಸಿದ ನೋಟಿಸ್ ಡೇಟಾವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.',
    activeNotice: 'ಸಕ್ರಿಯ ನೋಟಿಸ್',
    noDeadlineStated: 'ಗಡುವು ನಮೂದಿಸಿಲ್ಲ',
    dueToday: 'ಇಂದೇ ಅಂತಿಮ ದಿನ',
    overdue: 'ಗಡುವು ಮೀರಿದೆ',
    daysRemaining: 'ದಿನಗಳು ಬಾಕಿ',
    dayRemaining: '1 ದಿನ ಬಾಕಿ'
  },
  dashboard: {
    title: 'ನಿಮ್ಮ ಅವಲೋಕನ',
    subtitle: 'ಕಾನೂನು ನೋಟಿಸ್‌ಗಳು, ಮುಂಬರುವ ಶಾಸನಬದ್ಧ ಗಡುವುಗಳು ಮತ್ತು ಕಾರ್ಯಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    kpiTotal: 'ಒಟ್ಟು ನೋಟಿಸ್‌ಗಳು',
    kpiTotalSub: 'ಖಾತೆಯಲ್ಲಿ ದಾಖಲಾಗಿದೆ',
    kpiAttention: 'ಗಮನ ಹರಿಸಬೇಕಾದವು',
    kpiAttentionSub: 'ಪ್ರತಿಕ್ರಿಯೆ ಅಗತ್ಯವಿದೆ',
    kpiUpcoming: 'ಮುಂಬರುವ ಗಡುವುಗಳು',
    kpiUpcomingSub: '30 ದಿನಗಳೊಳಗೆ ಬಾಕಿ',
    kpiReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿರುವವು',
    kpiReviewSub: 'ಸಿಎ ಅಥವಾ ವಕೀಲರ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    timeSensitive: 'ತುರ್ತು ಗಡುವುಗಳು',
    timeSensitiveSub: 'ಮೂಲ ಪತ್ರದಿಂದ ಪಡೆದ ಶಾಸನಬದ್ಧ ದಿನಾಂಕಗಳು.',
    recentNotices: 'ಇತ್ತೀಚಿನ ನೋಟಿಸ್‌ಗಳು',
    recentNoticesSub: 'ವಿಶ್ಲೇಷಿಸಿದ ಕಾನೂನು ನೋಟಿಸ್‌ಗಳು ಮತ್ತು ಸ್ಥಿತಿ.',
    viewActionPlans: 'ಗಡುವು ಟ್ರ್ಯಾಕರ್ ವೀಕ್ಷಿಸಿ',
    emptyNotices: 'ಇನ್ನೂ ಯಾವುದೇ ನೋಟಿಸ್‌ಗಳಿಲ್ಲ',
    allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು'
  },
  upload: {
    title: 'ನೋಟಿಸ್ ವಿಶ್ಲೇಷಿಸಿ',
    subtitle: 'ಸರ್ಕಾರಿ ಅಥವಾ ಕಾನೂನು ನೋಟಿಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಗಡುವು ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ತಿಳಿಯಿರಿ.',
    dragDrop: 'ನೋಟಿಸ್ ಇಲ್ಲಿಗೆ ಎಳೆಯಿರಿ, ಅಥವಾ',
    browseFiles: 'ಫೈಲ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    supportedFormats: 'PDF, PNG, JPG ಅಥವಾ TIFF (ಗರಿಷ್ಠ 25 MB)',
    analyzingState: 'ನೋಟಿಸ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ',
    extractedState: 'ನೋಟಿಸ್ ಪಠ್ಯ ಹೊರತೆಗೆಯಲಾಗಿದೆ',
    startAnalysisBtn: 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    removeDocument: 'ದಾಖಲೆ ತೆಗೆದುಹಾಕಿ',
    privacyNote: 'ಸುರಕ್ಷಿತ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ · ಗೌಪ್ಯ ವ್ಯಾಪಾರ ದಾಖಲೆಗಳು',
    sampleNoticesTitle: 'ಅಥವಾ ಮಾದರಿ ಭಾರತೀಯ ನೋಟಿಸ್‌ಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ',
    sampleNoticesSub: 'ಜಿಎಸ್‌ಟಿ, ಆದಾಯ ತೆರಿಗೆ, ಇಪಿಎಫ್‌ಒ ಅಥವಾ ಗುತ್ತಿಗೆ ನೋಟಿಸ್‌ಗಳೊಂದಿಗೆ ಪ್ರಯತ್ನಿಸಿ.'
  },
  analysis: {
    title: 'ನೋಟಿಸ್ ವಿವರಣೆ',
    tabSummary: 'ಇದರ ಅರ್ಥವೇನು',
    tabWhyIssued: 'ಏಕೆ ನೀಡಲಾಗಿದೆ',
    tabNextSteps: 'ನಿಮ್ಮ ಮುಂದಿನ ಕ್ರಮಗಳು',
    tabDocuments: 'ಸಿದ್ಧಪಡಿಸಬೇಕಾದ ದಾಖಲೆಗಳು',
    tabLegal: 'ಕಾನೂನು ಉಲ್ಲೇಖಗಳು',
    tabUncertain: 'ಅನಿಶ್ಚಿತ ಅಥವಾ ಅಸ್ಪಷ್ಟ ಮಾಹಿತಿ',
    tabEvidence: 'ಮೂಲ ನೋಟಿಸ್ ಸಾಲುಗಳು',
    explanationLangLabel: 'ವಿವರಣೆಯ ಭಾಷೆ',
    inspectOriginalBtn: 'ಮೂಲ ನೋಟಿಸ್ ವೀಕ್ಷಿಸಿ',
    draftResponseBtn: 'ಪ್ರತಿಕ್ರಿಯೆ ಕರಡು ರಚಿಸಿ',
    confidenceScore: 'ವಿಶ್ಲೇಷಣೆ ನಿಖರತೆ',
    mandatoryObligations: 'ಕಡ್ಡಾಯ ಶಾಸನಬದ್ಧ ಕರ್ತವ್ಯಗಳು',
    suggestedSteps: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪೂರ್ವಸಿದ್ಧತೆಗಳು',
    statutoryDueDate: 'ಶಾಸನಬದ್ಧ ಅಂತಿಮ ದಿನಾಂಕ',
    sourceQuote: 'ಮೂಲ ಉಲ್ಲೇಖ'
  },
  actions: {
    title: 'ಗಡುವು ಟ್ರ್ಯಾಕರ್',
    subtitle: 'ಕಡ್ಡಾಯ ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಪೂರ್ವಸಿದ್ಧತಾ ಕ್ರಮಗಳ ವ್ಯವಸ್ಥಿತ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ.',
    addTask: 'ಹೊಸ ಕಾರ್ಯ ಸೇರಿಸಿ',
    overallProgress: 'ಒಟ್ಟು ಪ್ರಗತಿ',
    completedOf: 'ಸಕ್ರಿಯ ನೋಟಿಸ್‌ಗಳಲ್ಲಿ ಪೂರ್ಣಗೊಂಡ ಕಾರ್ಯಗಳು',
    mandatorySection: 'ಕಡ್ಡಾಯ ಶಾಸನಬದ್ಧ ಕರ್ತವ್ಯಗಳು',
    suggestedSection: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪೂರ್ವಸಿದ್ಧತೆಗಳು',
    noTasks: 'ಯಾವುದೇ ಕಾರ್ಯಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'
  },
  responses: {
    title: 'ಪ್ರತಿಕ್ರಿಯೆ ಕರಡು ರಚಿಸಿ',
    subtitle: 'ದೃಢೀಕೃತ ಕಾನೂನು ಉಲ್ಲೇಖಗಳ ಮೇಲೆ ಆಧಾರಿತವಾದ ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ ಕರಡು.',
    templateLabel: 'ಪ್ರತಿಕ್ರಿಯೆ ಮಾದರಿ',
    copyText: 'ಪಠ್ಯ ನಕಲಿಸಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
    downloadText: 'ಡೌನ್‌ಲೋಡ್ (.txt)',
    saveDraft: 'ಕರಡು ಉಳಿಸಿ',
    editorPlaceholder: 'ಕರಡು ಪಠ್ಯ...',
    charactersWords: 'ಅಕ್ಷರಗಳು · ಪದಗಳು',
    instructionsNote: 'ಕಳುಹಿಸುವ ಮುನ್ನ ಆವರಣದಲ್ಲಿರುವ [ದೊಡ್ಡಕ್ಷರದ] ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.'
  },
  settings: {
    title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    appearanceTitle: 'ಗೋಚರತೆ (ಥೀಮ್)',
    appearanceSub: 'Notice on the Desk ನಿಮ್ಮ ಪರದೆಯ ಮೇಲೆ ಹೇಗೆ ಕಾಣಬೇಕೆಂದು ಆಯ್ಕೆಮಾಡಿ.',
    themeLight: 'ಲೈಟ್ (ತಿಳಿ)',
    themeDark: 'ಡಾರ್ಕ್ (ಗಾಢ)',
    themeSystem: 'ಸಿಸ್ಟಮ್ ಮಾದರಿ',
    languagePreferences: 'ಭಾಷಾ ಆದ್ಯತೆಗಳು',
    interfaceLanguage: 'ಇಂಟರ್ಫೇಸ್ ಭಾಷೆ',
    explanationLanguage: 'ನೋಟಿಸ್ ವಿವರಣೆ ಭಾಷೆ',
    explanationLanguageSub: 'ಕಾನೂನು ನೋಟಿಸ್‌ಗಳನ್ನು ಸಾರಾಂಶಗೊಳಿಸಲು ಬಳಸುವ ಭಾಷೆ.',
    autoDetect: 'ಮೂಲ ಭಾಷೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಹಚ್ಚಿ',
    businessProfile: 'ವ್ಯಾಪಾರ ಘಟಕದ ಪ್ರೊಫೈಲ್',
    privacyTitle: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
    retentionTitle: 'ದಾಖಲೆ ಧಾರಣ ನೀತಿ',
    resetDemo: 'ಮಾದರಿ ನೋಟಿಸ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    purgeData: 'ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಅಳಿಸಿ'
  }
};

// Tamil Translations
export const taTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'இந்திய வணிக உரிமையாளர்களுக்கான சட்ட அறிவிப்பு உதவியாளர்',
    headline: 'சட்ட அறிவிப்புகள். இப்போது எளிமையாகவும் தெளிவாகவும்.',
    supportingText: 'அறிவிப்பைப் புரிந்து கொள்ளுங்கள். அடுத்த கட்ட நடவடிக்கையை அறியுங்கள்.',
    uploadCta: 'அறிவிப்பைப் பதிவேற்றுக'
  },
  nav: {
    overview: 'உங்கள் கண்ணோட்டம்',
    analyze: 'அறிவிப்பை ஆராய்க',
    notices: 'உங்கள் அறிவிப்புகள்',
    actions: 'காலக்கெடு கண்காணிப்பாளர்',
    responses: 'பதில் வரைவு தயார் செய்க',
    settings: 'அமைப்புகள்'
  },
  common: {
    loading: 'ஏற்றுகிறது...',
    searchPlaceholder: 'அதிகார அமைப்பு, சட்டம் அல்லது குறிப்பு எண்ணை தேடுக...',
    filter: 'வடிகட்டு',
    all: 'அனைத்தும்',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    delete: 'நீக்கு',
    view: 'பார்வையிடு',
    back: 'பின்செல்',
    status: 'நிலை',
    deadline: 'காலக்கெடு',
    category: 'வகை',
    authority: 'அதிகார அமைப்பு',
    reference: 'குறிப்பு எண்',
    received: 'பெறப்பட்டது',
    verified: 'சரிபார்க்கப்பட்ட உண்மை',
    interpretation: 'AI விளக்கம்',
    disclaimerTitle: 'சரிபார்ப்பு தேவை',
    disclaimerText: 'இந்த சுருக்கம் தகவல் உதவிக்காக மட்டுமே. முறையான சட்ட ஆலோசனையாகாது. சமர்ப்பிக்கும் முன் உங்கள் தணிக்கையாளர் அல்லது வழக்கறிஞரிடம் ஆலோசிக்கவும்.',
    demoModeNotice: 'டெமோ பயன்முறை: முன் பிரித்தெடுக்கப்பட்ட அறிவிப்புத் தரவைக் காட்டுகிறது.',
    activeNotice: 'செயலில் உள்ள அறிவிப்பு',
    noDeadlineStated: 'காலக்கெடு குறிப்பிடப்படவில்லை',
    dueToday: 'இன்றே கடைசி நாள்',
    overdue: 'காலம் கடந்துவிட்டது',
    daysRemaining: 'நாட்கள் மீதமுள்ளன',
    dayRemaining: '1 நாள் மீதமுள்ளது'
  },
  dashboard: {
    title: 'உங்கள் கண்ணோட்டம்',
    subtitle: 'சட்ட அறிவிப்புகள், வரவிருக்கும் காலக்கெடு மற்றும் இணக்கப் பணிகளைக் கண்காணிக்கவும்.',
    kpiTotal: 'மொத்த அறிவிப்புகள்',
    kpiTotalSub: 'பெட்டகத்தில் சேமிக்கப்பட்டது',
    kpiAttention: 'கவனம் தேவைப்படுபவை',
    kpiAttentionSub: 'பதில் தேவை',
    kpiUpcoming: 'வரவிருக்கும் காலக்கெடுகள்',
    kpiUpcomingSub: '30 நாட்களுக்குள் முடிக்கப்பட வேண்டியவை',
    kpiReview: 'பரிசீலனையில் உள்ளவை',
    kpiReviewSub: 'சிஏ அல்லது வழக்கறிஞர் பரிசீலனையில்',
    timeSensitive: 'முக்கிய காலக்கெடுகள்',
    timeSensitiveSub: 'அசல் ஆவணத்திலிருந்து பெறப்பட்ட சட்டபூர்வ தேதிகள்.',
    recentNotices: 'சமீபத்திய அறிவிப்புகள்',
    recentNoticesSub: 'ஆய்வு செய்யப்பட்ட அறிவிப்புகள் மற்றும் அவற்றின் நிலை.',
    viewActionPlans: 'காலக்கெடு கண்காணிப்பாளரைப் பார்க்க',
    emptyNotices: 'அறிவிப்புகள் எதுவும் இல்லை',
    allCategories: 'அனைத்து பிரிவுகளும்'
  },
  upload: {
    title: 'அறிவிப்பை ஆராய்க',
    subtitle: 'அரசு அல்லது சட்ட அறிவிப்பைப் பதிவேற்றி, காலக்கெடு மற்றும் அடுத்த படிகளை எளிய தமிழில் அறியுங்கள்.',
    dragDrop: 'அறிவிப்பை இங்கே இழுத்துவிடவும், அல்லது',
    browseFiles: 'கோப்புகளைத் தேர்ந்தெடுக்கவும்',
    supportedFormats: 'PDF, PNG, JPG அல்லது TIFF (அதிகபட்சம் 25 MB)',
    analyzingState: 'அறிவிப்பு ஆய்வு செய்யப்படுகிறது',
    extractedState: 'அறிவிப்பு விவரங்கள் எடுக்கப்பட்டன',
    startAnalysisBtn: 'ஆய்வைத் தொடங்கு',
    removeDocument: 'ஆவணத்தை நீக்கு',
    privacyNote: 'பாதுகாப்பான உலாவி பெட்டகம் · இரகசிய வணிகப் பதிவுகள்',
    sampleNoticesTitle: 'மாதிரி இந்திய அறிவிப்புகளுடன் முயற்சிக்கவும்',
    sampleNoticesSub: 'ஜிஎஸ்டி, வருமான வரி, இபிஎஃப் அல்லது வாடகை அறிவிப்புகளுடன் சோதிக்கவும்.'
  },
  analysis: {
    title: 'அறிவிப்பு கண்ணோட்டம்',
    tabSummary: 'இதன் பொருள் என்ன',
    tabWhyIssued: 'ஏன் வழங்கப்பட்டது',
    tabNextSteps: 'உங்கள் அடுத்த படிகள்',
    tabDocuments: 'தயார் செய்ய வேண்டிய ஆவணங்கள்',
    tabLegal: 'சட்டப்பிரிவுகள்',
    tabUncertain: 'தெளிவற்ற தகவல்கள்',
    tabEvidence: 'அசல் அறிவிப்பு வரிகள்',
    explanationLangLabel: 'விளக்க உரை மொழி',
    inspectOriginalBtn: 'அசல் அறிவிப்பைப் பார்',
    draftResponseBtn: 'பதில் வரைவு தயார் செய்',
    confidenceScore: 'ஆய்வு துல்லியம்',
    mandatoryObligations: 'கட்டாய சட்டபூர்வ கடமைகள்',
    suggestedSteps: 'பரிந்துரைக்கப்பட்ட ஆயத்தப் பணிகள்',
    statutoryDueDate: 'சட்டபூர்வ இறுதித் தேதி',
    sourceQuote: 'மூல மேற்கோள்'
  },
  actions: {
    title: 'காலக்கெடு கண்காணிப்பாளர்',
    subtitle: 'கட்டாயக் கடமைகள் மற்றும் பாதுகாப்புத் தயாரிப்புகளின் சரிபார்ப்புப் பட்டியல்.',
    addTask: 'புதிய பணியைச் சேர்',
    overallProgress: 'ஒட்டுமொத்த இணக்க முன்னேற்றம்',
    completedOf: 'செயலில் உள்ள பணிகளில் முடிக்கப்பட்டவை',
    mandatorySection: 'கட்டாய சட்டபூர்வ கடமைகள்',
    suggestedSection: 'பரிந்துரைக்கப்பட்ட ஆயத்தப் பணிகள்',
    noTasks: 'எந்தப் பணியும் இல்லை.'
  },
  responses: {
    title: 'பதில் வரைவு தயார் செய்க',
    subtitle: 'சரிபார்க்கப்பட்ட சட்டக் குறிப்புகளைக் கொண்ட அதிகாரப்பூர்வ பதில் வரைவுப் பகுதி.',
    templateLabel: 'பதில் மாதிரி வடிவம்',
    copyText: 'உரையை நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    downloadText: 'பதிவிறக்கு (.txt)',
    saveDraft: 'வரைவைச் சேமி',
    editorPlaceholder: 'வரைவு உரை...',
    charactersWords: 'எழுத்துக்கள் · வார்த்தைகள்',
    instructionsNote: 'அனுப்பும் முன் அடைப்புக்குறிக்குள் உள்ள [பெரிய எழுத்து] தகவல்களை நிரப்பவும்.'
  },
  settings: {
    title: 'அமைப்புகள்',
    appearanceTitle: 'தோற்றம் (தீம்)',
    appearanceSub: 'Notice on the Desk உங்கள் திரையில் எவ்வாறு தோன்ற வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்.',
    themeLight: 'வெளிச்சம் (Light)',
    themeDark: 'இருள் (Dark)',
    themeSystem: 'கணினி அமைப்பின்படி (System)',
    languagePreferences: 'மொழி விருப்பங்கள்',
    interfaceLanguage: 'இடைமுக மொழி',
    explanationLanguage: 'அறிவிப்பு விளக்க மொழி',
    explanationLanguageSub: 'சட்ட அறிவிப்புகளை மொழிபெயர்க்கப் பயன்படும் மொழி.',
    autoDetect: 'அறிவிப்பின் மூல மொழியைத் தானாகக் கண்டறி',
    businessProfile: 'வணிக நிறுவன விவரங்கள்',
    privacyTitle: 'தனியுரிமை மற்றும் பாதுகாப்பு',
    retentionTitle: 'ஆவணக் கொள்கை',
    resetDemo: 'மாதிரி அறிவிப்புகளை மீட்டமைக்க',
    purgeData: 'அனைத்துத் தரவையும் அழிக்க'
  }
};

// Telugu Translations
export const teTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'భారతీయ వ్యాపార యజమానులకు చట్టపరమైన నోటీసు సహాయకుడు',
    headline: 'చట్టపరమైన నోటీసులు. ఇప్పుడు స్పష్టంగా, సులభంగా.',
    supportingText: 'నోటీసును అర్థం చేసుకోండి. మీ తదుపరి చర్యను కనుగొనండి.',
    uploadCta: 'నోటీసు అప్‌లోడ్ చేయండి'
  },
  nav: {
    overview: 'మీ అవలోకనం',
    analyze: 'నోటీసును విశ్లేషించండి',
    notices: 'మీ నోటీసులు',
    actions: 'గడువు ట్రాకర్',
    responses: 'సమాధానం డ్రాఫ్ట్ చేయండి',
    settings: 'సెట్టింగ్‌లు'
  },
  common: {
    loading: 'లోడ్ అవుతోంది...',
    searchPlaceholder: 'అధికార సంస్థ, చట్టం లేదా రిఫరెన్స్ సంఖ్య ద్వారా శోధించండి...',
    filter: 'ఫిల్టర్',
    all: 'అన్నీ',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    delete: 'తొలగించండి',
    view: 'సమీక్షించండి',
    back: 'వెనుకకు',
    status: 'స్థితి',
    deadline: 'గడువు తేదీ',
    category: 'వర్గం',
    authority: 'అధికార సంస్థ',
    reference: 'రిఫరెన్స్ నం.',
    received: 'అందుకున్న తేదీ',
    verified: 'ధృవీకరించబడిన వాస్తవం',
    interpretation: 'AI వివరణ',
    disclaimerTitle: 'ధృవీకరణ అవసరం',
    disclaimerText: 'ఈ సారాంశం సమాచార సహాయం కోసం మాత్రమే, చట్టపరమైన సలహా కాదు. సమర్పించే ముందు మీ CA లేదా న్యాయవాదితో సమీక్షించండి.',
    demoModeNotice: 'డెమో మోడ్: విశ్లేషించబడిన నోటీసు డేటాను ప్రదర్శిస్తోంది.',
    activeNotice: 'యాక్టివ్ నోటీసు',
    noDeadlineStated: 'గడువు పేర్కొనబడలేదు',
    dueToday: 'ఈరోజే గడువు',
    overdue: 'గడువు దాటిపోయింది',
    daysRemaining: 'రోజులు మిగిలి ఉన్నాయి',
    dayRemaining: '1 రోజు మిగిలి ఉంది'
  },
  dashboard: {
    title: 'మీ అవలోకనం',
    subtitle: 'చట్టపరమైన నోటీసులు, రాబోయే గడువులు మరియు నిబంధనల విధులను ట్రాక్ చేయండి.',
    kpiTotal: 'మొత్తం నోటీసులు',
    kpiTotalSub: 'ఖాతాలో నమోదు చేయబడ్డాయి',
    kpiAttention: 'శ్రద్ధ అవసరమైనవి',
    kpiAttentionSub: 'స్పందన లేదా పరిష్కారం అవసరం',
    kpiUpcoming: 'రాబోయే గడువులు',
    kpiUpcomingSub: '30 రోజుల్లోగా పూర్తి చేయవలసినవి',
    kpiReview: 'సమీక్షలో ఉన్నవి',
    kpiReviewSub: 'CA లేదా న్యాయవాది సమీక్షలో',
    timeSensitive: 'ముఖ్యమైన గడువులు',
    timeSensitiveSub: 'అసలు నోటీసు ఆధారిత చట్టబద్ధమైన గడువులు.',
    recentNotices: 'ఇటీవలి నోటీసులు',
    recentNoticesSub: 'విశ్లేషించిన చట్టపరమైన నోటీసులు మరియు స్థితి.',
    viewActionPlans: 'గడువు ట్రాకర్ చూడండి',
    emptyNotices: 'ఇంకా నోటీసులు ఏవీ లేవు',
    allCategories: 'అన్ని వర్గాలు'
  },
  upload: {
    title: 'నోటీసును విశ్లేషించండి',
    subtitle: 'ప్రభుత్వ లేదా చట్టపరమైన నోటీసును అప్‌లోడ్ చేయండి, గడువు మరియు తదుపరి చర్యలను స్పష్టంగా తెలుసుకోండి.',
    dragDrop: 'నోటీసును ఇక్కడ డ్రాగ్ చేయండి, లేదా',
    browseFiles: 'ఫైళ్లను ఎంచుకోండి',
    supportedFormats: 'PDF, PNG, JPG లేదా TIFF (గరిష్టంగా 25 MB)',
    analyzingState: 'నోటీసు విశ్లేషించబడుతోంది',
    extractedState: 'నోటీసు వివరాలు సేకరించబడ్డాయి',
    startAnalysisBtn: 'విశ్లేషణ ప్రారంభించండి',
    removeDocument: 'పత్రం తొలగించండి',
    privacyNote: 'సురక్షిత బ్రౌజర్ వాల్ట్ · గోప్యమైన వ్యాపార పత్రాలు',
    sampleNoticesTitle: 'లేదా భారతీయ నమూనా నోటీసులతో ప్రయత్నించండి',
    sampleNoticesSub: 'GST, ఆదాయపు పన్ను, EPFO లేదా అద్దె నోటీసులతో పరీక్షించండి.'
  },
  analysis: {
    title: 'నోటీసు వివరాలు',
    tabSummary: 'దీని అర్థం ఏమిటి',
    tabWhyIssued: 'ఎందుకు జారీ చేయబడింది',
    tabNextSteps: 'మీ తదుపరి చర్యలు',
    tabDocuments: 'సిద్ధం చేయవలసిన పత్రాలు',
    tabLegal: 'చట్టపరమైన విభాగాలు',
    tabUncertain: 'అస్పష్టమైన సమాచారం',
    tabEvidence: 'అసలు నోటీసు వాక్యాలు',
    explanationLangLabel: 'వివరణ భాష',
    inspectOriginalBtn: 'అసలు నోటీసు చూడండి',
    draftResponseBtn: 'సమాధానం డ్రాఫ్ట్ చేయండి',
    confidenceScore: 'విశ్లేషణ ఖచ్చితత్వం',
    mandatoryObligations: 'తప్పనిసరి చట్టబద్ధమైన విధులు',
    suggestedSteps: 'సూచించిన సన్నాహక చర్యలు',
    statutoryDueDate: 'చట్టబద్ధమైన గడువు తేదీ',
    sourceQuote: 'మూల వాక్యం'
  },
  actions: {
    title: 'గడువు ట్రాకర్',
    subtitle: 'తప్పనిసరి విధులు మరియు సన్నాహక చర్యల వ్యవస్థీకృత జాబితా.',
    addTask: 'కొత్త పనిని జోడించండి',
    overallProgress: 'మొత్తం ప్రగతి',
    completedOf: 'పూర్తయిన పనులు',
    mandatorySection: 'తప్పనిసరి చట్టబద్ధమైన విధులు',
    suggestedSection: 'సూచించిన సన్నాహక చర్యలు',
    noTasks: 'పనులేవీ లేవు.'
  },
  responses: {
    title: 'సమాధానం డ్రాఫ్ట్ చేయండి',
    subtitle: 'ధృవీకరించబడిన చట్టపరమైన సూచనలతో కూడిన అధికారిక ప్రతిస్పందన డ్రాఫ్ట్.',
    templateLabel: 'స్పందన నమూనా',
    copyText: 'టెక్స్ట్ కాపీ చేయండి',
    copied: 'కాపీ చేయబడింది!',
    downloadText: 'డౌన్‌లోడ్ (.txt)',
    saveDraft: 'డ్రాఫ్ట్ సేవ్ చేయండి',
    editorPlaceholder: 'డ్రాఫ్ట్ టెక్స్ట్...',
    charactersWords: 'అక్షరాలు · పదాలు',
    instructionsNote: 'పంపే ముందు బ్రాకెట్లలోని [పెద్ద అక్షరాల] వివరాలను పూరించండి.'
  },
  settings: {
    title: 'సెట్టింగ్‌లు',
    appearanceTitle: 'రూపురేఖలు (థీమ్)',
    appearanceSub: 'Notice on the Desk మీ స్క్రీన్‌పై ఎలా కనిపించాలో ఎంచుకోండి.',
    themeLight: 'లైట్ (Light)',
    themeDark: 'డార్క్ (Dark)',
    themeSystem: 'సిస్టమ్ ప్రకారం (System)',
    languagePreferences: 'భాషా ప్రాధాన్యతలు',
    interfaceLanguage: 'ఇంటర్‌ఫేస్ భాష',
    explanationLanguage: 'నోటీసు వివరణ భాష',
    explanationLanguageSub: 'చట్టపరమైన నోటీసులను అనువదించడానికి ఉపయోగించే భాష.',
    autoDetect: 'మూల భాషను స్వయంచాలకంగా గుర్తించండి',
    businessProfile: 'వ్యాపార సంస్థ వివరాలు',
    privacyTitle: 'గోప్యత మరియు భద్రత',
    retentionTitle: 'పత్రాల నిల్వ విధానం',
    resetDemo: 'నమూనా నోటీసులను రీసెట్ చేయండి',
    purgeData: 'మొత్తం డేటాను తొలగించండి'
  }
};

// Urdu Translations (RTL)
export const urTranslations = {
  app: {
    name: 'Notice on the Desk',
    tagline: 'ہندوستانی کاروباری مالکان کے لیے قانونی نوٹس اسسٹنٹ',
    headline: 'قانونی نوٹسز۔ اب بالکل واضح اور آسان۔',
    supportingText: 'نوٹس کو سمجھیں۔ اپنا اگلا قدم اٹھائیں۔',
    uploadCta: 'نوٹس اپ لوڈ کریں'
  },
  nav: {
    overview: 'آپ کا جائزہ',
    analyze: 'نوٹس کا تجزیہ کریں',
    notices: 'آپ کے نوٹسز',
    actions: 'ڈیڈ لائن ٹریکر',
    responses: 'جواب کا مسودہ تیار کریں',
    settings: 'ترتیبات'
  },
  common: {
    loading: 'لوڈ ہو رہا ہے...',
    searchPlaceholder: 'اتھارٹی، ایکٹ یا ریفرنس نمبر سے تلاش کریں...',
    filter: 'فلٹر',
    all: 'تمام',
    save: 'محفوظ کریں',
    cancel: 'منسوخ کریں',
    delete: 'حذف کریں',
    view: 'جائزہ لیں',
    back: 'واپس',
    status: 'حیثیت',
    deadline: 'آخری تاریخ',
    category: 'زمرہ',
    authority: 'اتھارٹی',
    reference: 'حوالہ نمبر',
    received: 'موصول ہوا',
    verified: 'تصدیق شدہ حقیقت',
    interpretation: 'AI تشریح',
    disclaimerTitle: 'تصدیق ضروری ہے',
    disclaimerText: 'یہ خلاصہ صرف معلوماتی مدد کے لیے ہے اور قانونی مشورہ نہیں۔ جمع کرانے سے پہلے اپنے سی اے یا وکیل سے مشورہ لیں۔',
    demoModeNotice: 'ڈیمو موڈ: پہلے سے تجزیہ شدہ نوٹس کا ڈیٹا دکھایا جا رہا ہے۔',
    activeNotice: 'فعال نوٹس',
    noDeadlineStated: 'کوئی تاریخ مقرر نہیں',
    dueToday: 'آج آخری دن ہے',
    overdue: 'وقت ختم ہو چکا ہے',
    daysRemaining: 'دن باقی ہیں',
    dayRemaining: '1 دن باقی ہے'
  },
  dashboard: {
    title: 'آپ کا جائزہ',
    subtitle: 'قانونی نوٹسز، آنے والی آخری تاریخوں اور تعمیل کے کاموں کو ٹریک کریں۔',
    kpiTotal: 'کل نوٹسز',
    kpiTotalSub: 'والٹ میں محفوظ',
    kpiAttention: 'توجہ طلب',
    kpiAttentionSub: 'جواب یا کارروائی ضروری',
    kpiUpcoming: 'آنے والی تاریخیں',
    kpiUpcomingSub: '30 دن کے اندر واجب الادا',
    kpiReview: 'زیر غور',
    kpiReviewSub: 'سی اے یا وکیل کے زیر جائزہ',
    timeSensitive: 'اہم آخری تاریخیں',
    timeSensitiveSub: 'اصل دستاویز سے اخذ کردہ قانونی تاریخیں۔',
    recentNotices: 'حالیہ نوٹسز',
    recentNoticesSub: 'تجزیہ شدہ قانونی نوٹسز اور حیثیت۔',
    viewActionPlans: 'ڈیڈ لائن ٹریکر دیکھیں',
    emptyNotices: 'ابھی تک کوئی نوٹس نہیں ہے',
    allCategories: 'تمام زمرہ جات'
  },
  upload: {
    title: 'نوٹس کا تجزیہ کریں',
    subtitle: 'سرکاری یا قانونی نوٹس اپ لوڈ کریں اور آسان زبان میں اس کا مطلب اور اگلے اقدامات جانیں۔',
    dragDrop: 'نوٹس یہاں ڈریگ کریں، یا',
    browseFiles: 'فائلیں منتخب کریں',
    supportedFormats: 'PDF, PNG, JPG یا TIFF (زیادہ سے زیادہ 25 MB)',
    analyzingState: 'نوٹس کا تجزیہ کیا جا رہا ہے',
    extractedState: 'نوٹس کی تفصیلات نکال لی گئیں',
    startAnalysisBtn: 'تجزیہ شروع کریں',
    removeDocument: 'دستاویز ہٹائیں',
    privacyNote: 'محفوظ سینڈ باکس · خفیہ کاروباری ریکارڈ',
    sampleNoticesTitle: 'یا نمونہ ہندوستانی نوٹسز سے آزمائیں',
    sampleNoticesSub: 'جی ایس ٹی، انکم ٹیکس، ای پی ایف او یا لیز نوٹسز کے ساتھ ٹیسٹ کریں۔'
  },
  analysis: {
    title: 'نوٹس کا جائزہ',
    tabSummary: 'اس کا کیا مطلب ہے',
    tabWhyIssued: 'یہ کیوں جاری کیا گیا',
    tabNextSteps: 'آپ کے اگلے اقدامات',
    tabDocuments: 'تیار کی جانے والی دستاویزات',
    tabLegal: 'قانونی دفعات',
    tabUncertain: 'غیر واضح معلومات',
    tabEvidence: 'اصل دستاویز کے اقتباسات',
    explanationLangLabel: 'وضاحت کی زبان',
    inspectOriginalBtn: 'اصل نوٹس دیکھیں',
    draftResponseBtn: 'جواب کا مسودہ بنائیں',
    confidenceScore: 'درستگی کا سکور',
    mandatoryObligations: 'لازمی قانونی فرائض',
    suggestedSteps: 'تجویز کردہ اسٹریٹجک اقدامات',
    statutoryDueDate: 'قانونی واجب الادا تاریخ',
    sourceQuote: 'اصل حوالہ'
  },
  actions: {
    title: 'ڈیڈ لائن ٹریکر',
    subtitle: 'لازمی فرائض اور تیاری کے اقدامات کی منظم چیک لسٹ۔',
    addTask: 'نیا کام شامل کریں',
    overallProgress: 'مجموعی پیش رفت',
    completedOf: 'مکمل شدہ کام',
    mandatorySection: 'لازمی قانونی فرائض',
    suggestedSection: 'تجویز کردہ اقدامات',
    noTasks: 'کوئی کام موجود نہیں ہے۔'
  },
  responses: {
    title: 'جواب کا مسودہ تیار کریں',
    subtitle: 'تصدیق شدہ قانونی حوالوں پر مبنی سرکاری جواب کا مسودہ۔',
    templateLabel: 'جواب کا سانچہ',
    copyText: 'متن کاپی کریں',
    copied: 'کاپی ہو گیا!',
    downloadText: 'ڈاؤن لوڈ (.txt)',
    saveDraft: 'مسودہ محفوظ کریں',
    editorPlaceholder: 'مسودے کا متن...',
    charactersWords: 'حروف · الفاظ',
    instructionsNote: 'ارسال کرنے سے پہلے بریکٹ والے تمام [بڑے حروف] خانے پُر کریں۔'
  },
  settings: {
    title: 'ترتیبات',
    appearanceTitle: 'ظاہری شکل (تھیم)',
    appearanceSub: 'منتخب کریں کہ Notice on the Desk کیسا نظر آئے۔',
    themeLight: 'لائٹ (روشن)',
    themeDark: 'ڈارک (تاریک)',
    themeSystem: 'سسٹم کے مطابق',
    languagePreferences: 'زبان کی ترجیحات',
    interfaceLanguage: 'انٹرفیس کی زبان',
    explanationLanguage: 'نوٹس کی وضاحت کی زبان',
    explanationLanguageSub: 'قانونی نوٹس کے ترجمے اور خلاصے کے لیے استعمال ہونے والی زبان۔',
    autoDetect: 'اصل زبان کا خودکار پتہ لگائیں',
    businessProfile: 'کاروباری پروفائل',
    privacyTitle: 'رازداری اور سلامتی',
    retentionTitle: 'دستاویزات کی برقراری کی پالیسی',
    resetDemo: 'ڈیمو نوٹسز ری سیٹ کریں',
    purgeData: 'تمام ڈیٹا مٹائیں'
  }
};

// Setup resources dictionary with fallbacks for all 23 languages
const resources: Record<string, { translation: typeof enTranslations }> = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations as any },
  kn: { translation: knTranslations as any },
  ta: { translation: taTranslations as any },
  te: { translation: teTranslations as any },
  ur: { translation: urTranslations as any },
  // For other 8th schedule languages, fallback gracefully to Hindi or English with their native names
  mr: { translation: hiTranslations as any },
  bn: { translation: enTranslations },
  gu: { translation: enTranslations },
  pa: { translation: enTranslations },
  ml: { translation: enTranslations },
  or: { translation: enTranslations },
  as: { translation: enTranslations },
  kok: { translation: hiTranslations as any },
  ne: { translation: hiTranslations as any },
  sa: { translation: hiTranslations as any },
  ks: { translation: urTranslations as any },
  mni: { translation: enTranslations },
  brx: { translation: hiTranslations as any },
  doi: { translation: hiTranslations as any },
  mai: { translation: hiTranslations as any },
  sat: { translation: enTranslations },
  sd: { translation: urTranslations as any }
};

const savedLang = localStorage.getItem('notice_desk_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export function changeAppLanguage(langCode: string) {
  i18n.changeLanguage(langCode);
  localStorage.setItem('notice_desk_language', langCode);

  const langConfig = getLanguage(langCode);
  document.documentElement.lang = langCode;
  document.documentElement.dir = langConfig.direction;

  if (langConfig.direction === 'rtl') {
    document.documentElement.classList.add('rtl-layout');
  } else {
    document.documentElement.classList.remove('rtl-layout');
  }
}

// Initialize html dir & lang on boot
if (typeof document !== 'undefined') {
  const currentConfig = getLanguage(savedLang);
  document.documentElement.lang = savedLang;
  document.documentElement.dir = currentConfig.direction;
  if (currentConfig.direction === 'rtl') {
    document.documentElement.classList.add('rtl-layout');
  }
}

export default i18n;
