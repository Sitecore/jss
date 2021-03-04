---
name: layout-service
routeTemplate: ./data/component-templates/article.yml
title: Sitecore Layout Service
---

# The Sitecore Layout Service

The Sitecore Layout Service is the REST endpoint which provides data for Sitecore JSS apps.
In order to preserve the full capabilities of Sitecore XP within JSS, it's necessary to expose
Sitecore layout as structured data -- "rendering" to JSON rather than HTML markup. Much of the
capability of the platform is based in the rendering engine -- Content Personalization,
Content Testing, and the Experience Editor. By leveraging the same engine to produce structured
JSON output, the Layout Service decouples "layout" and "rendering," enabling you to render
Sitecore components in your chosen JavaScript framework.

![Layout Service Flow](/assets/img/layout-service-flow.svg)

The Layout Service provides additional data about the requested item as well:

* Includes field values and metadata about the requested item, including its ID and template.
* Outputs placeholders and their renderings in a nested tree structure, representative of the parent/child relationships in the layout. This simplifies the rendering logic in the client significantly.
* Serializes the content associated with the rendering. By default, this is the rendering's datasource item.
* Renders Sitecore fields to structured JSON based on field type, allowing structured use of field values and metadata (e.g. image `alt` text).
* Includes customizable "context" data useful for rendering (e.g. data from `Sitecore.Context` such as the current site, user, and editing mode).
* When executed in editing mode via the Experience Editor, includes:
    * Rendered fields with Experience Editor markup for inline editing.
    * Rendering and placeholder "chromes" from the rendering engine, which allows the Experience Editor to insert editing controls.

## Using the Layout Service

There are two actions that Layout Service exposes:

1. Getting the output of the whole layout for the item.

    ```
    /sitecore/api/layout/render/[config]?item=[path]&sc_lang=[language]&sc_apikey=[key]&tracking=[true|false]
    ```

    | Parameter | Description |
    |-----------|-------------|
    | `config`  | The name of the Layout Service configuration to use. For JSS, this will usually be `jss`. More information can be found below on customizing Layout Service configurations. |
    | `item`    | The path to the item, relative to the context site's home item or item GUID (ID). |
    | `sc_lang` | The language version of the item you wish to retrieve. |
    | `sc_apikey`     | An [SSC API Key](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service) which has been configured for use with the Layout Service controller (`Sitecore.LayoutService.Mvc.Controllers.LayoutServiceController, Sitecore.LayoutService.Mvc`). An API Key is required in the query string or `sc_apikey` HTTP Header. |
    | `tracking`    | (optional) Enables/disables analytics tracking for the Layout Service invocation. Default is `true`. See details below on the Layout Service and Analytics. |

2. Getting the output of a particular placeholder.

    This action is useful in special circumstances when your app needs to access a portion of the layout, therefore minimizing the amount of data processed and sent over the wire.

    ```
    /sitecore/api/layout/placeholder/[config]?placeholderName=/main&item=[path]&sc_lang=[language]&sc_apikey=[key]&tracking=[true|false]
    ```

    This action accept all the same parameters as the `/render` action described above, plus one more below.

    | Parameter | Description |
    |-----------|-------------|
    | `placeholderName`  | The name of the placeholder to render. The value of this parameter can be retrieved from the layout details in Content Editor. Due to the dynamic placeholders used out of the box for `jss`, configuration, make sure you use the dynamic placeholder format here.  |
    
     > Consider adding `tracking=false` if you use this action to avoid extra page visits registered within visit, which will be reflected in xDB. 

> Other general Sitecore query string parameters will work with the Layout Service as well, such as `sc_camp` for triggering an analytics campaign.

You should always invoke the Layout Service using a host name which will resolve to the desired Site Context, as Layout Service paths are relative to the site Home item. In addition, the site context is needed for the analytics tracking included in Layout Service calls.

## The Layout Service and Sitecore Placeholders

To output the full structured layout of an item, the Layout Service needs to know what
placeholders are present on a rendering. Previously, this was not exposed as data on a rendering,
rather just through the code of the rendering itself -- e.g. `@Html.Sitecore().Placeholder("content")`. In order
to make these "exposed" placeholders discoverable, the Layout Service adds a new field to the Sitecore rendering
definition.

![Exposed Placeholders](/assets/img/layout-service-exposed-placeholders.png)

> This is not to be confused with the `Allowed Controls` on Placeholder Settings, which defines what renderings can be added to a placeholder. The `Layout Service Placeholders` field defines the placeholders that will be used within the rendering in your JavaScript component.

### Dynamic Placeholder Keys

By default, JSS's configuration of the Layout Service assumes that all placeholders other than the root placeholder (usually `main`) are [dynamic placeholders](/docs/techniques/dynamic-placeholders), and will use Sitecore's built-in dynamic placeholder logic to determine the actual placeholder keys to "render."

## Layout Service and Analytics

The Layout Service executes within the Sitecore MVC rendering engine, and thus retains all Sitecore analytics tracking and functionality. This means that if you use the Layout Service for routing in your JSS app, each route change will reflect as a page view in your analytics data. To avoid confusing URLs in your analytics data, the Layout Service will set the resolved `item` and its path as the tracked item and URL, respectively.

If you don't want analytics tracking for your JSS app, or for particular Layout Service calls, set the `tracking` parameter to `false`.

> _NOTE_: As of Sitecore 10.0.1, Sitecore sets the `Secure` flag on all cookies by default. This can impact JSS local development in *Connected* and *Headless* modes, as the proxied Sitecore cookies (including analytics cookies) will be rejected by the browser if your application is not running under HTTPS, and thus visits will not be tracked and content may not be personalized. To work around this, you can either:
> * Enable HTTPS in your local environment by modifying the node server, using a local reverse proxy, or using a service such as ngrok.
>     * If you are running Sitecore in containers for development, you can make use of the Traefik reverse proxy that is provided in the `docker-compose` environment.
> * Transform the Sitecore Web.config and set:
>     * `requireSSL` to `false` and `sameSite` to `Unspecified` in the `httpCookies` configuration
>     * `cookieSameSite` to `Unspecified` in the `sessionState` configuration
>     * **This is not recommended for production.**

## Invoking the Layout Service from JSS

The Sitecore JSS SDK provides a simple API to make utilizing the Layout Service easier. Enter your configuration into the `fetchOptions` object and pass it into `dataApi.fetchRouteData()`. The `fetcher` option enables you to implement whichever data access method you wish. JSS ships with axios, which can be imported from `src\dataFetcher.js`.

The `dataApi` object is found in the `@sitecore-jss\sitecore-jss` package but is also exposed via the framework-specific SDKs

```javascript
import { dataApi } from '@sitecore-jss/sitecore-jss-react';
import { dataFetcher } from './dataFetcher'; 

const fetchOptions = {
    fetcher: dataFetcher, 
    layoutServiceConfig: {
        host: 'http://mysitecore',
        configurationName: 'jss',
    },
    querystringParams: {
        sc_lang: 'en',
        tracking: false,
        sc_apikey: '{00000000-0000-0000-0000-000000000000}',
        sc_camp: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
    },
    requestConfig: { 
        // AxiosRequestConfig -- https://github.com/axios/axios#request-config
        // Note: `withCredentials: true` is added automatically
        timeout: 3000,
        headers: {
            'X-JSS': 'Experience is asynchronous'
        }
    },
}

dataApi.fetchRouteData('/', fetchOptions).then(route => {
    console.log(JSON.stringify(route, null, 2));
});
```

## Extending Layout Service

See [Layout Service Extensibility](../../techniques/extending-layout-service/extending-layout-service-overview)
