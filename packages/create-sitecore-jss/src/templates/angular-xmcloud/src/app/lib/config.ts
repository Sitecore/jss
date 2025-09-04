/*
 * Represents the type of config object available within the generated /environments/environment.js
 */
export interface JssConfig extends Record<string, string | boolean | undefined> {
  production?: false;
  sitecoreApiKey?: string;
  sitecoreApiHost?: string;
  sitecoreSiteName?: string;
  defaultLanguage?: string;
  graphQLEndpoint?: string;
  graphQLEndpointPath?: string;
  defaultServerRoute?: string;
  proxyBuildPath?: string;
  sitecoreEdgeUrl?: string;
  sitecoreEdgeContextId?: string;
}
