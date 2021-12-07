import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-angular';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { JssState } from './JssState';
import { JssLayoutService, LayoutServiceError } from './layout/jss-layout.service';

export const jssKey = makeStateKey<JssState>('jss');

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the client (browser) side; see jss-context.server-side.service.ts
 * for the implementation that runs on the server (SSR) side.
 */
@Injectable()
export class JssContextService {
  // components can subscribe to this (or use getValue()) to get access to latest data from Layout Service,
  // as well as current language and server route
  state: BehaviorSubject<JssState>;

  constructor(protected transferState: TransferState, protected layoutService: JssLayoutService) {
    this.state = new BehaviorSubject<JssState>(new JssState());
  }

  changeLanguage(language: string) {
    this.state.next({ ...this.state.value, language });
  }

  // primarily invoked by JssRouteResolver on URL/route change
  changeRoute(route: string, language: string): Observable<JssState> {
    // on client initial load, retrieve initial state from server
    const foundInitialState = this.transferState.hasKey(jssKey);
    if (foundInitialState) {
      const jssState = this.transferState.get<JssState>(jssKey, null);
      this.transferState.remove(jssKey);
      this.state.next(jssState);
      return observableOf(jssState);
    }

    const appLanguage = this.state.value.language || language;

    const jssState$ = this.layoutService.getRouteData(route, appLanguage).pipe(
      map((routeData) => {
        const lsResult = routeData as LayoutServiceData;

        const result = new JssState();
        result.sitecore = lsResult.sitecore ? lsResult.sitecore : null;
        result.language = appLanguage;
        result.serverRoute = route;
        return result;
      }),
      catchError((error: LayoutServiceError) => {
        const result = new JssState();
        result.language = appLanguage;
        result.serverRoute = route;
        result.routeFetchError = error;
        return observableOf(result);
      }),
      shareReplay(1)
    );

    // subscribe to it ourselves so we can maintain current state
    jssState$.subscribe((jssState) => {
      this.state.next(jssState);
    });

    return jssState$;
  }
}
