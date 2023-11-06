import * as FEAAS from '@sitecore-feaas/clientside/react';
import * as plugins from 'temp/context-plugins';
import config from 'temp/config';

/**
 * Plugin's incoming properties
 */
export interface Props {
  site: string;
}

/**
 * Context definition
 */
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
   * A function to be called during SDK initialization.
   */
  exec(props: Props, context: Context): Promise<void>;
  /**
   * The SDK associated with the plugin.
   */
  SDK: {
    name: string;
    lib: unknown;
  };
}

export const context: Context = {
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  SDK: {},
};

// Initialize promise list
export const promises: { [key: string]: Promise<unknown> } = {};

// Helper to wait for asynchronosuly initialized SDK
export function whenSDKReady<ModuleType>(name: string): Promise<ModuleType> {
  return promises[name] as Promise<ModuleType>;
}

// Indicates whether the Context and SDK(s) have been initialized.
let initialized = false;

/**
 * Initializes the application Context and associated Software Development Kits (SDKs).
 * This function is the entry point for setting up the application's context and any SDKs that are required for its proper functioning.
 * It prepares the resources needed to interact with various services and features within the application.
 */
export const initContext = async (props: Props) => {
  if (initialized) return;

  initialized = true;

  const pluginList = Object.values(plugins).sort((p1, p2) => p1.order - p2.order) as Plugin[];

  for (const plugin of pluginList) {
    promises[plugin.SDK.name] = new Promise(async (resolve) => {
      await plugin.exec(props, context);

      context.SDK[plugin.SDK.name] = plugin.SDK.lib;

      resolve(plugin.SDK.lib);
    });

    await promises[plugin.SDK.name];
  }

  FEAAS.setContextProperties(context);
};
