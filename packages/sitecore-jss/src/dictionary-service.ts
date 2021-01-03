import { AxiosResponse } from 'axios';
import { AxiosDataFetcher } from './data-fetcher';
import { DictionaryPhrases, DictionaryServiceData } from './dataModels';
import { HttpJsonFetcher } from './httpClientInterface';

export type DictionaryServiceConfig = {
  apiHost: string;
  apiKey: string;
  jssAppName: string;
  dataFetcher?: HttpJsonFetcher<DictionaryServiceData>;
};

export class DictionaryService {
  constructor(private dictionaryServiceConfig: DictionaryServiceConfig) {}

  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const { apiHost, jssAppName, apiKey, dataFetcher } = this.dictionaryServiceConfig;

    const fetcher = dataFetcher || this.getDefaultFetcher();

    const dictionaryServiceUrl = `${apiHost}/sitecore/api/jss/dictionary/${jssAppName}/${language}?sc_apikey=${apiKey}`;
    const response = await fetcher(dictionaryServiceUrl);

    return response.data.phrases;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  private getDefaultFetcher = () => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string): Promise<AxiosResponse<DictionaryServiceData>> =>
      axiosFetcher.fetch(url);

    return fetcher;
  };
}
