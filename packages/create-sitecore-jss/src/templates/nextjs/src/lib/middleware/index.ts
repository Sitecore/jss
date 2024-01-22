import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import * as plugins from 'temp/middleware-plugins';

export interface MiddlewarePlugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A middleware to be called, it's required to return @type {NextResponse} for other middlewares
   */
  exec(req: NextRequest, res?: NextResponse, ev?: NextFetchEvent): Promise<NextResponse>;
}

export default async function middleware(
  req: NextRequest,
  ev: NextFetchEvent
): Promise<NextResponse> {
  const response = NextResponse.next();

  debug.common('next middleware start');

  const start = Date.now();

  const finalRes = await (Object.values(plugins) as MiddlewarePlugin[])
    .sort((p1, p2) => p1.order - p2.order)
    .reduce((p, plugin) => p.then((res) => plugin.exec(req, res, ev)), Promise.resolve(response));

  debug.common('next middleware end in %dms', Date.now() - start);

  return finalRes;
}
