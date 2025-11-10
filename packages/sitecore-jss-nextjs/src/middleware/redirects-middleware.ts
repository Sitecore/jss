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
import {
  areURLSearchParamsEqual,
  escapeNonSpecialQuestionMarks,
  isRegexOrUrl,
  mergeURLSearchParams,
} from '@sitecore-jss/sitecore-jss/utils';
import { NextURL } from 'next/dist/server/web/next-url';
import { MiddlewareBase, MiddlewareBaseConfig, REWRITE_HEADER_NAME } from './middleware';

const REGEXP_CONTEXT_SITE_LANG = new RegExp(/\$siteLang/, 'i');
const REGEXP_ABSOLUTE_URL = new RegExp('^(?:[a-z]+:)?//', 'i');

type RedirectResult = RedirectInfo & { matchedQueryString?: string };

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
        return this.processRedirectRequest(req, res);
      } catch (error) {
        console.log('Redirect middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  /**
   * Method returns RedirectInfo when matches
   * @param {NextRequest} req request
   * @param {string} siteName site name
   * @returns Promise<RedirectInfo | undefined> The redirect info or undefined if no redirect is found
   * @protected
   */
  protected async getExistsRedirect(
    req: NextRequest,
    siteName: string
  ): Promise<RedirectResult | undefined> {
    const { pathname: incomingURL, search: incomingQS = '' } = this.normalizeUrl(
      req.nextUrl.clone()
    );
    const locale = this.getLanguage(req);
    const normalizedPath = incomingURL.replace(/\/*$/gi, '').toLowerCase();
    const redirects = await this.getRedirects(siteName);
    const language = this.getLanguage(req);
    const modifyRedirects = structuredClone(redirects);
    let matchedQueryString: string | undefined;
    const localePath = `/${locale.toLowerCase()}${normalizedPath}`;

    return modifyRedirects.length
      ? modifyRedirects.find((redirect: RedirectResult) => {
          // process static URL (non-regex) rules
          if (isRegexOrUrl(redirect.pattern) === 'url') {
            const urlArray = redirect.pattern.endsWith('/')
              ? redirect.pattern.slice(0, -1).split('?')
              : redirect.pattern.split('?');
            const patternQS = urlArray[1];
            let patternPath = urlArray[0].toLowerCase();
            // nextjs routes are case-sensitive, but locales should be compared case-insensitively
            const patternParts = patternPath.split('/');
            const maybeLocale = patternParts[1].toLowerCase();
            // case insensitive lookup of locales
            if (new RegExp(this.locales.join('|'), 'i').test(maybeLocale)) {
              patternPath = patternPath.replace(`/${patternParts[1]}`, `/${maybeLocale}`);
            }
            return (
              (patternPath === localePath || patternPath === normalizedPath) &&
              (!patternQS ||
                areURLSearchParamsEqual(
                  new URLSearchParams(patternQS),
                  new URLSearchParams(incomingQS)
                ))
            );
          }

          // process regex rules

          // Modify the redirect pattern to ignore the language prefix in the path
          // And escapes non-special "?" characters in a string or regex.
          redirect.pattern = escapeNonSpecialQuestionMarks(
            redirect.pattern.replace(new RegExp(`^[^]?/${language}/`, 'gi'), '')
          );

          // Prepare the redirect pattern as a regular expression, making it more flexible for matching URLs
          redirect.pattern = `/^\/${redirect.pattern
            .replace(/^\/|\/$/g, '') // Removes leading and trailing slashes
            .replace(/^\^\/|\/\$$/g, '') // Removes unnecessary start (^) and end ($) anchors
            .replace(/^\^|\$$/g, '') // Further cleans up anchors
            .replace(/\$\/gi$/g, '')}[\/]?$/i`; // Ensures the pattern allows an optional trailing slash

          // Redirect pattern matches the full incoming URL with query string present
          matchedQueryString = [
            regexParser(redirect.pattern).test(`/${localePath}${incomingQS}`),
            regexParser(redirect.pattern).test(`${normalizedPath}${incomingQS}`),
          ].some(Boolean)
            ? incomingQS
            : undefined;
          // Save the matched query string (if found) into the redirect object
          redirect.matchedQueryString = matchedQueryString || '';
          return (
            !!(
              regexParser(redirect.pattern).test(`/${req.nextUrl.locale}${incomingURL}`) ||
              regexParser(redirect.pattern).test(incomingURL) ||
              matchedQueryString
            ) && (redirect.locale ? redirect.locale.toLowerCase() === locale.toLowerCase() : true)
          );
        })
      : undefined;
  }

  /**
   * @param {NextRequest} req request
   * @param {Response} res response
   * @returns {Promise<NextResponse>} The redirect response.
   */
  protected async processRedirectRequest(
    req: NextRequest,
    res?: NextResponse
  ): Promise<NextResponse> {
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

    const createResponse = async (): Promise<NextResponse> => {
      const response = res || NextResponse.next();

      if (this.config.disabled && this.config.disabled(req, response)) {
        debug.redirects('skipped (redirects middleware is disabled)');
        return response;
      }

      if (this.isPreview(req) || this.excludeRoute(pathname)) {
        debug.redirects('skipped (%s)', this.isPreview(req) ? 'preview' : 'route excluded');
        return response;
      }

      // Skip prefetch requests from Next.js, which are not original client requests
      // as they load unnecessary requests that burden the redirects middleware with meaningless traffic
      if (this.isPrefetch(req)) {
        debug.redirects('skipped (prefetch)');
        response.headers.set('x-middleware-cache', 'no-cache');
        response.headers.set('Cache-Control', 'no-store, must-revalidate');
        return response;
      }

      site = this.getSite(req, response);

      // Find the redirect from result of RedirectService
      const existsRedirect = await this.getExistsRedirect(req, site.name);

      if (!existsRedirect) {
        debug.redirects('skipped (redirect does not exist)');
        return response;
      }

      debug.redirects('Matched redirect rule: %o', { existsRedirect });

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
        req.nextUrl.locale = site.language;
      }

      const url = this.normalizeUrl(req.nextUrl.clone());

      if (REGEXP_ABSOLUTE_URL.test(existsRedirect.target)) {
        return this.dispatchRedirect(
          existsRedirect.target,
          existsRedirect.redirectType,
          req,
          response,
          true
        );
      } else {
        const isUrl = isRegexOrUrl(existsRedirect.pattern) === 'url';
        const targetParts = existsRedirect.target.split('/');
        const urlFirstPart = targetParts[1];

        if (this.locales.includes(urlFirstPart)) {
          req.nextUrl.locale = urlFirstPart;
          existsRedirect.target = existsRedirect.target.replace(`/${urlFirstPart}`, '');
        }

        const targetSegments = isUrl
          ? existsRedirect.target.split('?')
          : url.pathname.replace(/\/*$/gi, '') + existsRedirect.matchedQueryString;

        const [targetPath, targetQueryString] = isUrl
          ? (targetSegments as string[])
          : (targetSegments as string)
              .replace(regexParser(existsRedirect.pattern), existsRedirect.target)
              .replace(/^\/\//, '/')
              .split('?');

        const mergedQueryString = existsRedirect.isQueryStringPreserved
          ? mergeURLSearchParams(
              new URLSearchParams(url.search ?? ''),
              new URLSearchParams(targetQueryString || '')
            )
          : targetQueryString || '';

        const prepareNewURL = new URL(
          `${targetPath}${mergedQueryString ? `?${mergedQueryString}` : ''}`,
          url.origin
        );

        url.href = prepareNewURL.href;
        url.pathname = prepareNewURL.pathname;
        url.search = prepareNewURL.search;
        url.locale = req.nextUrl.locale;

        return this.dispatchRedirect(url, existsRedirect.redirectType, req, response, false);
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
  }

  /**
   * Fetches all redirects for a given site from the Sitecore instance
   * @param {string} siteName - The name of the site to fetch redirects for
   * @returns {Promise<RedirectInfo[]>} A promise that resolves to an array of redirect information
   * @protected
   */
  protected async getRedirects(siteName: string): Promise<RedirectInfo[]> {
    return this.redirectsService.fetchRedirects(siteName);
  }

  /**
   * When a user clicks on a link generated by the Link component from next/link,
   * Next.js adds special parameters in the route called path.
   * This method removes these special parameters.
   * @param {NextURL} url
   * @returns {string} normalize url
   */
  private normalizeUrl(url: NextURL): NextURL {
    if (!url.search) return url;

    /**
     * Prepare special parameters for exclusion.
     */
    const splittedPathname = url.pathname
      .split('/')
      .filter((route: string) => route)
      .map((route) => `path=${route}`);

    /**
     * Remove special parameters(Next.JS)
     * Example: /about/contact/us
     * When a user clicks on this link, Next.js should generate a link for the middleware, formatted like this:
     * http://host/about/contact/us?path=about&path=contact&path=us
     */
    const newQueryString = url.search
      .replace(/^\?/, '')
      .split('&')
      .filter((param) => !splittedPathname.includes(param))
      .join('&');

    const newUrl = new URL(`${url.pathname.toLowerCase()}?${newQueryString}`, url.origin);

    url.search = newUrl.search;
    url.pathname = newUrl.pathname.toLowerCase();
    url.href = newUrl.href;

    return url;
  }

  /**
   * Dispatch a redirect or rewrite based on type.
   * @param {NextURL | string} target Final target to redirect/rewrite to (NextURL or string for externals).
   * @param {string} type One of `REDIRECT_TYPE_301`, `REDIRECT_TYPE_302`, or `REDIRECT_TYPE_SERVER_TRANSFER`.
   * @param {NextRequest} req Incoming request.
   * @param {NextResponse} res Current response (used for header cleanup/carry-over).
   * @param {boolean} isExternal Set to `true` when target is an external absolute URL.
   * @returns A NextResponse.
   */
  private dispatchRedirect(
    target: NextURL | string,
    type: string,
    req: NextRequest,
    res: NextResponse,
    isExternal = false
  ): NextResponse {
    switch (type) {
      case REDIRECT_TYPE_301:
        return this.createRedirectResponse(target, res, 301, 'Moved Permanently');
      case REDIRECT_TYPE_302:
        return this.createRedirectResponse(target, res, 302, 'Found');
      case REDIRECT_TYPE_SERVER_TRANSFER:
        // rewrite expects a string; unwrap NextURL if needed
        return this.rewrite(
          typeof target === 'string' ? target : target.href,
          req,
          res,
          isExternal
        );
      default:
        // Unknown type: return the input response unchanged
        return res;
    }
  }

  /**
   * Helper function to create a redirect response and remove the x-middleware-next header.
   * @param {NextURL} url The URL to redirect to.
   * @param {Response} res The response object.
   * @param {number} status The HTTP status code of the redirect.
   * @param {string} statusText The status text of the redirect.
   * @returns {NextResponse<unknown>} The redirect response.
   */
  private createRedirectResponse(
    url: NextURL | string,
    res: Response | undefined,
    status: number,
    statusText: string
  ): NextResponse {
    const redirect = NextResponse.redirect(url, {
      status,
      statusText,
      headers: res?.headers,
    });
    if (res?.headers) {
      redirect.headers.delete('x-middleware-next');
      redirect.headers.delete('x-middleware-rewrite');
      redirect.headers.delete(REWRITE_HEADER_NAME);
    }
    return redirect;
  }
}

// const REGEXP_CONTEXT_SITE_LANG = new RegExp(/\$siteLang/, 'i');
// const REGEXP_ABSOLUTE_URL = new RegExp('^(?:[a-z]+:)?//', 'i');

// /**
//  * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
//  */
// export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> &
//   MiddlewareBaseConfig & {
//     /**
//      * These are all the locales you support in your application.
//      * These should match those in your next.config.js (i18n.locales).
//      */
//     locales: string[];
//   };
// /**
//  * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
//  * compares with current url and redirects to target url
//  */
// export class RedirectsMiddleware extends MiddlewareBase {
//   private redirectsService: GraphQLRedirectsService;
//   private locales: string[];

//   /**
//    * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
//    */
//   constructor(protected config: RedirectsMiddlewareConfig) {
//     super(config);

//     // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
//     // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
//     this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
//     this.locales = config.locales;
//   }

//   /**
//    * Gets the Next.js middleware handler with error handling
//    * @returns route handler
//    */
//   public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
//     return async (req, res) => {
//       try {
//         return await this.handler(req, res);
//       } catch (error) {
//         console.log('Redirect middleware failed:');
//         console.log(error);
//         return res || NextResponse.next();
//       }
//     };
//   }

//   private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
//     const pathname = req.nextUrl.pathname;
//     const language = this.getLanguage(req);
//     const hostname = this.getHostHeader(req) || this.defaultHostname;
//     let site: SiteInfo | undefined;
//     const startTimestamp = Date.now();

//     debug.redirects('redirects middleware start: %o', {
//       pathname,
//       language,
//       hostname,
//     });

//     const createResponse = async () => {
//       if (this.config.disabled && this.config.disabled(req, res || NextResponse.next())) {
//         debug.redirects('skipped (redirects middleware is disabled)');
//         return res || NextResponse.next();
//       }

//       if (this.isPreview(req) || this.excludeRoute(pathname)) {
//         debug.redirects('skipped (%s)', this.isPreview(req) ? 'preview' : 'route excluded');

//         return res || NextResponse.next();
//       }

//       site = this.getSite(req, res);

//       // Find the redirect from result of RedirectService
//       const existsRedirect = await this.getExistsRedirect(req, site.name);

//       if (!existsRedirect) {
//         debug.redirects('skipped (redirect does not exist)');

//         return res || NextResponse.next();
//       }

//       // Find context site language and replace token
//       if (
//         REGEXP_CONTEXT_SITE_LANG.test(existsRedirect.target) &&
//         !(
//           REGEXP_ABSOLUTE_URL.test(existsRedirect.target) &&
//           existsRedirect.target.includes(hostname)
//         )
//       ) {
//         existsRedirect.target = existsRedirect.target.replace(
//           REGEXP_CONTEXT_SITE_LANG,
//           site.language
//         );
//       }

//       // Build the redirect URL
//       const redirectUrl = this.buildRedirectUrl(existsRedirect, req);

//       // Loop guard: prevent infinite redirects
//       const currentUrl = decodeURIComponent(req.nextUrl.href);
//       if (redirectUrl === currentUrl) {
//         debug.redirects('skipped (redirect would create a loop)');

//         return res || NextResponse.next();
//       }

//       return this.executeRedirect(existsRedirect, redirectUrl, res);
//     };

//     const response = await createResponse();

//     debug.redirects('redirects middleware end in %dms: %o', Date.now() - startTimestamp, {
//       redirected: response.redirected,
//       status: response.status,
//       url: response.url,
//       headers: this.extractDebugHeaders(response.headers),
//     });

//     return response;
//   };

//   /**
//    * Builds the redirect URL based on the redirect rule and request
//    * @param {RedirectInfo} redirect The redirect rule to apply
//    * @param {NextRequest} req The incoming request
//    * @returns {string} The fully constructed redirect URL
//    * @private
//    */
//   private buildRedirectUrl(redirect: RedirectInfo, req: NextRequest): string {
//     const url = req.nextUrl.clone();

//     if (REGEXP_ABSOLUTE_URL.test(redirect.target)) {
//       // Absolute URL: preserve query string if requested
//       url.href = redirect.target;
//       if (redirect.isQueryStringPreserved && req.nextUrl.search) {
//         url.search = req.nextUrl.search;
//       }
//       return decodeURIComponent(url.href);
//     }

//     // Relative URL: perform pattern matching and replacement
//     const patternIsQueryAware = redirect.pattern.includes('?');

//     // Normalize the pattern for regex matching
//     const normalizedCore = redirect.pattern
//       .replace(/^\/|\/$/g, '') // trim leading/trailing slash
//       .replace(/^\^\/|\/\$$/g, '') // trim ^/ and /$ if present
//       .replace(/^\^|\$$/g, '') // trim ^ or $ if present
//       .replace(/(?<!\\)\?/g, '\\?'); // escape unescaped '?'

//     const matchRegex = new RegExp(`^/${normalizedCore}/?$`, 'i');

//     // For generic rules (no locale), strip locale prefix from pathname
//     let pathnameForReplacement = url.pathname;
//     if (!redirect.locale) {
//       const requestLocale = (req.nextUrl.locale || '').toLowerCase();
//       if (requestLocale) {
//         pathnameForReplacement = pathnameForReplacement.replace(
//           new RegExp(`^/(?:${requestLocale})/`, 'i'),
//           '/'
//         );
//       }
//     }

//     // Determine what to match against (with or without query string)
//     const replaceAgainst = patternIsQueryAware
//       ? `${pathnameForReplacement}${url.search || ''}`
//       : pathnameForReplacement;

//     // Set query string based on preservation setting
//     url.search = redirect.isQueryStringPreserved ? url.search : '';

//     // Handle locale prefix in target URL
//     const firstSeg = redirect.target.split('/')[1];
//     if (this.locales.includes(firstSeg)) {
//       url.locale = firstSeg;
//       redirect.target = redirect.target.replace(`/${firstSeg}`, '');
//     }

//     // Perform the pattern replacement
//     const replaced = replaceAgainst.replace(matchRegex, redirect.target).replace(/^\/\//, '/');

//     const [newPathname, newQuery] = replaced.split('?');
//     url.pathname = newPathname;

//     // Append any query params introduced by the replacement
//     if (newQuery) {
//       const newParams = new URLSearchParams(newQuery);
//       for (const [key, val] of newParams.entries()) {
//         url.searchParams.append(key, val);
//       }
//     }

//     // Build final URL using the request origin
//     const base = new URL(req.nextUrl.href);
//     base.pathname = url.pathname;
//     base.search = url.search ?? '';
//     return decodeURIComponent(base.toString());
//   }

//   /**
//    * Executes the redirect based on its type
//    * @param {RedirectInfo} redirect The redirect rule
//    * @param {string} redirectUrl The target URL
//    * @param {NextResponse} res Optional response to pass through
//    * @returns {NextResponse} The redirect/rewrite response
//    * @private
//    */
//   private executeRedirect(
//     redirect: RedirectInfo,
//     redirectUrl: string,
//     res?: NextResponse
//   ): NextResponse {
//     /** return Response redirect with http code of redirect type **/
//     switch (redirect.redirectType) {
//       case REDIRECT_TYPE_301:
//         return NextResponse.redirect(redirectUrl, {
//           status: 301,
//           statusText: 'Moved Permanently',
//           headers: res?.headers,
//         });
//       case REDIRECT_TYPE_302:
//         return NextResponse.redirect(redirectUrl, {
//           status: 302,
//           statusText: 'Found',
//           headers: res?.headers,
//         });
//       case REDIRECT_TYPE_SERVER_TRANSFER:
//         return NextResponse.rewrite(redirectUrl, res);
//       default:
//         return res || NextResponse.next();
//     }
//   }

//   /**
//    * Method returns RedirectInfo when matches
//    * @param {NextRequest} req request
//    * @param {string} siteName site name
//    * @returns Promise<RedirectInfo | undefined>
//    * @private
//    */
//   private async getExistsRedirect(
//     req: NextRequest,
//     siteName: string
//   ): Promise<RedirectInfo | undefined> {
//     const fetchedRedirects = await this.redirectsService.fetchRedirects(siteName);
//     if (!fetchedRedirects?.length) return undefined;

//     const requestPath = req.nextUrl.pathname;
//     const requestSearch = req.nextUrl.search || '';
//     const requestLocale = (req.nextUrl.locale || '').toLowerCase();
//     const normalizedLanguage = this.getLanguage(req);

//     // Filter out any malformed entries so we don't blow up later
//     const cleanRedirects: RedirectInfo[] = fetchedRedirects.filter(
//       (redirect: any) =>
//         typeof redirect?.pattern === 'string' && typeof redirect?.target === 'string'
//     );

//     if (!cleanRedirects.length) return undefined;

//     // Sort so locale-specific rules are evaluated before generic ones (for the current request locale)
//     const sortedRedirects = structuredClone(cleanRedirects).sort(
//       (a: RedirectInfo, b: RedirectInfo) => {
//         const aMatches = (a.locale || '').toLowerCase() === requestLocale;
//         const bMatches = (b.locale || '').toLowerCase() === requestLocale;
//         return aMatches === bMatches ? 0 : aMatches ? -1 : 1;
//       }
//     );

//     // Find first matching rule
//     return sortedRedirects.find((rule: RedirectInfo) =>
//       this.matchesRedirectRule(rule, requestPath, requestSearch, requestLocale, normalizedLanguage)
//     );
//   }

//   /**
//    * Tests if a redirect rule matches the current request
//    * @param {RedirectInfo} rule The redirect rule to test
//    * @param {string} requestPath The request pathname
//    * @param {string} requestSearch The query string (including ?)
//    * @param {string} requestLocale The request locale (lowercase)
//    * @param {string} normalizedLanguage The normalized language
//    * @returns {boolean} True if the rule matches the request
//    * @private
//    */
//   private matchesRedirectRule(
//     rule: RedirectInfo,
//     requestPath: string,
//     requestSearch: string,
//     requestLocale: string,
//     normalizedLanguage: string
//   ): boolean {
//     const stripLeadingLocale = (path: string, locale: string) => {
//       if (!locale) return path;
//       return path.replace(new RegExp(`^/(?:${locale})/`, 'i'), '/');
//     };

//     // Always coerce to string locally so we don't ever read .includes on undefined
//     const patternStr = String(rule.pattern || '');

//     // If the author's pattern contains "?", allow matching against pathname+search
//     const patternIsQueryAware = patternStr.includes('?');

//     // 1) Strip a leading "<locale>/" from the author-entered pattern for generic rules
//     const rawAuthorPattern = rule.locale
//       ? patternStr
//       : patternStr.replace(new RegExp(`^/?${normalizedLanguage}/`, 'i'), '');

//     // 2) Normalize into a safe, anchored regex core
//     const normalizedCore = rawAuthorPattern
//       .replace(/^\/|\/$/g, '') // trim leading/trailing slash
//       .replace(/^\^\/|\/\$$/g, '') // trim ^/ and /$ if present
//       .replace(/^\^|\$$/g, '') // trim ^ or $
//       .replace(/(?<!\\)\?/g, '\\?') // escape unescaped "?"
//       .replace(/\$\/gi$/g, ''); // legacy cleanup

//     // Build a case-insensitive, optional trailing slash regex string that regexParser understands
//     const regexString = `/^\/${normalizedCore}[\/]?$/i`;
//     const candidateRegex = regexParser(regexString);

//     // Decide what we're matching against
//     const exactTestValue = patternIsQueryAware ? requestPath + requestSearch : requestPath;

//     // Build a locale-prefixed probe only when we actually have a request locale
//     const pathWithoutLocale = stripLeadingLocale(requestPath, requestLocale || '');
//     const prefixedProbe = requestLocale
//       ? `/${requestLocale}${pathWithoutLocale}`
//       : pathWithoutLocale;

//     // Exact check
//     const matchesExact = candidateRegex.test(exactTestValue);

//     if (rule.locale) {
//       // Locale-specific rule must match the actual request locale
//       const authoredLooksBare = !/^[A-Za-z]{2}(?:-[A-Za-z]{2})?\//i.test(normalizedCore);
//       const alsoMatchesPrefixedWhenBare =
//         authoredLooksBare &&
//         candidateRegex.test(patternIsQueryAware ? prefixedProbe + requestSearch : prefixedProbe);

//       return (
//         (matchesExact || alsoMatchesPrefixedWhenBare) && rule.locale.toLowerCase() === requestLocale
//       );
//     }

//     // Generic rule (no locale): match against both the full path and the path without locale prefix
//     // Example: pattern "/test" should match both "/test" and "/en/test"
//     const matchesWithoutLocale = requestLocale
//       ? candidateRegex.test(
//           patternIsQueryAware ? pathWithoutLocale + requestSearch : pathWithoutLocale
//         )
//       : false;

//     return matchesExact || matchesWithoutLocale;
//   }
// }
