import { EditingRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

/**
 * This Next.js API route is used to handle POST requests from the Sitecore Experience Editor.
 * This route should match the `serverSideRenderingEngineEndpointUrl` in your Sitecore configuration,
 * which is set to "http://localhost:3000/api/editing/render" by default (see \sitecore\config\JssNextWeb.config).
 *
 * The `EditingRenderMiddleware` will
 *  1. Extract editing data from the Experience Editor POST request
 *  2. Stash this data (for later use in the page render request) via the `EditingDataService`, which returns a key for retrieval
 *  3. Enable Next.js Preview Mode, passing our stashed editing data key as preview data
 *  4. Invoke the actual page render request, passing along the Preview Mode cookies.
 *     This allows retrieval of the editing data in preview context (via the `EditingDataService`) - see `SitecorePagePropsFactory`
 *  5. Return the rendered page HTML to the Sitecore Experience Editor
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

// Wire up the EditingRenderMiddleware handler
const handler = new EditingRenderMiddleware().getHandler();

export default handler;
