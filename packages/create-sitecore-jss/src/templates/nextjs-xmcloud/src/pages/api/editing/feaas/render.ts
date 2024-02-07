import { FEAASRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';

/**
 * This Next.js API route is used to handle GET requests from Sitecore Component Builder.
 *
 * The `FEAASRenderMiddleware` will:
 *  1. Enable Next.js Preview Mode
 *  2. Invoke the /feaas/render page request, passing along the Preview Mode cookies.
 *  3. Return the rendered page HTML to the Sitecore Component Builder:
 *  - If "feaasSrc" query parameter is provided, the page will render a FEAAS component.
 *  - The page provides all the registered FEAAS components
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

// Wire up the FEAASRenderMiddleware handler
const handler = new FEAASRenderMiddleware().getHandler();

export default handler;
