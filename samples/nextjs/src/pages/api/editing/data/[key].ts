import { EditingDataMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

/**
 * This Next.js API route is used to handle Sitecore Experience Editor data storage and retrieval by key
 * (between the Sitecore Experience Editor POST and Next.js page render requests) via the `EditingDataService`.
 *
 * The `EditingDataMiddleware` expects this dynamic route name to be '[key]' by default, but can
 * be configured to use something else with the `dynamicRouteKey` option.
 */

// Bump body size limit (1mb by default) for Experience Editor payload
// See https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

// Wire up the EditingDataMiddleware handler
const handler = new EditingDataMiddleware().getHandler();

export default handler;
