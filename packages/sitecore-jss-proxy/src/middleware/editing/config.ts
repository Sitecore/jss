import { Request, Response } from 'express';
import { EditMode } from '@sitecore-jss/sitecore-jss/layout';
import { Metadata } from '@sitecore-jss/sitecore-jss/utils';

export type EditingConfigEndpointOptions = {
  /**
   * Custom path for the endpoint. Default is `<routerPath>/config`
   * @example
   * { path: '/foo/config' } -> <routerPath>/foo/config
   */
  path?: string;
  /**
   * Components available in the application
   */
  components: string[] | Map<string, unknown>;
  /**
   * Application metadata
   */
  metadata: Metadata;
};

export const editingConfigMiddleware = (config: EditingConfigEndpointOptions) => async (
  _req: Request,
  res: Response
): Promise<unknown> => {
  const components = Array.isArray(config.components)
    ? config.components
    : Array.from(config.components.keys());

  return res.status(200).json({
    components,
    packages: config.metadata.packages,
    editMode: EditMode.Metadata,
  });
};
