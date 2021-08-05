---
name: graphql-sitemap-service
routeTemplate: ./data/component-templates/article.yml
title: GraphQL Sitemap Service
---

# GraphQL Sitemap Service

The `GraphQLSitemapService` fetches the list of site pages using Sitecore's GraphQL API. We commonly use this service in conjuction with `getStaticPaths`. Next.js uses the list of pages to fetch data for Static Generation and Export functionality. See [getStaticPaths](/docs/nextjs/data-fetching/getStaticPaths). 

## Configuration

In the sample application, in `/src/lib/sitemap-fetcher.ts` you can inspect and modify the default SitemapFetcher configuration. 

The service comes preconfigured with:
- an `endpoint` - from `temp/config.graphQLEndpoint`,
- an `apiKey` - from `temp/config.sitecoreApiKey`,
- a `siteName` - from `temp/config.jssAppName`. 

You also have the possibility to specify a `rootItemId`. The Sitemap Service needs a root item ID in order to fetch the list of pages for the current app. If `rootItemId` is not specified, the service will attempt to figure out the root item for the current JSS app using GraphQL and the app name.

> PERFORMANCE TIP: We **strongly** recommend you to specify a `rootItemId` to avoid a additional GraphQL lookups. 

> WARNING: Not specifying the `rootItemId` for the GraphQL Sitemap Service instance can cause errors when using our Next.js SDK in conjuction with SXA integration. 

The service exposes `fetchSSGSitemap` and `fetchExportSitemap`.

* For static export, `fetchExportSitemap`. As static export doesn't support multilingual apps, this function accepts one `language` and will only run GraphQL queries for that language.

* In SSG mode, use `fetchSSGSitemap`. This function accepts an array of supported `languages`. It will include the `locale` property because the sample application enables i18n by default. It will run GraphQL query for each language.

When you execute `fetchSSGSitemap`/`fetchExportSitemap` using the `GraphQLSitemapService`, the service executes the following steps:

1. Fetch the `rootItemId` using the provided `rootItemPath`.
2. Fetch items using `rootItemId` and the provided `locale`.
3. Merge loaded items in the correct format for SSG or static HTML export.

## Queries

The [default GraphQL query used by GraphQL Sitemap Service](https://github.com/Sitecore/jss/blob/release/18.0.0/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L18-L49) to fetch items and generate the sitemap can be replaced with a custom query. To do so, extend the `GraphQLSitemapService` class, overriding the `fetchSitemap` method used internally by `fetchSSGSitemap` and `fetchExportSitemap`. 
