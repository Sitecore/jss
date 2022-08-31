import { NextRequest, NextResponse } from 'next/server';
import { PersonalizeMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

class PersonalizePlugin implements MiddlewarePlugin {
  private personalizeMiddleware: PersonalizeMiddleware;

  // Using 1 to leave room for things like redirects to occur first
  order = 1;

  constructor() {
    this.personalizeMiddleware = new PersonalizeMiddleware({
      edgeConfig: {
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        timeout:
          (process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT &&
            parseInt(process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT)) ||
          250,
      },
      cdpConfig: {
        endpoint: process.env.NEXT_PUBLIC_CDP_API_URL || '',
        clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
        pointOfSale: process.env.NEXT_PUBLIC_CDP_POINTOFSALE || '',
        timeout:
          (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
            parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
          250,
      },
      disabled: () => {
        return false;
      },
    });
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.personalizeMiddleware.getHandler()(req, res);
  }
}

export const personalizePlugin = new PersonalizePlugin();
