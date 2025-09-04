import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from as fromPromise } from 'rxjs';
import { dictionaryServiceFactory } from '../lib/dictionary-service-factory';

export const dictionaryServiceInstance = dictionaryServiceFactory.create();

@Injectable()
export class JssTranslationLoaderService implements TranslateLoader {
  getTranslation(lang: string) {
    return fromPromise(dictionaryServiceInstance.fetchDictionaryData(lang));
  }
}
