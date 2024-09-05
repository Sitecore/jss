import { Injectable } from '@angular/core';
import {
  LayoutServiceData,
  LayoutServiceContextData,
} from '@sitecore-jss/sitecore-jss-angular';
import { from as fromPromise, Observable, throwError as observableThrow } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { layoutServiceFactory } from '../lib/layout-service-factory';

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}

const layoutServiceInstance = layoutServiceFactory.create();

@Injectable()
export class JssLayoutService {
  getRouteData(
    route: string,
    language: string
  ): Observable<LayoutServiceData | LayoutServiceError> {
    return fromPromise(layoutServiceInstance.fetchLayoutData(route, language)).pipe(
      map(routeData => {
        if (!routeData.sitecore.route) {
          // A missing route value signifies an invalid path, so simulate Not Found error
          const error = new LayoutServiceError();
          error.status = 404;
          error.statusText = 'Not Found';
          error.data = routeData;
          throw error;
        }
        return routeData;
      }),
      catchError(this.getLayoutServiceError)
    );
  }

  private getLayoutServiceError(error: { [key: string]: unknown }): Observable<LayoutServiceError> {
    if (error instanceof LayoutServiceError) {
      return observableThrow(() => error);
    }
    const layoutServiceError = new LayoutServiceError();
    const response = error.response as { status: number; statusText: string; data: unknown };
    if (response) {
      layoutServiceError.status = response.status;
      layoutServiceError.statusText = response.statusText;
      layoutServiceError.data = response.data;
    }

    return observableThrow(() => layoutServiceError);
  }
}
