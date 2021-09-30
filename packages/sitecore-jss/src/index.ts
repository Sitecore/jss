// NOTE: all imports are now named as to not make breaking changes
// and to keep react-native working with cjs modules.
// This will very likely change again when sub-modules are added.

import * as mediaApi from './media-api';
import * as constants from './constants';

export { mediaApi, constants };
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
  // models
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
  // utils
  getFieldValue,
  getChildPlaceholder,
  // layout-service
  LayoutService,
  // rest-layout-service
  RestLayoutService,
  RestLayoutServiceConfig,
  DataFetcherResolver,
  // graphql-layout-service
  GraphQLLayoutService,
  GraphQLLayoutServiceConfig,
} from './layout';
