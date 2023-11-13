import * as Events from '@sitecore-cloudsdk/events/browser';
import { SDK } from '@sitecore-jss/sitecore-jss-nextjs/context';

const sdkModule: SDK<typeof Events> = {
  sdk: Events,
  init: async (props) => {
    // Events module can't be initialized on the server side
    // We also don't want to initialize it in development mode
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') return;

    await Events.init({
      siteName: props.siteName,
      sitecoreEdgeUrl: props.sitecoreEdgeUrl,
      sitecoreEdgeContextId: props.sitecoreEdgeContextId,
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.hostname.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      enableBrowserCookie: true,
    });
  },
};

export default sdkModule;
