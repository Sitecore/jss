---
name: getStaticPaths
routeTemplate: ./data/component-templates/article.yml
title: Handling dynamic routes
---
# Handling dynamic routes

Our Next.js sample application comes out of the box with a single [dynamic route](https://nextjs.org/docs/routing/dynamic-routes) `src/pages/[[...path]].tsx` - meaning the application does not know which page this is unless we tell it. To do so in a Next.js application, you use [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation). 

## getStaticPaths

If you chose to use static generation when creating your Next.js application, the dynamic, catch-all route `src/pages/[[...path]].tsx` implements and exports the `getStaticPaths` function.

> Before using `getStaticPaths` read more about [the `fallback` key](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required).

`getStaticPaths` identifies which page/route to fetch data for with [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and pre-render based on the returned data.

The function leverages a `SitemapFetcher` instance that gathers the list of pages as follows:  

* In `development` mode, the `sitemapFetcher`, through an instance of `DisconnectedSitemapService`, generates the list of pages using a `ManifestInstance`. The sample application uses `sitecore/manifest/sitecore-import.json`. You can generate by running `jss manifest` or `jss start:disconnected-proxy`. `DisconnectedSitemapService` will go through the manifest routes and generate all paths for pre-rendering. You will not have pre-rendered pages because `getStaticPaths` runs on [every request](https://nextjs.org/docs/basic-features/data-fetching#runs-on-every-request-in-development-1). 

* In `production` mode, `sitemapFetcher` uses an instance of the `GraphQLSitemapService` to fetch the paths for pre-rendering.

> You can inspect the `sitemapFetcher` implementation in `src/lib/sitemap-fetcher.ts`.

> Learn more about the [`GraphQLSitemapService`](/docs/nextjs/services/graphql-sitemap-service).
