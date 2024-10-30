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
    else
      CloudSDK({
        sitecoreEdgeContextId: config.sitecoreEdgeContextId,
        siteName: props.site?.name || config.sitecoreSiteName,
        enableBrowserCookie: true,
      })
        .addEvents()
        .initialize();
  }, []);

  return null;
};

export default Bootstrap;
