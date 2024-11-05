import { PersonalizeHelper } from '@sitecore-jss/sitecore-jss-proxy';
import { personalizeConfig } from './config';
import { responseInterceptor } from 'http-proxy-middleware';
import { Plugin } from 'http-proxy-middleware/dist/types';
import { IncomingMessageWithBody } from './types';
export const personalizeHelper = new PersonalizeHelper(personalizeConfig);

export const personalizePlugin: Plugin = (proxyServer) => {
  proxyServer.on('proxyReq', async (_, req, res) => {
    const payload = JSON.stringify((req as IncomingMessageWithBody).body);
    if (payload.toLowerCase().includes('jsslayoutquery')) {
      // CloudSDK initialization modifies cookies and headers.
      // Performing it on proxyRes can cause `headers already modified` errors, so we do it here instead
      await personalizeHelper.initPersonalizeServer(req, res);
    }
  });
  proxyServer.on(
    'proxyRes',
    responseInterceptor(async (responseBuffer, _, req, res) => {
      let responseText = responseBuffer.toString('utf8');
      const payload = JSON.stringify((req as IncomingMessageWithBody).body);
      if (payload.toLowerCase().includes('jsslayoutquery')) {
        let layoutDataRaw = JSON.parse(responseText);
        if (layoutDataRaw?.data?.layout?.item?.rendered?.sitecore) {
          // CloudSDK init should be performed on proxyReq and we will skip it here
          const personalizedLayout = await personalizeHelper.personalizeLayoutData(
            req as IncomingMessageWithBody,
            res,
            layoutDataRaw?.data?.layout?.item?.rendered,
            true
          );
          layoutDataRaw.data.layout.item.rendered = personalizedLayout;
          responseText = JSON.stringify(layoutDataRaw);
        }
      }
      return responseText;
    })
  );
};
