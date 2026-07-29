import { HealthcheckMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/monitoring';

/**
 * This Next.js API route is used to handle healthz check request,
 * for use in monitoring and deployment health checks.
 */

// Wire up the HealthcheckMiddleware handler
const handler = new HealthcheckMiddleware().getHandler();

export default handler;
