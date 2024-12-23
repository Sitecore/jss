import { SitecoreConfig, NextjsConfig } from '@sitecore-jss/sitecore-jss';
import chalk from 'chalk';
export type SitecoreNextjsConfig = SitecoreConfig & NextjsConfig;

class AppInit {
  private static _sitecoreConfig: SitecoreNextjsConfig = {
    client: {},
    middleware: {
      multisite: {},
      redirects: {},
      personalize: {},
    },
  };

  public static get sitecoreConfig() {
    if (AppInit._sitecoreConfig.initialized) return AppInit._sitecoreConfig;
    else {
      console.log(chalk.red('Attempted to get config when it is not initialized'));
      return undefined;
    }
  }

  public static initApp(config: SitecoreNextjsConfig) {
    const defaultDisabled = () => process.env.NODE_ENV === 'development';
    const defaultConfig = {
      defaultLanguage: 'en',
      layoutServiceConfigurationName: 'jss',
      publicUrl: 'localhost:3000',
      jssEditingSecret: 'no-secret-set',
      client: {
        xmcloud: {
          sitecoreEdgeUrl: 'https://edge-platform.sitecorecloud.io',
          sitecoreEdgeContextId: 'no-edge-id',
        },
      },
      middleware: {
        multisite: {
          disabled: defaultDisabled,
        },
        personalize: {
          excludeRoute: () => false,
          scope: process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE,
          disabled: defaultDisabled,
        },
        redirects: {
          disabled: defaultDisabled,
        },
      },
      // sites - can get from package during init too,
    };

    if (config.client.local) {
      config.client.local.graphqQLEndpoint = `${config.client.local.sitecoreApiHost}/sitecore/api/graph/edge`;
    }
    AppInit._sitecoreConfig = { ...defaultConfig, ...config, initialized: true };
  }
}

export const initApp = AppInit.initApp;

export const sitecoreConfig = AppInit.sitecoreConfig;
