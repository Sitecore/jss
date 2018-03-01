import { Inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { empty as emptyObservable } from 'rxjs/observable/empty';
import { map } from 'rxjs/operators/map';
import { dictionaryStateKey } from './jss-translation-client-loader.service';

class ViewBag {
  viewBag: any;
}

@Injectable()
export class JssTranslationServerLoaderService implements TranslateLoader {
  constructor(
    protected transferState: TransferState,
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_TO_SSR') private serverToSsrState: ViewBag,
    protected fallbackLoader: TranslateLoader,
  ) { }

  getTranslation(lang: string): Observable<any> {
    // read initial dictionary from data injected via server.bundle wrapper
    const dictionary = this.serverToSsrState.viewBag.dictionary;
    if (dictionary) {
      this.transferDictionary(dictionary);
      return observableOf(dictionary);
    }

    if (!this.fallbackLoader) {
      return emptyObservable();
    }

    // running server side but no dictionary, so attempt to fallback (likely to dictionary service)
    // this happens during server-side rendering on the headless proxy
    return this.fallbackLoader.getTranslation(lang).pipe(
      map(result => {
        this.transferDictionary(result);
        return result;
      })
    );
  }

  private transferDictionary(dictionary: any) {
    // place the initial dictionary into TransferState for the client
    this.transferState.set(dictionaryStateKey, dictionary);
    console.log(`Received server dictionary: ${JSON.stringify(dictionary, null, 2)}`);
  }
}
