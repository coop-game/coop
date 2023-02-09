import "../../coop-front/styles/globals.css";
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context";

import i18n from "./i18next.js";
import { RecoilRoot } from "recoil";

const theme = require("../../../apps/coop-front/src/theme/theme.ts");
export const decorators = [
  (Story, Context) => {
    return (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    );
  },
];

NextImage.defaultProps = {
  unoptimized: true,
};

export const parameters = {
  chakra: {
    theme,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: "en",
  locales: {
    en: "English",
    ko: "한국어",
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    // locale: "en", // optional
  },
};
