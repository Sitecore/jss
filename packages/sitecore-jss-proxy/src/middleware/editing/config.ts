import { Request, Response } from 'express';
import { debug } from '@sitecore-jss/sitecore-jss';
import { EditMode } from '@sitecore-jss/sitecore-jss/layout';
import { Metadata } from '@sitecore-jss/sitecore-jss/utils';

/**
 * Configuration for the editing config endpoint
 */
export type EditingConfigEndpointOptions = {
  /**
   * Custom path for the endpoint. Default is `<routerPath>/config`
   * @example
   * { path: '/foo/config' } -> <routerPath>/foo/config
   */
  path?: string;
  /**
   * Components registered in the application
   */
  components: string[] | Map<string, unknown>;
  /**
   * Application metadata
   */
  metadata: Metadata;
};

/**
 * Middleware to handle editing config requests
 * @param {EditingConfigEndpointOptions} config Configuration for the endpoint
 * @returns {RequestHandler} Middleware function
 */
export const editingConfigMiddleware = (config: EditingConfigEndpointOptions) => (
  _req: Request,
  res: Response
): void => {
  debug.editing('editing config middleware start');

  const startTimestamp = Date.now();

  const components = Array.isArray(config.components)
    ? config.components
    : Array.from(config.components.keys());

  debug.editing('editing config middleware end in %dms: %o', Date.now() - startTimestamp, {
    components,
    packages: config.metadata.packages,
  });

  res.status(200).json({
    components,
    packages: config.metadata.packages,
    editMode: EditMode.Metadata,
  });
};
