const URL = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3001";
const SEO = {
  title: "Drawee",
  defaultTitle: "Drawee",
  description: "다함께 그림을 그리면서 즐기는 게임!",
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
        url: "/icon-184x184.png",
        width: 285,
        height: 167,
        alt: "Drawee로고",
      },
    ],
    siteName: "Drawee",
  },
};
export default SEO;