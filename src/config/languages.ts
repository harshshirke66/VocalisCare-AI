export const LANGUAGES = {
  en: { name: 'English', code: 'en-US' },
  hi: { name: 'हिंदी', code: 'hi-IN' },
  mr: { name: 'मराठी', code: 'mr-IN' },
  es: { name: 'Español', code: 'es-ES' },
  fr: { name: 'Français', code: 'fr-FR' },
  de: { name: 'Deutsch', code: 'de-DE' },
  ja: { name: '日本語', code: 'ja-JP' },
  ko: { name: '한국어', code: 'ko-KR' },
  zh: { name: '中文', code: 'zh-CN' },
  ar: { name: 'العربية', code: 'ar-SA' },
  ru: { name: 'Русский', code: 'ru-RU' },
  pt: { name: 'Português', code: 'pt-BR' },
  it: { name: 'Italiano', code: 'it-IT' }
} as const;

export const UI_TRANSLATIONS = {
  en: {
    startJourney: 'Start Your Journey',
    features: 'Features',
    howItWorks: 'How it Works',
    impact: 'Impact',
    typeQuestion: 'Type your health question...',
    welcome: 'Hello! I\'m your personal healthcare assistant. How can I help you today?',
    error: 'I apologize, but I encountered an error. Please try again.',
    locationError: 'Could not access your location. Please enable location services.',
    locationNotSupported: 'Location services are not supported in your browser.',
    listening: 'Listening...',
    speaking: 'Speaking...',
    findHospitals: 'Find Nearby Hospitals',
    emergencySupport: 'Emergency Support',
    healthEducation: 'Health Education',
    dailyTips: 'Daily Health Tips',
    reminders: 'Set Reminders',
    privacyInfo: 'Your data is secure'
  },
  // Add translations for other languages...
} as const;