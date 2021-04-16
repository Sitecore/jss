/* eslint-disable @typescript-eslint/no-unused-vars */

import { TrackingService } from './tracking-service';
import { LayoutServiceContext, RouteData } from '@sitecore-jss/sitecore-jss';
import { PageViewData } from './dataModels';
import { ServerResponse } from 'http';

/**
 * Dummy Tracking service, all public methods doing nothing.
 */
export class DummyTrackingService extends TrackingService {
  constructor() {
    // no need to call base ctor, if statement to suppress typescript build error
    // eslint-disable-next-line no-constant-condition
    if (0) {
      super({ siteName: 'dummy' });
    }
  }

  public trackCurrentPage(
    _context?: LayoutServiceContext | null,
    _route?: RouteData | null
  ): Promise<void> {
    return Promise.resolve();
  }

  public trackPage(
    _pageView: PageViewData,
    _querystringParams?: { [key: string]: unknown }
  ): Promise<void> {
    return Promise.resolve();
  }

  public signalSkipNextPage(_res: ServerResponse): void {
    return;
  }
}
