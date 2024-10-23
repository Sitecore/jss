import { useEffect } from 'react';
import { SitecorePageProps } from 'lib/page-props';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import config from 'temp/config';

/**
 * The Bootstrap component is the entry point for performing any initialization logic
 * that needs to happen early in the application's lifecycle.
 */
const Bootstrap = (props: SitecorePageProps): JSX.Element | null => {
  // Browser ClientSDK init allows for page view events to be tracked
  useEffect(() => {
    CloudSDK({
      sitecoreEdgeContextId: config.sitecoreEdgeContextId,
      siteName: props.site.name || config.sitecoreSiteName,
      enableBrowserCookie: true,
    })
      .addEvents()
      .initialize();
  }, [props.site]);

  return null;
};

export default Bootstrap;
