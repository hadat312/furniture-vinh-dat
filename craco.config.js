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
              //primary-color: gold-9
              '@primary-color': '#874d00',
              //item-hover-bg: gold-7
              '@item-hover-bg': '#d48806',
              '@border-radius-base': '6px',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

