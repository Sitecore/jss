import * as EventsSDK from '@sitecore-cloudsdk/events/browser';
import { whenSDKReady } from './';

/**
 * Creates a page view event using the Sitecore Cloud SDK Events.
 * This function is used to trigger a pageView event. The event will be sent once the SDK is initialized.
 */
export const createPageView = async (page: string, language: string, pageVariantId: string) => {
  return whenSDKReady<typeof EventsSDK>('Events').then((Events) =>
    Events.pageView({
      channel: 'WEB',
      currency: 'USD',
      page,
      pageVariantId,
      language,
    })
  );
};
