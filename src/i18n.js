import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
// Add other languages as needed, like:
// import es from './locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    // es: { translation: es },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
