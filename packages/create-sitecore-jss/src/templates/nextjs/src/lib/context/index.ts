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
   * A function which will be called during the SDK initialization
   */
  exec(props: Props, context: Context): Promise<void>;
}


/**
 * Context object to be utilized during the initialization of BYOC components.
 * This context is an essential part of BYOC component initialization and provides necessary configuration and information
 * to set up and customize BYOC components. It serves as the foundation for integrating and configuring BYOC features
 * within your application.
 */
export const context: Context = {
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  SDK: {},
};

let initialized = false;

/**
 * An identifier used by other SDKs to ensure that a function is executed only after the Context is initialized.
 * This identifier serves as a synchronization mechanism to coordinate the initialization and execution of functions in different SDKs.
 * It helps ensure that a specific action or operation is performed only when the application's context has been fully initialized
 * and is ready to support the required functionality.
 * Defined once @function initContext is called
 */
export let contextReady: Promise<void> | undefined;

/**
 * Initializes the application Context and associated Software Development Kits (SDKs).
 * This function is the entry point for setting up the application's context and any SDKs that are required for its proper functioning.
 * It prepares the resources needed to interact with various services and features within the application.
 */
export const initContext = async (props: Props) => {
  if (initialized) return;

  initialized = true;

  contextReady = new Promise(async (resolve) => {
    await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(async (_, plugin) => {
        await plugin.exec(props, context);
      }, Promise.resolve());

    FEAAS.setContextProperties(context);

    resolve();
  });
};
