import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@theme/theme";
import { RecoilRoot } from "recoil";
import router, { useRouter } from "next/router";
import Transition from "@components/Animation/PageTransition/Transition";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo-config";
import { css } from "@emotion/react";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const getSetOfUnusedAnimationPath = () => {
    return new Set(["/"]);
  };

  const setOfUnusedAnimationPath = getSetOfUnusedAnimationPath();
  return (
    <>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <RecoilRoot>
          {setOfUnusedAnimationPath.has(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Transition location={router.pathname}>
              <Component {...pageProps} />
            </Transition>
          )}
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(App);
