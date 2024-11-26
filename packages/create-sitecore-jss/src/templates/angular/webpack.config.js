const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  plugins: [new Dotenv()],
  resolve: {
    alias: {
      '@sitecore-cloudsdk': path.resolve(__dirname, 'node_modules/@sitecore-cloudsdk'),
    },
  },
};
