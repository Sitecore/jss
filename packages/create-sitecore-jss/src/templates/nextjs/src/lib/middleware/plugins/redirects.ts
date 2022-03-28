import { NextRequest, NextResponse } from 'next/server';
import { RedirectService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';

class RedirectPlugin implements MiddlewarePlugin {
  private redirectService: RedirectService;
  order = 0;

  constructor() {
    this.redirectService = new RedirectService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }

  async exec(req: NextRequest): Promise<NextResponse> {
    return await this.redirectService.redirect(req);
  }
}

export const redirectPlugin = new RedirectPlugin();
