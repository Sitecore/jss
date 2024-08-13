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

const REGEXP_CONTEXT_SITE_LANG = new RegExp(/\$siteLang/, 'i');
const REGEXP_ABSOLUTE_URL = new RegExp('^(?:[a-z]+:)?//', 'i');

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
      if (
        REGEXP_CONTEXT_SITE_LANG.test(existsRedirect.target) &&
        !(
          REGEXP_ABSOLUTE_URL.test(existsRedirect.target) &&
          existsRedirect.target.includes(hostname)
        )
      ) {
        existsRedirect.target = existsRedirect.target.replace(
          REGEXP_CONTEXT_SITE_LANG,
          site.language
        );
      }

      const url = req.nextUrl.clone();

      if (REGEXP_ABSOLUTE_URL.test(existsRedirect.target)) {
        url.href = existsRedirect.target;
      } else {
        const source = this.normalizeUrl(url.pathname, url.search);
        const urlFirstPart = existsRedirect.target.split('/')[1];

        if (this.locales.includes(urlFirstPart)) {
          url.locale = urlFirstPart;
          existsRedirect.target = existsRedirect.target.replace(`/${urlFirstPart}`, '');
        }

        const target = source
          .replace(regexParser(existsRedirect.pattern), existsRedirect.target)
          .replace(/^\/\//, '/')
          .split('?');

        url.pathname = `${target[0]}`;

        if (target[1]) {
          url.search = `?${target[1]}`;
        }

        const newURL = new URL(
          `${url.pathname}${existsRedirect.isQueryStringPreserved ? url.search : ''}`,
          url.origin
        );
        url.href = newURL.href;
      }

      const redirectUrl = decodeURIComponent(url.href);

      /** return Response redirect with http code of redirect type **/
      switch (existsRedirect.redirectType) {
        case REDIRECT_TYPE_301:
          return NextResponse.redirect(redirectUrl, {
            ...res,
            status: 301,
            statusText: 'Moved Permanently',
            headers: res?.headers,
          });
        case REDIRECT_TYPE_302:
          return NextResponse.redirect(redirectUrl, {
            ...res,
            status: 302,
            statusText: 'Found',
            headers: res?.headers,
          });
        case REDIRECT_TYPE_SERVER_TRANSFER: {
          return this.rewrite(redirectUrl, req, res || NextResponse.next());
        }
        default:
          return res || NextResponse.next();
      }
    };

    const response = await createResponse();

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
    const normalizedUrl = new URL(
      this.normalizeUrl(req.nextUrl.pathname, req.nextUrl.search || ''),
      req.nextUrl.href
    );
    const tragetURL = normalizedUrl.pathname;
    const targetQS = normalizedUrl.search || '';
    const language = this.getLanguage(req);
    const modifyRedirects = structuredClone(redirects);

    return modifyRedirects.length
      ? modifyRedirects.find((redirect: RedirectInfo) => {
          redirect.pattern = redirect.pattern.replace(RegExp(`^[^]?/${language}/`, 'gi'), '');
          redirect.pattern = `/^\/${redirect.pattern
            .replace(/^\/|\/$/g, '')
            .replace(/^\^\/|\/\$$/g, '')
            .replace(/^\^|\$$/g, '')
            .replace(/(?<!\\)\?/g, '\\?')
            .replace(/\$\/gi$/g, '')}[\/]?$/gi`;

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

  /**
   * When a user clicks on a link generated by the Link component from next/link,
   * Next.js adds special parameters in the route called path.
   * This method removes these special parameters.
   * @param {string} pathname
   * @param {string} queryString
   * @returns {string} modified url
   */
  private normalizeUrl(pathname: string, queryString: string) {
    if (!queryString) {
      return pathname;
    }

    /**
     * Prepare special parameters for exclusion.
     */
    const splittedPathname = pathname
      .split('/')
      .filter((route) => route)
      .map((route) => `path=${route}`);

    /**
     * Remove special parameters(Next.JS)
     * Example: /about/contact/us
     * When a user clicks on this link, Next.js should generate a link for the middleware, formatted like this:
     * http://host/about/contact/us?path=about&path=contact&path=us
     */
    const newQueryString = queryString
      .replace(/^\?/, '')
      .split('&')
      .filter((param) => {
        if (!splittedPathname.includes(param)) {
          return param;
        }
        return false;
      })
      .join('&');

    if (newQueryString) {
      return `${pathname}?${newQueryString}`;
    }

    return pathname;
  }
}
