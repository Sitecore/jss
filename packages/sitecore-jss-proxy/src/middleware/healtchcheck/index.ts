import { Router } from 'express';
import { healthCheckMiddleware } from './healthcheck-middleware';

/**
 * Creates a router for health check requests.
 * @returns {Router} Editing router
 */
export const healthCheck = (): Router => {
  const router = Router();

  router.get('/api/healthz', healthCheckMiddleware());

  return router;
};
