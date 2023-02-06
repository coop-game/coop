// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import { css } from "@emotion/react";
import theme from "@theme/theme";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="images/icons/icon-192x192.png"
        ></link>
        <meta name="msapplication-TileColor" content="#721480b2"></meta>
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
      <div id="root-modal" />
    </Html>
  );
}
