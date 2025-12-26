import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

// RTL languages
const rtlLanguages = ['ar', 'tn'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update document lang attribute and direction when language changes
const updateDocumentLang = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
};

// Set initial language
updateDocumentLang(i18n.language);

// Listen for language changes
i18n.on('languageChanged', updateDocumentLang);

export default i18n;
