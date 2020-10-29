<!--
  Demonstrates analytics tracking patterns (xDB)
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-tracking">
    <p v-if="disconnectedMode">
      The tracking API is only available in connected, integrated, or headless modes.
    </p>
    <div v-else>
      <p class="alert alert-warning">
        Note: The JSS tracker API is disabled by default. Consult the
        <a href="https://jss.sitecore.com/docs/fundamentals/services/tracking"
          >tracking documentation</a
        >
        to enable it.
      </p>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Event</legend>
          <p>Events are defined in <code>/sitecore/system/Settings/Analytics/Page Events</code></p>
          <label for="event">Event GUID or Name</label>
          <input type="text" id="event" class="form-control" v-model="txtEvent" />
          <button type="button" class="btn btn-primary mt-3" v-on:click="submitEvent">
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Goal</legend>
          <p>Goals are defined in <code>/sitecore/system/Marketing Control Panel/Goals</code></p>
          <label for="goal">Goal GUID or Name</label>
          <input
            type="text"
            class="form-control"
            id="goal"
            v-model="txtGoal"
            placeholder="i.e. Register"
          />
          <button type="button" class="btn btn-primary mt-3" v-on:click="submitGoal">
            Submit
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Outcome</legend>
          <p>
            Outcomes are defined in <code>/sitecore/system/Marketing Control Panel/Outcomes</code>
          </p>
          <label for="outcomeName">Outcome GUID or Name</label>
          <input
            type="text"
            class="form-control"
            id="outcomeName"
            v-model="txtOutcomeName"
            placeholder="i.e. Marketing Lead"
          />
          <br />
          <label for="outcomeValue">Monetary Value (optional)</label>
          <input
            type="number"
            class="form-control"
            id="outcomeValue"
            v-model="txtOutcomeValue"
            placeholder="i.e. 1337.00"
          />
          <button type="button" class="btn btn-primary mt-3" v-on:click="submitOutcome">
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Campaign</legend>
          <p>
            Campaigns are defined in <code>/sitecore/system/Marketing Control Panel/Campaigns</code>
          </p>
          <label for="campaign">Campaign GUID or Name</label>
          <input type="text" class="form-control" id="campaign" v-model="txtCampaign" />
          <button type="button" class="btn btn-primary mt-3" v-on:click="triggerCampaign">
            Submit
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Page View</legend>
          <p>
            Track arbitrary page views for custom routing or offline use. Note that Layout Service
            tracks page views by default unless <code>tracking=false</code> is passed in its query
            string.
          </p>
          <label for="pageId">Page Item GUID</label>
          <input
            type="text"
            class="form-control"
            id="pageId"
            v-model="txtPageId"
            placeholder="i.e. {11111111-1111-1111-1111-111111111111}"
          />
          <br />
          <label for="pageUrl">Page URL</label>
          <input
            type="text"
            class="form-control"
            id="pageUrl"
            v-model="txtPageUrl"
            placeholder="i.e. /foo/bar"
          />
          <button type="button" class="btn btn-primary mt-3" v-on:click="submitPageView">
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Batching</legend>
          <p>
            The tracking API supports pushing a whole batch of events in a single request. This can
            be useful for queuing strategies or offline PWA usage.
          </p>
          <button type="button" class="btn btn-primary" v-on:click="submitBatching">
            Submit Batch of Events
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Interaction Control</legend>
          <p>
            Tracking data is not pushed into the xConnect service until your session ends on the
            Sitecore server. Click this button to instantly end your session and flush the data -
            great for debugging and testing.
          </p>
          <p class="alert alert-warning">
            Note: By default <em>anonymous</em> contacts will not be shown in Experience Profile. If
            your interactions are not showing up in Experience Profile, you may need to
            <a
              href="https://doc.sitecore.net/developers/xp/xconnect/xconnect-search-indexer/enable-anonymous-contact-indexing.html"
            >
              enable anonymous contact indexing.
            </a>
          </p>
          <button type="button" class="btn btn-primary" v-on:click="abandonSession">
            End Interaction
          </button>
        </fieldset>
      </div>
    </div>
  </styleguide-specimen>
</template>

<script>
import { trackingApi } from '@sitecore-jss/sitecore-jss-tracking';
import { dataFetcher } from '../../dataFetcher';
import config from '../../temp/config';

import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-Tracking',
  data: () => ({
    txtEvent: '',
    txtGoal: '',
    txtOutcomeName: '',
    txtOutcomeValue: '',
    txtCampaign: '',
    txtPageId: '',
    txtPageUrl: '',
  }),
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    StyleguideSpecimen,
  },
  computed: {
    trackingApiOptions() {
      return {
        host: config.sitecoreApiHost,
        querystringParams: {
          sc_apikey: config.sitecoreApiKey,
        },
        fetcher: dataFetcher,
      };
    },
    disconnectedMode() {
      return this.$jss.sitecoreContext().itemId === 'available-in-connected-mode';
    },
  },
  methods: {
    submitEvent() {
      trackingApi
        .trackEvent([{ eventId: this.txtEvent }], this.trackingApiOptions)
        .then(() => alert('Page event pushed'))
        .catch((error) => alert(error));
    },
    submitGoal() {
      trackingApi
        .trackEvent([{ goalId: this.txtGoal }], this.trackingApiOptions)
        .then(() => alert('Goal pushed'))
        .catch((error) => alert(error));
    },
    submitOutcome() {
      trackingApi
        .trackEvent(
          [
            {
              outcomeId: this.txtOutcomeName,
              currencyCode: 'USD',
              monetaryValue: this.txtOutcomeValue,
            },
          ],
          this.trackingApiOptions
        )
        .then(() => alert('Outcome pushed'))
        .catch((error) => alert(error));
    },
    triggerCampaign() {
      trackingApi
        .trackEvent([{ campaignId: this.txtCampaign }], this.trackingApiOptions)
        .then(() => alert('Campaign set'))
        .catch((error) => alert(error));
    },
    submitPageView() {
      trackingApi
        .trackEvent([{ pageId: this.txtPageId, url: this.txtPageUrl }], this.trackingApiOptions)
        .then(() => alert('Page view pushed'))
        .catch((error) => alert(error));
    },
    abandonSession() {
      const abandonOptions = {
        action: 'flush',
        ...this.trackingApiOptions,
      };

      trackingApi
        .trackEvent([], abandonOptions)
        .then(() => alert('Interaction has been terminated and its data pushed to xConnect.'))
        .catch((error) => alert(error));
    },
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
    },
  },
};
</script>
