import { NextRequest, NextResponse } from 'next/server';
import { PersonalizeMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/edge';
import { MiddlewarePlugin } from '..';
import config from 'temp/config';

class PersonalizePlugin implements MiddlewarePlugin {
  private personalizeMiddleware: PersonalizeMiddleware;

  // Using 1 to leave room for things like redirects to occur first
  order = 1;

  constructor() {
    const timeout = process.env.NEXT_PUBLIC_PERSONALIZE_TIMEOUT
      ? ((process.env.NEXT_PUBLIC_PERSONALIZE_TIMEOUT as unknown) as number)
      : 170;
    this.personalizeMiddleware = new PersonalizeMiddleware({
      edgeConfig: {
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        timeout,
      },
      cdpConfig: {
        endpoint: process.env.NEXT_PUBLIC_CDP_API_URL || '',
        clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
        timeout,
      },
    });
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.personalizeMiddleware.getHandler()(req, res);
  }
}

export const personalizePlugin = new PersonalizePlugin();
