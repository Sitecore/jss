import { Injectable, TransferState, makeStateKey } from '@angular/core';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { AngularContextService, AngularLayoutService, JssState, LayoutServiceData, LayoutServiceError } from '@sitecore-jss/sitecore-jss-angular';

export const jssKey = makeStateKey<JssState>('jss');

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the client (browser) side; see jss-context.server-side.service.ts
 * for the implementation that runs on the server (SSR) side.
 */
@Injectable()
export class JssContextService extends AngularContextService {
  // components can subscribe to this (or use getValue()) to get access to latest data from Layout Service,
  // as well as current language and server route

  constructor(
    protected transferState: TransferState,
    protected layoutService: AngularLayoutService
  ) {
    super(transferState, layoutService);
  }

  changeLanguage(language: string) {
    const state = this.state.value as JssState;
    this.state.next({ ...state, language });
  }

  // primarily invoked by JssRouteResolver on URL/route change
  changeRoute(route: string, language: string): Observable<JssState | null> {
    // on client initial load, retrieve initial state from server
    const foundInitialState = this.transferState.hasKey(jssKey);
    if (foundInitialState) {
      const jssState = this.transferState.get<JssState>(jssKey, null);
      this.transferState.remove(jssKey);
      this.state.next(jssState);
      return observableOf(jssState);
    }

    const appLanguage = this.state.value?.language || language;

    const jssState$ = this.layoutService.getRouteData(route, appLanguage).pipe(
      map((routeData) => {
        const lsResult = routeData as LayoutServiceData;

        const result = new JssState();
        result.sitecore = lsResult.sitecore ? lsResult.sitecore : undefined;
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
