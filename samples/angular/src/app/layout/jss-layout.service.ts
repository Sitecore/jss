import { Injectable } from '@angular/core';
import {
  LayoutServiceData,
  LayoutServiceContextData,
  PlaceholderData,
} from '@sitecore-jss/sitecore-jss-angular';
import { from as fromPromise, Observable, throwError as observableThrow } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { layoutServiceFactory } from '../lib/layout-service-factory'

const layoutServiceFactoryInstance = layoutServiceFactory.create();

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}

@Injectable()
export class JssLayoutService {
  getRouteData(
    route: string,
    language: string
  ): Observable<LayoutServiceData | LayoutServiceError> {
    return fromPromise(layoutServiceFactoryInstance.fetchLayoutData(route, language)).pipe(
      catchError(this.getLayoutServiceError)
    );
  }

  getPlaceholderData(
    route: string,
    placeholderName: string,
    language: string
  ): Observable<PlaceholderData | LayoutServiceError | unknown> {
    return fromPromise(
      layoutServiceFactoryInstance.fetchPlaceholderData(placeholderName, route, language)
    ).pipe(catchError(this.getLayoutServiceError));
  }

  private getLayoutServiceError(error: { [key: string]: unknown }): Observable<LayoutServiceError> {
    const layoutServiceError = new LayoutServiceError();
    const response = error.response as { status: number; statusText: string; data: unknown };
    if (response) {
      layoutServiceError.status = response.status;
      layoutServiceError.statusText = response.statusText;
      layoutServiceError.data = response.data;
    }

    return observableThrow(layoutServiceError);
  }
}
