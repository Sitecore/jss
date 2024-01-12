import { defineMiddleware } from "astro/middleware";
import jss from "@sitecore-jss/sitecore-jss";
import jssSite from "@sitecore-jss/sitecore-jss/site";
import jssPersonalize from "@sitecore-jss/sitecore-jss/personalize";
import { MultisiteMiddleware } from "@lib/middleware/multisite";
import { siteResolver } from "./lib/site-resolver";
// import { PersonalizeMiddleware } from "@lib/middleware/personalize";
// import clientFactory from "@lib/graphql-client-factory";
import config from "@temp/config";
import { pathExtractor } from "@lib/extract-path";
import test from '@lib/test';
import type { MiddlewareContext } from "@lib/middleware/base";

const { enableDebug, debug } = jss;

if (import.meta.env.DEBUG) {
  enableDebug(import.meta.env.DEBUG);
}

export const onRequest = defineMiddleware(async (context, next) => {
  debug.common('middleware start %s', context.url.pathname, test, jssSite.normalizeSiteRewrite, jssPersonalize.normalizePersonalizedRewrite);

  if (context.url.pathname.match(/\/_site_|\/_variantId_/g)) {
    debug.common('middleware (start rewrite) %s', context.url.pathname);
    context.locals.siteName = jssSite.getSiteRewriteData(context.url.pathname, config.sitecoreSiteName).siteName;
    context.locals.variantId = jssPersonalize.getPersonalizedRewriteData(context.url.pathname).variantId;
    context.locals.path = pathExtractor.extract(context.params);

    debug.common('middleware (end rewrite) %s', context.url.pathname, context.locals);
    return next();
  }

  // Render API endpoints
  if (context.url.pathname.match(/^\/api\//g)) {
    debug.common('middleware (skipped editing endpoint) %s', context.url.pathname);

    return next();
  }

  // Proxy Sitecore API requests
  if (context.url.pathname.match(/^(\/-\/)/g)) {
    debug.common('middleware (skipped request to Sitecore endpoint) %s %s', context.url.pathname, `${config.sitecoreApiHost}${context.url.pathname}`);
    return fetch(`${config.sitecoreApiHost}${context.url.pathname}`);
  }

  context.locals.rewritePath = context.url.pathname;

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
  
  const rewriteResponse = await fetch(`${context.url.origin}${context.locals.rewritePath}`, {
    ...context.request,
    headers: {
      ...context.request.headers,
    },
  });
  
  const finalResponse = new Response(rewriteResponse.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers)
  });
  
  response.headers.forEach((value, key) => {
    finalResponse.headers.set(key, value);
  });
  
  response.headers.getSetCookie().forEach((value) => {
    finalResponse.headers.append('Set-Cookie', value);
  });
  
  debug.common('middleware end %s', context.url.pathname);

  return finalResponse;
});
