import * as mediaApi from './media-api';
import * as constants from './constants';

export { mediaApi, constants };
export * from './utils';
export * from './graphql';
export { default as debug, Debugger } from './debug';
export { HttpDataFetcher, HttpResponse, fetchData } from './data-fetcher';
export * from './graphql-request-client';
export * from './axios-fetcher';
export * from './cache-client';
export * from './i18n';

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
export { PersonalizationService, PersonalizationResult, PersonalizationLoadResult } from './personalization/layout-personalization-service';

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

// TODO: these are deprecated and we should stop exporting them
import { fetchRouteData, fetchPlaceholderData } from './layout/rest-layout-service';
const dataApi = { fetchRouteData, fetchPlaceholderData };
export { dataApi };
