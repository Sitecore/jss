import { NextResponse, NextRequest } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  getPersonalizedRewrite,
  PosResolver,
} from '@sitecore-jss/sitecore-jss/personalize';
import { SiteInfo } from '@sitecore-jss/sitecore-jss/site';
import { debug } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { initServer, EngageServer } from '@sitecore/engage';

export type CdpServiceConfig = {
  /**
   * Your Sitecore CDP API endpoint
   */
  endpoint: string;
  /**
   * The client key to use for authentication
   */
  clientKey: string;
  /**
   * The Sitecore CDP channel to use for events. Uses 'WEB' by default.
   */
  channel?: string;
  /**
   * Currency for CDP request. Uses 'USA' as default.
   */
  currency?: string;
  /**
   * Timeout (ms) for CDP request. Default is 400.
   */
  timeout?: number;
};

export type PersonalizeMiddlewareConfig = MiddlewareBaseConfig & {
  /**
   * Configuration for your Sitecore Experience Edge endpoint
   */
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  /**
   * Configuration for your Sitecore CDP endpoint
   */
  cdpConfig: CdpServiceConfig;
  /**
   * function to resolve point of sale for a site
   * @param {Siteinfo} site to get info from
   * @param {string} language to get info for
   * @returns point of sale value for site/language combination
   */
  getPointOfSale?: (site: SiteInfo, language: string) => string;
};

/**
 * Object model of Experience Context data
 */
export type ExperienceParams = {
  referrer: string;
  utm: {
    [key: string]: string | undefined;
    campaign: string | undefined;
    source: string | undefined;
    medium: string | undefined;
    content: string | undefined;
  };
};

/**
 * Middleware / handler to support Sitecore Personalize
 */
export class PersonalizeMiddleware extends MiddlewareBase {
  private personalizeService: GraphQLPersonalizeService;

  /**
   * @param {PersonalizeMiddlewareConfig} [config] Personalize middleware config
   */
  constructor(protected config: PersonalizeMiddlewareConfig) {
    super(config);

    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.personalizeService = new GraphQLPersonalizeService({
      ...config.edgeConfig,
      fetch: fetch,
    });
  }

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns middleware handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error) {
        console.log('Personalize middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  protected initializeEngageServer(
    hostName: string,
    site: SiteInfo,
    language: string
  ): EngageServer {
    const engageServer = initServer({
      clientKey: this.config.cdpConfig.clientKey,
      targetURL: this.config.cdpConfig.endpoint,
      pointOfSale: this.config.getPointOfSale
        ? this.config.getPointOfSale(site, language)
        : PosResolver.resolve(site, language),
      cookieDomain: hostName,
      forceServerCookieMode: true,
    });

    return engageServer;
  }

  protected getExperienceParams(req: NextRequest): ExperienceParams {
    const utm = {
      campaign: req.nextUrl.searchParams.get('utm_campaign') || undefined,
      content: req.nextUrl.searchParams.get('utm_content') || undefined,
      medium: req.nextUrl.searchParams.get('utm_medium') || undefined,
      source: req.nextUrl.searchParams.get('utm_source') || undefined,
    };

    return {
      // It's expected that the header name "referer" is actually a misspelling of the word "referrer"
      // req.referrer is used during fetching to determine the value of the Referer header of the request being made,
      // used as a fallback
      referrer: req.headers.get('referer') || req.referrer,
      utm: utm,
    };
  }

  protected excludeRoute(pathname: string): boolean | undefined {
    // ignore files
    return pathname.includes('.') || super.excludeRoute(pathname);
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = this.getLanguage(req);
    const hostname = this.getHostHeader(req) || this.defaultHostname;
    const startTimestamp = Date.now();
    const timeout = this.config.cdpConfig.timeout;

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
      hostname,
      headers: this.extractDebugHeaders(req.headers),
    });

    if (this.config.disabled && this.config.disabled(req, response)) {
      debug.personalize('skipped (personalize middleware is disabled)');
      return response;
    }

    if (
      response.redirected || // Don't attempt to personalize a redirect
      this.isPreview(req) || // No need to personalize for preview (layout data is already prepared for preview)
      this.excludeRoute(pathname)
    ) {
      debug.personalize(
        'skipped (%s)',
        response.redirected ? 'redirected' : this.isPreview(req) ? 'preview' : 'route excluded'
      );
      return response;
    }

    const site = this.getSite(req, response);

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(
      pathname,
      language,
      site.name
    );
    if (!personalizeInfo) {
      // Likely an invalid route / language
      debug.personalize('skipped (personalize info not found)');
      return response;
    }

    if (personalizeInfo.variantIds.length === 0) {
      debug.personalize('skipped (no personalization configured)');
      return response;
    }

    const engageServer = this.initializeEngageServer(hostname, site, language);

    // creates the browser ID cookie on the server side
    // and includes the cookie in the response header
    try {
      await engageServer.handleCookie(req, response, timeout);
    } catch (error) {
      debug.personalize('skipped (browser id generation failed)');
      throw error;
    }
    const params = this.getExperienceParams(req);

    debug.personalize('executing experience for %s %s %o', personalizeInfo.contentId, params);

    const personalizationData = {
      channel: this.config.cdpConfig.channel || 'WEB',
      currency: this.config.cdpConfig.currency ?? 'USA',
      friendlyId: personalizeInfo.contentId,
      params,
      language,
    };

    let variantId;

    // Execute targeted experience in CDP
    // eslint-disable-next-line no-useless-catch
    try {
      variantId = ((await engageServer.personalize(personalizationData, req, timeout)) as {
        variantId: string;
      }).variantId;
    } catch (error) {
      throw error;
    }

    if (!variantId) {
      debug.personalize('skipped (no variant identified)');
      return response;
    }

    if (!personalizeInfo.variantIds.includes(variantId)) {
      debug.personalize('skipped (invalid variant)');
      return response;
    }

    // Path can be rewritten by previously executed middleware
    const basePath = res?.headers.get('x-sc-rewrite') || pathname;

    // Rewrite to persononalized path
    const rewritePath = getPersonalizedRewrite(basePath, { variantId });
    response = this.rewrite(rewritePath, req, response);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');

    debug.personalize('personalize middleware end in %dms: %o', Date.now() - startTimestamp, {
      rewritePath,
      headers: this.extractDebugHeaders(response.headers),
    });

    return response;
  };
}
