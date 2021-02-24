---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Overview and architecture
---
# Overview and architecture

Full Sitecore analytics and personalization functionality is possible with Next.js on any SSR (Server-side Rendered) page route.

> Note [client-side JSS tracking](/docs/fundamentals/services/tracking) is possible for *both SSG and SSR*.

> By default, the Next.js sample application uses a route optimized for SSG, but can be switched to SSR. See [here](/docs/nextjs/page-routing/switching-to-ssr) for steps.

For Sitecore analytics and personalization to work with JSS, the appropriate HTTP headers must be present at the browser and Layout Service.

> You can learn more about about Sitecore analytics and personalization with JSS [here](/docs/fundamentals/personalization).

With Next.js, this is accomplished by passing specific HTTP headers between the (browser-initiated) page request/response and the (server-side-initiated) Layout Service request/response. This process is referred to as *header passing* in this topic.

## Header Passing

Here's how header passing works during a page request/response cycle. The flow is based on using the SSR page route example `pages_examples\[[...path]].SSR.tsx` that comes with the Next.js sample application.

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