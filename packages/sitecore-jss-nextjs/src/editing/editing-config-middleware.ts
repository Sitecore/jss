import { NextApiRequest, NextApiResponse } from 'next';
import { QUERY_PARAM_EDITING_SECRET } from './constants';
import { getJssEditingSecret } from '../utils/utils';
import { debug } from '@sitecore-jss/sitecore-jss';
import { EditMode } from '@sitecore-jss/sitecore-jss/layout';
import { Metadata } from '@sitecore-jss/sitecore-jss-dev-tools';

export type EditingConfigMiddlewareConfig = {
  /**
   * Components available in the application
   */
  components: string[] | Map<string, unknown>;
  /**
   * Application metadata
   */
  metadata: Metadata;
  /**
   * Flag to enable/disable the new editing experience for Pages.
   * Enabled by default
   */
  enableEditingMetadata?: boolean;
};

/**
 * Middleware / handler used in the editing config API route in xmcloud add on (e.g. '/api/editing/config')
 * provides configuration information to determine feature compatibility on Pages side.
 */
export class EditingConfigMiddleware {
  private enableEditingMetadata: boolean;
  /**
   * @param {EditingConfigMiddlewareConfig} [config] Editing configuration middleware config
   */
  constructor(protected config: EditingConfigMiddlewareConfig) {
    this.enableEditingMetadata = config.enableEditingMetadata ?? true;
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

      return res.status(401).json({ message: 'Missing or invalid editing secret' });
    }

    const components = Array.isArray(this.config.components)
      ? this.config.components
      : Array.from(this.config.components.keys());

    const editMode = this.enableEditingMetadata ? EditMode.Metadata : EditMode.Chromes;

    return res.status(200).json({
      components,
      packages: this.config.metadata.packages,
      editMode,
    });
  };
}
