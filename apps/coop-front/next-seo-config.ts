const URL = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3001";

const SEO = {
  title: "Drawee",
  defaultTitle: "Drawee",
  description: "다함께 그림을 그리면서 즐기는 게임!",
  titleTemplate: "Drawee - %s",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon-32x32.png",
      sizes: "32x32",
    },
  ],
  languageAlternates: [
    {
      hrefLang: "ko",
      href: `${URL}`,
    },
    {
      hrefLang: "en",
      href: `${URL}/en`,
    },
  ],
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#721480",
    },
  ],
  openGraph: {
    type: "website",
    locale: "ko",
    url: URL,
    images: [
      {
        url: "/images/logo.png",
        width: 397,
        height: 156,
        alt: "Drawee로고",
      },
    ],
    siteName: "Drawee",
  },
};
export default SEO;
