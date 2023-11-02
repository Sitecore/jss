import { pageView } from '@sitecore-cloudsdk/events';
import { contextReady } from '.';

/**
 * Creates a page view event using the Sitecore Engage SDK.
 */
export const createPageView = async (page: string, language: string, pageVariantId: string) => {
  contextReady?.then(() => {
    pageView({
      channel: 'WEB',
      currency: 'USD',
      page,
      pageVariantId,
      language,
    });
  });
};
