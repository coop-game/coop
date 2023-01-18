import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@theme/theme";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import Transition from "@components/Animation/PageTransition/Transition";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);
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
