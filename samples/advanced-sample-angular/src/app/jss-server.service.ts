import { Injectable, Inject } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { LayoutService } from './layoutService/layout.service';
import { JssService, JssState, jssKey } from './jss.service';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';

@Injectable()
export class JssServerService extends JssService {
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
