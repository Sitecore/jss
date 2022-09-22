import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect } from 'react';
import config from 'temp/config';
import { init } from '@sitecore/engage';

/**
 * This is the CDP integration script which uses the Sitecore Engage SDK.
 * It is used to enable page view events.
 * See Sitecore Engage SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore/engage
 */
const CdpIntegrationScript = (): JSX.Element => {
  const {
    sitecoreContext: { pageEditing, route },
  } = useSitecoreContext();

  /**
   * Creates a page view event using the Sitecore Engage SDK.
   */
  const createPageView = async (page: string, language: string) => {
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetDomain: process.env.NEXT_PUBLIC_CDP_API_DOMAIN || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.host.replace(/^www\./, ''),
      // Cookie will be created in personalize middleware
      forceServerCookieMode: true,
    });
    engage.pageView({
      channel: 'WEB',
      currency: 'USD',
      pos: process.env.NEXT_PUBLIC_CDP_POINTOFSALE || '',
      page,
      // pageVariantId,
      language,
    });
  };

  /**
   * Determines if the page view events should be turned off.
   * This would be based on your cookie consent management solution of choice.
   * By default it is always enabled.
   */
  const disabled = () => {
    return false;
  };

  useEffect(() => {
    // Do not create events in editing mode or if missing route data
    if (pageEditing || !route) {
      return;
    }
    // Do not create events if disabled (e.g. we don't have consent)
    if (disabled()) {
      return;
    }
    createPageView(route.name, route.itemLanguage || config.defaultLanguage);
  }, [pageEditing, route]);

  return <></>;
};

export default CdpIntegrationScript;
