// NOTE: all imports are now named as to not make breaking changes
// and to keep react-native working with cjs modules.

import * as constants from './constants';
export { default as debug, Debugger } from './debug';
export { HttpDataFetcher, HttpResponse, fetchData } from './data-fetcher';
export {
  GraphQLClient,
  GraphQLRequestClient,
  GraphQLRequestClientConfig,
} from './graphql-request-client';
export { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';
export {
  AppRootQueryResult,
  SearchQueryResult,
  SearchQueryService,
  SearchQueryVariables,
  SearchServiceConfig,
  getAppRootId,
} from './graphql';
export {
  ExperienceEditor,
  HorizonEditor,
  isEditorActive,
  isExperienceEditorActive,
  isServer,
  resetEditorChromes,
  resetExperienceEditorChromes,
  resolveUrl,
} from './utils';
export { CacheClient, CacheOptions, MemoryCacheClient } from './cache-client';

export {
  DictionaryPhrases,
  DictionaryService,
  DictionaryServiceBase,
  GraphQLDictionaryService,
  GraphQLDictionaryServiceConfig,
  RestDictionaryService,
  RestDictionaryServiceConfig,
  RestDictionaryServiceData,
} from './i18n';

// layout
export {
  LayoutServiceData,
  LayoutServicePageState,
  LayoutServiceContext,
  LayoutServiceContextData,
  RouteData,
  PlaceholderData,
  ComponentRendering,
  HtmlElementRendering,
  Field,
  Item,
  PlaceholdersData,
  ComponentFields,
  ComponentParams,
} from './layout/models';

export { getFieldValue, getChildPlaceholder } from './layout/utils';

export { LayoutService } from './layout/layout-service';

export {
  RestLayoutService,
  RestLayoutServiceConfig,
  DataFetcherResolver,
} from './layout/rest-layout-service';

export { GraphQLLayoutService, GraphQLLayoutServiceConfig } from './layout/graphql-layout-service';

export {
  GraphQLSitemapXmlService,
  GraphQLSitemapXmlServiceConfig,
  SitemapItem,
} from './sitemap/graphql-sitemap-xml-service';

export { constants };
