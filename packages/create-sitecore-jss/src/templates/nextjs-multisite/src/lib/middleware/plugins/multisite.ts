import { NextRequest, NextResponse } from 'next/server';
import chalk from 'chalk';
import { MultisiteMiddleware, SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

/**
 * This is the multisite middleware plugin for Next.js.
 * It is used to enable Sitecore multisite in Next.js.
 *
 * The `MultisiteMiddleware` will
 *  1. Based on provided hostname and sites information, resolve site name.
 *  2. Rewrite the response to the specific site.
 *  3. Set `sc_site` cookie with site name value to be reused in middlewares.
 */
class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;

  order = -1;

  constructor() {
    this.multisiteMiddleware = new MultisiteMiddleware({
      // This function determines if a route should be excluded from site resolution.
      // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to exclude more.
      // This is an important performance consideration since Next.js Edge middleware runs on every request.
      excludeRoute: () => false,
      // This function resolves site name based on hostname and sites information
      getSiteName: SiteResolver.resolve,
      // Site configuration list
      sites: this.getSites(),
    });
  }

  private getSites() {
    try {
      return JSON.parse(config.sites);
    } catch (error) {
      console.error(chalk.red('Error parsing site information'));
      console.error(error);
    }
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
