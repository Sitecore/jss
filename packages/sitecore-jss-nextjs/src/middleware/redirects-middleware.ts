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

      // Build the redirect URL
      const redirectUrl = this.buildRedirectUrl(existsRedirect, req);

      // Loop guard: prevent infinite redirects
      const currentUrl = decodeURIComponent(req.nextUrl.href);
      if (redirectUrl === currentUrl) {
        debug.redirects('skipped (redirect would create a loop)');

        return res || NextResponse.next();
      }

      return this.executeRedirect(existsRedirect, redirectUrl, res);
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
   * Builds the redirect URL based on the redirect rule and request
   * @param {RedirectInfo} redirect The redirect rule to apply
   * @param {NextRequest} req The incoming request
   * @returns {string} The fully constructed redirect URL
   * @private
   */
  private buildRedirectUrl(redirect: RedirectInfo, req: NextRequest): string {
    const url = req.nextUrl.clone();

    if (REGEXP_ABSOLUTE_URL.test(redirect.target)) {
      // Absolute URL: preserve query string if requested
      url.href = redirect.target;
      if (redirect.isQueryStringPreserved && req.nextUrl.search) {
        url.search = req.nextUrl.search;
      }
      return decodeURIComponent(url.href);
    }

    // Relative URL: perform pattern matching and replacement
    const patternIsQueryAware = redirect.pattern.includes('?');

    // Normalize the pattern for regex matching
    const normalizedCore = redirect.pattern
      .replace(/^\/|\/$/g, '') // trim leading/trailing slash
      .replace(/^\^\/|\/\$$/g, '') // trim ^/ and /$ if present
      .replace(/^\^|\$$/g, '') // trim ^ or $ if present
      .replace(/(?<!\\)\?/g, '\\?'); // escape unescaped '?'

    const matchRegex = new RegExp(`^/${normalizedCore}/?$`, 'i');

    // For generic rules (no locale), strip locale prefix from pathname
    let pathnameForReplacement = url.pathname;
    if (!redirect.locale) {
      const requestLocale = (req.nextUrl.locale || '').toLowerCase();
      if (requestLocale) {
        pathnameForReplacement = pathnameForReplacement.replace(
          new RegExp(`^/(?:${requestLocale})/`, 'i'),
          '/'
        );
      }
    }

    // Determine what to match against (with or without query string)
    const replaceAgainst = patternIsQueryAware
      ? `${pathnameForReplacement}${url.search || ''}`
      : pathnameForReplacement;

    // Set query string based on preservation setting
    url.search = redirect.isQueryStringPreserved ? url.search : '';

    // Handle locale prefix in target URL
    const firstSeg = redirect.target.split('/')[1];
    if (this.locales.includes(firstSeg)) {
      url.locale = firstSeg;
      redirect.target = redirect.target.replace(`/${firstSeg}`, '');
    }

    // Perform the pattern replacement
    const replaced = replaceAgainst.replace(matchRegex, redirect.target).replace(/^\/\//, '/');

    const [newPathname, newQuery] = replaced.split('?');
    url.pathname = newPathname;

    // Append any query params introduced by the replacement
    if (newQuery) {
      const newParams = new URLSearchParams(newQuery);
      for (const [key, val] of newParams.entries()) {
        url.searchParams.append(key, val);
      }
    }

    // Build final URL using the request origin
    const base = new URL(req.nextUrl.href);
    base.pathname = url.pathname;
    base.search = url.search ?? '';
    return decodeURIComponent(base.toString());
  }

  /**
   * Executes the redirect based on its type
   * @param {RedirectInfo} redirect The redirect rule
   * @param {string} redirectUrl The target URL
   * @param {NextResponse} res Optional response to pass through
   * @returns {NextResponse} The redirect/rewrite response
   * @private
   */
  private executeRedirect(
    redirect: RedirectInfo,
    redirectUrl: string,
    res?: NextResponse
  ): NextResponse {
    /** return Response redirect with http code of redirect type **/
    switch (redirect.redirectType) {
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
  }

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
    const fetchedRedirects = await this.redirectsService.fetchRedirects(siteName);
    if (!fetchedRedirects?.length) return undefined;

    const requestPath = req.nextUrl.pathname;
    const requestSearch = req.nextUrl.search || '';
    const requestLocale = (req.nextUrl.locale || '').toLowerCase();
    const normalizedLanguage = this.getLanguage(req);

    // Filter out any malformed entries so we don't blow up later
    const cleanRedirects: RedirectInfo[] = fetchedRedirects.filter(
      (redirect: any) =>
        typeof redirect?.pattern === 'string' && typeof redirect?.target === 'string'
    );

    if (!cleanRedirects.length) return undefined;

    // Sort so locale-specific rules are evaluated before generic ones (for the current request locale)
    const sortedRedirects = structuredClone(cleanRedirects).sort(
      (a: RedirectInfo, b: RedirectInfo) => {
        const aMatches = (a.locale || '').toLowerCase() === requestLocale;
        const bMatches = (b.locale || '').toLowerCase() === requestLocale;
        return aMatches === bMatches ? 0 : aMatches ? -1 : 1;
      }
    );

    // Find first matching rule
    return sortedRedirects.find((rule: RedirectInfo) =>
      this.matchesRedirectRule(rule, requestPath, requestSearch, requestLocale, normalizedLanguage)
    );
  }

  /**
   * Tests if a redirect rule matches the current request
   * @param {RedirectInfo} rule The redirect rule to test
   * @param {string} requestPath The request pathname
   * @param {string} requestSearch The query string (including ?)
   * @param {string} requestLocale The request locale (lowercase)
   * @param {string} normalizedLanguage The normalized language
   * @returns {boolean} True if the rule matches the request
   * @private
   */
  private matchesRedirectRule(
    rule: RedirectInfo,
    requestPath: string,
    requestSearch: string,
    requestLocale: string,
    normalizedLanguage: string
  ): boolean {
    const stripLeadingLocale = (path: string, locale: string) => {
      if (!locale) return path;
      return path.replace(new RegExp(`^/(?:${locale})/`, 'i'), '/');
    };

    // Always coerce to string locally so we don't ever read .includes on undefined
    const patternStr = String(rule.pattern || '');

    // If the author's pattern contains "?", allow matching against pathname+search
    const patternIsQueryAware = patternStr.includes('?');

    // 1) Strip a leading "<locale>/" from the author-entered pattern for generic rules
    const rawAuthorPattern = rule.locale
      ? patternStr
      : patternStr.replace(new RegExp(`^/?${normalizedLanguage}/`, 'i'), '');

    // 2) Normalize into a safe, anchored regex core
    const normalizedCore = rawAuthorPattern
      .replace(/^\/|\/$/g, '') // trim leading/trailing slash
      .replace(/^\^\/|\/\$$/g, '') // trim ^/ and /$ if present
      .replace(/^\^|\$$/g, '') // trim ^ or $
      .replace(/(?<!\\)\?/g, '\\?') // escape unescaped "?"
      .replace(/\$\/gi$/g, ''); // legacy cleanup

    // Build a case-insensitive, optional trailing slash regex string that regexParser understands
    const regexString = `/^\/${normalizedCore}[\/]?$/i`;
    const candidateRegex = regexParser(regexString);

    // Decide what we're matching against
    const exactTestValue = patternIsQueryAware ? requestPath + requestSearch : requestPath;

    // Build a locale-prefixed probe only when we actually have a request locale
    const pathWithoutLocale = stripLeadingLocale(requestPath, requestLocale || '');
    const prefixedProbe = requestLocale
      ? `/${requestLocale}${pathWithoutLocale}`
      : pathWithoutLocale;

    // Exact check
    const matchesExact = candidateRegex.test(exactTestValue);

    if (rule.locale) {
      // Locale-specific rule must match the actual request locale
      const authoredLooksBare = !/^[A-Za-z]{2}(?:-[A-Za-z]{2})?\//i.test(normalizedCore);
      const alsoMatchesPrefixedWhenBare =
        authoredLooksBare &&
        candidateRegex.test(patternIsQueryAware ? prefixedProbe + requestSearch : prefixedProbe);

      return (
        (matchesExact || alsoMatchesPrefixedWhenBare) && rule.locale.toLowerCase() === requestLocale
      );
    }

    // Generic rule (no locale): match against both the full path and the path without locale prefix
    // Example: pattern "/test" should match both "/test" and "/en/test"
    const matchesWithoutLocale = requestLocale
      ? candidateRegex.test(
          patternIsQueryAware ? pathWithoutLocale + requestSearch : pathWithoutLocale
        )
      : false;

    return matchesExact || matchesWithoutLocale;
  }
}
