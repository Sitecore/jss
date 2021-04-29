export interface CampaignInstance {
  [key: string]: unknown;
  /** GUID or alias (name) of campaign to trigger */
  campaignId: string;
}

export interface GoalInstance {
  [key: string]: unknown;
  /** GUID or alias (name) of goal to trigger */
  goalId: string;
}

export interface EventInstance {
  [key: string]: unknown;
  /** GUID or alias (name) of event to trigger */
  eventId: string;
}

export interface OutcomeInstance {
  [key: string]: unknown;
  /** GUID or alias (name) of outcome to trigger */
  outcomeId: string;
  /** Currency code of outcome monetary value */
  currencyCode?: string;
  /** Revenue from outcome */
  monetaryValue?: number;
}

export interface PageViewInstance {
  [key: string]: unknown;
  /** GUID of Sitecore page item to track (i.e. context item ID) */
  pageId: string;
  /** URL of page to track - should be absolute route path but can accept any value */
  url: string;
}

export interface PageViewData {
  [key: string]: unknown;

  /** URL of page to track - should be absolute route path but can accept any value */
  url: string;

  /** GUID of Sitecore item to track (i.e. context item ID) */
  itemId?: string;

  /** Language of Sitecore page item */
  language?: string;

  /** GUID of Sitecore layout device */
  layoutDeviceId?: string;
}
