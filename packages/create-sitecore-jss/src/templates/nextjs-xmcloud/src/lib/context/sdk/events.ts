import * as Events from '@sitecore-cloudsdk/events/browser';
import { contextState, SDK } from '../index';

const sdk = Events;

const init = async () => {
  // Events module can't be initialized on the server side
  // We also don't want to initialize it in development mode
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') return;

  return Events.init({
    siteName: contextState.siteName,
    sitecoreEdgeContextId: contextState.sitecoreEdgeContextId,
    // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
    cookieDomain: window.location.hostname.replace(/^www\./, ''),
    // Cookie may be created in personalize middleware (server), but if not we should create it here
    enableBrowserCookie: true,
  });
};

const sdkModule: SDK<typeof sdk> = {
  sdk,
  init,
};

export default sdkModule;
