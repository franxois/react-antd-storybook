const CracoLessPlugin = require("craco-less");
const fastRefreshCracoPlugin = require("craco-fast-refresh");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: fastRefreshCracoPlugin,
    },
  ],
};
