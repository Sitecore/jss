import { Injectable } from '@angular/core';
import { LayoutService, LayoutServiceError } from './layout.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { convertRouteToLayoutServiceFormat } from '@sitecore-jss/sitecore-jss-angular';
import { DataModels } from '@sitecore-jss/sitecore-jss/types/customTypes/dataModels';

@Injectable()
export class DisconnectedLayoutService implements LayoutService {
  constructor(
    private http: HttpClient,
  ) { }

  getRouteData(route: string, language: string, options: object = {}): Observable<any> {
    const routePath = route === '/' ? '' : route;
    const routeData$ = this.http.get<DataModels.LayoutService.RouteData>(`/data/routes${routePath}/${language}.json`, this.getHttpOptions())
      .pipe(map(routeData => convertRouteToLayoutServiceFormat(routeData)));
    const contextData$ = this.http.get<DataModels.LayoutService.ContextData>(`/data/context/${language}.json`, this.getHttpOptions());
    return forkJoin([routeData$, contextData$]).pipe(
      map(results => {
        const routeData = results[0];
        const contextData = results[1];
        if (routeData.context && routeData.route) {
          // contains context and route
          return {
            sitecore: { ...routeData }
          };
        }
        return {
          sitecore: {
            context: contextData,
            route: routeData
          }
        };
      }),
      catchError((error) => this.getLayoutServiceError(error))
    );
  }

  getPlaceholderData(placeholderName: string, route: string, language: string, options: object = {}): Observable<any> {
    const routePath = route === '/' ? '' : route;
    return this.http.get<DataModels.LayoutService.RouteData>(`/data/routes${routePath}/${language}.json`, this.getHttpOptions())
      .pipe(
      map(routeData => routeData.placeholders[placeholderName]),
      catchError((error) => this.getLayoutServiceError(error))
      );
  }

  getItemData(itemPath: string, language: string, options: object = {}): Observable<any> {
    return this.http.get<DataModels.LayoutService.RouteData>(`/data${itemPath}/${language}.json`, this.getHttpOptions())
      .pipe(
      map(routeData => convertRouteToLayoutServiceFormat(routeData)),
      catchError((error) => this.getLayoutServiceError(error))
      );
  }

  getHttpOptions(): object {
    return { withCredentials: true };
  }

  getLayoutServiceError(error: HttpErrorResponse): ErrorObservable {
    const layoutServiceError = new LayoutServiceError();
    layoutServiceError.status = error.status;
    layoutServiceError.statusText = error.statusText;
    return observableThrow(layoutServiceError);
  }
}
