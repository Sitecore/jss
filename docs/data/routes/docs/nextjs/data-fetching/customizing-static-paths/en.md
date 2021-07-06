---
name: customizing-static-paths
routeTemplate: ./data/component-templates/article.yml
title: Customizing build-time static paths
---
# Walkthrough: Customizing build-time static paths

For very large websites with many pages, products or articles, the static generation of all the pages could take a long time. You can reduce the build time of your static generated application by excluding some types of pages/items from static generation. 

You can achieve this by customizing which pages are generated at build time by [`getStaticPaths`](/docs/nextjs/data-fetching/getStaticPaths), a function that returns the list of paths for which the application should generate pages statically. 

This walkthrough describes how to customize the output of the `sitemap-fetcher` (used in `getStaticPaths`). 

## Create a custom sitemap service

You can extend the class `GraphQLSitemapService` and the interface `GraphQLSitemapServiceConfig` to allow you to exclude a particular item type:

1. In `src/lib`, create a new file `sitemap-service.ts`.

2. In the new file, import the class `GraphQLSitemapService` and the interface `GraphQLSitemapServiceConfig` from our Next.js SDK.
  ```
  import {
    GraphQLSitemapService,
    GraphQLSitemapServiceConfig,
  } from '@sitecore-jss/sitecore-jss-nextjs';
  ```

3. Extend the `GraphQLSitemapServiceConfig`, add an additional option to the service configuration:
  ```typescript
  export interface ExtendedSitemapServiceConfig extends GraphQLSitemapServiceConfig {
    /**
    * Item with sub-paths to exclude
    */

    excludeItemId?: string;
  }
  ```

4. Sitecore Delivery Edge requires a valid ID in the search query. For those instances where you will not use the `excludeItemId` option, you will need to provide a valid, but empty, id. Declare an `emptyID` constant: 

```typescript
const emptyId = '{00000000-0000-0000-0000-000000000000}';
```

5. Extend the `GraphQLSitemapService` class and override the `query` getter such that, if you provide an ID for `excludeItemId` it will not return items of that type:
```typescript
export class ExtendedSitemapService extends GraphQLSitemapService {
  protected get query(): string {
    return /* GraphQL */ `
      query SitemapQuery(
        $rootItemId: String!
        $language: String!
        $pageSize: Int = 10
        $hasLayout: String = "true"
        $after: String
        $excludeItemId: String = "${this.options.excludeItemId ?? emptyId}"
      ) {
        search(
          where: {
            AND: [
              { name: "_path", value: $rootItemId, operator: CONTAINS }
              { name: "_path", value: $excludeItemId, operator: NCONTAINS }
              { name: "_language", value: $language }
              { name: "_hasLayout", value: $hasLayout }
            ]
          }
          first: $pageSize
          after: $after
        ) {
          total
          pageInfo {
            endCursor
            hasNext
          }
          results {
            url {
              path
            }
          }
        }
      }
    `;
  }
  constructor(public options: ExtendedSitemapServiceConfig) {
    super(options);
  }
```
> Note that we provide `$excludeItemId: String = "${this.options.excludeItemId ?? emptyId}"` in the query parameters , as well as the condition `{ name: "_path", value: $excludeItemId, operator: NCONTAINS }` to the `search` query. 
## Create custom sitemap fetchers to customize lists of static paths
With the new sitemap service in place, you can now add sitemap fetchers that suit your needs. 

- In `src/lib/sitemap-fetcher.js`, import the necessary libraries, including your new sitemap service: 

```typescript
/* eslint-disable @typescript-eslint/no-var-requires */
import { StaticPath } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import { config as packageConfig } from '../../package.json';
import { ExtendedSitemapService } from './sitemap-service'; // your new service
import { ItemIds } from './constants';
```

###  Fetch all pages, excluding some item types
You can use your new `ExtendedSitemapService` to create a sitemap fetcher that excludes specific item types from the list of static paths. For example, to fetch all pages except Products:

1. In `src/lib/sitemap-fetcher.js`, implement a `RootSitemapFetcher`:

```typescript
export class RootSitemapFetcher {
  private _graphqlSitemapService: ExtendedSitemapService;

  constructor() {
    this._graphqlSitemapService = new ExtendedSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      excludeItemId: ItemIds.Products, // Exclude products
    });
  }

  async fetch(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    return (process.env.EXPORT_MODE
      ? this._graphqlSitemapService.fetchExportSitemap(packageConfig.language)
      : this._graphqlSitemapService.fetchSSGSitemap(context?.locales || [])
    ).then((results) => {
      // Compensate for current bug on Delivery Edge where the root '/products' item
      // is being returned from the search query which excludes it ({ name: "_path", value: $productsItemId, operator: NCONTAINS })
      return results.filter((value) => value.params.path[0] !== 'products');
    });
  }
}
```

2. Export an instance of `RootSitemapFetcher`:

```typescript
export const rootSitemapFetcher = new RootSitemapFetcher();
```

3. In your application's `[[path]].tsx`, import the instance of the `RootSitemapFetcher`:

```typescript
import { rootSitemapFetcher } from 'lib/sitemap-fetcher';
```

4. Modify / add `getStaticPaths` to use the `rootSitemapFetcher`: 
```typescript
export const getStaticPaths: GetStaticPaths = async (context) => {
  if (process.env.NODE_ENV !== 'development') {
    // Note: Next.js runs export in production mode
    const paths = await rootSitemapFetcher.fetch(context);

    return {
      paths,
      fallback: process.env.EXPORT_MODE ? false : 'blocking',
    };
  }

  return {
    paths: [],
    fallback: 'blocking',
  };
};
```

###  Fetch only products

You can use the new `ExtendedSitemapService` to fetch only a specific type of items. For example, to fetch only Products:

1. In `src/lib/sitemap-fetcher.js`, implement a `ProductSitemapFetcher`, to only return product paths:

```typescript
export class ProductSitemapFetcher {
  private _graphqlSitemapService: ExtendedSitemapService;

  constructor() {
    this._graphqlSitemapService = new ExtendedSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      rootItemId: ItemIds.Products, // Only products
    });
  }

  async fetch(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    return (process.env.EXPORT_MODE
      ? this._graphqlSitemapService.fetchExportSitemap(packageConfig.language)
      : this._graphqlSitemapService.fetchSSGSitemap(context?.locales || [])
    ).then((results) => {
      results.forEach((value) => {
        value.params.path.shift(); // Remove the leading 'products' path fragment
      });
      return results;
    });
  }
}
```

2. Export an instance of the fetcher:

```typescript
export const productSitemapFetcher = new ProductSitemapFetcher();
```

3. In your application's `products/[[path]].tsx`, import the instance of the `ProductSitemapFetcher`:

```typescript
import { productSitemapFetcher } from 'lib/sitemap-fetcher';
```

2. Modify / add `getStaticPaths` to use the `productSitemapFetcher`: 
```typescript
export const getStaticPaths: GetStaticPaths = async (context) => {

  if (process.env.NODE_ENV !== 'development') {
      // Note: Next.js runs export in production mode
      const paths = await productSitemapFetcher.fetch(context);

      return {
        paths,
        fallback: process.env.EXPORT_MODE ? false : 'blocking',
      };
    }

    return {
      paths: [],
      fallback: 'blocking',
    };
  };
```



