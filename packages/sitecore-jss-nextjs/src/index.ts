export {
  constants,
  // generic data access
  HttpDataFetcher,
  HttpResponse,
  AxiosResponse,
  AxiosDataFetcher,
  AxiosDataFetcherConfig,
  NativeDataFetcher,
  NativeDataFetcherConfig,
  HTMLLink,
  enableDebug,
} from '@sitecore-jss/sitecore-jss';

// we will remove the root exports for these later
// we cannot mark exports as deprected directly, so we're using this hack instead
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
  PosResolver,
} from '@sitecore-jss/sitecore-jss/personalize';
export { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';

export {
  ComponentPropsCollection,
  GetStaticComponentProps,
  GetServerSideComponentProps,
} from './sharedTypes/component-props';

export { ComponentModule } from './sharedTypes/component-module';

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
export { ComponentFactoryCreator } from './componentFactoryCreator';

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
  getFEAASLibraryStylesheetLinks,
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
  withComponentFactory
} from '@sitecore-jss/sitecore-jss-react';
