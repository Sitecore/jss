import { NextResponse, NextRequest } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import { WildCardExp } from '@sitecore-jss/sitecore-jss/utils';
import { getMultisiteRewrite } from '@sitecore-jss/sitecore-jss/multisite';

export type SiteConfig = {
  /**
   * Name of the site.
   */
  name: string;

  /**
   * The host name of the incoming url. May include wildcards (ex. www.site.net, *.site.net, *.net, pda.*, print.*.net)
   * It's possible to set more than one mask by using '|' symbol as a separator (ex. pda.*|print.*.net)
   */
  hostName: string;

  /**
   *  Disables the use of trailing wildcards when resolving the name of a website.
   * For example, when set to true, 'test.com' is not be matched to '*test.c'. Default value: false.
   */
  disableTrailingWildcard: boolean;
};

export type MultisiteMiddlewareConfig = {
  /**
   * The list sites and their corresponding host names.
   */
  siteConfigs: SiteConfig[];
};

type SiteMapping = {
  name: string;
  hostName: string;
  hostNameExp: WildCardExp;
};

/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class MultisiteMiddleware {
  private siteMappings: SiteMapping[];

  /**
   * @param {SiteResolverMiddlewareConfig} [config] SiteResolver middleware config
   */
  constructor(protected config: MultisiteMiddlewareConfig) {
    debug.multisite('multisite config: %o', {
      config,
    });

    this.siteMappings = [];

    config.siteConfigs.forEach((siteConfig) => {
      siteConfig.hostName
        .split('|')
        .filter((piece) => piece.length > 0)
        .forEach((hostNameExp) => {
          this.siteMappings.push({
            name: siteConfig.name,
            hostName: hostNameExp,
            hostNameExp: new WildCardExp(hostNameExp),
          });
        });
    });

    debug.multisite('multisite mappings: %o', {
      mappings: this.siteMappings,
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
        console.log('Siteresolver middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  protected excludeRoute(pathname: string) {
    if (
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/_sites/') || // Ignore Multsite direct calls
      pathname.startsWith('/_next') // Ignore next service calls
    ) {
      return true;
    }
    return false;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const hostname = req.nextUrl.hostname;
    const pathname = req.nextUrl.pathname;

    debug.multisite('multisite middleware start: %o', {
      hostname,
    });

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (response.redirected || this.excludeRoute(pathname)) {
      debug.multisite('skipped (%s)', response.redirected ? 'redirected' : 'route excluded');
      return response;
    }

    // Get site name for host name
    const siteMapping = this.siteMappings.find(
      (siteMapping) =>
        hostname.length === 0 ||
        siteMapping.hostName.length === 0 ||
        siteMapping.hostNameExp.matches(hostname)
    );

    if (!siteMapping) {
      debug.multisite('skipped (site info not found)');
      return response;
    }

    // Rewrite to site path
    const rewritePath = getMultisiteRewrite(pathname, {
      siteName: siteMapping.name,
    });
    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl);

    debug.multisite('multisite middleware end: %o', { rewritePath });

    return response;
  };
}
