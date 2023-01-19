/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: ``,
  },
  experimental: {
    transpilePackages: [
      "./../../packages/coop-core",
      "./../../packages/coop-draw",
    ],
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["korean"] } },
    ],
  },
  i18n: {
    //지원하고 싶은 로케일을 적으면 된다.
    locales: ["ko", "en"],
    defaultLocale: "ko",
    localeDetection: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({ nextConfig });

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = withBundleAnalyzer(withPWA(nextConfig));

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    // [withPWA],
    // your other plugins here
  ],
  nextConfig
);
