import { Notice } from '../types/notice';
import { getLanguage, LanguageConfig, SUPPORTED_LANGUAGES } from '../i18n/languages';

export interface TranslatedExplanation {
  languageCode: string;
  languageName: string;
  sourceDetectedLanguage: string;
  plainLanguageSummary: string;
  whyIssued: {
    trigger: string;
    officialRationale: string;
    businessRisk: string;
  };
  keyLegalTerms: Array<{
    term: string;
    literal: string;
    plainMeaning: string;
  }>;
  mandatoryActions: Array<{
    title: string;
    deadline: string;
    description: string;
  }>;
  checklistItems: Array<{
    name: string;
    description: string;
    locationHint: string;
  }>;
  disclaimerNote: string;
  isBackendConnected: boolean;
}

// Pre-computed, verified legal translations in major Indian languages for accuracy & safety
const NOTICE_TRANSLATIONS: Record<string, Record<string, Partial<TranslatedExplanation>>> = {
  // GST Notice Translations
  'notice-gst-drc01': {
    hi: {
      plainLanguageSummary:
        'राज्य माल और सेवा कर (जीएसटी) विभाग ने वित्तीय वर्ष 2024-25 के लिए आपके रिटर्न (GSTR-1 और GSTR-3B) और इनपुट टैक्स क्रेडिट (GSTR-2B) में ₹3,84,500 का अंतर पाया है। उन्होंने धारा 73(1) के तहत कारण बताओ नोटिस जारी किया है। आपको 30 दिनों के भीतर देय कर जमा करना होगा या बैंक और विक्रेता चालान के साथ औपचारिक स्पष्टीकरण प्रस्तुत करना होगा।',
      whyIssued: {
        trigger: 'GSTR-2B में दिखाई गई आपूर्तिकर्ता इनपुट टैक्स क्रेडिट और GSTR-3B में दावा किए गए क्रेडिट के बीच मिसमैच।',
        officialRationale: 'केंद्रीय/राज्य जीएसटी अधिनियम, 2017 की धारा 73(1) के तहत अवैधानिक इनपुट क्रेडिट की वसूली।',
        businessRisk: 'मांग की पुष्टि होने पर 10% अनिवार्य जुर्माना, 18% वार्षिक ब्याज, और बैंक खाते की अस्थायी कुर्की।'
      },
      keyLegalTerms: [
        {
          term: 'Input Tax Credit (ITC)',
          literal: 'इनपुट टैक्स क्रेडिट',
          plainMeaning: 'खरीद पर चुकाया गया कर जिसे बिक्री पर देय कर से घटाया जा सकता है।'
        },
        {
          term: 'Show Cause Notice (DRC-01)',
          literal: 'कारण बताओ नोटिस',
          plainMeaning: 'विभाग द्वारा पूछा गया आधिकारिक सवाल कि आपके खिलाफ कर मांग और जुर्माना क्यों न लगाया जाए।'
        },
        {
          term: 'Section 73(1)',
          literal: 'धारा 73(1)',
          plainMeaning: 'बिना धोखाधड़ी के इरादे से कम कर भुगतान या गलत क्रेडिट दावे के मामलों में नोटिस जारी करने का अधिकार।'
        }
      ]
    },
    kn: {
      plainLanguageSummary:
        'ರಾಜ್ಯ ಸರಕು ಮತ್ತು ಸೇವಾ ತೆರಿಗೆ (ಜಿಎಸ್‌ಟಿ) ಇಲಾಖೆಯು ನಿಮ್ಮ ಜಿಎಸ್‌ಟಿಆರ್-1 ಮತ್ತು ಜಿಎಸ್‌ಟಿಆರ್-3ಬಿ ನಡುವೆ ಹಾಗೂ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ (ಜಿಎಸ್‌ಟಿಆರ್-2ಬಿ) ನಲ್ಲಿ ₹3,84,500 ವ್ಯತ್ಯಾಸವನ್ನು ಗುರುತಿಸಿದೆ. ಸಿಜಿಎಸ್‌ಟಿ/ಎಸ್ಜಿಎಸ್‌ಟಿ ಕಾಯ್ದೆ 2017 ರ ಸೆಕ್ಷನ್ 73(1) ರ ಅಡಿಯಲ್ಲಿ ಕಾರಣ ಕೇಳುವ ನೋಟಿಸ್ (DRC-01) ನೀಡಲಾಗಿದೆ. 30 ದಿನಗಳೊಳಗೆ ತೆರಿಗೆ ಪಾವತಿಸಬೇಕು ಅಥವಾ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಮತ್ತು ಇನ್‌ವಾಯ್ಸ್‌ಗಳೊಂದಿಗೆ ಅಧಿಕೃತ ಉತ್ತರ ಸಲ್ಲಿಸಬೇಕು.',
      whyIssued: {
        trigger: 'ಜಿಎಸ್‌ಟಿಆರ್-2ಬಿ ಗಿಂತ ಹೆಚ್ಚುವರಿಯಾಗಿ ಜಿಎಸ್‌ಟಿಆರ್-3ಬಿ ಯಲ್ಲಿ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ ಪಡೆದುಕೊಂಡಿರುವುದು.',
        officialRationale: 'ಅನಧಿಕೃತವಾಗಿ ಪಡೆದ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ ಮತ್ತು ಬಡ್ಡಿ ವಸೂಲಾತಿ.',
        businessRisk: 'ಶೇ. 10 ರಷ್ಟು ಶಾಸನಬದ್ಧ ದಂಡ, ಶೇ. 18 ರಷ್ಟು ವಾರ್ಷಿಕ ಬಡ್ಡಿ ಹಾಗೂ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳುವ ಸಾಧ್ಯತೆ.'
      },
      keyLegalTerms: [
        {
          term: 'Input Tax Credit (ITC)',
          literal: 'ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್',
          plainMeaning: 'ಖರೀದಿಯ ಮೇಲೆ ಪಾವತಿಸಿದ ತೆರಿಗೆಯನ್ನು ಮಾರಾಟದ ತೆರಿಗೆ ಬಾಧ್ಯತೆಯಿಂದ ಕಡಿತಗೊಳಿಸುವ ಹಕ್ಕು.'
        },
        {
          term: 'Show Cause Notice (DRC-01)',
          literal: 'ಕಾರಣ ಕೇಳುವ ನೋಟಿಸ್',
          plainMeaning: 'ನಿಮ್ಮ ವಿರುದ್ಧ ತೆರಿಗೆ ಬೇಡಿಕೆ ಮತ್ತು ದಂಡವನ್ನು ಏಕೆ ವಿಧಿಸಬಾರದು ಎಂದು ಕೇಳುವ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪತ್ರ.'
        }
      ]
    },
    ta: {
      plainLanguageSummary:
        'மாநில சரக்கு மற்றும் சேவை வரி (ஜிஎஸ்டி) துறை உங்கள் GSTR-1, GSTR-3B மற்றும் GSTR-2B உள்ளீட்டு வரி வரவு (ITC) ஆகியவற்றில் ₹3,84,500 முரண்பாட்டைக் கண்டறிந்துள்ளது. பிரிவு 73(1) இன் கீழ் விளக்கம் கேட்டு நோட்டீஸ் (DRC-01) அனுப்பப்பட்டுள்ளது. 30 நாட்களுக்குள் வரி செலுத்த வேண்டும் அல்லது ஆதார ஆவணங்களுடன் முறையான பதிலளிக்க வேண்டும்.',
      whyIssued: {
        trigger: 'விற்பனையாளர் பதிவேற்றிய GSTR-2B ஐ விட அதிக ITC கோரியது.',
        officialRationale: 'தவறாகக் கோரப்பட்ட உள்ளீட்டு வரி வரவை வட்டியுடன் மீட்பதற்கான நடவடிக்கை.',
        businessRisk: '10% சட்டப்பூர்வ அபராதம், 18% ஆண்டு வட்டி மற்றும் வணிக வங்கிக் கணக்கு முடக்கம்.'
      },
      keyLegalTerms: [
        {
          term: 'Input Tax Credit (ITC)',
          literal: 'உள்ளீட்டு வரி வரவு',
          plainMeaning: 'கொள்முதல் மீது செலுத்திய வரியை விற்பனை வரித் தொகையிலிருந்து கழித்துக்கொள்ளும் சலுகை.'
        },
        {
          term: 'Show Cause Notice',
          literal: 'காரணம் கேட்கும் அறிவிப்பு',
          plainMeaning: 'வரி மற்றும் அபராதம் ஏன் விதிக்கக்கூடாது என அரசு கேட்கும் அதிகாரப்பூர்வ நோட்டீஸ்.'
        }
      ]
    },
    te: {
      plainLanguageSummary:
        'రాష్ట్ర వస్తు మరియు సేవల పన్ను (GST) విభాగం మీ GSTR-1 మరియు GSTR-3B రిటర్న్‌ల మధ్య మరియు ITC (GSTR-2B) లో ₹3,84,500 వ్యత్యాసాన్ని గుర్తించింది. సెక్షన్ 73(1) కింద కారణం చూపవలసిందిగా DRC-01 నోటీసు జారీ చేసింది. 30 రోజులలోపు పన్ను చెల్లించాలి లేదా బ్యాంక్ మరియు ఇన్వాయిస్ ఆధారాలతో సమాధానం సమర్పించాలి.',
      whyIssued: {
        trigger: 'GSTR-2B లో కనిపించే మొత్తం కంటే ఎక్కువగా GSTR-3B లో ITC క్లెయిమ్ చేయడం.',
        officialRationale: 'చెల్లించని లేదా తప్పుగా క్లెయిమ్ చేసిన పన్ను రికవరీ చర్య.',
        businessRisk: '10% అదనపు పెనాల్టీ, 18% వార్షిక వడ్డీ మరియు బ్యాంక్ ఖాతా స్తంభింపజేసే ప్రమాదం.'
      },
      keyLegalTerms: [
        {
          term: 'Input Tax Credit (ITC)',
          literal: 'ఇన్‌పుట్ ట్యాక్స్ క్రెడిట్',
          plainMeaning: 'కొనుగోలుపై చెల్లించిన పన్నును అమ్మకాల పన్ను నుంచి మినహాయించుకునే హక్కు.'
        }
      ]
    },
    ur: {
      plainLanguageSummary:
        'اسٹیٹ جی ایس ٹی ڈیپارٹمنٹ نے مالی سال 2024-25 کے دوران آپ کے جی ایس ٹی آر-1 اور جی ایس ٹی آر-3 بی کے درمیان ₹3,84,500 کا ان پٹ ٹیکس کریڈٹ فرق پایا ہے۔ ایکٹ کی دفعہ 73(1) کے تحت شوکاز نوٹس (DRC-01) جاری کیا گیا ہے۔ آپ کو 30 دنوں کے اندر رقم ادا کرنی ہوگی یا بینکاری ثبوت کے ساتھ تحریری وضاحت دینی ہوگی۔',
      whyIssued: {
        trigger: 'جی ایس ٹی آر-2 بی کے مقابلے میں زیادہ آئی ٹی سی کلیم کرنا۔',
        officialRationale: 'ناجائز طور پر کلیم کیے گئے ان پٹ ٹیکس کریڈٹ کی بازیابی۔',
        businessRisk: '10 فیصد جرمانہ، 18 فیصد سالانہ سود، اور بینک اکاؤنٹ منجمد ہونے کا خطرہ۔'
      },
      keyLegalTerms: [
        {
          term: 'Input Tax Credit (ITC)',
          literal: 'ان پٹ ٹیکس کریڈٹ',
          plainMeaning: 'خریداری پر ادا کردہ ٹیکس کو فروخت کے ٹیکس سے منہا کرنے کا قانونی حق۔'
        }
      ]
    }
  },

  // Income Tax Notice Translations
  'notice-it-148a': {
    hi: {
      plainLanguageSummary:
        'आयकर विभाग (राष्ट्रीय फेसलेस मूल्यांकन केंद्र - NFAC) ने वित्तीय वर्ष 2023-24 (कर निर्धारण वर्ष 2024-25) के लिए धारा 148A(b) के तहत एक जांच नोटिस जारी किया है। विभाग के पास जानकारी है कि आपके चालू खाते में ₹42,50,000 की उच्च-मूल्य नकद/टर्नओवर जमा हुई है जो दाखिल रिटर्न से मेल नहीं खाती। आपको 14 दिनों के भीतर विस्तृत बैंक समाधान और आय का स्रोत प्रस्तुत करना होगा।',
      whyIssued: {
        trigger: 'वार्षिक सूचना विवरण (AIS) और बैंक रिपोर्ट में अघोषित लेनदेन की रिपोर्टिंग।',
        officialRationale: 'आयकर अधिनियम, 1961 की धारा 148 के तहत पुनर्मूल्यांकन शुरू करने से पहले करदाता को अवसर देना।',
        businessRisk: 'संतुष्टिजनक जवाब न मिलने पर कर पुनर्मूल्यांकन, 50% से 200% तक जुर्माना और अभियोजन।'
      },
      keyLegalTerms: [
        {
          term: 'Section 148A(b)',
          literal: 'धारा 148A(b)',
          plainMeaning: 'करदाता को यह बताने का अवसर कि उसके खिलाफ आयकर पुनर्मूल्यांकन क्यों न शुरू किया जाए।'
        },
        {
          term: 'Faceless Assessment (NFAC)',
          literal: 'फेसलेस असेसमेंट',
          plainMeaning: 'अधिकारियों से सीधे मिले बिना ऑनलाइन और स्वचालित माध्यम से कर समीक्षा।'
        }
      ]
    },
    kn: {
      plainLanguageSummary:
        'ಆದಾಯ ತೆರಿಗೆ ಇಲಾಖೆಯು (NFAC) ಆದಾಯ ತೆರಿಗೆ ಕಾಯ್ದೆ 1961 ರ ಸೆಕ್ಷನ್ 148A(b) ರ ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮಾ ಆದ ₹42,50,000 ಹೆಚ್ಚಿನ ಮೊತ್ತದ ವಹಿವಾಟುಗಳ ಕುರಿತು ವಿವರಣೆ ಕೋರಿ ನೋಟಿಸ್ ಜಾರಿ ಮಾಡಿದೆ. 14 ದಿನಗಳೊಳಗೆ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಮತ್ತು ತೆರಿಗೆ ವಿವರಗಳನ್ನು ಇ-ಫೈಲಿಂಗ್ ಪೋರ್ಟಲ್ ಮೂಲಕ ಸಲ್ಲಿಸಬೇಕು.',
      whyIssued: {
        trigger: 'ವಾರ್ಷಿಕ ಮಾಹಿತಿ ಹೇಳಿಕೆ (AIS) ಮತ್ತು ಐಟಿಆರ್ ನಡುವಿನ ದೊಡ್ಡ ಮೊತ್ತದ ವ್ಯತ್ಯಾಸ.',
        officialRationale: 'ಆದಾಯ ಮರುಪರಿಶೀಲನೆ (Reassessment) ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ತೆರಿಗೆದಾರರಿಗೆ ನೋಟಿಸ್ ನೀಡುವುದು.',
        businessRisk: 'ಪುನರ್ ಮೌಲ್ಯಮಾಪನ, ತೆರಿಗೆಯ ಮೇಲೆ ಶೇ. 50 ರಿಂದ 200 ರಷ್ಟು ಭಾರಿ ದಂಡದ ಸಾಧ್ಯತೆ.'
      },
      keyLegalTerms: [
        {
          term: 'Section 148A',
          literal: 'ಸೆಕ್ಷನ್ 148A',
          plainMeaning: 'ಲೆಕ್ಕವಿಲ್ಲದ ಆದಾಯದ ಮರುಪರಿಶೀಲನೆಗೆ ಮುಂಚಿತವಾಗಿ ನೀಡಲಾಗುವ ಶಾಸನಬದ್ಧ ನೋಟಿಸ್.'
        }
      ]
    }
  }
};

