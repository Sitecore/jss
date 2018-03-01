import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LayoutService, LayoutServiceError } from './layout.service';
import { dataApi } from '@sitecore-jss/sitecore-jss-angular';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';
import { environment } from '../../environments/environment';

const { fetchRouteData, fetchPlaceholderData, fetchItemData } = dataApi;

const getFetchOptions = (language: string, options: any) => {
  const { params = <any>{}, ...requestOptions } = options;
  if (language) {
    params.sc_lang = language;
  }
  params.sc_apikey = environment.scApiKey;

  return {
    layoutServiceConfig: {
      host: environment.scApiHost,
      configurationName: environment.scLayoutServiceConfig,
    },
    querystringParams: { ...params },
    requestConfig: { ...requestOptions }
  };
};

@Injectable()
export class ConnectedLayoutService implements LayoutService {
  getRouteData(route: string, language: string, options: object = {}): Observable<any> {
    const fetchOptions = getFetchOptions(language, options);
    return fromPromise(fetchRouteData(route, fetchOptions)).pipe(
      catchError((error) => this.getLayoutServiceError(error))
    );
  }

  getPlaceholderData(placeholderName: string, route: string, language: string, options: object = {}): Observable<any> {
    const fetchOptions = getFetchOptions(language, options);
    return fromPromise(fetchPlaceholderData(placeholderName, route, fetchOptions)).pipe(
      catchError((error) => this.getLayoutServiceError(error))
    );
  }

  getItemData(itemPath: string, language: string, options: object = {}): Observable<any> {
    const { layoutServiceConfig, ...otherOptions } = getFetchOptions(
      language,
      options
    );
    const fetchOptions = {
      contentServiceConfig: layoutServiceConfig,
      ...otherOptions
    };
    return fromPromise(fetchItemData(itemPath, fetchOptions)).pipe(
      catchError((error) => this.getLayoutServiceError(error))
    );
  }

  getLayoutServiceError(error: any): ErrorObservable {
    const layoutServiceError = new LayoutServiceError();
    const response = error.response;
    if (response) {
      layoutServiceError.status = response.status;
      layoutServiceError.statusText = response.statusText;
    }
    return observableThrow(layoutServiceError);
  }
}
