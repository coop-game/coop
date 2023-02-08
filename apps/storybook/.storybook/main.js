const path = require("path");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next-router",
  ],
  staticDirs: ["../../coop-front/public"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },

  // webpackFinal: async (config) => {
  //   [].push.apply(config.resolve.plugins, [
  //     new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
  //   ]);

  //   return config;
  // },

  webpackFinal: async (config) => {



    // config.resolve.alias["next/router"] = require.resolve(
    //   "../__mocks__/next/router.js"
    // );
    // config.resolve.alias["next/link"] = require.resolve(
    //   "../__mocks__/next/link.js"
    // );
    // config.resolve.alias["next/image"] = require.resolve(
    //   "../__mocks__/next/image.js"
    // );

    config.resolve.alias["/images/pencil/cursor.png"] = path.resolve(
      __dirname,
      "../../coop-front/public/images/pencil/cursor.png"
    );
    config.resolve.alias["@common"] = path.resolve(
      __dirname,
      "../../coop-front/src/common/"
    );

    config.resolve.alias["@asset"] = path.resolve(
      __dirname,
      "../../coop-front/src/asset/"
    );

    config.resolve.alias["@assets"] = path.resolve(
      __dirname,
      "../../coop-front/src/assets/"
    );

    config.resolve.alias["@components"] = path.resolve(
      __dirname,
      "../../coop-front/src/components"
    );

    config.resolve.alias["@theme"] = path.resolve(
      __dirname,
      "../../coop-front/src/theme"
    );

    config.resolve.alias["@styles"] = path.resolve(
      __dirname,
      "../../coop-front/styles"
    );

    config.resolve.alias["@pages"] = path.resolve(
      __dirname,
      "../../coop-front/pages"
    );

    config.resolve.alias["@types"] = path.resolve(
      __dirname,
      "../../coop-front/types/index"
    );

    config.resolve.alias["@types"] = path.resolve(
      __dirname,
      "../../coop-front/types/index"
    );

    config.resolve.alias["@coop/draw"] = path.resolve(
      __dirname,
      "../../../packages/coop-draw"
    );

    config.resolve.alias["@translations"] = path.resolve(
      __dirname,
      "../../translations/"
    );

    config.resolve.alias["@translations"] = path.resolve(
      __dirname,
      "../../src/translations/index"
    );

    config.resolve.alias["@hooks"] = path.resolve(
      __dirname,
      "../../src/hooks/"
    );
    config.resolve.fallback.fs = false;
    
    return config;
  },
  // webpackFinal: async (config) => ({
  //   ...config,
  //   resolve: {
  //     ...config.resolve,
  //     alias: {
  //       ...config.resolve?.alias,
  //       "~": path.resolve(__dirname, "/apps/coop-front/public"),
  //     },
  //   },
  // }),
};
