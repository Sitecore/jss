import { Injectable } from '@angular/core';
import {
  dataApi,
  LayoutServiceData,
  LayoutServiceRequestOptions,
  PlaceholderData,
} from '@sitecore-jss/sitecore-jss';
import { from as fromPromise, Observable, throwError as observableThrow } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LayoutServiceError } from './layout-service-error';

// TODO: these are deprecated and we should switch to using new methods
const { fetchRouteData, fetchPlaceholderData } = dataApi;

@Injectable()
export class LayoutService {
  private static getLayoutServiceError(error: any): Observable<LayoutServiceError> {
    const layoutServiceError = new LayoutServiceError();
    const response = error.response;
    if (response) {
      layoutServiceError.status = response.status;
      layoutServiceError.statusText = response.statusText;
      layoutServiceError.data = response.data;
    }

    return observableThrow(layoutServiceError);
  }

  getRouteData(
    route: string,
    options: LayoutServiceRequestOptions<LayoutServiceData>
  ): Observable<LayoutServiceData | LayoutServiceError> {
    return fromPromise(fetchRouteData(route, options)).pipe(
      catchError(LayoutService.getLayoutServiceError)
    );
  }

  getPlaceholderData(
    route: string,
    placeholderName: string,
    options: LayoutServiceRequestOptions<PlaceholderData>
  ): Observable<PlaceholderData | LayoutServiceError> {
    return fromPromise(fetchPlaceholderData(placeholderName, route, options)).pipe(
      catchError(LayoutService.getLayoutServiceError)
    );
  }
}
