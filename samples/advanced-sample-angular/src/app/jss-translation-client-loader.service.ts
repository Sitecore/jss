import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { empty as emptyObservable } from 'rxjs/observable/empty';
import { of as observableOf } from 'rxjs/observable/of';
import { TransferState, makeStateKey } from '@angular/platform-browser';

export const dictionaryStateKey = makeStateKey('jssDictionary');

@Injectable()
export class JssTranslationClientLoaderService implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private fallbackLoader: TranslateLoader,
  ) { }

  getTranslation(lang: string): Observable<any> {
    // on client initial load, retrieve initial dictionary from server
    const foundInitialState = this.transferState.hasKey(dictionaryStateKey);
    if (foundInitialState) {
      const dictionary = this.transferState.get(dictionaryStateKey, null);
      this.transferState.remove(dictionaryStateKey);
      return observableOf(dictionary);
    }

    if (!this.fallbackLoader) {
      return emptyObservable();
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
