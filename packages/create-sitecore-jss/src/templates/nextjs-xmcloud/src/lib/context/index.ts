import * as FEAAS from '@sitecore-feaas/clientside/react';
import { Context } from '@sitecore-jss/sitecore-jss-nextjs/context';
import config from 'temp/config';

import Events from './sdk/events';

// Shape of the SDK object
export type SDK<SDKType> = {
  sdk: SDKType;
  init: (contextInstance: typeof context) => Promise<void>;
};

/**
 * List of SDKs to be initialized.
 * Each SDK is defined as a module with the @type {SDK} type.
 */
const modules = {
  Events,
};

type SDKName = keyof typeof modules;

// SDKs that are initialized by the Context
type SDKs = { [name in SDKName]: typeof modules[name]['sdk'] };

/**
 * Properties that are passed to the Context.
 */
export interface Props {
  siteName: string;
}

/**
 * Context instance that is used to initialize the application Context and associated Software Development Kits (SDKs).
 */
export const context = new Context<SDKs>({
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  siteName: '',
});

/**
 * Initializes the application Context and associated Software Development Kits (SDKs).
 * This function is the entry point for setting up the application's context and any SDKs that are required for its proper functioning.
 * It prepares the resources needed to interact with various services and features within the application.
 */
export const initContext = async (props: Props) => {
  // Context can be initialized only once
  if (context.isInitialized) return;

  context.isInitialized = true;

  // Updating the context with the incoming properties
  context.siteName = props.siteName;

  // iterate over the SDKs and initialize them
  for (const sdkName of Object.keys(modules) as SDKName[]) {
    await context.initSDK(sdkName, async () => {
      await modules[sdkName].init(context);

      return modules[sdkName].sdk;
    });
  }

  // Setting the context properties for the FEAAS SDK
  FEAAS.setContextProperties(context);
};
