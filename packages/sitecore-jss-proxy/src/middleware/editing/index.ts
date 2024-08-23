import { NextFunction, Request, Response, Router } from 'express';
import { debug } from '@sitecore-jss/sitecore-jss';
import { enforceCors } from '@sitecore-jss/sitecore-jss/utils';
import { EDITING_ALLOWED_ORIGINS, QUERY_PARAM_EDITING_SECRET } from '../utils';
import { EditingConfigEndpointOptions, editingConfigMiddleware } from './config';
import { EditingRenderEndpointConfig, editingRenderMiddleware } from './render';

export type EditingRouterConfig = {
  /**
   * Configuration for the /config endpoint
   */
  config: EditingConfigEndpointOptions;
  /**
   * Configuration for the /render endpoint
   */
  render: EditingRenderEndpointConfig;
};

export const editingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const providedSecret = req.query[QUERY_PARAM_EDITING_SECRET];
  const secret = process.env.JSS_EDITING_SECRET;

  debug.editing('editing middleware start: %o', {
    path: req.path,
    method: req.method,
    query: req.query,
    headers: req.headers,
  });

  if (!enforceCors(req, res, EDITING_ALLOWED_ORIGINS)) {
    debug.editing(
      'invalid origin host - set allowed origins in JSS_ALLOWED_ORIGINS environment variable'
    );
    return res.status(401).json({
      html: `<html><body>Requests from origin ${req.headers?.origin} not allowed</body></html>`,
    });
  }

  if (!secret) {
    debug.editing('missing editing secret - set JSS_EDITING_SECRET environment variable');

    return res
      .status(401)
      .json({ message: 'Missing editing secret - set JSS_EDITING_SECRET environment variable' });
  }

  if (secret !== providedSecret) {
    debug.editing('invalid editing secret - sent "%s" expected "%s"', secret, providedSecret);

    return res.status(401).json({ html: '<html><body>Missing or invalid secret</body></html>' });
  }

  return next();
};

const editingNotFoundMiddleware = (req: Request, res: Response) => {
  debug.editing('invalid method or path - sent %s %s', req.method, req.originalUrl);

  res.setHeader('Allow', 'GET');

  return res.status(405).json({
    html: `<html><body>Invalid request method or path ${req.method} ${req.originalUrl}</body></html>`,
  });
};

export const editingRouter = (options: EditingRouterConfig) => {
  const router = Router();

  router.use(editingMiddleware);

  router.get(options.config.path || '/config', editingConfigMiddleware(options.config));
  router.get(options.render?.path || '/render', editingRenderMiddleware(options.render));

  // Middleware to handle invalid method/path
  router.use(editingNotFoundMiddleware);

  return router;
};
