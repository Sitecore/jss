import { Component, OnInit } from '@angular/core';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import { environment } from '../../../environments/environment';
import { isServer } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Component to init CloudSDK logic - to allow events throughout the site
 */
@Component({
  selector: 'app-cloud-sdk-init',
  template: '',
})
export class CloudSdkInitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    if (!isServer() && environment.production) {
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
    }
  }
}
