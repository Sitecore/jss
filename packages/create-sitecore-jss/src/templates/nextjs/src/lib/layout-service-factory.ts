import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(): LayoutService {
    return process.env.FETCH_WITH === 'GraphQL'
      ? new GraphQLLayoutService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName: config.jssAppName,
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
          siteName: config.jssAppName,
          configurationName: 'default',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
