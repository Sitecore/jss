import { NextRequest, NextResponse } from 'next/server';
import { MultisiteMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MultisiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolverFactory } from 'lib/site-resolver-factory';
import { MiddlewarePlugin } from '..';

class MultisitePlugin implements MiddlewarePlugin {
  private multisiteMiddleware: MultisiteMiddleware;
  order = 0;

  constructor() {
    const siteResolver = siteResolverFactory.create();

    this.multisiteMiddleware = new MultisiteMiddleware(siteResolver as MultisiteResolver);
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.multisiteMiddleware.getHandler()(req, res);
  }
}

export const multisitePlugin = new MultisitePlugin();
