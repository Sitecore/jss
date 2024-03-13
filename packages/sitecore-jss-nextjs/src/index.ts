export {
  constants,
  // generic data access
  HttpDataFetcher,
  HttpResponse,
  AxiosResponse,
  AxiosDataFetcher,
  AxiosDataFetcherConfig,
  /** @deprecated use import 'GraphQLClientError' from '@sitecore-jss/sitecore-jss-nextjs/graphql' instead */
  ClientError,
  NativeDataFetcher,
  NativeDataFetcherConfig,
  HTMLLink,
  enableDebug,
  debug,
} from '@sitecore-jss/sitecore-jss';

// we will remove the root exports for these later
// we cannot mark exports as deprected directly, so we're using this hack instead
import { GraphQLRequestClient as GraphQLRequestClientDep } from './graphql';
import {
  isEditorActive as isEditorActiveDep,
  resetEditorChromes as resetEditorChromesDep,
  resolveUrl as resolveUrlDep,
  tryParseEnvValue as tryParseEnvValueDep,
} from '@sitecore-jss/sitecore-jss/utils';
import {
  handleEditorFastRefresh as handleEditorFastRefreshDep,
  getPublicUrl as getPublicUrlDep,
} from './utils';

/** @deprecated use import from '@sitecore-jss/sitecore-jss-nextjs/utils' instead */
const {
  isEditorActiveDep: isEditorActive,
  resetEditorChromesDep: resetEditorChromes,
  resolveUrlDep: resolveUrl,
  tryParseEnvValueDep: tryParseEnvValue,
  handleEditorFastRefreshDep: handleEditorFastRefresh,
  getPublicUrlDep: getPublicUrl,
} = {
  isEditorActiveDep,
  resetEditorChromesDep,
  resolveUrlDep,
  tryParseEnvValueDep,
  handleEditorFastRefreshDep,
  getPublicUrlDep,
};
/** @deprecated use import from '@sitecore-jss/sitecore-jss-nextjs/graphql' instead */
const { GraphQLRequestClientDep: GraphQLRequestClient } = {
  GraphQLRequestClientDep,
};

export { GraphQLRequestClient };
export { handleEditorFastRefresh, getPublicUrl };
export { isEditorActive, resetEditorChromes, resolveUrl, tryParseEnvValue };

export {
  LayoutService,
  LayoutServiceData,
  LayoutServicePageState,
  LayoutServiceContext,
  LayoutServiceContextData,
  GraphQLLayoutService,
  GraphQLLayoutServiceConfig,
  RestLayoutService,
  RestLayoutServiceConfig,
  PlaceholderData,
  PlaceholdersData,
  RouteData,
  Field,
  Item,
  HtmlElementRendering,
  getChildPlaceholder,
  getFieldValue,
  ComponentRendering,
  ComponentFields,
  ComponentParams,
  RenderingType,
  EDITING_COMPONENT_PLACEHOLDER,
  EDITING_COMPONENT_ID,
  getContentStylesheetLink,
} from '@sitecore-jss/sitecore-jss/layout';
export { mediaApi } from '@sitecore-jss/sitecore-jss/media';
export {
  trackingApi,
  TrackingRequestOptions,
  CampaignInstance,
  GoalInstance,
  OutcomeInstance,
  EventInstance,
  PageViewInstance,
} from '@sitecore-jss/sitecore-jss/tracking';
export {
  DictionaryPhrases,
  DictionaryService,
  GraphQLDictionaryService,
  GraphQLDictionaryServiceConfig,
  RestDictionaryService,
  RestDictionaryServiceConfig,
} from '@sitecore-jss/sitecore-jss/i18n';
export {
  personalizeLayout,
  getPersonalizedRewrite,
  getPersonalizedRewriteData,
  normalizePersonalizedRewrite,
  CdpHelper,
} from '@sitecore-jss/sitecore-jss/personalize';

export {
  ComponentPropsCollection,
  ComponentPropsError,
  GetStaticComponentProps,
  GetServerSideComponentProps,
} from './sharedTypes/component-props';

export { ModuleFactory, Module } from './sharedTypes/module-factory';

export { ComponentPropsService } from './services/component-props-service';

export { DisconnectedSitemapService } from './services/disconnected-sitemap-service';

export {
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
} from './services/graphql-sitemap-service';

export {
  MultisiteGraphQLSitemapService,
  MultisiteGraphQLSitemapServiceConfig,
} from './services/mutisite-graphql-sitemap-service';

export {
  GraphQLSitemapXmlService,
  GraphQLSitemapXmlServiceConfig,
  GraphQLErrorPagesService,
  GraphQLErrorPagesServiceConfig,
  RobotsQueryResult,
  GraphQLRobotsService,
  GraphQLRobotsServiceConfig,
  ErrorPages,
  SiteInfo,
  SiteResolver,
  GraphQLSiteInfoService,
  GraphQLSiteInfoServiceConfig,
  getSiteRewrite,
  getSiteRewriteData,
  normalizeSiteRewrite,
} from '@sitecore-jss/sitecore-jss/site';

export { StaticPath } from './services/graphql-sitemap-service';

export {
  ComponentPropsReactContext,
  ComponentPropsContextProps,
  ComponentPropsContext,
  useComponentProps,
} from './components/ComponentPropsContext';

export { Link, LinkProps } from './components/Link';
export { RichText, RichTextProps } from './components/RichText';
export { Placeholder } from './components/Placeholder';
export { EditingComponentPlaceholder } from './components/EditingComponentPlaceholder';
export { NextImage } from './components/NextImage';
import * as FEaaSWrapper from './components/FEaaSWrapper';
import * as BYOCWrapper from './components/BYOCWrapper';
export { FEaaSWrapper };
export { BYOCWrapper };

export { ComponentBuilder, ComponentBuilderConfig } from './ComponentBuilder';

export { Context, ContextConfig, SDK } from './context';

export {
  ComponentFactory,
  Image,
  ImageField,
  ImageFieldValue,
  ImageProps,
  LinkField,
  LinkFieldValue,
  Text,
  TextField,
  DateField,
  EditFrame,
  FEaaSComponent,
  FEaaSComponentProps,
  FEaaSComponentParams,
  fetchFEaaSComponentServerProps,
  BYOCComponentParams,
  BYOCComponent,
  BYOCComponentProps,
  getFEAASLibraryStylesheetLinks,
  getComponentLibraryStylesheetLinks,
  File,
  FileField,
  RichTextField,
  VisitorIdentification,
  PlaceholderComponentProps,
  SitecoreContext,
  SitecoreContextState,
  SitecoreContextValue,
  SitecoreContextReactContext,
  withSitecoreContext,
  useSitecoreContext,
  withEditorChromes,
  withPlaceholder,
  withDatasourceCheck,
  ImageSizeParameters,
  ComponentConsumerProps,
  WithSitecoreContextOptions,
  WithSitecoreContextProps,
} from '@sitecore-jss/sitecore-jss-react';
