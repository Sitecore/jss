import { Injectable, Inject, TransferState } from '@angular/core';
import { JssContextService, jssKey } from './jss-context.service';
import { JssState } from './JssState';
import { Observable, of as observableOf } from 'rxjs';
import { JssLayoutService } from './layout/jss-layout.service';
import { JssStateService } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the server (SSR) side; see jss-context.service.ts
 * for the implementation that runs on the client (browser) side.
 */
@Injectable()
export class JssContextServerSideService extends JssContextService {
  constructor(
    protected transferState: TransferState,
    protected layoutService: JssLayoutService,
    protected stateService: JssStateService<JssState>,
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_LAYOUT_DATA') private serverToSsrState: JssState
  ) {
    super(transferState, layoutService, stateService);
  }
  changeRoute(_route: string, _language: string): Observable<JssState> {
    // console.log('Server route change to ' + route);

    // if the route is null we signal the JSS routing setup that a 'fetch error'
    // occurred, so that it properly sends a not found route from SSR data
    if (this.serverToSsrState.sitecore && !this.serverToSsrState.sitecore.route) {
      this.serverToSsrState.routeFetchError = {
        status: 404,
        statusText: 'Not Found',
        // spread in order to not have a reference to serverToSsrState, because will have a circular structure with routeFetchError
        data: { ...this.serverToSsrState },
      };
    }

    // read initial state from data injected via server.bundle wrapper
    this.stateService.setState(this.serverToSsrState);

    // place the initial state into TransferState for the client
    this.transferState.set<JssState>(jssKey, this.serverToSsrState);

    return observableOf(this.serverToSsrState);
  }
}
