/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';

export const dictionaryStateKey = makeStateKey('jssDictionary');

@Injectable()
export class JssTranslationClientLoaderService implements TranslateLoader {
  constructor(
    protected fallbackLoader: JssTranslationLoaderService,
    protected transferState: TransferState
  ) {}

  getTranslation(lang: string): Observable<DictionaryPhrases> {
    const dictionary = this.transferState.get(dictionaryStateKey, null);

    if (dictionary) {
      return of(dictionary);
    }

  getTranslation(lang: string) {
    if (!this.fallbackLoader) {
      return EMPTY;
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
