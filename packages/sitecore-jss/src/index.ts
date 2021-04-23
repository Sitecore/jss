import * as mediaApi from './media-api';
import * as constants from './constants';
export * from './utils';
export * from './context';

// TODO: these are deprecated and we should stop exporting them
import { fetchRouteData, fetchPlaceholderData } from './layout/rest-layout-service';
const dataApi = { fetchRouteData, fetchPlaceholderData };
export { dataApi };

export { mediaApi, constants };

export { default as debug, Debugger } from './debug';

// generic API access abstractions
export { HttpDataFetcher, HttpResponse } from './data-fetcher';

// API access implementations
export { GraphQLRequestClient, GraphQLRequestClientConfig } from './graphql-request-client';

export { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';

// i18n
export { DictionaryPhrases, DictionaryService } from './i18n/dictionary-service';

export {
  GraphQLDictionaryService,
  GraphQLDictionaryServiceConfig,
} from './i18n/graphql-dictionary-service';

export { RestDictionaryService, RestDictionaryServiceConfig } from './i18n/rest-dictionary-service';

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
  LayoutServiceRequestOptions,
} from './layout/rest-layout-service';

export { GraphQLLayoutService, GraphQLLayoutServiceConfig } from './layout/graphql-layout-service';
