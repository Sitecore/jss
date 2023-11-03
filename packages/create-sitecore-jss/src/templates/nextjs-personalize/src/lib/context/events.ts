import { pageView } from '@sitecore-cloudsdk/events';
import { contextReady } from '.';

/**
 * Creates a page view event using the Sitecore Cloud SDK Events.
 * This function is used to trigger a pageView event. The event will be sent once the Sitecore Context is initialized.
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
