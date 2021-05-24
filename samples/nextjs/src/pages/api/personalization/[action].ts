import { createProxyMiddleware } from 'http-proxy-middleware';

import jssConfig from 'temp/config';

export default createProxyMiddleware({
  target: jssConfig.sitecoreApiHost,
  changeOrigin: true,
  pathRewrite: { '^/api': '/sitecore/api/layout' },
  xfwd: true,
});

export const config = {
  api: {
    bodyParser: false, // enable POST requests
    externalResolver: true, // hide warning message
  },
};
