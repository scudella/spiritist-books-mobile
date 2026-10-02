import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';

// English (en)
import enAddBook from '../assets/locales/en/addBook.json';
import enAdmin from '../assets/locales/en/admin.json';
import enBook from '../assets/locales/en/book.json';
import enDashboard from '../assets/locales/en/dashboard.json';
import enError from '../assets/locales/en/error.json';
import enLanding from '../assets/locales/en/landing.json';
import enLogin from '../assets/locales/en/login.json';
import enProfile from '../assets/locales/en/profile.json';
import enRegister from '../assets/locales/en/register.json';
import enTranslation from '../assets/locales/en/translation.json';
import enVerify from '../assets/locales/en/verify.json';

// Portuguese (pt-BR)
import ptBRAddBook from '../assets/locales/pt-BR/addBook.json';
import ptBRAdmin from '../assets/locales/pt-BR/admin.json';
import ptBRBook from '../assets/locales/pt-BR/book.json';
import ptBRDashboard from '../assets/locales/pt-BR/dashboard.json';
import ptBRError from '../assets/locales/pt-BR/error.json';
import ptBRLanding from '../assets/locales/pt-BR/landing.json';
import ptBRLogin from '../assets/locales/pt-BR/login.json';
import ptBRProfile from '../assets/locales/pt-BR/profile.json';
import ptBRRegister from '../assets/locales/pt-BR/register.json';
import ptBRTranslation from '../assets/locales/pt-BR/translation.json';
import ptBRVerify from '../assets/locales/pt-BR/verify.json';

export const resources = {
  en: {
    addBook: enAddBook,
    admin: enAdmin,
    book: enBook,
    dashboard: enDashboard,
    error: enError,
    landing: enLanding,
    login: enLogin,
    profile: enProfile,
    register: enRegister,
    translation: enTranslation,
    verify: enVerify,
  },
  'pt-BR': {
    addBook: ptBRAddBook,
    admin: ptBRAdmin,
    book: ptBRBook,
    dashboard: ptBRDashboard,
    error: ptBRError,
    landing: ptBRLanding,
    login: ptBRLogin,
    profile: ptBRProfile,
    register: ptBRRegister,
    translation: ptBRTranslation,
    verify: ptBRVerify,
  },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'pt-BR';

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: deviceLanguage,
  fallbackLng: {
    'en-US': ['en'],
    'en-GB': ['en'],
    pt: ['pt-BR'],
    default: ['pt-BR'],
  },
  ns: [
    'translation',
    'login',
    'addBook',
    'admin',
    'book',
    'dashboard',
    'error',
    'landing',
    'profile',
    'register',
    'verify',
  ],
  defaultNS: 'translation', // Default namespace if none is specified
  compatibilityJSON: 'v4', // Required for React Native compatibility
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
