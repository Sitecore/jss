/*
 * Represents the type of config object available within the generated temp/config.js
 */
export interface JssConfig extends Record<string, string | boolean | undefined> {
  production?: false;
  sitecoreApiKey?: string;
  sitecoreApiHost?: string;
  sitecoreSiteName?: string;
  defaultLanguage?: string;
  graphQLEndpoint?: string;
  graphQLEndpointPath?: string;
  layoutServiceConfigurationName?: string;
  sitecoreLayoutServiceConfig?: string;
  defaultServerRoute?: string;
}
