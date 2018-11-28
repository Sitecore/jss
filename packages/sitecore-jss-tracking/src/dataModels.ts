export interface CampaignInstance {
  /** GUID or alias (name) of campaign to trigger */
  campaignId: string;
  [key: string]: any;
}

export interface GoalInstance {
  /** GUID or alias (name) of goal to trigger */
  goalId: string;
  [key: string]: any;
}

export interface EventInstance {
  /** GUID or alias (name) of event to trigger */
  eventId: string;
  [key: string]: any;
}

export interface OutcomeInstance {
  /** GUID or alias (name) of outcome to trigger */
  outcomeId: string;
  /** Currency code of outcome monetary value */
  currencyCode?: string;
  /** Revenue from outcome */
  monetaryValue?: number;
  [key: string]: any;
}

export interface PageViewInstance {
  /** GUID of Sitecore page item to track (i.e. context item ID) */
  pageId: string;
  /** URL of page to track - should be absolute route path but can accept any value */
  url: string;
  [key: string]: any;
}
