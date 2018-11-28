import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';

let emittedVI = false;

/**
  VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
  If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
  For XM (CMS-only) apps, this should be removed.

  VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
 */
@Component({
  selector: 'app-visitor-identification',
  template: `<meta *ngIf="visitorIdentificationTimestamp" name="VIcurrentDateTime" [content]="visitorIdentificationTimestamp" />`,
})
export class VisitorIdentificationComponent implements OnInit, OnDestroy {
  visitorIdentificationTimestamp: number;

  private contextSubscription: Subscription;

  // inject the JssContextService, which maintains the current Sitecore Context
  constructor(private jssContext: JssContextService) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      if (state.sitecore && state.sitecore.context) {
        if (
          !emittedVI &&
          typeof document !== 'undefined' &&
          state.sitecore.context.visitorIdentificationTimestamp
        ) {
          emittedVI = true;
          const script = document.createElement('script');
          script.src = `/layouts/system/VisitorIdentification.js`;
          script.type = 'text/javascript';
          document.getElementsByTagName('head')[0].appendChild(script);
        }

        this.visitorIdentificationTimestamp = state.sitecore.context.visitorIdentificationTimestamp;
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
