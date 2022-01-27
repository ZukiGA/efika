import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { NativeModules, Platform } from "react-native";

import translationEn from "./resources/english.json";
import translationEs from "./resources/spanish.json";

const resources = {
  en: {
    translation: translationEn
  },
  es: {
    translation: translationEs
  }
};

const locale = Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale
  : NativeModules.I18nManager.localeIdentifier;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: locale.substring(0,2),
    fallbackLng: "en",
	  compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;