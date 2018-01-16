module.exports = {
  apiHost: 'http://jssadvancedapp', //change to https to enable Login functionality
  layoutServiceRoute: '/sitecore/api/layout/render/jss',
  apiKey: '{YOUR API KEY HERE}', //needs to be populated before use
  pathRewriteExcludeRoutes: ['/dist', '/assets', '/sitecore/api'],
  debug: true,
  proxyOptions: {
    secure: false, //for demo ONLY, allows self-signed SSL certs
  },
};