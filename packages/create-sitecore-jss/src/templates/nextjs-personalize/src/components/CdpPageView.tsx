import {
  CdpHelper,
  LayoutServicePageState,
  SiteInfo,
  useSitecoreContext,
  PosResolver,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect } from 'react';
import config from 'temp/config';
import { init } from '@sitecore/engage';
import { siteResolver } from 'lib/site-resolver';

/**
 * This is the CDP page view component.
 * It uses the Sitecore Engage SDK to enable page view events on the client-side.
 * See Sitecore Engage SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore/engage
 */
const CdpPageView = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, route, variantId, site },
  } = useSitecoreContext();

  /**
   * Creates a page view event using the Sitecore Engage SDK.
   */
  const createPageView = async (
    page: string,
    language: string,
    site: SiteInfo,
    pageVariantId: string
  ) => {
    const pointOfSale = PosResolver.resolve(site, language);
    const engage = await init({
      clientKey: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '',
      targetURL: process.env.NEXT_PUBLIC_CDP_TARGET_URL || '',
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.hostname.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      forceServerCookieMode: false,
    });
    engage.pageView({
      channel: 'WEB',
      currency: 'USD',
      pointOfSale,
      page,
      pageVariantId,
      language,
    });
  };

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

    const siteInfo = siteResolver.getByName(site?.name || config.jssAppName);
    const language = route.itemLanguage || config.defaultLanguage;
    const scope = process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE;

    const pageVariantId = CdpHelper.getPageVariantId(
      route.itemId,
      language,
      variantId as string,
      scope
    );
    createPageView(route.name, language, siteInfo, pageVariantId);
  }, [pageState, route, variantId, site]);

  return <></>;
};

export default CdpPageView;
