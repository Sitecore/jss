import { Component, OnInit } from '@angular/core';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { environment } from '../../../environments/environment';
import { isServer } from '@sitecore-jss/sitecore-jss/utils';

/**
 * Component that renders editing scripts and client data for the current page in Sitecore Editor.
 * Only renders scripts when Metadata mode is used.
 */
@Component({
  selector: 'app-cloudsdk-init',
  template: '',
})
export class CloudSdkInitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    if (!isServer) {
      CloudSDK({
        siteName: environment.sitecoreSiteName,
        sitecoreEdgeUrl: environment.sitecoreEdgeUrl,
        sitecoreEdgeContextId: environment.sitecoreEdgeContextId,
        // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
        cookieDomain: window.location.hostname.replace(/^www\./, ''),
        // Cookie may be created in personalize middleware (server), but if not we should create it here
        enableBrowserCookie: true,
      }).initialize();
    }
  }
}
