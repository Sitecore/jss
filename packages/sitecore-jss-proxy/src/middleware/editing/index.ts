import { NextFunction, Request, Response, Router } from 'express';
import { debug } from '@sitecore-jss/sitecore-jss';
import {
  EDITING_ALLOWED_ORIGINS,
  QUERY_PARAM_EDITING_SECRET,
} from '@sitecore-jss/sitecore-jss/editing';
import { enforceCors } from '@sitecore-jss/sitecore-jss/utils';
import { EditingConfigEndpointOptions, editingConfigMiddleware } from './config';
import { EditingRenderEndpointOptions, editingRenderMiddleware } from './render';

/**
 * Default endpoints for editing requests
 */
const ENDPOINTS = {
  CONFIG: '/config',
  RENDER: '/render',
};

/**
 * Configuration for the editing router
 */
export type EditingRouterConfig = {
  /**
   * Configuration for the /config endpoint
   */
  config: EditingConfigEndpointOptions;
  /**
   * Configuration for the /render endpoint
   */
  render: EditingRenderEndpointOptions;
};

/**
 * Middleware to handle editing requests
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next function
 */
export const editingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const providedSecret = req.query[QUERY_PARAM_EDITING_SECRET];
  const secret = process.env.JSS_EDITING_SECRET;

  debug.editing('editing middleware start: %o', {
    path: req.originalUrl,
    method: req.method,
    query: req.query,
    headers: req.headers,
  });

  if (!enforceCors(req, res, EDITING_ALLOWED_ORIGINS)) {
    debug.editing(
      'invalid origin host - set allowed origins in JSS_ALLOWED_ORIGINS environment variable'
    );
    return res.status(401).send(`Requests from origin ${req.headers?.origin} are not allowed`);
  }

  if (!secret) {
    debug.editing('missing editing secret - set JSS_EDITING_SECRET environment variable');

    return res
      .status(401)
      .send('Missing editing secret - set JSS_EDITING_SECRET environment variable');
  }

  if (secret !== providedSecret) {
    debug.editing('invalid editing secret - sent "%s" expected "%s"', providedSecret, secret);

    return res.status(401).send('Missing or invalid secret');
  }

  return next();
};

/**
 * Middleware to handle invalid method or path
 * @param {Request} req Request
 * @param {Response} res Response
 */
const editingNotFoundMiddleware = (req: Request, res: Response) => {
  debug.editing('invalid method or path - sent %s %s', req.method, req.originalUrl);

  return res.status(405).send(`Invalid request method or path ${req.method} ${req.originalUrl}`);
};

/**
 * Creates a router for editing requests.
 * Supports the following routes:
 * - <routerPath>/render (GET) - renders a route
 * - <routerPath>/config (GET) - returns the current application configuration
 * @param {EditingRouterConfig} options Editing router configuration
 * @returns {Router} Editing router
 */
export const editingRouter = (options: EditingRouterConfig) => {
  const router = Router();

  router.use(editingMiddleware);

  router.get(options.config.path || ENDPOINTS.CONFIG, editingConfigMiddleware(options.config));
  router.get(options.render.path || ENDPOINTS.RENDER, editingRenderMiddleware(options.render));

  router.use(editingNotFoundMiddleware);

  return router;
};
