import {
  CdpHelper,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect } from 'react';
import config from 'temp/config';
import { context } from 'lib/context';

/**
 * This is the CDP page view component.
 * It uses the Sitecore Cloud SDK to enable page view events on the client-side.
 * See Sitecore Cloud SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore-cloudsdk/events
 */
const CdpPageView = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, route, variantId, site },
  } = useSitecoreContext();

  /**
   * Determines if the page view events should be turned off.
   * IMPORTANT: You should implement based on your cookie consent management solution of choice.
   * By default it is disabled in development mode
   */
  const disabled = () => {
    return process.env.NODE_ENV === 'development';
  };

  useEffect(() => {
    // Do not create events in editing or preview mode or if missing route data
    if (pageState !== LayoutServicePageState.Normal || !route?.itemId) {
      return;
    }
    // Do not create events if disabled (e.g. we don't have consent)
    if (disabled()) {
      return;
    }

    const language = route.itemLanguage || config.defaultLanguage;
    const scope = process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE;

    const pageVariantId = CdpHelper.getPageVariantId(
      route.itemId,
      language,
      variantId as string,
      scope
    );
    // there are cases where Events SDK will be absent which are expected to reject
    context
      .getSDK('Events')
      .then((Events) =>
        Events.pageView({
          channel: 'WEB',
          currency: 'USD',
          page: route.name,
          pageVariantId,
          language,
        })
      )
      .catch((e) => console.debug(e));
  }, [pageState, route, variantId, site]);

  return <></>;
};

export default CdpPageView;
