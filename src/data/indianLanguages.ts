export interface IndianLanguage {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  region: string;
}

export const INDIAN_LANGUAGES: IndianLanguage[] = [
  {
    code: 'en-IN',
    name: 'English (India)',
    nativeName: 'English',
    script: 'Latin',
    region: 'Official / Legal & Central Administration'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    region: 'North & Central India'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    region: 'West Bengal, Tripura, Assam'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    region: 'Andhra Pradesh, Telangana'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    region: 'Maharashtra, Goa'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    region: 'Tamil Nadu, Puducherry'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اُردُو',
    script: 'Perso-Arabic',
    region: 'Jammu & Kashmir, Telangana, UP, Bihar'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    region: 'Gujarat, DNH & DD'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    region: 'Karnataka'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    region: 'Kerala, Lakshadweep'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    region: 'Odisha'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    region: 'Punjab, Delhi, Haryana'
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali-Assamese',
    region: 'Assam'
  },
  {
    code: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
    script: 'Devanagari',
    region: 'Bihar, Jharkhand'
  },
  {
    code: 'sat',
    name: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    region: 'Jharkhand, Odisha, West Bengal'
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'کٲشُر / कॉशुर',
    script: 'Perso-Arabic / Devanagari',
    region: 'Jammu & Kashmir'
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    script: 'Devanagari',
    region: 'Sikkim, West Bengal'
  },
  {
    code: 'kok',
    name: 'Konkani',
    nativeName: 'कोंकणी',
    script: 'Devanagari',
    region: 'Goa, Karnataka, Maharashtra'
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي / सिन्धी',
    script: 'Perso-Arabic / Devanagari',
    region: 'Gujarat, Maharashtra, Rajasthan'
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    script: 'Devanagari',
    region: 'Jammu & Kashmir, Himachal Pradesh'
  },
  {
    code: 'mni',
    name: 'Manipuri (Meitei)',
    nativeName: 'মৈতৈলোন্',
    script: 'Meetei Mayek / Bengali',
    region: 'Manipur'
  },
  {
    code: 'brx',
    name: 'Bodo',
    nativeName: 'बड़ो',
    script: 'Devanagari',
    region: 'Assam, Bodoland'
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    region: 'Pan-Indian Classical & Legal Tradition'
  }
];

export const DEFAULT_LANGUAGE_CODE = 'en-IN';
