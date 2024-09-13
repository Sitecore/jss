import { makeStateKey, Injectable, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { EMPTY, of } from 'rxjs';

export const dictionaryStateKey = makeStateKey<{ [key: string]: string }>('jssDictionary');

@Injectable()
export class JssTranslationClientLoaderService implements TranslateLoader {
  constructor(private fallbackLoader: TranslateLoader, private transferState: TransferState) {}

  getTranslation(lang: string) {
    const storedDictionary = this.transferState.get<{ [key: string]: string } | null>(
      dictionaryStateKey,
      null
    );

    if (storedDictionary !== null && Object.keys(storedDictionary).length > 0) {
      return of(storedDictionary);
    }

    if (!this.fallbackLoader) {
      return EMPTY;
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
