import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import * as plugins from 'temp/byoc/context-plugins';
import config from 'temp/config';

export interface Props {
  site: SiteInfo;
}

export interface Context {
  sitecoreEdgeUrl: string;
  sitecoreEdgeContextId: string;
  SDK: { [key: string]: unknown };
}

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which has to be initialized before other plugins)
   */
  order: number;
  /**
   * A function which will be called during the SDK initialization
   */
  exec(props: Props, context: Context): Promise<void>;
}

export const context: Context = {
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  SDK: {},
};

export const setBYOCContext = async (props: Props) => {
  await (Object.values(plugins) as Plugin[])
    .sort((p1, p2) => p1.order - p2.order)
    .reduce(async (_, plugin) => {
      await plugin.exec(props, context);
    }, Promise.resolve());

  FEAAS.setContextProperties(context);
};
