import type { NextRequest, NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  return middleware(req, ev);
}

export const config = {
  // Exclude Sitecore editing API routes
  matcher: ['/', '/((?!api/editing/).*)'],
};
