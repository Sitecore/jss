import * as mediaApi from './media-api';
import * as constants from './constants';
import isServer from './utils/is-server';
import resolveUrl from './utils/resolve-url';

// TODO: these are deprecated and we should stop exporting them
import { fetchRouteData, fetchPlaceholderData } from './layout/rest-layout-service';
const dataApi = { fetchRouteData, fetchPlaceholderData };
export { dataApi };

export { mediaApi, constants, isServer, resolveUrl };

export { default as debug, Debugger } from './debug';

export { isExperienceEditorActive, resetExperienceEditorChromes } from './experience-editor';

// generic API access abstractions
export { HttpDataFetcher, HttpResponse } from './data-fetcher';

// API access implementations
export { GraphQLRequestClient, GraphQLRequestClientConfig } from './graphql-request-client';

export { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';

export { getAppRoot } from './utils/app-root-resolver';

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
