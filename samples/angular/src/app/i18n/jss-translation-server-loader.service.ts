import { Inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { Observable, of as observableOf, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JssTranslationServerLoaderService implements TranslateLoader {
  constructor(
    protected transferState: TransferState,
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_VIEWBAG') private serverViewBag: any,
    protected fallbackLoader: TranslateLoader,
  ) { }

  getTranslation(lang: string): Observable<any> {
    // read initial dictionary from data injected via server.bundle wrapper
    const dictionary = this.serverViewBag.dictionary;
    if (dictionary) {
      return observableOf(dictionary);
    }

    if (!this.fallbackLoader) {
      return EMPTY;
    }

    // running server side but no dictionary, so attempt to fallback (likely to dictionary service)
    // this happens during server-side rendering on the headless proxy
    return this.fallbackLoader.getTranslation(lang).pipe(
      map(result => {
        return result;
      })
    );
  }
}
