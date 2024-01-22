import React, { RefObject } from 'react';
import {
  withSitecoreContext,
  trackingApi,
  TrackingRequestOptions,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { dataFetcher } from 'lib/data-fetcher';
import config from 'temp/config';
import StyleguideSpecimen from './Styleguide-Specimen';
import { ComponentWithContextProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

/* eslint-disable no-alert,no-undef */

type StyleguideTrackingProps = ComponentWithContextProps & StyleguideSpecimenFields;

/**
 * Demonstrates analytics tracking patterns (xDB)
 */
class StyleguideTracking extends React.Component<StyleguideTrackingProps> {
  private event: RefObject<HTMLInputElement>;
  private goal: RefObject<HTMLInputElement>;
  private outcomeName: RefObject<HTMLInputElement>;
  private outcomeValue: RefObject<HTMLInputElement>;
  private campaign: RefObject<HTMLInputElement>;
  private pageId: RefObject<HTMLInputElement>;
  private pageUrl: RefObject<HTMLInputElement>;

  private trackingApiOptions: TrackingRequestOptions;

  constructor(props: StyleguideTrackingProps) {
    super(props);

    this.event = React.createRef();
    this.goal = React.createRef();
    this.outcomeName = React.createRef();
    this.outcomeValue = React.createRef();
    this.campaign = React.createRef();
    this.pageId = React.createRef();
    this.pageUrl = React.createRef();

    this.trackingApiOptions = {
      host: config.sitecoreApiHost,
      querystringParams: {
        sc_apikey: config.sitecoreApiKey,
      },
      fetcher: dataFetcher,
    };
  }

  submitEvent() {
    if (!this.event.current) return;

    trackingApi
      .trackEvent([{ eventId: this.event.current.value }], this.trackingApiOptions)
      .then(() => alert('Page event pushed'))
      .catch((error) => alert(error));
  }

  submitGoal() {
    if (!this.goal.current) return;

    trackingApi
      .trackEvent([{ goalId: this.goal.current.value }], this.trackingApiOptions)
      .then(() => alert('Goal pushed'))
      .catch((error) => alert(error));
  }

  submitOutcome() {
    if (
      !this.pageUrl.current ||
      !this.pageId.current ||
      !this.outcomeName.current ||
      !this.outcomeValue.current
    ) {
      return;
    }

    trackingApi
      .trackEvent(
        [
          {
            url: this.pageUrl.current.value,
            pageId: this.pageId.current.value,
            outcomeId: this.outcomeName.current.value,
            currencyCode: 'USD',
            monetaryValue: this.outcomeValue.current.value,
          },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Outcome pushed'))
      .catch((error) => alert(error));
  }

  triggerCampaign() {
    if (!this.campaign.current) return;

    trackingApi
      .trackEvent([{ campaignId: this.campaign.current.value }], this.trackingApiOptions)
      .then(() => alert('Campaign set'))
      .catch((error) => alert(error));
  }

  submitPageView() {
    if (!this.pageId.current || !this.pageUrl.current) return;

    trackingApi
      .trackEvent(
        [
          {
            pageId: this.pageId.current.value,
            url: this.pageUrl.current.value,
          },
        ],
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
          {
            pageId: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}',
            url: '/arbitrary/url/you/own',
          },
          // this goal will be added to the new page/route ID set above, not the current route
          { goalId: 'Register' },
        ],
        this.trackingApiOptions
      )
      .then(() => alert('Batch of events pushed'))
      .catch((error) => alert(error));
  }

  render() {
    const disconnectedMode = this.props.sitecoreContext.itemId === 'available-in-connected-mode';

    return (
      <StyleguideSpecimen {...this.props} e2eId="styleguide-tracking">
        {disconnectedMode && (
          <p>The tracking API is only available in connected, integrated, or headless modes.</p>
        )}
        {!disconnectedMode && (
          <div>
            <p className="alert alert-warning">
              Note: The JSS tracker API is disabled by default. Consult the{' '}
              <a href="https://jss.sitecore.com/docs/fundamentals/services/tracking">
                tracking documentation
              </a>{' '}
              to enable it.
            </p>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Event</legend>
                <p>
                  Events are defined in <code>/sitecore/system/Settings/Analytics/Page Events</code>
                </p>
                <label htmlFor="event">Event GUID or Name</label>
                <input type="text" id="event" className="form-control" ref={this.event} />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitEvent.bind(this)}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Goal</legend>
                <p>
                  Goals are defined in <code>/sitecore/system/Marketing Control Panel/Goals</code>
                </p>
                <label htmlFor="goal">Goal GUID or Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="goal"
                  ref={this.goal}
                  placeholder="i.e. Register"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitGoal.bind(this)}
                >
                  Submit
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Outcome</legend>
                <p>
                  Outcomes are defined in{' '}
                  <code>/sitecore/system/Marketing Control Panel/Outcomes</code>
                </p>
                <label htmlFor="outcomeName">Outcome GUID or Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="outcomeName"
                  ref={this.outcomeName}
                  placeholder="i.e. Marketing Lead"
                />
                <br />
                <label htmlFor="outcomeValue">Monetary Value (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  id="outcomeValue"
                  ref={this.outcomeValue}
                  placeholder="i.e. 1337.00"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitOutcome.bind(this)}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Campaign</legend>
                <p>
                  Campaigns are defined in{' '}
                  <code>/sitecore/system/Marketing Control Panel/Campaigns</code>
                </p>
                <label htmlFor="campaign">Campaign GUID or Name</label>
                <input type="text" className="form-control" id="campaign" ref={this.campaign} />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.triggerCampaign.bind(this)}
                >
                  Submit
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Page View</legend>
                <p>
                  Track arbitrary page views for custom routing or offline use. Note that Layout
                  Service tracks page views by default unless <code>tracking=false</code> is passed
                  in its query string.
                </p>
                <label htmlFor="pageId">Page Item GUID</label>
                <input
                  type="text"
                  className="form-control"
                  id="pageId"
                  ref={this.pageId}
                  placeholder="i.e. {11111111-1111-1111-1111-111111111111}"
                />
                <br />
                <label htmlFor="pageUrl">Page URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="pageUrl"
                  ref={this.pageUrl}
                  placeholder="i.e. /foo/bar"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={this.submitPageView.bind(this)}
                >
                  Submit
                </button>
              </fieldset>

              <fieldset className="form-group col-sm">
                <legend>Batching</legend>
                <p>
                  The tracking API supports pushing a whole batch of events in a single request.
                  This can be useful for queuing strategies or offline PWA usage.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.submitBatching.bind(this)}
                >
                  Submit Batch of Events
                </button>
              </fieldset>
            </div>
            <div className="row">
              <fieldset className="form-group col-sm">
                <legend>Interaction Control</legend>
                <p>
                  Tracking data is not pushed into the xConnect service until your session ends on
                  the Sitecore server. Click this button to instantly end your session and flush the
                  data - great for debugging and testing.
                </p>
                <p className="alert alert-warning">
                  Note: By default <em>anonymous</em> contacts will not be shown in Experience
                  Profile. If your interactions are not showing up in Experience Profile, you may
                  need to{' '}
                  <a href="https://doc.sitecore.net/developers/xp/xconnect/xconnect-search-indexer/enable-anonymous-contact-indexing.html">
                    enable anonymous contact indexing.
                  </a>
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.abandonSession.bind(this)}
                >
                  End Interaction
                </button>
              </fieldset>
            </div>
          </div>
        )}
      </StyleguideSpecimen>
    );
  }
}

export default withSitecoreContext()(StyleguideTracking);
