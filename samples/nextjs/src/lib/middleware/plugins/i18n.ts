import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { MiddlewarePlugin } from '..';

import nextConfig from '../../../../next.config';

const { i18n } = nextConfig();

class i18nMiddleware {
  getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locales = i18n?.locales || [];

    return matchLocale(languages, locales, i18n?.defaultLocale as string);
  }

  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return this.handler;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const response = res || NextResponse.next();

    return response;

    console.log('!!!!', pathname);

    const pathnameIsMissingLocale = i18n?.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = this.getLocale(req);

      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      // console.log(
      //   '++++++++++',
      //   `/${locale}/${pathname === '/' ? '' : pathname}`,
      //   req.url,
      //   new URL(`/${locale}/${pathname}`, req.url)
      // );
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    }

    return response;
  };
}

/**
 * This is the personalize middleware plugin for Next.js.
 * It is used to enable Sitecore personalization of pages in Next.js.
 *
 * The `PersonalizeMiddleware` will
 *  1. Make a call to the Sitecore Experience Edge to get the personalization information about the page.
 *  2. Based on the response, make a call to the Sitecore CDP (with request/user context) to determine the page variant.
 *  3. Rewrite the response to the specific page variant.
 */
class I18nPlugin implements MiddlewarePlugin {
  private i18nMiddleware: i18nMiddleware;

  // Using 1 to leave room for things like redirects to occur first
  order = 1;

  constructor() {
    this.i18nMiddleware = new i18nMiddleware();
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.i18nMiddleware.getHandler()(req, res);
  }
}

export const i18nPlugin = new I18nPlugin();
