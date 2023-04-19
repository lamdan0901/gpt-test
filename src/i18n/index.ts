import { AppConfig } from '@utils/AppConfig';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: AppConfig.locale,
      debug: true,
      resources: {
        en,
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
}

export default i18n;
