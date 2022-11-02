import { NextRequest, NextResponse } from 'next/server';
import { SiteConfig, MultisiteMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;
  order = 0;

  constructor() {
    const siteConfigs = JSON.parse(config.sites) as SiteConfig[];

    this.multisiteMiddleware = new MultisiteMiddleware({
      siteConfigs,
    });
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
