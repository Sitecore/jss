import { NextRequest, NextResponse } from 'next/server';
import { SiteConfig } from '@sitecore-jss/sitecore-jss-nextjs';
import { MultisiteMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;
  order = 0;

  constructor() {
    const sites = JSON.parse(config.sites) as SiteConfig[];
    this.multisiteMiddleware = new MultisiteMiddleware(sites);
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
