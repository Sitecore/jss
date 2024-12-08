import { Injectable, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { DictionaryPhrases } from '@sitecore-jss/sitecore-jss-angular';
import { EMPTY, Observable, of } from 'rxjs';
import { JssTranslationLoaderService } from './jss-translation-loader.service';
import { dictionaryStateKey } from './jss-translation-server-loader.service';

@Injectable()
export class JssTranslationClientLoaderService implements TranslateLoader {
  constructor(
    private fallbackLoader: JssTranslationLoaderService,
    private transferState: TransferState
  ) {}

  getTranslation(lang: string): Observable<DictionaryPhrases> {
    const dictionary = this.transferState.get(dictionaryStateKey, null);

    if (dictionary) {
      return of(dictionary);
    }

    if (!this.fallbackLoader) {
      return EMPTY;
    }

    // likely invoking the JSS translation service here
    return this.fallbackLoader.getTranslation(lang);
  }
}
