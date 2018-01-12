const jssConfig = require('../config.js');

/*
  Global variable definitions
  These are available in any JS built by Webpack, in any configuration.
  Use sparingly.
*/
const definitions = () => {
  return {
    __SC_API_HOST__: JSON.stringify(jssConfig.sitecore.layoutServiceHost),
    __SC_API_KEY__: JSON.stringify(jssConfig.sitecore.apiKey),
  };
};

module.exports = definitions();
