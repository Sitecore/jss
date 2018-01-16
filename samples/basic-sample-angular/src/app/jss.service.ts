import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { environment } from '../environments/environment';

export const jssKey = makeStateKey<JssState>('jss');
export class JssState {
  sitecore: {
    context?: {
      pageEditing: false
    }
    route: any;
  };
  viewBag: any;
}

@Injectable()
export class JssService {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('JSS_SERVER_TO_SSR') @Optional() private serverToSsrState: JssState
  ) { }

  getRouteData(route: string): JssState {
    let jssState = this.transferState.get<JssState>(jssKey, null);

    if (isPlatformServer(this.platformId)) {
      // Read provided data from server via 'JSS_SERVER_TO_SSR' token and store this via transferstate for the browser platform
      jssState = this.serverToSsrState;
      this.transferState.set<JssState>(jssKey, jssState);
    } else if (!jssState) {
      // For development purposes only
      jssState = new JssState();
      jssState.sitecore = { route: environment.routeData };
    }

    return jssState;
  }
}
