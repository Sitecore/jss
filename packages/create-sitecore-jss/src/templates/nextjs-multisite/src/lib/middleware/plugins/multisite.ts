import { NextRequest, NextResponse } from 'next/server';
import { MultisiteMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { siteResolverFactory } from 'lib/site-resolver-factory';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;
  order = 0;

  constructor() {
    const siteResolver = siteResolverFactory.create();

    this.multisiteMiddleware = new MultisiteMiddleware(siteResolver);
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
