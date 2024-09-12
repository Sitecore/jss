import { Router, Request, Response } from 'express';

/**
 * Middleware to handle health check requests
 */
const healthCheckMiddleware = () => (_req: Request, res: Response): void => {
  res.status(200).send('Healthy');
};

/**
 * Creates a router for health check requests.
 * @returns {Router} Editing router
 */
export const healthCheck = (): Router => {
  const router = Router();

  router.get('/api/healthz', healthCheckMiddleware());

  return router;
};
