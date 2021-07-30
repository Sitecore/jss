import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from as fromPromise } from 'rxjs';
import { RestDictionaryService } from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';

export const dictionaryService = new RestDictionaryService({
  apiHost: env.sitecoreApiHost,
  apiKey: env.sitecoreApiKey,
  siteName: env.jssAppName,
});

@Injectable()
export class JssTranslationLoaderService implements TranslateLoader {
  getTranslation(lang: string) {
    return fromPromise(dictionaryService.fetchDictionaryData(lang));
  }
}
