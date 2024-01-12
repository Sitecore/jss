import type { APIContext } from "astro";
import * as jss from "@sitecore-jss/sitecore-jss";
import * as siteJss from "@sitecore-jss/sitecore-jss/site";
import { MiddlewareBase, MiddlewareBaseConfig, MiddlewareContext } from "./base";

const { debug } =
  (jss as any).default || jss;

const { getSiteRewrite } = siteJss;

export type MultisiteMiddlewareConfig = Omit<
  MiddlewareBaseConfig,
  "disabled"
> & {
  /**
   * Function used to determine if site should be resolved from sc_site cookie when present
   */
  useCookieResolution?: (ctx: APIContext) => boolean;
};

/**
 * Middleware / handler for multisite support
 */
export class MultisiteMiddleware extends MiddlewareBase {
  /**
   * @param {MultisiteMiddlewareConfig} [config] Multisite middleware config
   */
  constructor(protected config: MultisiteMiddlewareConfig) {
    super(config);
  }

  /**
   * Gets the Astro middleware handler with error handling
   * @returns middleware handler
   */
  public getHandler(): (
    ctx: MiddlewareContext
  ) => Promise<MiddlewareContext> {
    return async (context) => {
      try {
        return await this.handler(context);
      } catch (error) {
        console.log("Multisite middleware failed:");
        console.log(error);
        return context;
      }
    };
  }

  protected excludeRoute(pathname: string): boolean | undefined {
    // ignore files
    return pathname.includes(".") || super.excludeRoute(pathname);
  }

  private handler = async (
    ctx: MiddlewareContext
  ): Promise<MiddlewareContext> => {
    const pathname = ctx.context.url.pathname;
    const language = this.getLanguage(ctx.context);
    const hostname = this.getHostHeader(ctx.context) || this.defaultHostname;
    const startTimestamp = Date.now();

    debug.multisite("multisite middleware start: %o", {
      pathname,
      language,
      hostname,
    });

    if (this.excludeRoute(pathname)) {
      debug.multisite("skipped (%s)", "route excluded");

      return ctx;
    }

    // Site name can be forced by query string parameter or cookie
    const siteName =
      ctx.context.url.searchParams.get(this.SITE_SYMBOL) ||
      (this.config.useCookieResolution &&
        this.config.useCookieResolution(ctx.context) &&
        ctx.context.cookies.get(this.SITE_SYMBOL)?.value) ||
      this.config.siteResolver.getByHost(hostname).name;

    ctx.context.locals.siteName = siteName;

    ctx.context.locals.rewritePath = getSiteRewrite(ctx.context.locals.rewritePath, {
      siteName,
    });

    debug.multisite(
      "multisite middleware end in %dms: %o",
      Date.now() - startTimestamp,
      {
        pathname,
        language,
        hostname,
        siteName,
      }
    );

    return ctx;
  };
}
