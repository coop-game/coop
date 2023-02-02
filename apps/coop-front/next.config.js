/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  disable: process.env.NODE_ENV === "development" ? true : false,
  dest: "public",
  mode: "production",
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
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["korean"] } },
    ],
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


module.exports = withPWA({ 
  nextConfig,
   webpack(config, options) {
  config.module.rules.push({
    test: /\.(mp3)$/,
    type: "asset/resource",
    generator: {
      filename: "static/chunks/[path][name].[hash][ext]",
    },
  });

  return config;
}, });
