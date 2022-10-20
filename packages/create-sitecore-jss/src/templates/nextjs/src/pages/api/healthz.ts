import { EditingHealthzMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';

/**
 * This Next.js API route is used to handle healthz check request.
 * Used by XMCloud container editing host.
*/

// Wire up the EditingHealthzMiddleware handler
const handler = new EditingHealthzMiddleware().getHandler();

export default handler;
