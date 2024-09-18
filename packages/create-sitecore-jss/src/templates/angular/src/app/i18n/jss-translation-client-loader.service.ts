import { makeStateKey, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { isPlatformServer } from '@angular/common';
import { EMPTY } from 'rxjs';

export const dictionaryStateKey = makeStateKey<{ [key: string]: string }>('jssDictionary');

@Injectable({
  providedIn: 'root',
})
export class JssTranslationClientLoaderService implements TranslateLoader {
  private isServer: boolean;

  constructor(
    private fallbackLoader: TranslateLoader,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(this.platformId);
  }

  getTranslation(lang: string) {
    if (!this.fallbackLoader) {
      return EMPTY;
    }

    console.log(this.isServer);

    if (this.isServer) {
      return EMPTY;
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
