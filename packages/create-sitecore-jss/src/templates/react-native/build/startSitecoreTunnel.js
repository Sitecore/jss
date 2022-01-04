/* eslint-disable no-console */

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

const startSitecoreTunnel = (sitecoreHost) => {
  const ngrok = require('ngrok'); // eslint-disable-line

  if (!sitecoreHost) {
    throw new Error(
      'Unable to start Sitecore tunnel as no host name for the Sitecore instance was specified.'
    );
  }

  let protocol = getProtocol(sitecoreHost);
  if (!protocol) {
    console.warn(
      `No protocol found on host: ${sitecoreHost}. The tunnel will use 'http' by default.`
    );
    protocol = 'http';
  }

  // be sure to strip the scheme/protocol from the host url, otherwise ngrok will make requests like 'http://http://jssbasicapp'.
  const hostWithoutProtocol = sitecoreHost.replace(`${protocol}://`, '');
  const rewriteHost = `${hostWithoutProtocol}:${protocol === 'http' ? 80 : 443}`;

  return ngrok
    .connect({
      proto: 'http',
      host_header: 'rewrite',
      addr: rewriteHost,
    })
    .then((url) => {
      console.log(`Tunnel started, forwarding '${url}' to '${rewriteHost}'`);
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = { startSitecoreTunnel };
