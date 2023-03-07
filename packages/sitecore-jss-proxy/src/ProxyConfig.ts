import { IncomingMessage, ServerResponse, Agent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { Options } from 'http-proxy-middleware';
import { AppRenderer } from './AppRenderer';
import { RenderResponse } from './RenderResponse';
import { RouteUrlParser } from './RouteUrlParser';
/** A reply from the Sitecore Layout Service */
export interface LayoutServiceData {
  sitecore: {
    context: {
      [key: string]: unknown;
      language?: string;
      site?: {
        name?: string;
      };
    };
  };
}
/** Interface for the server.bundle.js file */
export interface ServerBundle {
  [key: string]: unknown;
  appName: string;
  apiKey: string;
  renderView: AppRenderer;
  parseRouteUrl: RouteUrlParser;
  setUpDefaultAgents?: (httpAgent: Agent, httpsAgent: HttpsAgent) => void;
}
export interface ProxyConfig {
  /** Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re') */
  apiHost: string;
  /** Path to layout service endpoint on proxy target server */
  layoutServiceRoute: string;
  /** SSC endpoint to use when sending Layout Service requests to proxy */
  apiKey: string;
  /** Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false */
  qsParams?: string;
  /**
   * Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
   * Note: exclusions are case-insensitive.
   * Mutually exclusive with pathRewriteExcludePredicate.
   */
  pathRewriteExcludeRoutes?: string[];
  /**
   * Turn WebSocket requests processing on or off
   */
  ws?: boolean;
  /**
   * Function to determine if a given URL should be SSRed (return true), or passed through (return false)
   * Mutually exclusive with pathRewriteExcludeRoutes.
   */
  pathRewriteExcludePredicate?: (originalUrl: string) => boolean;
  /** Configure `http-proxy-middleware` */
  proxyOptions?: Options;
  /** Enables or disables proxy diagnostics in console.log (disable for production or get bad performance) */
  debug?: boolean;
  /** Callback when an exception is thrown during SSR; decides what to send back to client (500 errors) */
  onError?: (
    error: Error,
    response: IncomingMessage
  ) =>
    | null
    | {
        statusCode?: number;
        content?: string;
      }
    | Promise<{
        statusCode?: number;
        content?: string;
        headers?: Record<string, string | string[]>;
      }>;
  /** Enables transforming SSR'ed HTML after it is rendered, i.e. to replace paths. */
  transformSSRContent?: (
    response: RenderResponse,
    request: IncomingMessage,
    serverResponse: ServerResponse
  ) => Promise<string>;
  /** Hook to fill the SSR viewBag object; if you're customizing the viewBag in Sitecore integrated SSR mode, do the same here. */
  createViewBag?: (
    request: IncomingMessage,
    response: ServerResponse,
    proxyResponse: IncomingMessage,
    layoutServiceData: LayoutServiceData
  ) => Promise<{ [key: string]: unknown }> | { [key: string]: unknown };
  /** Hook to alter HTTP headers in a custom way. */
  setHeaders?: (
    request: IncomingMessage,
    response: ServerResponse,
    proxyResponse: IncomingMessage
  ) => void;
  /** Responses from the proxy greater than this size (in bytes) are rejected. */
  maxResponseSizeBytes?: number;
  /** The require'd server.bundle.js file from your pre-built JSS app */
  serverBundle: ServerBundle;
}
