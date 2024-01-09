import { defineMiddleware } from "astro/middleware";
import jss from "@sitecore-jss/sitecore-jss";
import { MultisiteMiddleware } from "@lib/middleware/multisite";
// import { PersonalizeMiddleware } from "@lib/middleware/personalize";
import { siteResolver } from "@lib/site-resolver";
// import clientFactory from "@lib/graphql-client-factory";
// import config from "@temp/config";
import type { MiddlewareContext } from "@lib/middleware/base";

const { enableDebug, debug } = jss;

if (import.meta.env.DEBUG) {
  enableDebug(import.meta.env.DEBUG);
}

export const onRequest = defineMiddleware(async (context, next) => {
  debug.common('middleware start %s', context.url.pathname);

  if (context.url.pathname.match(/^(\/api\/)/g)) {
    debug.common('middleware (skipped) %s', context.url.pathname);
    return next();
  }

  // const personalizeMiddleware = new PersonalizeMiddleware({
  //   // Configuration for your Sitecore Experience Edge endpoint
  //   edgeConfig: {
  //     clientFactory,
  //     timeout:
  //       (process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT &&
  //         parseInt(process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT)) ||
  //       400,
  //     scope: process.env.ASTRO_PUBLIC_PERSONALIZE_SCOPE,
  //   },
  //   // Configuration for your Sitecore CDP endpoint
  //   cdpConfig: {
  //     sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  //     sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  //     timeout:
  //       (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
  //         parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
  //       400,
  //   },
  //   // This function determines if the middleware should be turned off.
  //   // IMPORTANT: You should implement based on your cookie consent management solution of choice.
  //   // You may wish to keep it disabled while in development mode.
  //   disabled: () => false,
  //   // disabled: () => process.env.NODE_ENV === "development",
  //   // This function determines if a route should be excluded from personalization.
  //   // Certain paths are ignored by default (e.g. files and Astro API routes), but you may wish to exclude more.
  //   // This is an important performance consideration since Astro Edge middleware runs on every request.
  //   excludeRoute: () => false,
  //   // Site resolver implementation
  //   siteResolver,
  // });

  const multisiteMiddleware = new MultisiteMiddleware({
    // This function determines if a route should be excluded from site resolution.
    // Certain paths are ignored by default (e.g. files and Astro API routes), but you may wish to exclude more.
    // This is an important performance consideration since Astro Edge middleware runs on every request.
    excludeRoute: () => false,
    // Site resolver implementation
    siteResolver,
    // This function allows resolving site from sc_site cookie, which could be useful in case of Vercel preview URLs.
    useCookieResolution: () => process.env.VERCEL_ENV === 'preview',
  });

  const response = new Response(null);

  const middlewareContext: MiddlewareContext = {
    context,
    response,
  };

  await multisiteMiddleware.getHandler()(middlewareContext);

  // await personalizeMiddleware.getHandler()(middlewareContext);

  debug.common('middleware end %s', context.url.pathname);

  const astroRes = await next();

  response.headers.forEach((value, key) => {
    astroRes.headers.set(key, value);
  });

  response.headers.getSetCookie().forEach((value) => {
    astroRes.headers.append('Set-Cookie', value);
  });

  return astroRes;
});
