import { Injectable } from '@angular/core';
import {
  LayoutServiceData,
  LayoutServiceContextData,
} from '@sitecore-jss/sitecore-jss-angular';
import { from as fromPromise, Observable, throwError as observableThrow } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { layoutServiceFactory } from '../lib/layout-service-factory';

const layoutServiceInstance = layoutServiceFactory.create();

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
    return fromPromise(layoutServiceInstance.fetchLayoutData(route, language)).pipe(
      catchError(this.getLayoutServiceError)
    );
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
