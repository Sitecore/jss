import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isServer, CdpHelper, LayoutServicePageState } from '@sitecore-jss/sitecore-jss-angular';
import { pageView, PageViewData } from '@sitecore-cloudsdk/events/browser';
import { JssContextService } from '../../jss-context.service';
import { JssState } from '../../JssState';
import { environment } from '../../../environments/environment';

/**
 * This is the CDP page view component.
 * It uses the Sitecore Cloud SDK to enable page view events on the client-side.
 * See Sitecore Cloud SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore-cloudsdk/events
 */
@Component({
  selector: 'app-cdp-page-view',
  template: '',
})
export class CdpPageViewComponent implements OnInit, OnDestroy {
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) {}

  ngOnInit(): void {
    if (!isServer()) {
      this.contextSubscription = this.jssContext.state.subscribe((newState: JssState) => {
        const {
          route,
          context: { pageState, language, variantId },
        } = newState.sitecore;

        // Do not create events in editing or preview mode or if missing route data
        if (pageState !== LayoutServicePageState.Normal || !route?.itemId) {
          return;
        }

        // Do not create events if disabled (e.g. we don't have consent)
        if (this.disabled()) {
          return;
        }

        const scope = process.env.PERSONALIZE_SCOPE;
        const pageVariantId = CdpHelper.getPageVariantId(
          route.itemId,
          language || environment.defaultLanguage,
          variantId as string,
          scope
        );

        const pageViewData: PageViewData = {
          channel: 'WEB',
          currency: 'USD',
          page: route.name,
          pageVariantId,
          language,
        };

        pageView(pageViewData).catch((err) => console.debug(err));
      });
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }

  /**
   * Determines if the page view events should be turned off.
   * IMPORTANT: You should implement based on your cookie consent management solution of choice.
   * By default it is disabled if not in production mode
   */
  disabled = () => {
    return !environment.production;
  };
}
