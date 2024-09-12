import { Request, Response } from 'express';

/**
 * Middleware to handle health check requests
 */
export const healthCheckMiddleware = () => (_req: Request, res: Response): void => {
  res.status(200).send('Healthy');
};
