import { Injectable, Inject } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { LayoutService } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService, jssKey } from './jss-context.service';
import { JssState } from './JssState';
import { Observable, of as observableOf } from 'rxjs';

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the server (SSR) side; see jss-context.service.ts
 * for the implementation that runs on the client (browser) side.
 */
@Injectable()
export class JssContextServerSideService extends JssContextService {
  constructor(
    protected transferState: TransferState,
    protected layoutService: LayoutService,
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_TO_SSR') private serverToSsrState: JssState,
  ) {
    super(transferState, layoutService);
  }

  changeRoute(route: string, language: string): Observable<JssState> {
    console.log('Server route change to ' + route);

    // read initial state from data injected via server.bundle wrapper
    this.state.next(this.serverToSsrState);

    // place the initial state into TransferState for the client
    this.transferState.set<JssState>(jssKey, this.serverToSsrState);

    return observableOf(this.serverToSsrState);
  }
}
