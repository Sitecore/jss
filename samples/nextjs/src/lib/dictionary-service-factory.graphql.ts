import { DictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    throw new Error('GraphQLDictionaryService not implemented!');
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
