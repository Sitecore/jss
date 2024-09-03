import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LayoutServiceContextData, LayoutServiceData, RouteData } from '../public_api';
import { Injectable, TransferState } from '@angular/core';

export class JssState {
  language: string;
  serverRoute: string;
  routeFetchError?: LayoutServiceError;
  sitecore?: LayoutServiceContextData & {
    route: RouteData | null;
  };
  viewBag?: { [key: string]: unknown };
}

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}

@Injectable()
export abstract class AngularLayoutService {
  getRouteData(
    route: string,
    language: string
  ): Observable<LayoutServiceData | LayoutServiceError> {
    const layoutServiceError = new LayoutServiceError();

    layoutServiceError.status = 503;
    layoutServiceError.statusText = 'Layout Service not implemented';
    layoutServiceError.data = {
      sitecore: {
        context: {
          route,
          language,
        },
      },
    };

    return throwError(() => layoutServiceError);
  }
}

@Injectable()
export abstract class AngularContextService {
  // components can subscribe to this (or use getValue()) to get access to latest data from Layout Service,
  // as well as current language and server route
  state: BehaviorSubject<JssState>;

  constructor(
    protected transferState: TransferState,
    protected layoutService: AngularLayoutService
  ) {
    this.state = new BehaviorSubject<JssState>(new JssState());
  }

  changeLanguage(language: string) {
    console.log(`Called change language on abstract JssContext for ${language}`);
    throw Error('Not implemented');
  }

  // primarily invoked by JssRouteResolver on URL/route change
  changeRoute(route: string, language: string): Observable<JssState> {
    console.log(`Called change route on abstract JssContext for ${route}, ${language}`);
    return throwError(() => new Error('Not implemented'));
  }
}
