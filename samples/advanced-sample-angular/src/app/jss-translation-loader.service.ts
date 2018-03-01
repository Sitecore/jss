import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../environments/environment';
import { map } from 'rxjs/operators/map';

class DictionaryResult {
  phrases: any;
}

@Injectable()
export class JssTranslationLoaderService implements TranslateLoader {
  constructor(
    private http: HttpClient
  ) { }

  getTranslation(lang: string): Observable<any> {
    const options = {
      params: {
        sc_apikey: env.scApiKey
      }
    };
    return this.http.get(`${env.scApiHost}/sitecore/api/jss/dictionary/${env.scAppName}/${lang}`, options)
      .pipe(
        map((dictionary: DictionaryResult) => dictionary.phrases),
      );
  }
}
