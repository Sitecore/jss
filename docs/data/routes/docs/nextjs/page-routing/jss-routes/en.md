---
name: jss-routes
routeTemplate: ./data/component-templates/article.yml
title: How JSS routes to Sitecore with Next.js
---
# How JSS Routes to Sitecore with Next.js

Next.js comes with a file-system-based router built on the concept of pages and includes advanced dynamic routing features.

> See [Next.js documentation](https://nextjs.org/docs/routing/introduction) to learn more about routing.

One of these routing features is [optional catch-all routes](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes), which allows a single route file to catch *all paths*.  This is the `[[...path]].tsx` file you'll find under `\src\pages` in the Next.js sample application. Sitecore JSS takes advantage of this specific feature to serve up Sitecore page routes with Next.js.

Here's a high-level overview of the routing process.

<img src="/assets/img/nextjs-sitecore-routing.svg" alt="Next.js Sitecore Routing" />

In the diagram above, you can see how the Next.js route is applied to Sitecore JSS.

* The `[[...path]].tsx` Next.js route will catch any path and pass this information along to `getStaticProps` or `getServerSideProps` on the `context` object (as a tokenized array).
* The page props factory uses the path information to construct a normalized Sitecore item path. It then makes a request to the JSS [Layout Service](/docs/fundamentals/services/layout-service) to fetch layout data for the item.

## i18n Routing

Internationalized (i18n) routing works similarly but introduces an additional locale/language dimension to the routing process.

> See [Next.js documentation](https://nextjs.org/docs/advanced-features/i18n-routing) to learn more about internationalized routing.

When you configure i18n for your Next.js application:

* The `context` object will also contain the Next.js route `locale`.
* The `locale` is passed to the JSS Layout Service call as a `sc_lang` parameter.

> See [here](/docs/nextjs/internationalization/using-i18n) for more information on using Next.js i18n with JSS.