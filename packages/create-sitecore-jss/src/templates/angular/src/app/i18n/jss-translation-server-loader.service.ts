/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { of as observableOf, EMPTY } from 'rxjs';
import { ViewBag } from '../ViewBag';

@Injectable()
export class JssTranslationServerLoaderService implements TranslateLoader {
  constructor(
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    protected serverViewBag: ViewBag,
    protected transferState: TransferState
  ) {}

  getTranslation(_lang: string) {
    // read initial dictionary from data injected via server.bundle wrapper
    const dictionary = this.serverViewBag.dictionary;
    if (dictionary) {
      return observableOf(dictionary);
    }

    console.warn(
      'Dictionary was not present in SSR viewbag. Translations will not be server-side rendered.'
    );
    return EMPTY;
  }
}
