import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { makeStateKey } from '@angular/platform-browser';

export const dictionaryStateKey = makeStateKey('jssDictionary');

@Injectable()
export class JssTranslationClientLoaderService implements TranslateLoader {
  constructor(
    private fallbackLoader: TranslateLoader,
  ) { }

  getTranslation(lang: string) {
    if (!this.fallbackLoader) {
      return EMPTY;
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
