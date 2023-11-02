import { NextResponse, NextRequest } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  getPersonalizedRewrite,
  PersonalizeInfo,
} from '@sitecore-jss/sitecore-jss/personalize';
import { debug } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { initServer, personalizeServer } from '@sitecore-cloudsdk/personalize';


export type CdpServiceConfig = {
  /**
   * Your unified Sitecore Edge Context Id
   */
  sitecoreEdgeContextId: string;
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

  protected async initPersonalizeServer({
    hostname,
    sitecoreEdgeContextId,
    siteName,
    request,
    response,
  }: {
    hostname: string;
    sitecoreEdgeContextId: string;
    siteName: string;
    request: NextRequest;
    response: NextResponse;
  }): Promise<void> {
    await initServer(
      {
        sitecoreEdgeContextId,
        siteName,
        cookieDomain: hostname,
        enableServerCookie: true,
      },
      request,
      response
    );
  }

  protected async personalize({
    params,
    personalizeInfo,
    language,
    timeout,
  }: {
    personalizeInfo: PersonalizeInfo;
    params: ExperienceParams,
    language: string;
    timeout?: number;
  }, request: NextRequest) {
    const personalizationData = {
      channel: this.config.cdpConfig.channel || 'WEB',
      currency: this.config.cdpConfig.currency ?? 'USA',
      friendlyId: personalizeInfo.contentId,
      params,
      language,
    };

    return (await personalizeServer(personalizationData, request, timeout)) as {
      variantId: string;
    };
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

    await this.initPersonalizeServer({
      hostname,
      siteName: site.name,
      sitecoreEdgeContextId: this.config.cdpConfig.sitecoreEdgeContextId,
      request: req,
      response,
    });

    const params = this.getExperienceParams(req);

    debug.personalize('executing experience for %s %s %o', personalizeInfo.contentId, params);

    let variantId;

    // Execute targeted experience in Personalize SDK
    // eslint-disable-next-line no-useless-catch
    try {
      const personalization = await this.personalize({ personalizeInfo, params, language, timeout }, req);
      variantId = personalization.variantId;
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
    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();

    // Preserve cookies from previous response
    const cookies = response.cookies.getAll();

    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl, response);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');
    // Share rewrite path with following executed middleware
    response.headers.set('x-sc-rewrite', rewritePath);
    // Share site name with the following executed middlewares
    response.cookies.set(this.SITE_SYMBOL, site.name);

    // Restore cookies from previous response since
    // browserId cookie gets omitted after rewrite
    cookies.forEach((cookie) => {
      response.cookies.set(cookie);
    });

    debug.personalize('personalize middleware end in %dms: %o', Date.now() - startTimestamp, {
      rewritePath,
      headers: this.extractDebugHeaders(response.headers),
    });

    return response;
  };
}
