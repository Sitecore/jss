const getProtocol = (host) => {
  const finalHost = host.toLowerCase();
  if (finalHost.indexOf('http://') === 0) {
    return 'http';
  }
  if (finalHost.indexOf('https://') === 0) {
    return 'https';
  }
  return null;
};

module.exports.transformScJssConfig = () => {
  // scjssconfig.json may not exist if you've never run setup
  // so if it doesn't we substitute a fake object
  let config;
  try {
    // eslint-disable-next-line global-require
    config = require('../scjssconfig.json');
  } catch (e) {
    return {};
  }

  if (!config) return {};

  return {
    sitecoreApiKey: config.sitecore.apiKey,
    sitecoreApiHost: config.sitecore.layoutServiceHost,
  };
};

module.exports.startSitecoreTunnel = ({ sitecoreApiHost, isDisconnected, proxyPort }) => {
  const ngrok = require('ngrok'); // eslint-disable-line

  if (!sitecoreApiHost) {
    throw new Error(
      'Unable to start Sitecore tunnel as no host name for the Sitecore instance was specified.'
    );
  }

  let protocol = getProtocol(sitecoreApiHost);
  let port = sitecoreApiHost.split(':')[2];
  if (!protocol) {
    console.warn(
      `No protocol found on host: ${sitecoreApiHost}. The tunnel will use 'http' by default.`
    );
    protocol = 'http';
    port = sitecoreApiHost.split(':')[1];
  }

  // be sure to strip the scheme/protocol from the host url, otherwise ngrok will make requests like 'http://http://jssbasicapp'.
  const hostWithoutProtocol = sitecoreApiHost.replace(`${protocol}://`, '');
  const rewriteHost = port
    ? hostWithoutProtocol
    : `${hostWithoutProtocol}:${protocol === 'http' ? 80 : 443}`;

  const config = isDisconnected
    ? proxyPort
    : {
        proto: 'http',
        host_header: 'rewrite',
        addr: rewriteHost,
      };

  return ngrok
    .connect(config)
    .then((url) => {
      console.log(`Tunnel started, forwarding '${url}' to '${rewriteHost}'`);
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
};
