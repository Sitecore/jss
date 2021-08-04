import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from as fromPromise } from 'rxjs';
import { dictionaryServiceFactory } from '../lib/dictonary-service-factory';

export const dictionaryServiceFactoryInstance = dictionaryServiceFactory.create();

@Injectable()
export class JssTranslationLoaderService implements TranslateLoader {
  getTranslation(lang: string) {
    return fromPromise(dictionaryServiceFactoryInstance.fetchDictionaryData(lang));
  }
}
