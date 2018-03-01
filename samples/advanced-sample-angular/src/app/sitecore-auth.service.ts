import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { environment as env } from '../environments/environment';

@Injectable()
export class SitecoreAuthService {
  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<boolean> {
    const payload = {
      domain: 'extranet',
      username,
      password
    };
    return this.http.post(`${env.scApiHost}/sitecore/api/ssc/auth/login`, payload, this.getHtttpOptions()).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        // production code may want to look closer at the error (failed login vs server error, etc)
        return Observable.of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post(`${env.scApiHost}/sitecore/api/ssc/auth/logout`, null, this.getHtttpOptions()).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        // production code may want to look closer at the error (failed login vs server error, etc)
        return Observable.of(false);
      })
    );
  }

  private getHtttpOptions(): any {
    return {
      params: {
        sc_apikey: env.scApiKey
      },
      withCredentials: true
    };
  }
}
