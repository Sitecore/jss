import type { NextRequest } from 'next/server';
import middleware from 'lib/middleware';

// eslint-disable-next-line
export default async function (req: NextRequest) {
  return middleware(req);
}
