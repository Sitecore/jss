export type SitecoreConfig = {
  initialized?: boolean;
  sitecoreSiteName?: string;
  // graphQlEndpointPath?: string;
  defaultLanguage?: string;
  layoutServiceConfigurationName?: string;
  publicUrl?: string;
  jssEditingSecret?: string;
  // make this section a read-only wrapper, only set the values from env
  client: {
    local?: {
      sitecoreApiHost: string;
      sitecoreApiKey: string;
      graphqQLEndpoint: string;
    };
    xmcloud?: {
      sitecoreEdgeUrl?: string;
      sitecoreEdgeContextId: string;
    };
  };
  // optionally this can have the graphql services factories too
  // plus the component factory settings like
  // componentPaths: string[];
};

export type NextjsConfig = {
  middleware: {
    multisite: MultisiteConfig;
    personalize: PersonalizeConfig;
    redirects: MiddlewareConfig;
  };
};

export type MultisiteConfig = {
  disabled?: boolean;
  defaultSite?: string;
  sites?: string[];
  useCookieResolution?: () => boolean;
};

export type MiddlewareConfig = {
  disabled?: () => boolean;
};

// TODO: better name
export type PersonalizeConfig = MiddlewareConfig & {
  scope?: string;
  channel?: string;
  currency?: string;
  timeout?: number;
  // dsiabled
};

export type SPAConfig = {
  proxyBuildPath: string;
  proxyHost: string;
};
