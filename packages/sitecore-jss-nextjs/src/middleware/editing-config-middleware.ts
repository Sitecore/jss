import type { NextApiRequest, NextApiResponse } from 'next';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { QUERY_PARAM_EDITING_SECRET } from '../editing/constants';
import { getJssEditingSecret } from '../utils/utils';
import { debug } from '@sitecore-jss/sitecore-jss';

interface Metadata {
  packages: { [key: string]: string };
}

export type EditingConfigMiddlewareConfig = MiddlewareBaseConfig & {
  /**
   * Components available in the application
   */
  components: string[] | Map<string, unknown>;
  /**
   * Application metadata
   */
  metadata: Metadata;
};

export class EditingConfigMiddleware extends MiddlewareBase {
  constructor(protected config: EditingConfigMiddlewareConfig) {
    super(config);
  }

  /**
   * Gets the Next.js API route handler
   * @returns middleware handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const secret = _req.query[QUERY_PARAM_EDITING_SECRET];
    if (secret !== getJssEditingSecret()) {
      debug.editing(
        'invalid editing secret - sent "%s" expected "%s"',
        secret,
        getJssEditingSecret()
      );

      res.status(401).end('Missing or invalid editing secret');
    }

    const components = Array.isArray(this.config.components)
      ? this.config.components
      : Array.from(this.config.components.keys());

    return res.status(200).json({
      components,
      packages: this.config.metadata.packages,
    });
  };
}