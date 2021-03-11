import mcache from 'memory-cache';
import chalk from 'chalk';
import { AxiosDataFetcher } from './axios-fetcher';
import { fetchData } from './data-api';
import { DictionaryPhrases, DictionaryServiceData } from './data-models';
import { HttpDataFetcher } from './data-fetcher';
import { GraphQLRequestClient } from './graphql-request-client';
import { SitecoreTemplateId } from './constants';

const STD_TTL = 60;

export interface DictionaryService {
  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}

type CacheOptions = {
  /**
  * Enable/disable caching mechanism
  * @default true
  */
  cacheEnabled?: boolean;
  /**
   * Cache timeout (sec)
   * @default 60
   */
  cacheTimeout?: number;
}

export type RestDictionaryServiceConfig = CacheOptions & {
  /**
   * Your Sitecore instance hostname that is the backend for JSS
   */
  apiHost: string;
  /**
   * The Sitecore SSC API key your app uses
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * Custom data fetcher
   * @see HttpDataFetcher<T>
   */
  dataFetcher?: HttpDataFetcher<DictionaryServiceData>;
};

/**
 * Fetch dictionary data using the Sitecore Dictionary Service REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class RestDictionaryService implements DictionaryService {
  constructor(private dictionaryServiceConfig: RestDictionaryServiceConfig) { }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const {
      dataFetcher,
      apiKey,
      cacheTimeout = STD_TTL,
      cacheEnabled = true,
    } = this.dictionaryServiceConfig;

    const fetcher = dataFetcher || this.getDefaultFetcher();

    const dictionaryServiceUrl = this.getUrl(language);

    if (cacheEnabled) {
      const cachedBody = mcache.get(dictionaryServiceUrl) as DictionaryPhrases;

      if (cachedBody) {
        return cachedBody;
      }
    }

    const response = await fetchData<DictionaryServiceData>(dictionaryServiceUrl, fetcher, {
      sc_apikey: apiKey,
    });

    if (cacheEnabled) {
      mcache.put(dictionaryServiceUrl, response.phrases, cacheTimeout);
    }

    return response.phrases;
  }

  /**
   * Generate dictionary service url
   * @param {string} language
   */
  private getUrl(language: string) {
    const { apiHost, siteName } = this.dictionaryServiceConfig;

    return `${apiHost}/sitecore/api/jss/dictionary/${siteName}/${language}`;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  private getDefaultFetcher = () => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string) => axiosFetcher.fetch<DictionaryServiceData>(url);

    return fetcher;
  };
}


export type GraphQLDictionaryServiceConfig = CacheOptions & {
  endpoint: string;
}

type DictionaryQueryResult = {
  search: {
    dictionaryPhrases: {

      key: {
        value: string
      },
      phrase: {
        value: string
      }
    }[];
  };
};

/**
 * Fetch dictionary data using the Sitecore Dictionary Service REST API.
 * Uses graphql-request as the default data fetcher (@see GraphQLRequestClient).
 */
export class GraphQLDictionaryService implements DictionaryService {

  /**
   * Creates an instance of graphQL dictionary service with the provided options.
   * @param config (GraphQLDictionaryServiceConfig instance)
   */
  constructor(private options: GraphQLDictionaryServiceConfig) { }

  /**
   * Fetches dictionary data for internalization.
   * @param {string} locale locale which application supports
   * @param {string} rootItemPath root item path
   *
   * @default Search query
     query Search($rootItemId: String!, $locale: String!) {
       search(
         where: {
           AND:[
             { name: "_path",      value: $rootItemId },
             { name: "_language",  value: $language   },
             { name: "_templates", value:"6d1cd89719364a3aa511289a94c2a7b1" }
           ]
         }
       ) {
         total
         dictionaryPhrases: results {
           key: field(name: "key") {
             value
           },
           phrase: field(name: "phrase") {
             value
           }
         }
       }
     }
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    // todo: move in 'getDefaultFetcher'
    const dataFetcher = new GraphQLRequestClient(this.options.endpoint);

    // todo: why isn't this detecting the type implicitly?
    const fetchResponse = await dataFetcher.
      request<DictionaryQueryResult>(query, {
        rootItemId: "0de95ae441ab4d019eb067441b7c2450",
        language,
        dictionaryEntryTemplateId: SitecoreTemplateId.DictionaryEntry
      })
      // todo: move generic error handling and chalk import to graphql client 
      .catch((error) => {
        console.error(
          chalk.red('Error occurred while fetching dictionary items:'),
          error.response || error
        );

        return null;
      });

    const items = fetchResponse?.search.dictionaryPhrases ?? [];

    // todo: add caching & pagination

    return items.reduce((dictionaryPhrases, dictionaryPhrase) => {
      dictionaryPhrases[dictionaryPhrase.key.value] = dictionaryPhrase.phrase.value;
      return dictionaryPhrases;
    }, ({} as DictionaryPhrases));
  }
}

const query = `
query DictionarySearch($rootItemId: String!, $language: String!, $dictionaryEntryTemplateId: String!) {
  search(
    where: {
      AND:[
        { name: "_path",      value: $rootItemId },
        { name: "_templates", value: $dictionaryEntryTemplateId },
        { name: "_language",  value: $language }
      ]
    }
  ) {
    total
    dictionaryPhrases: results {
      key: field(name: "key") {
        value
      },
      phrase: field(name: "phrase") {
        value
      }
    }
  }
}
`;