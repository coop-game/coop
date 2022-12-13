import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@theme/theme";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}
