import { useEffect } from 'react';
import { SitecorePageProps } from 'lib/page-props';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import config from 'temp/config';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * The Bootstrap component is the entry point for performing any initialization logic
 * that needs to happen early in the application's lifecycle.
 */
const Bootstrap = (props: SitecorePageProps): JSX.Element | null => {
  // Browser ClientSDK init allows for page view events to be tracked
  useEffect(() => {
    const pageState = props.layoutData?.sitecore?.context.pageState;
    if (process.env.NODE_ENV === 'development')
      console.debug('Browser Events SDK is not initialized in development environment');
    else if (pageState !== LayoutServicePageState.Normal)
      console.debug('Browser Events SDK is not initialized in edit and preview modes');
    else {
      CloudSDK({
        sitecoreEdgeUrl: config.sitecoreEdgeUrl,
        sitecoreEdgeContextId: config.sitecoreEdgeContextId,
        siteName: props.site?.name || config.sitecoreSiteName,
        enableBrowserCookie: true,
        // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
        cookieDomain: window.location.hostname.replace(/^www\./, ''),
      })
        .addEvents()
        .initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.site?.name]);

  return null;
};

export default Bootstrap;
