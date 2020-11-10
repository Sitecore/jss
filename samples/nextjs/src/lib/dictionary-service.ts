import { DictionaryServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import config from '../temp/config';
import { dataFetcher } from './data-fetcher';

export interface DictionaryPhrases {
  [k: string]: string;
}

export class DictionaryService {
  constructor(private apiHost: string, private apiKey: string, private jssAppName: string) {}

  async fetchDictionaryData(language: string): Promise<DictionaryPhrases | null> {
    const dictionaryServiceUrl = `${this.apiHost}/sitecore/api/jss/dictionary/${this.jssAppName}/${language}?sc_apikey=${this.apiKey}`;
    const response = await dataFetcher<DictionaryServiceData>(dictionaryServiceUrl);
    if (response.data?.phrases) {
      return response.data.phrases;
    }
    return null;
  }
}

const configBasedDictionaryService = new DictionaryService(
  config.sitecoreApiHost,
  config.sitecoreApiKey,
  config.jssAppName
);
export { configBasedDictionaryService };
