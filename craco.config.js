const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars:
            {
              '@primary-color': '#874d00',
              '@border-radius-base': '6px',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

