import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@theme/theme";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import Transition from "@components/Animation/PageTransition/Transition";
import koMsg from "./../src/translations/main.json";
import enMsg from "./../src/translations/en.json";
import { IntlProvider } from "react-intl";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const messages = { en: enMsg, "en-US": enMsg, ko: koMsg }[router.locale];
  return (
    <ChakraProvider theme={theme}>
      <IntlProvider locale={router.locale} messages={messages}>
        <RecoilRoot>
          {router.pathname === "/welcome" ? (
            <Component {...pageProps} />
          ) : (
            <Transition location={router.pathname}>
              <Component {...pageProps} />
            </Transition>
          )}
        </RecoilRoot>
      </IntlProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
