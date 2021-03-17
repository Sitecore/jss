---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Overview and architecture
---
# Tracking & Analytics Overview and Architecture

Sitecore analytics and personalization functionality is possible with Next.js only on SSR (Server-side Rendered) page routes using the [Sitecore Layout Service REST API](/docs/fundamentals/services/layout-service).

> See [Sitecore Experience Platform documentation](https://doc.sitecore.com/developers/101/sitecore-experience-platform/en/web-tracking.html) for more information about tracking and analytics.

> Note this is different than *client-side tracking* via the JSS tracking API, which is possible for *both Static Site Generation (SSG) and Server-side Rendering (SSR)*. Please see the [JSS Tracking](/docs/fundamentals/services/tracking) page for details.

For Sitecore analytics and personalization to work with JSS, the appropriate HTTP headers must be present at the browser and Layout Service.

> You can learn more about about Sitecore analytics and personalization with JSS [here](/docs/fundamentals/personalization).

With Next.js, this is accomplished by passing specific HTTP headers between the (browser-initiated) page request/response and the (server-side-initiated) Layout Service request/response. This process is referred to as *header passing* in this topic.

## Header Passing

Here's how header passing works during a page request/response cycle. The flow is based on using the [SSR `[[..path]].tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.SSR.tsx) route example that comes with the Next.js sample application.

<img src="/assets/img/nextjs-sitecore-analytics.svg" alt="Next.js Sitecore Analytics" />

The page request/response is sent through `getServerSideProps` on the Next.js SSR route and ultimately is passed along to the `RestLayoutService`.

The `RestLayoutService` (part of the `@sitecore-jss/sitecore-jss-nextjs` npm package) is responsible for making the Layout Service request to fetch layout data but also for coordinating the *header passing*. The following headers are involved in the transfer.

**Request (Page -> Layout Service)**
* `cookie`
* `user-agent`
* `referer`
* `X-Forwarded-For`

**Response (Page <- Layout Service)**
* `set-cookie`


## Configuration

The Next.js sample application includes all configuration necessary to start using Sitecore analytics and personalization with Next.js SSR. However, additional steps may be required. Refer to [Enabling tracking and analytics](/docs/nextjs/tracking-and-analytics/configuration) for details.
