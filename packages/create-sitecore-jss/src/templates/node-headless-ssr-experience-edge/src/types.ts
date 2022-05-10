import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';

interface ServerResponse {
  /**
   * The rendered HTML to return to the client
   */
  html: string;
  /**
   * Set the HTTP status code. If not set, the status code returned from Layout Service is returned.
   */
  status?: number;
  /**
   * Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
   * Note: when using this you must set the status code to 301 or 302.
   */
  redirect?: string;
}

declare type AppRenderer = (
  callback: (error: Error | null, result: ServerResponse | null) => void,
  path: string,
  /**
   * Data returned by Layout Service. If the route does not exist, null.
   */
  layoutData: LayoutServiceData,
  viewBag: {
    [key: string]: unknown;
    dictionary: { [key: string]: string };
  }
) => void;

declare type RouteUrlParser = (
  url: string
) => {
  sitecoreRoute?: string;
  lang?: string;
  qsParams?: string;
};

export interface ServerBundle {
  renderView: AppRenderer;
  parseRouteUrl: RouteUrlParser;
  appName: string;
  apiKey?: string;
}

export interface Config {
  [key: string]: unknown;
  endpoint: string;
  apiKey: string;
  appName: string;
  port: string | number;
  defaultLanguage: string;
  serverBundle: ServerBundle;
}
