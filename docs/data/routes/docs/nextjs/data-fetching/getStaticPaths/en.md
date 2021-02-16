---
name: getStaticPaths
routeTemplate: ./data/component-templates/article.yml
title: getStaticPaths and the Sitemap Service
---
# getStaticPaths and the Sitemap Service

Next.js provides ability to generate pages with dynamic routes. If a page has [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and uses [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) you can define a list of paths that you want to be prerendered to HTML at build time.

Before starting to use [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) read more about `fallback` key [here](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required).

In our Next.js sample we provided simple way how to handle `getStaticPaths` in different modes. Let's dive into it in details.
`[[...path]].tsx` page contains exported `getStaticPaths` function.

If you are working in `development` mode, you will not have prerendered pages, because in `development` mode `getStaticPaths` called on [every request](https://nextjs.org/docs/basic-features/data-fetching#runs-on-every-request-in-development-1).

If you are working in `production` mode `getStaticPaths` will use `sitemapFetcher` to fetch paths which should be prerendered, you can find implementation in `src/lib/sitemap-fetcher.ts`.

## GraphQLSitemapService
This service is responsible for generation of `sitemap` using `config.graphqlEndpoint` endpoint.
It exposes `fetchSSGSitemap` and `fetchExportSitemap`.
* `fetchExportSitemap` should be used when you run static export. As static export doesn't support multilingual apps, this function accepts one `language`. It will run only one graphql query for given language.
* `fetchSSGSitemap` should be used when you are working in SSG mode. This function accepts array of supported `languages`. It will include `locale` property, becuase i18n is enabled by default. It will run graphql query as many times as you have languages.

You can customize default search query which used to fetch items and generate sitemap.
Default search query is:
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

It's not always good to prerender all pages, let's imagine that you have a huge amount of pages. In this case you have ability to customize search query using `formatSearchQuery` argument. You should map `language` and `rootItemId` on the new search query.
For example, we can use query which will take only first 10 items:
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

So, `GraphQLSitemapService` executes next steps:
1. Fetch `rootItemId` using provided `rootItemPath`.
1. Fetch items using `rootItemId` and provided `locale`.
1. Merge loaded items in a correct format for SSG or Export.

> Remember to change `GRAPHQL_ROOT_ITEM_PATH` if location of your root item is changed.

### Static HTML Export
In case if you decided to use [Static HTML Export](/docs/nextjs/deploying-to-production/export) you should have defined environment variable `EXPORT_MODE=true`.

#### Disconnected mode
If you run `export` in `disconnected` mode, `sitemapFetcher` will use `DisconnectedSitemapService` which accepts `ManifestInstance`. In our case we are using `sitecore/manifest/sitecore-import.json` which can be generated when you run `jss manifest` or `jss start:disconnected-proxy`. `DisconnectedSitemapService` will go through manifest routes and will generate all paths which we can prerender.

#### Connected mode
If you run `export` in `connected` mode, `sitemapFetcher` will use `GraphQLSitemapService`.
 