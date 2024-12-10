import { debug } from '@sitecore-jss/sitecore-jss';
import {
  GraphQLRedirectsService,
  GraphQLRedirectsServiceConfig,
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
  RedirectInfo,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss/site';
import { getPermutations } from '@sitecore-jss/sitecore-jss/utils';
import { NextRequest, NextResponse } from 'next/server';
import regexParser from 'regex-parser';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { NextURL } from 'next/dist/server/web/next-url';

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
        req.nextUrl.locale = site.language;
      }

      const url = this.normalizeUrl(req.nextUrl.clone());

      if (REGEXP_ABSOLUTE_URL.test(existsRedirect.target)) {
        url.href = existsRedirect.target;
      } else {
        const source = `${url.pathname.replace(/\/*$/gi, '')}${existsRedirect.matchedQueryString}`;
        const urlFirstPart = existsRedirect.target.split('/')[1];

        if (this.locales.includes(urlFirstPart)) {
          req.nextUrl.locale = urlFirstPart;
          existsRedirect.target = existsRedirect.target.replace(`/${urlFirstPart}`, '');
        }

        const target = source
          .replace(regexParser(existsRedirect.pattern), existsRedirect.target)
          .replace(/^\/\//, '/')
          .split('?');

        if (url.search && existsRedirect.isQueryStringPreserved) {
          const targetQueryString = target[1] ?? '';
          url.search = '?' + new URLSearchParams(`${url.search}&${targetQueryString}`).toString();
        } else if (target[1]) {
          url.search = '?' + target[1];
        } else {
          url.search = '';
        }

        const prepareNewURL = new URL(`${target[0]}${url.search}`, url.origin);

        url.href = prepareNewURL.href;
        url.pathname = prepareNewURL.pathname;
        url.search = prepareNewURL.search;
        url.locale = req.nextUrl.locale;
      }

      /** return Response redirect with http code of redirect type */
      switch (existsRedirect.redirectType) {
        case REDIRECT_TYPE_301: {
          return this.createRedirectResponse(url, res, 301, 'Moved Permanently');
        }
        case REDIRECT_TYPE_302: {
          return this.createRedirectResponse(url, res, 302, 'Found');
        }
        case REDIRECT_TYPE_SERVER_TRANSFER: {
          return this.rewrite(url.href, req, res || NextResponse.next());
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
  ): Promise<(RedirectInfo & { matchedQueryString?: string }) | undefined> {
    const redirects = await this.redirectsService.fetchRedirects(siteName);
    const { pathname: targetURL, search: targetQS = '', locale } = this.normalizeUrl(
      req.nextUrl.clone()
    );
    const language = this.getLanguage(req);
    const modifyRedirects = structuredClone(redirects);

    return modifyRedirects.length
      ? modifyRedirects.find((redirect: RedirectInfo & { matchedQueryString?: string }) => {
          // Modify the redirect pattern to ignore the language prefix in the path
          // And escapes non-special "?" characters in a string or regex.
          redirect.pattern = this.escapeNonSpecialQuestionMarks(redirect.pattern.replace(RegExp(`^[^]?/${language}/`, 'gi'), ''));

          // Prepare the redirect pattern as a regular expression, making it more flexible for matching URLs
          redirect.pattern = `/^\/${redirect.pattern
            .replace(/^\/|\/$/g, '') // Removes leading and trailing slashes
            .replace(/^\^\/|\/\$$/g, '') // Removes unnecessary start (^) and end ($) anchors
            .replace(/^\^|\$$/g, '') // Further cleans up anchors
            .replace(/\$\/gi$/g, '')}[\/]?$/i`; // Ensures the pattern allows an optional trailing slash

          /**
           * This line checks whether the current URL query string (and all its possible permutations)
           * matches the redirect pattern.
           *
           * Query parameters in URLs can come in different orders, but logically they represent the
           * same information (e.g., "key1=value1&key2=value2" is the same as "key2=value2&key1=value1").
           * To account for this, the method `isPermutedQueryMatch` generates all possible permutations
           * of the query parameters and checks if any of those permutations match the regex pattern for the redirect.
           *
           * NOTE: This fix is specifically implemented for Netlify, where query parameters are sometimes
           * automatically sorted, which can cause issues with matching redirects if the order of query
           * parameters is important. By checking every possible permutation, we ensure that redirects
           * work correctly on Netlify despite this behavior.
           *
           * It passes several pieces of information to the function:
           * 1. `pathname`: The normalized URL path without query parameters (e.g., '/about').
           * 2. `queryString`: The current query string from the URL, which will be permuted and matched (e.g., '?key1=value1&key2=value2').
           * 3. `pattern`: The regex pattern for the redirect that we are trying to match against the URL (e.g., '/about?key1=value1').
           * 4. `locale`: The locale part of the URL (if any), which helps support multilingual URLs.
           *
           * If one of the permutations of the query string matches the redirect pattern, the function
           * returns the matched query string, which is stored in `matchedQueryString`. If no match is found,
           * it returns `undefined`. The `matchedQueryString` is later used to indicate whether the query
           * string contributed to a successful redirect match.
           */
          const matchedQueryString = this.isPermutedQueryMatch({
            pathname: targetURL,
            queryString: targetQS,
            pattern: redirect.pattern,
            locale,
          });

          // Save the matched query string (if found) into the redirect object
          redirect.matchedQueryString = matchedQueryString || '';

          // Return the redirect if the URL path or any query string permutation matches the pattern
          return (
            (regexParser(redirect.pattern).test(targetURL) ||
              regexParser(redirect.pattern).test(`/${req.nextUrl.locale}${targetURL}`) ||
              matchedQueryString) &&
            (redirect.locale ? redirect.locale.toLowerCase() === locale.toLowerCase() : true)
          );
        })
      : undefined;
  }

  /**
   * When a user clicks on a link generated by the Link component from next/link,
   * Next.js adds special parameters in the route called path.
   * This method removes these special parameters.
   * @param {NextURL} url
   * @returns {string} normalize url
   */
  private normalizeUrl(url: NextURL): NextURL {
    if (!url.search) {
      return url;
    }

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
      .filter((param) => {
        if (!splittedPathname.includes(param)) {
          return param;
        }
        return false;
      })
      .join('&');

    const newUrl = new URL(`${url.pathname}?${newQueryString}`, url.origin);

    url.search = newUrl.search;
    url.pathname = newUrl.pathname;
    url.href = newUrl.href;

    return url;
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
    url: NextURL,
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
    }
    return redirect;
  }

  /**
   * Checks if the current URL query matches the provided pattern, considering all permutations of query parameters.
   * It constructs all possible query parameter permutations and tests them against the pattern.
   * @param {object} params - The parameters for the URL match.
   * @param {string} params.pathname - The current URL pathname.
   * @param {string} params.queryString - The current URL query string.
   * @param {string} params.pattern - The regex pattern to test the constructed URLs against.
   * @param {string} [params.locale] - The locale prefix to include in the URL if present.
   * @returns {string | undefined} - return query string if any of the query permutations match the provided pattern, undefined otherwise.
   */
  private isPermutedQueryMatch({
    pathname,
    queryString,
    pattern,
    locale,
  }: {
    pathname: string;
    queryString: string;
    pattern: string;
    locale?: string;
  }): string | undefined {
    const paramsArray = Array.from(new URLSearchParams(queryString).entries());
    const listOfPermuted = getPermutations(paramsArray).map(
      (permutation: [string, string][]) =>
        '?' + permutation.map(([key, value]) => `${key}=${value}`).join('&')
    );

    const normalizedPath = pathname.replace(/\/*$/gi, '');
    return listOfPermuted.find((query: string) =>
      [
        regexParser(pattern).test(`${normalizedPath}${query}`),
        regexParser(pattern).test(`/${locale}${normalizedPath}${query}`),
      ].some(Boolean)
    );
  }

  /**
   * Escapes non-special "?" characters in a string or regex.
   * 
   * - For regular strings, it escapes all unescaped "?" characters by adding a backslash (`\`).
   * - For regex patterns (strings enclosed in `/.../`), it analyzes each "?" to determine if it has special meaning 
   *   (e.g., `?` in `(abc)?`, `.*?`) or is just a literal character. Only literal "?" characters are escaped.
   * @param {string} input - The input string or regex pattern.
   * @returns {string} - The modified string or regex with non-special "?" characters escaped.
   **/
  private escapeNonSpecialQuestionMarks(input: string): string {
    const regexPattern = /(?<!\\)\?/g; // Find unescaped "?" characters
    const isRegex = input.startsWith('/') && input.endsWith('/'); // Check if the string is a regex

    if (!isRegex) {
        // If not a regex, escape all unescaped "?" characters
        return input.replace(regexPattern, '\\?');
    }

    // If it's a regex, analyze each "?" character
    let result = '';
    let lastIndex = 0;

    let match;
    while ((match = regexPattern.exec(input)) !== null) {
        const index = match.index; // Position of "?" in the string
        const before = input.slice(0, index).replace(/\s+$/, ''); // Context before "?"
        const lastChar = before.slice(-1); // Last character before "?"

        // Determine if the "?" is a special regex symbol
        const isSpecialRegexSymbol = /[\.\*\+\)\[\]]$/.test(lastChar);

        if (isSpecialRegexSymbol) {
            // If it's special, keep it as is
            result += input.slice(lastIndex, index + 1);
        } else {
            // If it's not special, escape it
            result += input.slice(lastIndex, index) + '\\?';
        }
        lastIndex = index + 1;
    }

    // Append the remaining part of the string
    result += input.slice(lastIndex);

    return result;
  }
}
