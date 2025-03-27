import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationAR from './locales/ar/translation.json';
import translationRU from './locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      // fr: { translation: translationFR },
      // ar: { translation: translationAR },
      // ru: { translation: translationRU },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;  // Ensure this is exported properly
