/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || "https://drawee.art",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  alternateRefs: [
    {
      href: "https://drawee.art",
      hreflang: "ko",
    },
    {
      href: "https://drawee.art/en/",
      hreflang: "en",
    },
  ],
};
