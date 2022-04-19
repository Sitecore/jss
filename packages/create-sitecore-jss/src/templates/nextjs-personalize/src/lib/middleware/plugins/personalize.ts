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
      },
      cdpConfig: {
        endpoint: process.env.BOXEVER_API,
        clientKey: process.env.BOXEVER_CLIENT_KEY,
      },
    });
  }

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.personalizeMiddleware.getHandler()(req, res);
  }
}

export const personalizePlugin = new PersonalizePlugin();
