import regexParser from 'regex-parser';
import { NextResponse, NextRequest } from 'next/server';
import {
  RedirectInfo,
  GraphQLRedirectsService,
  GraphQLRedirectsServiceConfig,
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss/site';
import { debug } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';

const REGEXP_CONTEXT_SITE_LANG = new RegExp(/\$siteLang/, 'gi');

/**
 * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
 */
export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> &
  MiddlewareBaseConfig & {
    /**
     * These are all the locales you support in your application.
     * These should match those in your next.config.js (i18n.locales).
     */
    locales: string[];
  };
/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware extends MiddlewareBase {
  private redirectsService: GraphQLRedirectsService;
  private locales: string[];

  /**
   * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
   */
  constructor(protected config: RedirectsMiddlewareConfig) {
    super(config);

    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
    this.locales = config.locales;
  }

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns route handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error) {
        console.log('Redirect middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = this.getLanguage(req);
    const hostname = this.getHostHeader(req) || this.defaultHostname;
    let site: SiteInfo | undefined;
    const startTimestamp = Date.now();

    debug.redirects('redirects middleware start: %o', {
      pathname,
      language,
      hostname,
    });

    const createResponse = async () => {
      if (this.config.disabled && this.config.disabled(req, res || NextResponse.next())) {
        debug.redirects('skipped (redirects middleware is disabled)');
        return res || NextResponse.next();
      }

      if (this.isPreview(req) || this.excludeRoute(pathname)) {
        debug.redirects('skipped (%s)', this.isPreview(req) ? 'preview' : 'route excluded');

        return res || NextResponse.next();
      }

      site = this.getSite(req, res);

      // Find the redirect from result of RedirectService
      const existsRedirect = await this.getExistsRedirect(req, site.name);

      if (!existsRedirect) {
        debug.redirects('skipped (redirect does not exist)');

        return res || NextResponse.next();
      }

      // Find context site language and replace token
      if (REGEXP_CONTEXT_SITE_LANG.test(existsRedirect.target)) {
        existsRedirect.target = existsRedirect.target.replace(
          REGEXP_CONTEXT_SITE_LANG,
          site.language
        );
      }

      const url = req.nextUrl.clone();
      const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

      if (absoluteUrlRegex.test(existsRedirect.target)) {
        url.href = existsRedirect.target;
        url.locale = req.nextUrl.locale;
      } else {
        url.search = existsRedirect.isQueryStringPreserved ? url.search : '';
        const urlFirstPart = existsRedirect.target.split('/')[1];
        if (this.locales.includes(urlFirstPart)) {
          url.locale = urlFirstPart;
          existsRedirect.target = existsRedirect.target.replace(`/${urlFirstPart}`, '');
        }

        url.pathname = url.pathname
          .replace(regexParser(existsRedirect.pattern), existsRedirect.target)
          .replace(/^\/\//, '/');
      }

      const redirectUrl = decodeURIComponent(url.href);

      /** return Response redirect with http code of redirect type **/
      switch (existsRedirect.redirectType) {
        case REDIRECT_TYPE_301:
          return NextResponse.redirect(redirectUrl, {
            status: 301,
            statusText: 'Moved Permanently',
            headers: res?.headers,
          });
        case REDIRECT_TYPE_302:
          return NextResponse.redirect(redirectUrl, {
            status: 302,
            statusText: 'Found',
            headers: res?.headers,
          });
        case REDIRECT_TYPE_SERVER_TRANSFER:
          return NextResponse.rewrite(redirectUrl, res);
        default:
          return res || NextResponse.next();
      }
    };

    const response = await createResponse();

    // Share site name with the following executed middlewares
    // Don't need to set when middleware is disabled
    response.cookies.set(this.SITE_SYMBOL, site.name);

    debug.redirects('redirects middleware end in %dms: %o', Date.now() - startTimestamp, {
      redirected: response.redirected,
      status: response.status,
      url: response.url,
      headers: this.extractDebugHeaders(response.headers),
    });

    return response;
  };

  /**
   * Method returns RedirectInfo when matches
   * @param {NextRequest} req request
   * @param {string} siteName site name
   * @returns Promise<RedirectInfo | undefined>
   * @private
   */
  private async getExistsRedirect(
    req: NextRequest,
    siteName: string
  ): Promise<RedirectInfo | undefined> {
    const redirects = await this.redirectsService.fetchRedirects(siteName);
    const tragetURL = req.nextUrl.pathname;
    const targetQS = req.nextUrl.search || '';

    return redirects.length
      ? redirects.find((redirect: RedirectInfo) => {
          redirect.pattern = `/^\/${redirect.pattern
            .replace(/^\/|\/$/g, '')
            .replace(/^\^\/|\/\$$/g, '')
            .replace(/^\^|\$$/g, '')
            .replace(/\$\/gi$/g, '')}$/gi`;

          return (
            (regexParser(redirect.pattern).test(tragetURL) ||
              regexParser(redirect.pattern).test(`${tragetURL}${targetQS}`) ||
              regexParser(redirect.pattern).test(`/${req.nextUrl.locale}${tragetURL}`) ||
              regexParser(redirect.pattern).test(
                `/${req.nextUrl.locale}${tragetURL}${targetQS}`
              )) &&
            (redirect.locale
              ? redirect.locale.toLowerCase() === req.nextUrl.locale.toLowerCase()
              : true)
          );
        })
      : undefined;
  }
}
