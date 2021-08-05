---
name: personalization
routeTemplate: ./data/component-templates/article.yml
title: Personalization & Analytics with JSS
---

# Personalization & Analytics with JSS

One of the major advantages of Sitecore is its ability to personalize and respond to a visitor's behavior. JSS takes this capability and seamlessly extends it to the headless realm.

## Personalization

In JSS [personalization](https://doc.sitecore.net/sitecore_experience_platform/digital_marketing/personalization/walkthrough_personalizing_components) works exactly how it does in a non-headless Sitecore site. The [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) renders pages using the exact same pathway as a traditional Sitecore site uses - meaning that personalization rules, multivariate tests, etc are all respected. As a developer, there's nothing you have to do. The content returned to your JSS app is pre-personalized before it is received.

## Analytics

Sitecore gathers behavioral analytics data on visitors that can be used for informing personalization and future analysis. These analytics are traditionally gathered on the server-side on most Sitecore sites - but JSS sites operate at the client. In a JSS site, there are several paths to collecting analytics data:

#### Via Layout Service

[Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) requests are tracked on the server-side as a 'page view' just like a traditional Sitecore site would. This includes any goals, events, etc configured to be triggered by the route item. Because Sitecore's session tracking is cookie-based, it is important to pass browser cookies to Layout Service requests (this is done by default).

> If you are tracking route/page views exclusively from the client-side (i.e. using cached route data), you can disable tracking of Layout Service requests by sending `tracking=false` in the service call's query string.

#### Via JSS Tracker

In a client-side app, we do not have access to the server-side APIs normally used to report analytics events to XConnect. Instead, the [JSS Tracker API](/docs/fundamentals/services/tracking) allows us to push analytics events, such as page/route views, events, goals, and outcomes, directly from the client. As with Layout Service, it is important to pass browser cookies to this API to retain proper event attribution.


#### Server-side Rendering

JSS apps are usually rendered at the server for the initial route, then rendered at the client on route changes after the initial. This does not cause problems with analytics gathering because:

- Route views are tracked during SSR, and an SSR-ed route does not make a request back to Layout Service after it loads on the client, so there is only one route tracked
- JSS tracker automatically ignores calls made to itself during SSR, as the same calls would be made again after it loads on the client