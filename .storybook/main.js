const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/preset-ant-design",
  ],
  webpackFinal: (config) => {
    config.plugins.push(new AntdDayjsWebpackPlugin());
    return config;
  },
};
