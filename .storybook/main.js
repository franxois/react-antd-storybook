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
    {
      name: "@storybook/preset-ant-design",
      options: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#f20f71",
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.plugins.push(new AntdDayjsWebpackPlugin());
    return config;
  },
};
