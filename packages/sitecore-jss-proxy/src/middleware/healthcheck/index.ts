import { Router, Request, Response } from 'express';

/**
 * Creates a router for health check requests.
 * @returns {Router} Editing router
 */
export const healthCheck = (): Router => {
  const router = Router();

  router.get('/api/healthz', (_req: Request, res: Response) => {
    res.status(200).send('Healthy');
  });

  return router;
};
