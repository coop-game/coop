import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@theme/theme";
import { RecoilRoot } from "recoil";
import router, { useRouter } from "next/router";
import Transition from "@components/Animation/PageTransition/Transition";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        {router.pathname === "/welcome" ? (
          <Component {...pageProps} />
        ) : (
          <Transition location={router.pathname}>
            <Component {...pageProps} />
          </Transition>
        )}
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
