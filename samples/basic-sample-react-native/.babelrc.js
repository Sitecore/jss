module.exports = {
  plugins: [
    [
      require('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        root: ['./'],
        alias: {
          'data-service': process.env.APP_DATA_SERVICE, // alias paths are independent of the 'root' setting
          'static-assets': process.env.APP_STATIC_ASSETS,
        },
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    ],
    [
      require('babel-plugin-inline-replace-variables'),
      {
        __SC_API_HOST__: process.env.__SC_API_HOST__,
        __SC_API_KEY__: process.env.__SC_API_KEY__,
        __TRANSLATION_PATH__: process.env.__TRANSLATION_PATH__,
        __SC_TUNNEL_HOST__: process.env.__SC_TUNNEL_HOST__,
      },
    ],
  ],
};
