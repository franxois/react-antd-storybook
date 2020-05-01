const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    {
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["less"],
        },
      },
    },
    // TODO : add when "@storybook/preset-ant-design" is fixed
    // {
    //   name: "@storybook/preset-ant-design", // TODO : remove when "@storybook/preset-ant-design" is fixed
    //   options: {
    //     lessOptions: {
    //       modifyVars: {
    //         "primary-color": "#f20f71",
    //       },
    //     },
    //   },
    // },
  ],
  webpackFinal: (config) => {
    // TODO : remove when "@storybook/preset-ant-design" is fixed
    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: { "@primary-color": "#f20f71" },
            },
          },
        },
      ],
    });
    config.plugins.push(new AntdDayjsWebpackPlugin());
    return config;
  },
  babel: async (config, options) => {
    // TODO : remove when "@storybook/preset-ant-design" is fixed
    config.plugins.push([
      "import",
      { libraryName: "antd", libraryDirectory: "es", style: true },
      "antd",
    ]);
    return config;
  },
};
