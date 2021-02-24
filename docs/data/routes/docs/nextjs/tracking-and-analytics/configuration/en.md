---
name: configuration
routeTemplate: ./data/component-templates/article.yml
title: Enabling tracking and analytics
---
# Walkthrough: Enabling tracking and analytics

This topic will guide you through the steps required to enable full Sitecore tracking and analytics for your Next.js application.

> Note this does not cover client-side tracking via the JSS tracking API, which is possible for *both SSG and SSR*. Please see the [JSS Tracking](/docs/fundamentals/services/tracking) page for details.

## Next.js application

### SSR only

You must use a Next.js SSR page route. An example SSR route is included with the Next.js sample app. See [this page](/docs/nextjs/page-routing/switching-to-ssr) for details.

### Layout Service requests

Sitecore JSS layout service requests must:

1. have tracking enabled (default), and
2. perform [header passing](/docs/nextjs/tracking-and-analytics/overview#header-passing) (default with the Next.js sample application)

Both of these are taken care of using the `RestLayoutService` included with the Next.js SDK (part of the `@sitecore-jss/sitecore-jss-nextjs` npm package). 

The `RestLayoutService` will track layout requests by default, so there is no extra configuration required. However, this can be disabled with the optional `tracking` parameter, so ensure this hasn't been specifically set to `false`.

## Sitecore configuration

> The default Sitecore configuration file included with the Next.js sample app already includes disabled configuration patches for these settings. You can find this file under `/sitecore/config`. Uncomment to enable.

### Forwarded request header

The `Analytics.ForwardedRequestHttpHeader` Sitecore setting must be set to `X-Forwarded-For`.

```xml
<setting name="Analytics.ForwardedRequestHttpHeader" set:value="X-Forwarded-For" />
```

[Header passing](/docs/nextjs/tracking-and-analytics/overview#header-passing) will send the original IP address of the client on the 'X-Forwarded-For' header. This setting tells Sitecore to read the forwarded header, making analytics track the correct original client IP address.

### Disable robot detection

During development, any analytics activity will be flagged as a robot. These settings will enable tracking of robot activity for ease of testing. These should be set in development **only**.

```xml
<setting name="Analytics.AutoDetectBots" set:value="false" />
<setting name="Analytics.Robots.IgnoreRobots" set:value="false" />
```

## Secure cookies

As of Sitecore 10.0.1, Sitecore sets the `Secure` flag on all cookies by default. This can impact JSS local development, as the proxied Sitecore cookies (including analytics cookies) will be rejected by the browser if your application is not running under HTTPS. Thus the application will not track visits, and it may not apply content personalization rules. To work around this, you can either:

1. Enable HTTPS in your local environment by using a local reverse proxy or using a service such as ngrok.
    * If you are running Sitecore in containers for development (recommended), you can use the Traefik reverse proxy provided in the `docker-compose` environment.
        * **The `dotnet new` template for Next.js has this pre-configured.**
    * If you are using ngrok, be sure the `Host` header is rewritten to your local hostname.
        * `ngrok http -host-header=rewrite 3000`
2. Transform the Sitecore Web.config and set:
    * `requireSSL` to `false` and `sameSite` to `Unspecified` in the `httpCookies` configuration
    * `cookieSameSite` to `Unspecified` in the `sessionState` configuration
    * **This is not recommended for production.**
