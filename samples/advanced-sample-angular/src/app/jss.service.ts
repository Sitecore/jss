import { Injectable, } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { LayoutService } from './layoutService/layout.service';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { shareReplay } from 'rxjs/operators/shareReplay';

export const jssKey = makeStateKey<JssState>('jss');

export class JssState {
  language: string;
  serverRoute: string;
  sitecore: {
    context?: {
      pageEditing: false,
      user: any,
      navigation: JssNavItem[],
    }
    route: any;
  };
  viewBag: any;
}

export class JssNavItem {
  path: string;
  name: string;
  children: JssNavItem[];
}

@Injectable()
export class JssService {
  // components can subscribe to this (or use getValue()) to get access to latest data from Layout Service,
  // as well as current language and server route
  state: BehaviorSubject<JssState>;

  constructor(
    protected transferState: TransferState,
    protected layoutService: LayoutService,
  ) {
    this.state = new BehaviorSubject<JssState>(new JssState());
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

    const jssState$ = this.layoutService.getRouteData(route, language, {}).pipe(
      map(routeData => {
        const result = new JssState();
        result.sitecore = routeData.sitecore;
        result.language = language;
        result.serverRoute = route;
        return result;
      }),
      shareReplay(1)
    );

    // subscribe to it ourselves so we can maintain current state
    jssState$.subscribe(
      (jssState) => {
        this.state.next(jssState);
      }
    );

    return jssState$;
  }
}
