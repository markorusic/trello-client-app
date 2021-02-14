import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../langs/en.json'

export const initI18n = () =>
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
