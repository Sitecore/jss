import { Inject, Injectable, makeStateKey, StateKey, TransferState } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { DictionaryPhrases } from '@sitecore-jss/sitecore-jss-angular';
import { of as observableOf, EMPTY } from 'rxjs';

export const dictionaryStateKey: StateKey<DictionaryPhrases> = makeStateKey<DictionaryPhrases>(
  'dictionary'
);

@Injectable()
export class JssTranslationServerLoaderService implements TranslateLoader {
  constructor(
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_VIEWBAG')
    private serverViewBag: { [key: string]: unknown; dictionary: DictionaryPhrases },
    private transferState: TransferState
  ) {}
  getTranslation(_lang: string) {
    // read initial dictionary from data injected via server.bundle wrapper
    const dictionary = this.serverViewBag.dictionary;

    // set the dictionary in transfer state for the client
    // since for ng-translate there is no obvious way to pass the server side dictionary to the client
    // https://github.com/ngx-translate/core/issues/1207#issuecomment-700741671
    this.transferState.set(dictionaryStateKey, dictionary);

    if (dictionary) {
      return observableOf(dictionary);
    }

    console.warn(
      'Dictionary was not present in SSR viewbag. Translations will not be server-side rendered.'
    );
    return EMPTY;
  }
}
