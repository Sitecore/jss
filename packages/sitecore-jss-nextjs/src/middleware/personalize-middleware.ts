import { NextResponse, NextRequest, userAgent } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  CdpService,
  CdpServiceConfig,
  ExperienceParams,
  getPersonalizedRewrite,
  PosResolver,
} from '@sitecore-jss/sitecore-jss/personalize';
import { debug, NativeDataFetcher } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { SiteInfo } from '@sitecore-jss/sitecore-jss/site';

export type PersonalizeMiddlewareConfig = MiddlewareBaseConfig & {
  /**
   * Configuration for your Sitecore Experience Edge endpoint
   */
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  /**
   * Configuration for your Sitecore CDP endpoint
   */
  cdpConfig: Omit<CdpServiceConfig, 'dataFetcherResolver'>;
  /**
   * function to resolve point of sale for a site
   * @param {Siteinfo} site to get info from
   * @param {string} language to get info for
   * @returns point of sale value for site/language combination
   */
  getPointOfSale?: (site: SiteInfo, language: string) => string;
};

/**
 * Middleware / handler to support Sitecore Personalize
 */
export class PersonalizeMiddleware extends MiddlewareBase {
  private personalizeService: GraphQLPersonalizeService;
  private cdpService: CdpService;

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

  protected excludeRoute(pathname: string): boolean | undefined {
    // ignore files
    return pathname.includes('.') || super.excludeRoute(pathname);
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = this.getLanguage(req);
    const hostname = this.getHostHeader(req) || this.defaultHostname;

    let browserId = this.getBrowserId(req);
    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
      hostname,
      browserId,
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
      this.excludeRoute(pathname)
    ) {
      debug.personalize(
        'skipped (%s)',
        response.redirected ? 'redirected' : this.isPreview(req) ? 'preview' : 'route excluded'
      );
      return response;
    }

    const site = this.getSite(req, res);

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
    const pointOfSale = this.config.getPointOfSale
      ? this.config.getPointOfSale(site, language)
      : PosResolver.resolve(site, language);
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
    response.cookies.set(this.SITE_SYMBOL, site.name);

    debug.personalize('personalize middleware end: %o', {
      rewritePath,
      browserId,
      headers: this.extractDebugHeaders(response.headers),
    });

    return response;
  };
}
