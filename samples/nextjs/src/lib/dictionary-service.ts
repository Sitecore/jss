import { DictionaryServiceData, DictionaryPhrases } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { dataFetcher } from './data-fetcher';

export class DictionaryService {
  constructor(private apiHost: string, private apiKey: string, private jssAppName: string) {}

  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const dictionaryServiceUrl = `${this.apiHost}/sitecore/api/jss/dictionary/${this.jssAppName}/${language}?sc_apikey=${this.apiKey}`;
    const response = await dataFetcher<DictionaryServiceData>(dictionaryServiceUrl);
    return response.data.phrases;
  }
}

const dictionaryService = new DictionaryService(
  config.sitecoreApiHost,
  config.sitecoreApiKey,
  config.jssAppName
);
export { dictionaryService };
