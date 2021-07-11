---
name: getStaticPaths
routeTemplate: ./data/component-templates/article.yml
title: getStaticPaths and the Sitemap Service
---
# getStaticPaths and the Sitemap Service

Next.js provides the ability to generate static pages with dynamic routes. 

If a page has [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and uses [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), you can define a list of paths that you want pre-render to HTML at build time.

Before using [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) read more about [the `fallback` key](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required).

## getStaticPaths

Our Next.js sample provides a simple way to handle `getStaticPaths` in different modes. 

See the `src/pages/[[...path]].tsx` file contains the exported `getStaticPaths` function.

* In `development` mode, you will not have pre-rendered pages because`getStaticPaths` runs on [every request](https://nextjs.org/docs/basic-features/data-fetching#runs-on-every-request-in-development-1).
* In `production` mode, `getStaticPaths` will use `sitemapFetcher` to fetch the paths for pre-rendering. See the `sitemapFetcher` implementation in `src/lib/sitemap-fetcher.ts`.

## GraphQLSitemapService Module

Service that fetches the list of site pages using Sitecore's GraphQL API. 

Next.js uses the list of pages to fetch data for Static Generation and Export functionality.



This service generates the `sitemap` using the `config.graphqlEndpoint` endpoint. 

It exposes `fetchSSGSitemap` and `fetchExportSitemap`.

* For static export, `fetchExportSitemap`. As static export doesn't support multilingual apps, this function accepts one `language` and will only run GraphQL queries for that language.

* In SSG mode, use `fetchSSGSitemap`. This function accepts an array of supported `languages`. It will include the `locale` property because the sample application enables i18n by default. It will run GraphQL query for each language.

You can customize the default search query used to fetch items and generate the sitemap.

The default search query is:

```graphql
query {
	search(
		where: {
			AND:[
				{
					name:"_path",
					value:"${rootItemId.toLowerCase()}" # provided root item id
				},
				{
					name:"_language",
					value:"${locale}" # provided language
				},
				{
					name:"_hasLayout",
					value :"true"
				}
			]
		}
	) {
		results {
			url {
				path
			}
		}
	}
}
```



It is not always desirable to pre-render all the pages. If you have many pages and you wish to customize the search query, use the `formatSearchQuery` argument. Map `language` and `rootItemId` on the new search query.

The following example shows a query that retrieves only the first 10 items:

```typescript
const formatSearchQuery = (rootItemId: string, locale: string) =>
`search(
	first: 10,
	where: {
		AND:[
			{
				name:"_path",
				value:"${rootItemId}"
			},
			{
				name:"_language",
				value:"${locale}"
			},
			{
				name:"_hasLayout",
				value :"true"
			}
		]
	}
)`;

this._graphqlSitemapService.fetchSSGSitemap(
	context?.locales || [],
	this.GRAPHQL_ROOT_ITEM_PATH,
	formatSearchQuery
);
```
When you execute `fetchSSGSitemap`/`fetchExportSitemap` using the `GraphQLSitemapService`, the service executes the following steps:

1. Fetch the `rootItemId` using the provided `rootItemPath`.
2. Fetch items using `rootItemId` and the provided `locale`.
3. Merge loaded items in the correct format for SSG or static HTML export.

> Remember to update the value of the `GRAPHQL_ROOT_ITEM_PATH` if you changed the location of your root item.



If you run `export` in `connected` mode, `sitemapFetcher` will use the `GraphQLSitemapService`.
