import { createIntlMiddleware } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { i18n } from '../../../../i18n-config';

class I18nPlugin implements MiddlewarePlugin {
  private i18nMiddleware;

  // Using 1 to leave room for things like redirects to occur first
  order = 0;

  constructor() {
    this.i18nMiddleware = createIntlMiddleware(i18n);
  }

  async exec(req: NextRequest): Promise<NextResponse> {
    return this.i18nMiddleware(req);
  }
}

// This middleware intercepts requests to `/` and will redirect
// to the best matching locale instead (e.g. `/en`). A cookie
// is set in the background, so if the user switches to a new
// language, this will take precedence from now on.
export const i18nPlugin = new I18nPlugin();
