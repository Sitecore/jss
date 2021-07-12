import { Injectable } from '@angular/core';
import {
  LayoutServiceData,
  LayoutServiceContextData,
  RestLayoutService,
  PlaceholderData,
} from '@sitecore-jss/sitecore-jss-angular';
import { from as fromPromise, Observable, throwError as observableThrow } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const layoutServiceInstance = new RestLayoutService({
  apiHost: environment.sitecoreApiHost,
  apiKey: environment.sitecoreApiKey,
  siteName: environment.jssAppName,
});

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}

@Injectable()
export class JssLayoutLoaderService {
  getRouteData(
    route: string,
    language: string
  ): Observable<LayoutServiceData | LayoutServiceError> {
    return fromPromise(layoutServiceInstance.fetchLayoutData(route, language)).pipe(
      catchError(this.getLayoutServiceError)
    );
  }

  getPlaceholderData(
    route: string,
    placeholderName: string,
    language: string
  ): Observable<PlaceholderData | LayoutServiceError> {
    return fromPromise(
      layoutServiceInstance.fetchPlaceholderData(placeholderName, route, language)
    ).pipe(
      catchError(this.getLayoutServiceError)
    );
  }

  private getLayoutServiceError(error: any): Observable<LayoutServiceError> {
    const layoutServiceError = new LayoutServiceError();
    const response = error.response;
    if (response) {
      layoutServiceError.status = response.status;
      layoutServiceError.statusText = response.statusText;
      layoutServiceError.data = response.data;
    }

    return observableThrow(layoutServiceError);
  }
}
