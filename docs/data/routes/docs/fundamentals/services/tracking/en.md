---
name: tracking
routeTemplate: ./data/component-templates/article.yml
title: JSS Tracking
---
# JSS Tracking

JSS ships with an analytics tracking API that allows pushing Sitecore analytics events to the xDB based on client-side behavior in JSS apps.

Before using JSS tracking [familiarize yourself with the Sitecore XP features](https://doc.sitecore.com/developers/101/xp/index.html).

The JSS tracker supports tracking Events, Goals, Outcomes, Campaigns, and Page/Route Views by default. It is designed to be extensible for advanced tracking needs.

> _NOTE_: There are some limitations on the usage of JSS tracking API:
> * Because tracking data is submitted directly to a Sitecore service, you cannot use the JSS tracking API in [disconnected mode](/docs/fundamentals/application-modes).
> * JSS tracking API is not working in [connected mode](/docs/fundamentals/application-modes) due to fact that the global and session cookies are not generated.

> _NOTE_: As of Sitecore 10.0.1, Sitecore sets the `Secure` flag on all cookies by default. This can impact JSS local development in *Connected* and *Headless* modes, as the proxied Sitecore cookies (including analytics cookies) will be rejected by the browser if your application is not running under HTTPS, and thus visits will not be tracked and content may not be personalized. To work around this, you can either:
> * Enable HTTPS in your local environment by modifying the node server, using a local reverse proxy, or using a service such as ngrok.
>     * If you are running Sitecore in containers for development, you can make use of the Traefik reverse proxy that is provided in the `docker-compose` environment.
> * Transform the Sitecore Web.config and set:
>     * `requireSSL` to `false` and `sameSite` to `Unspecified` in the `httpCookies` configuration
>     * `cookieSameSite` to `Unspecified` in the `sessionState` configuration
>     * **This is not recommended for production.**

## Setup

The JSS tracker comes installed but **disabled by default** when the [Headless server components](/docs/client-frameworks/getting-started/jss-server-install) are installed. To enable the JSS tracker, patch the `Sitecore.JSS.TrackerServiceEnabled` setting to true in a configuration patch file such as:

```xml
<configuration>
  <sitecore>
    <settings>
      <setting name="Sitecore.JSS.TrackerServiceEnabled" value="true" />
    </settings>
  </sitecore>
</configuration>
```

The JSS tracker utilizes [SSC API keys](https://doc.sitecore.com/developers/101/sitecore-experience-manager/en/api-keys-for-the-odata-item-service.html) just like other JSS services. The API keys are used to enable CORS support for the tracker. It is good practice to use one API key for each JSS app, and it can be shared for all JSS services the app uses.

For testing purposes, you may wish to [enable indexing of anonymous contacts](https://doc.sitecore.com/developers/101/sitecore-experience-platform/en/enable-indexing-of-anonymous-contacts-in-the-xdb-index.html) to more easily see the results of your testing. By default, Sitecore does not index anonymous contact data, which means non-identified users will not have their data in the Experience Profile. JSS Tracker does not support identifying contacts out of the box (but it can be [extended to do so](https://doc.sitecore.com/developers/101/sitecore-experience-platform/en/identifying-contacts.html)). Indexing anonymous contacts is not generally advisable in production.

## Usage

The JSS tracker's client-side implementation is the `@sitecore-jss/sitecore-jss-tracking` npm package. This package is a lightweight wrapper around the tracking service that provides a simple promise-based API and TypeScript typings support to make it easy to use.

Here's a basic example of using the tracking API:

```js
import { trackingApi } from '@sitecore-jss/sitecore-jss-tracking';

const trackingApiOptions = {
  host: config.sitecoreApiHost,
  querystringParams: {
    sc_apikey: config.sitecoreApiKey,
  },
};

trackingApi
  // note the events are an array - batching is supported
  .trackEvent([{ eventId: 'Download' }], trackingApiOptions)
  .then(() => console.log('Page event pushed'))
  .catch((error) => console.error(error));
```

The tracking API ships with TypeScript typings, so with TS-aware editors like VS Code annotated code completion is available.

> Note: the tracking API will automatically disable itself during server-side rendering to avoid double-counting when rehydrated on the client-side.

### Tracking Page Views

The tracking API supports tracking arbitrary page view events. This can be useful for things like tracking route changes that do not involve a Layout Service request (cached, custom routes, etc). When tracking page views, it's important to know:

* Requests to [Layout Service](/docs/fundamentals/services/layout-service) will track a page view by default. This can be disabled by adding `tracking=false` to the Layout Service request query string (configurable via the `dataApi` object in JSS apps). Disabling LS tracking may make sense if all page tracking is to be handled using the tracking API.
* Page view events require a Sitecore Item ID to track against, even though the URL tracked is arbitrary. If tracking non-item-based routes, you may need to create surrogate items to track against.

```js
trackingApi
  .trackEvent(
    [{ pageId: '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}', url: '/' }],
    trackingApiOptions
  )
```

### Testing/Viewing Captured Data

To see the data pushed by your tracking code, the easiest way is to use the [xProfile](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/experience-profile.html). Sitecore does not store or index the tracked data into xProfile until after the user session ends; thus it is essential to end your session to see the test data. The styleguide tracking example includes an example button that invokes the JSS tracker session abandon method that will cause an instant data flush. This can also be manually invoked on your Sitecore instance by visiting `/sitecore/api/jss/track/flush`.

## Extension

The JSS tracker is a tracking data conduit, and can be extended or modified as needed. The `trackEvent` pipeline, defined in `App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.Tracker.config`, is responsible for handling incoming tracking requests.

New or replaced pipeline processors can be [patched](https://doc.sitecore.com/developers/101/platform-administration-and-architecture/en/use-a-patch-file-to-customize-the-sitecore-configuration.html) into the config. Processors should derive from `Sitecore.JavaScriptServices.Tracker.Pipelines.TrackEvent<T>`, where `T` is a C# type to deserialize the incoming JSON to. The pipeline processor's `TrackEvent` method should:

* Return if the incoming request was not something it can handle (i.e. continue pipeline)
* Call `args.HasBeenTracked()` and abort the pipeline if it can handle the incoming request
* Call `args.ReportError()` and return if it _can_ handle the request, but encountered an error doing so
