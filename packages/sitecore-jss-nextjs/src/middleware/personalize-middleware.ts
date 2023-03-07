import { NextResponse, NextRequest, userAgent } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  CdpService,
  CdpServiceConfig,
  ExperienceParams,
  getPersonalizedRewrite,
} from '@sitecore-jss/sitecore-jss/personalize';
import { SiteInfo, SiteResolver } from '@sitecore-jss/sitecore-jss/site';
import { debug, NativeDataFetcher } from '@sitecore-jss/sitecore-jss';
import { resolvePointOfSale } from '../utils';

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
  /**
   * Site resolution implementation by name/hostname
   */
  siteResolver: SiteResolver;
  /**
   * fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
  /**
   * function to resolve point of sale endpoint for a site
   * @param {Siteinfo} site to get info from
   * @param {string} language to get info for
   * @returns point of sale value for site/language combination
   */
  resolvePointOfSale?: (site?: SiteInfo, language?: string) => string;
};

/**
 * Middleware / handler to support Sitecore Personalize
 */
export class PersonalizeMiddleware {
  private personalizeService: GraphQLPersonalizeService;
  private cdpService: CdpService;
  private defaultHostname: string;

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
      dataFetcherResolver: <T>({
        timeout,
        headers,
      }: {
        timeout: number;
        headers?: Record<string, string>;
      }) => {
        const fetcher = new NativeDataFetcher({
          debugger: debug.personalize,
          timeout,
          headers,
        });
        return (url: string, data?: unknown) => fetcher.fetch<T>(url, data);
      },
    });

    this.defaultHostname = config.defaultHostname || 'localhost';
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

  protected get browserIdCookieName(): string {
    // Each user should have saved identifier to connect between session, CDP uses bid cookies + local storage
    return `BID_${this.config.cdpConfig.clientKey}`;
  }

  protected getBrowserId(req: NextRequest): string | undefined {
    return req.cookies.get(this.browserIdCookieName)?.value || undefined;
  }

  protected setBrowserId(res: NextResponse, browserId: string) {
    const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
    const options = { expires: expiryDate, secure: true };
    res.cookies.set(this.browserIdCookieName, browserId, options);
  }

  protected getExperienceParams(req: NextRequest): ExperienceParams {
    return {
      referrer: req.referrer,
      utm: {
        campaign: req.nextUrl.searchParams.get('utm_campaign'),
        content: req.nextUrl.searchParams.get('utm_content'),
        medium: req.nextUrl.searchParams.get('utm_medium'),
        source: req.nextUrl.searchParams.get('utm_source'),
      },
    };
  }

  protected excludeRoute(pathname: string) {
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

  protected isPreview(req: NextRequest) {
    return (
      req.cookies.get('__prerender_bypass')?.value || req.cookies.get('__next_preview_data')?.value
    );
  }

  /**
   * Safely extract all headers for debug logging
   * Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765
   * @param {Headers} incomingHeaders Incoming headers
   * @returns Object with headers as key/value pairs
   */
  protected extractDebugHeaders(incomingHeaders: Headers) {
    const headers = {} as { [key: string]: string };
    incomingHeaders.forEach((value, key) => (headers[key] = value));
    return headers;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const hostHeader = req.headers.get('host')?.split(':')[0];
    const hostname = hostHeader || this.defaultHostname;
    const pathname = req.nextUrl.pathname;
    const language = req.nextUrl.locale || req.nextUrl.defaultLocale || 'en';
    let siteName = res?.cookies.get('sc_site')?.value;

    let browserId = this.getBrowserId(req);
    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
    });

    if (!hostHeader) {
      debug.personalize(`host header is missing, default ${hostname} is used`);
    }

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (this.config.disabled && this.config.disabled(req, response)) {
      debug.personalize('skipped (personalize middleware is disabled)');
      return response;
    }

    if (
      response.redirected || // Don't attempt to personalize a redirect
      this.isPreview(req) || // No need to personalize for preview (layout data is already prepared for preview)
      this.excludeRoute(pathname) ||
      (this.config.excludeRoute && this.config.excludeRoute(pathname))
    ) {
      debug.personalize(
        'skipped (%s)',
        response.redirected ? 'redirected' : this.isPreview(req) ? 'preview' : 'route excluded'
      );
      return response;
    }

    let site;

    if (!siteName) {
      site = this.config.siteResolver.getByHost(hostname);
      siteName = site.name;
    } else {
      site = this.config.siteResolver.getByName(siteName);
    }

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(
      pathname,
      language,
      siteName
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

    if (!browserId) {
      browserId = await this.cdpService.generateBrowserId();

      if (!browserId) {
        debug.personalize('skipped (browser id generation failed)');
        return response;
      }
    }

    // Execute targeted experience in CDP
    const { ua } = userAgent(req);
    const params = this.getExperienceParams(req);
    const pointOfSale = this.config.resolvePointOfSale
      ? this.config.resolvePointOfSale(site, language)
      : resolvePointOfSale(site, language);
    const variantId = await this.cdpService.executeExperience(
      personalizeInfo.contentId,
      browserId,
      ua,
      pointOfSale,
      params
    );

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
    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');
    // Share rewrite path with following executed middlewares
    response.headers.set('x-sc-rewrite', rewritePath);

    // Set browserId cookie on the response
    this.setBrowserId(response, browserId);
    // Share site name with the following executed middlewares
    response.cookies.set('sc_site', siteName);

    debug.personalize('personalize middleware end: %o', {
      rewritePath,
      browserId,
      headers: this.extractDebugHeaders(response.headers),
    });

    return response;
  };
}
