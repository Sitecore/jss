import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import { isServer, LayoutServicePageState } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../../environments/environment';
import { JssContextService } from '../../jss-context.service';
import { JssState } from '../../JssState';

/**
 * Component to init CloudSDK logic - to allow events throughout the site
 */
@Component({
  selector: 'app-cloud-sdk-init',
  template: '',
})
export class CloudSdkInitComponent implements OnInit {
  constructor(private jssContext: JssContextService) {}

  ngOnInit(): void {
    if (!isServer() && environment.production) {
      // to ensure that CloudSDK initialization logic runs only once in the browser, take only the first emitted value of state
      this.jssContext.state.pipe(take(1)).subscribe((newState: JssState) => {
        const {
          route,
          context: { pageState },
        } = newState.sitecore;

        // Do not initialize CloudSDK in editing or preview mode or if missing route data
        if (pageState !== LayoutServicePageState.Normal || !route?.itemId) {
          return;
        }

        CloudSDK({
          siteName: environment.sitecoreSiteName,
          sitecoreEdgeUrl: environment.sitecoreEdgeUrl,
          sitecoreEdgeContextId: environment.sitecoreEdgeContextId,
          // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
          cookieDomain: window.location.hostname.replace(/^www\./, ''),
          // Cookie may be created in personalize middleware (server), but if not we should create it here
          enableBrowserCookie: true,
        })
          .addEvents()
          .initialize();
      });
    }
  }
}
