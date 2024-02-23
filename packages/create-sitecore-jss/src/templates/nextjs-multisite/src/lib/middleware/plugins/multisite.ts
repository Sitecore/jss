import { NextRequest, NextResponse } from 'next/server';
import { MultisiteMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { siteResolver } from 'lib/site-resolver';
import { MiddlewarePlugin } from '..';

/**
 * This is the multisite middleware plugin for Next.js.
 * It is used to enable Sitecore multisite in Next.js.
 *
 * The `MultisiteMiddleware` will
 *  1. Based on provided hostname and sites information, resolve site.
 *  2. Rewrite the response to the specific site.
 *  3. Set `sc_site` cookie with site name and `x-sc-rewrite` header with rewritten path to be reused in following middlewares.
 */
class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;

  // Multisite middleware has to be executed first
  order = -1;

  constructor() {
    this.multisiteMiddleware = new MultisiteMiddleware({
      // This function determines if a route should be excluded from site resolution.
      // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to exclude more.
      // This is an important performance consideration since Next.js Edge middleware runs on every request.
      excludeRoute: () => false,
      // Site resolver implementation
      siteResolver,
      // This function allows resolving site from sc_site cookie, which could be useful in case of Vercel preview URLs. Accepts NextRequest.
      useCookieResolution: () => process.env.VERCEL_ENV === 'preview',
    });
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
