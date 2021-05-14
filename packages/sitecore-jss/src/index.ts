import * as mediaApi from './media-api';
import * as constants from './constants';
export {
  isServer,
  resolveUrl,
  isExperienceEditorActive,
  resetExperienceEditorChromes,
  getAppRootId,
} from './utils';

// TODO: these are deprecated and we should stop exporting them
import { fetchRouteData, fetchPlaceholderData } from './layout/rest-layout-service';
const dataApi = { fetchRouteData, fetchPlaceholderData };
export { dataApi };

export { mediaApi, constants };

export { default as debug, Debugger } from './debug';

// generic API access abstractions
export { HttpDataFetcher, HttpResponse, fetchData } from './data-fetcher';

// API access implementations
export { GraphQLRequestClient, GraphQLRequestClientConfig } from './graphql-request-client';

export { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';

// i18n
export {
  DictionaryPhrases,
  DictionaryService,
  GraphQLDictionaryService,
  GraphQLDictionaryServiceConfig,
  RestDictionaryService,
  RestDictionaryServiceData,
  RestDictionaryServiceConfig,
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
  LayoutServiceConfig,
  LayoutServiceRequestOptions,
} from './layout/rest-layout-service';

export { GraphQLLayoutService, GraphQLLayoutServiceConfig } from './layout/graphql-layout-service';
export { LayoutPersonalizationUtils } from './personalization/layout-personalization-utils';
export { LayoutPersonalizationService, PersonalizationResult, PersonalizationLoadResult } from './personalization/layout-personalization-service';

export {
  LayoutFragmentData,
  LayoutFragmentService,
  GraphQLLayoutFragmentService,
  GraphQLLayoutFragmentServiceConfig
} from './personalization/layout-fragment-service';
export {
  PersonalizationDecisionData,
  RenderingPersonalizationDecision,
  PersonalizationDecisionsService,
  RestPersonalizationDecisionsServiceConfig,
  RestPersonalizationDecisionsService
} from './personalization/personalization-decisions-service';
