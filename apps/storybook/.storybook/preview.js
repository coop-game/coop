import "../../coop-front/styles/globals.css";
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context";

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const decorators = [
  // ... other decorators
  (Story, Context) => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',

      // have a common namespace used around the full app
      ns: ['translations'],
      defaultNS: 'translations',

      // debug: true,

      interpolation: {
        escapeValue: false, // not needed for react!!
      },

      // TODO: load actual translations from the *.json files
      resources: { en: { translations: {} } },
    })

    return <Story />
  },
]

NextImage.defaultProps = {
  unoptimized: true,
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    locale: "en" // optional
  },
};
