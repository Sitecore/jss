import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { trackingApi, TrackingRequestOptions } from '@sitecore-jss/sitecore-jss';
import { environment } from '../../../environments/environment';
import { JssDataFetcherService } from '../../jss-data-fetcher.service';

/**
 * Demonstrates usage of a Text content field within JSS.
 * Text fields are HTML encoded by default.
 */
@Component({
  selector: 'app-styleguide-tracking',
  templateUrl: './styleguide-tracking.component.html',
})
export class StyleguideTrackingComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  event: string;
  goal: string;
  outcomeName: string;
  outcomeValue: string;
  campaign: string;
  pageId: string;
  pageUrl: string;
  disconnectedMode = true;
  trackingApiOptions: TrackingRequestOptions;

  constructor(dataFetcher: JssDataFetcherService) {
    this.trackingApiOptions = {
      host: environment.sitecoreApiHost,
      querystringParams: {
        sc_apikey: environment.sitecoreApiKey,
      },
      fetcher: dataFetcher.fetch,
    };
  }

  ngOnInit() {
    this.disconnectedMode = this.rendering.dataSource === 'available-in-connected-mode';
  }

  submitEvent() {
    trackingApi
      .trackEvent([{ eventId: this.event }], this.trackingApiOptions)
      .then(() => alert('Page event pushed'))
      .catch((error) => alert(error));
  }

  submitGoal() {
    trackingApi
      .trackEvent([{ goalId: this.goal }], this.trackingApiOptions)
      .then(() => alert('Goal pushed'))
      .catch((error) => alert(error));
  }

  submitOutcome() {
    trackingApi
      .trackEvent(
        [
          {
            outcomeId: this.outcomeName,
            currencyCode: 'USD',
            monetaryValue: parseFloat(this.outcomeValue),
          },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Outcome pushed'))
      .catch((error) => alert(error));
  }

  triggerCampaign() {
    trackingApi
      .trackEvent([{ campaignId: this.campaign }], this.trackingApiOptions)
      .then(() => alert('Campaign set'))
      .catch((error) => alert(error));
  }

  submitPageView() {
    trackingApi
      .trackEvent(
        [{ pageId: this.pageId, url: this.pageUrl }],
        this.trackingApiOptions
      )
      .then(() => alert('Page view pushed'))
      .catch((error) => alert(error));
  }

  abandonSession() {
    const abandonOptions = {
      action: 'flush',
      ...this.trackingApiOptions,
    };

    trackingApi
      .trackEvent([], abandonOptions)
      .then(() => alert('Interaction has been terminated and its data pushed to xConnect.'))
      .catch((error) => alert(error));
  }

  submitBatching() {
    trackingApi
      .trackEvent(
        [
          { eventId: 'Download' },
          { goalId: 'Instant Demo' },
          { outcomeId: 'Opportunity' },
          { pageId: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}', url: '/arbitrary/url/you/own' },
          // this goal will be added to the new page/route ID set above, not the current route
          { goalId: 'Register' },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Batch of events pushed'))
      .catch((error) => alert(error));
  }
}
