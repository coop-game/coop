/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
});
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
    // fontLoaders: [
    //   { loader: "@next/font/google", options: { subsets: ["korean"] } },
    // ],
  },
  i18n,
  // trailingSlash: true,
  // reactStrictMode: false,
  swcMinify: true,
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({ nextConfig });

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer(withPWA(nextConfig));

module.exports = withPWA({ nextConfig });
