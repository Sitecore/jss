import { GRAPHQL_LAYOUT_QUERY_NAME, PersonalizeHelper } from '@sitecore-jss/sitecore-jss-proxy';
import { personalizeConfig } from './config';
import { responseInterceptor } from 'http-proxy-middleware';
import { Plugin } from 'http-proxy-middleware/dist/types';
import { IncomingMessageWithBody } from './types';

export const personalizeHelper = new PersonalizeHelper(personalizeConfig);

// personalize plugin to modify intercepted Layout Service request data
export const personalizePlugin: Plugin = (proxyServer) => {
  proxyServer.on(
    'proxyRes',
    responseInterceptor(async (responseBuffer, _, req, res) => {
      let responseText = responseBuffer.toString('utf8');
      const payload = JSON.stringify((req as IncomingMessageWithBody).body);

      // only apply personalization onto JSS layout service results
      if (payload.includes(GRAPHQL_LAYOUT_QUERY_NAME)) {
        let layoutDataRaw = JSON.parse(responseText);
        if (!layoutDataRaw?.data?.layout?.item?.rendered?.sitecore) {
          return responseText;
        }
        const personalizedLayout = await personalizeHelper.personalizeLayoutData(
          req as IncomingMessageWithBody,
          res,
          layoutDataRaw?.data?.layout?.item?.rendered
        );
        layoutDataRaw.data.layout.item.rendered = personalizedLayout;
        responseText = JSON.stringify(layoutDataRaw);
      }
      return responseText;
    })
  );
};
