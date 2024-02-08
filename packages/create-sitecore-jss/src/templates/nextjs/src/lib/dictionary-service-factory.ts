import {
  DictionaryService,
  RestDictionaryService,
  GraphQLDictionaryService,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

/**
 * Factory responsible for creating a DictionaryService instance
 */
export class DictionaryServiceFactory {
  /**
   * @param {string} siteName site name
   * @returns {DictionaryService} service instance
   */
  create(siteName: string): DictionaryService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? this.createWithRetryConfig(siteName)
      : new RestDictionaryService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
        });
  }

  /**
   * @param {string} siteName site name
   * @param {object} customRetryConfig custom retry configuration
   * @returns {DictionaryService} service instance with custom retry configuration
   */
  createWithRetryConfig(
    siteName: string,
    customRetryConfig?: Record<number, { retries: number; minimumTimeout: number }>
  ): DictionaryService {
    const defaultRetryConfig = {
      retries:
        (process.env.GRAPH_QL_SERVICE_RETRIES &&
          parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
        3,
      minimumTimeout: process.env.GRAPH_QL_SERVICE_RETRIES || 1000,
    };

    // Add or remove other default error codes as needed
    const retryConfig = customRetryConfig || {
      429: defaultRetryConfig,
      502: defaultRetryConfig,
      503: defaultRetryConfig,
      504: defaultRetryConfig,
      520: defaultRetryConfig,
      521: defaultRetryConfig,
      522: defaultRetryConfig,
      523: defaultRetryConfig,
      524: defaultRetryConfig,
    };

    return new GraphQLDictionaryService({
      siteName,
      clientFactory,
      retryConfig,
    });
  }
}

/** DictionaryServiceFactory singleton */
export const dictionaryServiceFactory = new DictionaryServiceFactory();
