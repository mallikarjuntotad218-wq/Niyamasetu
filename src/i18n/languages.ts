export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  direction: 'ltr' | 'rtl';
  scheduleEighth: boolean;
  fontFamily?: string;
  coverage: 'full' | 'standard' | 'beta';
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    direction: 'ltr',
    scheduleEighth: false,
    coverage: 'full'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'full'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Kannada', sans-serif",
    coverage: 'full'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Tamil', sans-serif",
    coverage: 'full'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Telugu', sans-serif",
    coverage: 'full'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Malayalam', sans-serif",
    coverage: 'full'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'full'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Bengali', sans-serif",
    coverage: 'full'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Gujarati', sans-serif",
    coverage: 'full'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Gurmukhi', sans-serif",
    coverage: 'full'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Oriya', sans-serif",
    coverage: 'full'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    script: 'Arabic (Nastaliq)',
    direction: 'rtl',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Arabic', sans-serif",
    coverage: 'full'
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali-Assamese',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Bengali', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'kok',
    name: 'Konkani',
    nativeName: 'कोंकणी',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'كٲشُر',
    script: 'Perso-Arabic',
    direction: 'rtl',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Arabic', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'mni',
    name: 'Manipuri (Meitei)',
    nativeName: 'মৈতৈলোন্',
    script: 'Bengali / Meitei Mayek',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Bengali', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'brx',
    name: 'Bodo',
    nativeName: 'बड़ो',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
    script: 'Devanagari',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    coverage: 'standard'
  },
  {
    code: 'sat',
    name: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    direction: 'ltr',
    scheduleEighth: true,
    fontFamily: "system-ui, sans-serif",
    coverage: 'standard'
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي',
    script: 'Perso-Arabic',
    direction: 'rtl',
    scheduleEighth: true,
    fontFamily: "'Noto Sans Arabic', sans-serif",
    coverage: 'standard'
  }
];

export function getLanguage(code: string): LanguageConfig {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
}
