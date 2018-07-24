import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';

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
        sc_apikey: env.sitecoreApiKey
      }
    };
    return this.http.get(`${env.sitecoreApiHost}/sitecore/api/jss/dictionary/${env.jssAppName}/${lang}`, options)
      .pipe(
        map((dictionary: DictionaryResult) => dictionary.phrases),
      );
  }
}
