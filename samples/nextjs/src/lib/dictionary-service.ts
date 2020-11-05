import config from '../temp/config';
import { dataFetcher } from './data-fetcher';

export class DictionaryService {
  
  constructor(
    private apiHost: string, 
    private apiKey: string, 
    private jssAppName: string
  ) {}

  async fetchDictionaryData(language: string) {

    const dictionaryServiceUrl = `${this.apiHost}/sitecore/api/jss/dictionary/${this.jssAppName}/${language}?sc_apikey=${this.apiKey}`;
    const response = await dataFetcher(dictionaryServiceUrl);
    if (response.data?.phrases) {
      return response.data.phrases;
    }
    return null;
  }
}

var configBasedDictionaryService = new DictionaryService(config.sitecoreApiHost, config.sitecoreApiKey, config.jssAppName);
export { configBasedDictionaryService };