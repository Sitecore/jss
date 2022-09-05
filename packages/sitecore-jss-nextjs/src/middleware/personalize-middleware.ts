import { NextResponse, NextRequest, userAgent } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  CdpService,
  CdpServiceConfig,
  ExperienceParams,
  getPersonalizedRewrite,
} from '@sitecore-jss/sitecore-jss/personalize';
import { debug, NativeDataFetcher } from '@sitecore-jss/sitecore-jss';

export type PersonalizeMiddlewareConfig = {
  /**
   * Function used to determine if route should be excluded from personalization.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route from personalization
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * Configuration for your Sitecore Experience Edge endpoint
   */
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  /**
   * Configuration for your Sitecore CDP endpoint
   */
  cdpConfig: Omit<CdpServiceConfig, 'dataFetcherResolver'>;

  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   *  @param {NextRequest} [req] optional: request object from middleware handler
   *  @param {NextResponse} [res] optional: response object from middleware handler
   * @returns {boolean} false by default
   */
  disabled?: (req?: NextRequest, res?: NextResponse) => boolean;
};

/**
 * Middleware / handler to support Sitecore Personalize
 */
export class PersonalizeMiddleware {
  private personalizeService: GraphQLPersonalizeService;
  private cdpService: CdpService;

  /**
   * @param {PersonalizeMiddlewareConfig} [config] Personalize middleware config
   */
  constructor(protected config: PersonalizeMiddlewareConfig) {
    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.personalizeService = new GraphQLPersonalizeService({
      ...config.edgeConfig,
      fetch: fetch,
    });
    // NOTE: same here, we provide NativeDataFetcher for compatibility on Next.js Edge Runtime
    this.cdpService = new CdpService({
      ...config.cdpConfig,
      dataFetcherResolver: <T>({ timeout }: { timeout: number }) => {
        const fetcher = new NativeDataFetcher({
          debugger: debug.personalize,
          timeout,
        });
        return (url: string, data?: unknown) => fetcher.fetch<T>(url, data);
      },
    });
  }

  /**
   * Gets the Next.js middleware handler
   * @returns middleware handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return this.handler;
  }

  protected get browserIdCookieName(): string {
    // Each user should have saved identifier to connect between session, CDP uses bid cookies + local storage
    return `bid_${this.config.cdpConfig.clientKey}`;
  }

  protected getBrowserId(req: NextRequest): string | undefined {
    return req.cookies.get(this.browserIdCookieName) || undefined;
  }

  protected setBrowserId(res: NextResponse, browserId: string) {
    const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
    const options = { expires: expiryDate, secure: true };
    res.cookies.set(this.browserIdCookieName, browserId, options);
  }

  protected getExperienceParams(req: NextRequest): ExperienceParams {
    const { ua } = userAgent(req);
    return {
      geo: {
        city: req.geo?.city ?? null,
        country: req.geo?.country ?? null,
        latitude: req.geo?.latitude ?? null,
        longitude: req.geo?.longitude ?? null,
        region: req.geo?.region ?? null,
      },
      referrer: req.referrer,
      ua: ua ?? null,
      utm: {
        campaign: req.nextUrl.searchParams.get('utm_campaign'),
        content: req.nextUrl.searchParams.get('utm_content'),
        medium: req.nextUrl.searchParams.get('utm_medium'),
        source: req.nextUrl.searchParams.get('utm_source'),
      },
    };
  }

  private excludeRoute(pathname: string) {
    if (
      pathname.includes('.') || // Ignore files
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/sitecore/') || // Ignore Sitecore API calls
      pathname.startsWith('/_next') // Ignore next service calls
    ) {
      return true;
    }
    return false;
  }

  private isPreview(req: NextRequest) {
    return req.cookies.get('__prerender_bypass') || req.cookies.get('__next_preview_data');
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = req.nextUrl.locale || req.nextUrl.defaultLocale || 'en';
    let browserId = this.getBrowserId(req);

    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
    });

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (this.config.disabled && this.config.disabled(req, response)) {
      debug.personalize('skipped (personalize middleware is disabled)');
      return response;
    }

    if (
      response.redirected || // Don't attempt to personalize a redirect
      this.isPreview(req) || // No need to personalize for preview (layout data is already prepared for preview)
      (this.config.excludeRoute || this.excludeRoute)(pathname)
    ) {
      debug.personalize(
        'skipped (%s)',
        response.redirected ? 'redirected' : this.isPreview(req) ? 'preview' : 'route excluded'
      );
      return response;
    }

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(pathname, language);

    if (!personalizeInfo) {
      // Likely an invalid route / language
      debug.personalize('skipped (personalize info not found)');
      return response;
    }

    if (personalizeInfo.variantIds.length === 0) {
      debug.personalize('skipped (no personalization configured)');
      return response;
    }

    if (!browserId) {
      browserId = await this.cdpService.generateBrowserId();

      if (!browserId) {
        debug.personalize('skipped (browser id generation failed)');
        return response;
      }
    }

    // Execute targeted experience in CDP
    const params = this.getExperienceParams(req);
    const variantId = await this.cdpService.executeExperience(
      personalizeInfo.contentId,
      params,
      browserId
    );

    if (!variantId) {
      debug.personalize('skipped (no variant identified)');
      return response;
    }

    if (!personalizeInfo.variantIds.includes(variantId)) {
      debug.personalize('skipped (invalid variant)');
      return response;
    }

    // Rewrite to persononalized path
    const rewritePath = getPersonalizedRewrite(pathname, { variantId });
    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');

    // Set browserId cookie on the response
    this.setBrowserId(response, browserId);

    const resHeaders: { [key: string]: string } = {};

    // Extract headers to avoid middleware issue https://github.com/vercel/next.js/issues/39765
    response.headers.forEach((value, key) => (resHeaders[key] = value));

    debug.personalize('personalize middleware end: %o', {
      rewritePath,
      browserId,
      headers: resHeaders,
    });

    return response;
  };
}
