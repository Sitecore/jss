import { NextResponse, NextRequest } from 'next/server';
import {
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  CdpService,
  CdpServiceConfig,
  getPersonalizedRewrite,
} from '@sitecore-jss/sitecore-jss/personalize';
import { debug } from '@sitecore-jss/sitecore-jss';

// TODO: comments and maybe combine/flatten the config type?
export type PersonalizeMiddlewareConfig = {
  excludeRoute?: (pathname: string) => boolean;
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  cdpConfig: Omit<CdpServiceConfig, 'fetch'>;
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
    this.cdpService = new CdpService(config.cdpConfig);
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
    return req.cookies[this.browserIdCookieName] || undefined;
  }

  protected setBrowserId(res: NextResponse, browserId: string) {
    if (browserId.length > 0) {
      const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
      const options = { expires: expiryDate, secure: true };
      res.cookie(this.browserIdCookieName, browserId, options);
    }
  }

  private excludeRoute(pathname: string) {
    if (
      pathname.includes('.') || // Ignore files
      pathname.startsWith('/api') // Ignore API calls
    ) {
      return true;
    }
    return false;
  }

  private isPreview(req: NextRequest) {
    return req.cookies.__prerender_bypass || req.cookies.__next_preview_data;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = req.nextUrl.locale || req.nextUrl.defaultLocale || 'en';
    let browserId = this.getBrowserId(req);
    let segment = undefined;

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (
      response.redirected || // Don't attempt to personalize a redirect
      this.isPreview(req) || // No need to personalize for preview (layout data is already prepared for preview)
      (this.config.excludeRoute || this.excludeRoute)(pathname)
    ) {
      return response;
    }

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(pathname, language);

    if (!personalizeInfo) {
      // Likely an invalid route / language
      debug.personalize('personalize info for %s %s not found', pathname, language);
      return response;
    }

    if (personalizeInfo.segments.length === 0) {
      // No personalization configured
      return response;
    }

    // Get segment data from CDP
    const segmentData = await this.cdpService.getSegments(personalizeInfo.contentId, browserId);
    // If a browserId was not passed in (new session), a new browserId will be returned
    browserId = segmentData.browserId;
    segment = segmentData.segments.length ? segmentData.segments[0] : undefined;

    if (!segment) {
      // No segment identified
      return response;
    }
    // Rewrite to persononalized path
    const rewrite = getPersonalizedRewrite(pathname, { segmentId: segment });
    response = NextResponse.rewrite(rewrite);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');

    // Set browserId cookie on the response
    if (browserId) {
      this.setBrowserId(response, browserId);
    }

    return response;
  };
}
