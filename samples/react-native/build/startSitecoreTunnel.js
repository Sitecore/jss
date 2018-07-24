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

const startSitecoreTunnel = (sitecoreHost, port = 80) => {
  const ngrok = require('ngrok'); // eslint-disable-line
  return new Promise((resolve, reject) => {
    if (!sitecoreHost) {
      reject(
        new Error(
          'Unable to start Sitecore tunnel as no host name for the Sitecore instance was specified.'
        )
      );
    }

    const protocol = getProtocol(sitecoreHost);
    if (!protocol) {
      console.warn(
        `No protocol found on host: ${sitecoreHost}. The tunnel will use 'http' by default.`
      );
    }

    // be sure to strip the scheme/protocol from the host url, otherwise ngrok will make requests like 'http://http://jssbasicapp'.
    const hostWithoutProtocol = sitecoreHost.replace(`${protocol}://`, '');
    const rewriteHost = `${hostWithoutProtocol}:${port}`;

    ngrok.connect(
      {
        proto: protocol,
        host_header: 'rewrite',
        addr: rewriteHost,
      },
      (err, url) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log('tunnel started', url);
        resolve(url);
      }
    );
  });
};

module.exports = { startSitecoreTunnel };