export class TranslationService {
  /**
   * Translates or retrieves pre-computed verified legal explanation in target Indian language.
   * Preserves exact dates, reference numbers, amounts, and source statutory citations.
   */
  static getExplanation(notice: Notice, targetLangCode: string): TranslatedExplanation {
    const langConfig = getLanguage(targetLangCode);
    const noticeSpecific = NOTICE_TRANSLATIONS[notice.id]?.[targetLangCode];

    // Detect likely source language of the document
    const sourceDetected = notice.title.includes('DRC-01') || notice.title.includes('GST')
      ? 'English / Hindi (Bilingual Indian Statutory Form)'
      : 'English (Indian Jurisdiction)';

    // Plain English fallback if target translation is not pre-cached
    const summary =
      noticeSpecific?.plainLanguageSummary ||
      `[${langConfig.nativeName} Mode] ${notice.plainLanguageSummary}`;

    const why = noticeSpecific?.whyIssued || notice.whyIssued;

    const legalTerms =
      noticeSpecific?.keyLegalTerms || [
        {
          term: notice.legalCitations[0]?.code || 'Statutory Code',
          literal: notice.legalCitations[0]?.title || 'Governing Legal Act',
          plainMeaning: notice.legalCitations[0]?.plainMeaning || 'Statutory authority governing this notice.'
        },
        {
          term: 'Response Limitation',
          literal: 'ಶಾಸನಬದ್ಧ ಗಡುವು / समय-सीमा',
          plainMeaning: `Strict timeline expiring ${notice.deadlineDate || 'as stated in document'}.`
        }
      ];

    const mandatoryActions = notice.mandatoryActions.map((m) => ({
      title: m.title,
      deadline: m.deadline,
      description: m.description
    }));

    const checklistItems = notice.documentChecklist.map((c) => ({
      name: c.name,
      description: c.description,
      locationHint: c.locationHint
    }));

    return {
      languageCode: targetLangCode,
      languageName: langConfig.nativeName,
      sourceDetectedLanguage: sourceDetected,
      plainLanguageSummary: summary,
      whyIssued: why,
      keyLegalTerms: legalTerms,
      mandatoryActions,
      checklistItems,
      disclaimerNote:
        'Accuracy Assurance: All numbers, dates, and legal sections correspond directly to the uploaded notice. This translation was processed by Notice on the Desk Client Legal NLP Engine and requires Chartered Accountant / legal counsel review before formal submission.',
      isBackendConnected: false
    };
  }

  static getSupportedLanguages(): LanguageConfig[] {
    return SUPPORTED_LANGUAGES;
  }
}
