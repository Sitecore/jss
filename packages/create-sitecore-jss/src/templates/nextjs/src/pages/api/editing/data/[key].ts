import { EditingDataMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';
/**
 * For Vercel deployments: you can use Vercel KV, Upstash or a self hosted Redis storage for editing cache.
 * For Vercel KV:
 * import { VercelEditingDataCache } from '@sitecore-jss/sitecore-jss-nextjs/editing';
 * const redisDataCache = new VercelEditingDataCache(
    process.env.KV_REST_API_URL,
    process.env.KV_REST_API_TOKEN
  );
 */

/**
 * This Next.js API route is used to handle Sitecore editor data storage and retrieval by key
 * on serverless deployment architectures (e.g. Vercel) via the `ServerlessEditingDataService`.
 *
 * The `EditingDataMiddleware` expects this dynamic route name to be '[key]' by default, but can
 * be configured to use something else with the `dynamicRouteKey` option.
 */

// Bump body size limit (1mb by default) and disable response limit for Sitecore editor payloads
// See https://nextjs.org/docs/api-routes/request-helpers#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
    responseLimit: false,
  },
};

// Wire up the EditingDataMiddleware handler
// You can specify a custom data cache here
// new EditingDataMiddleware({ editingDataCache: customDataCache }).getHandler();
const handler = new EditingDataMiddleware().getHandler();

export default handler;
