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
            GraphQL endpoint may reach its rate limit with the amount of Layout and Dictionary requests it receives and throw a rate limit error.
            GraphQL Dictionary and Layout Services can handle rate limit errors from server and attempt a retry on requests.
            For this, specify the number of retries the GraphQL client will attempt.
            It will only try the request once by default.
            retries: 'number'
            Additionally, you have the flexibility to customize the retry strategy by passing your customized RetryStrategy
            object using the DefaultRetryStrategy class. The DefaultRetryStrategy class, which can be imported from the @sitecore-jss-nextjs
            package, provides two essential methods: 'shouldRetry' which returns a boolean indicating whether a retry should
            be attempted, and 'getDelay' which calculates the delay (in milliseconds) before the subsequent retry based on
            the encountered error and the current attempt.
            Example:
            retryStrategy: new DefaultRetryStrategy({
              statusCodes: 'number[]',
              factor: 'number' (The exponential factor to calculate backoff-time),
            }),
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
