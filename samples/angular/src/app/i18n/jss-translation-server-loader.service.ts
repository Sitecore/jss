import { Inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of as observableOf, EMPTY } from 'rxjs';

@Injectable()
export class JssTranslationServerLoaderService implements TranslateLoader {
  constructor(
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_VIEWBAG') private serverViewBag: any,
  ) { }

  getTranslation(lang: string): Observable<any> {
    // read initial dictionary from data injected via server.bundle wrapper
    const dictionary = this.serverViewBag.dictionary;
    if (dictionary) {
      return observableOf(dictionary);
    }

    console.warn('Dictionary was not present in SSR viewbag. Translations will not be server-side rendered.');
    return EMPTY;
  }
}
