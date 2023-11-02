import * as FEAAS from '@sitecore-feaas/clientside/react';
import * as plugins from 'temp/context-plugins';
import config from 'temp/config';

export interface Props {
  site: string;
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

let initialized = false;

export let contextReady: Promise<void> | undefined;

export const initContext = async (props: Props) => {
  if (initialized) return;

  console.log('CONTEXT INIT IS CALLED');

  initialized = true;

  contextReady = new Promise(async (resolve) => {
    await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(async (_, plugin) => {
        await plugin.exec(props, context);
      }, Promise.resolve());

    FEAAS.setContextProperties(context);

    console.log('CONTEXT IS INITIALIZED', context);

    resolve();
  });
};
