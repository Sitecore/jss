import * as Events from '@sitecore-cloudsdk/events';
import { Plugin, Props, Context } from '..';

/**
 * This is Events plugin for Context initialization.
 * It is used to enable Cloud SDK Events in Next.js.
 */
class EventsPlugin implements Plugin {
  order = 0;

  async exec(props: Props, context: Context) {
    // Events module can't be initialized on the server side
    if (typeof window === 'undefined') return;

    await Events.init({
      siteName: props.site,
      sitecoreEdgeContextId: context.sitecoreEdgeContextId,
      // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
      cookieDomain: window.location.hostname.replace(/^www\./, ''),
      // Cookie may be created in personalize middleware (server), but if not we should create it here
      enableBrowserCookie: true,
    });

    context.SDK.Events = Events;
  }
}

export const eventsPlugin = new EventsPlugin();
