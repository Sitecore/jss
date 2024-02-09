import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

/**
 * Factory responsible for creating a LayoutService instance
 */
export class LayoutServiceFactory {
  /**
   * @param {string} siteName site name
   * @returns {LayoutService} service instance
   */
  create(siteName: string): LayoutService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          siteName,
          clientFactory,
          /*
            GraphQL endpoint may reach its rate limit with the amount of requests it receives and throw a rate limit error.
            GraphQL Dictionary and Layout Services can handle rate limit errors from server and attempt a retry on requests.
            For this, specify the number of 'retries' the GraphQL client will attempt.
            It will only try the request once by default.

            Additionally, you have the flexibility to customize the retry strategy by passing a 'retryStrategy'.
            By default it uses the `DefaultRetryStrategy` with exponential back-off factor of 2 for error codes 429,
            502, 503, 504, 520, 521, 522, 523, and 524. You can use this class or your own implementation of `RetryStrategy`.
          */
          retries:
            (process.env.GRAPH_QL_SERVICE_RETRIES &&
              parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
            0,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
          configurationName: config.layoutServiceConfigurationName,
        });
  }
}

/** LayoutServiceFactory singleton */
export const layoutServiceFactory = new LayoutServiceFactory();
