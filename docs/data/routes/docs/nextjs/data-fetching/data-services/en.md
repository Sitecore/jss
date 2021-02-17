---
name: data-services
routeTemplate: ./data/component-templates/article.yml
title: Data services used by Next.js with JSS
---
# Data services used by Next.js with JSS
The sample app contains `SitecorePagePropsFactory` in `src/lib/page-props-factory.ts`. This factory is responsible for fetching all needed data in order to generate `SitecorePageProps`, it exposes public method `create(context: GetServerSidePropsContext | GetStaticPropsContext)`. Read more about `context` argument [here](https://nextjs.org/docs/basic-features/data-fetching). Definition of `SitecorePageProps` you can look at [`src/lib/page-props.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props.ts).

In case if you need some data which needed by every page you can fetch it in `SitecorePagePropsFactory` and return it with other properties.

Currently, we are using standard REST-based dictionary and layout services. In the near future we'll also have GraphQL-based implementations available (for Sitecore Experience Edge).

It doesn't matter if you are working in `SSG/SSR` you can use `sitecorePagePropsFactory.create(context)` in `getStaticProps/getServerSideProps`, `SitecorePagePropsFactory` handles all possible cases.

Let's look at `SitecorePageProps` definition in details:
```ts
export type SitecorePageProps = {
  locale: string;
  layoutData: LayoutServiceData | null;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
};
```
### locale
Use `context` locale if Next.js i18n is configured, otherwise use `config.language` defined in `package.json`.

### layoutData
It's `LayoutServiceData` from Sitecore Layout Service fetched by `RestLayoutService` instance. Read more about [Layout Service](/docs/fundamentals/services/layout-service). `RestLayoutService` fetch layout data using the Sitecore Layout Service REST API. Uses Axios as the default data fetcher. If you are working in `SSR` mode it will setup default required request and response `headers` using `context.req` and `context.res` attributes in order to provide ability to use [Sitecore Tracking](/docs/fundamentals/services/tracking#jss-tracking).

### dictionary
It's `DictionaryPhrases` from the Sitecore Dictionary Service fetched by `RestDictionaryService` instance. Read more about [Dictionary Service](/docs/fundamentals/services/dictionary-service). `RestDictionaryService` Fetch dictionary data for given language using the Sitecore Dictionary Service REST API. Uses Axios as the default data fetcher. By default, `caching` is enabled and cache timeout is 60 sec. You can disable/enable caching using `cacheEnabled` property and you can customize cache timeout using `cacheTimeout` property.

### componentProps
It's data fetched by `ComponentPropsService`, which execute `getStaticProps/getServerSideProps` in components which implemented these functions. `componentProps` is a key-value storage in format `{ [renderingUID]: data }`. Look at [example](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx).

### notFound
If Layout Service returned status `404` our page routes will return this in `getStaticProps/ServerSideProps`,
which will trigger our custom [NotFound](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/NotFound.tsx) page with proper `404` status code.

## Experience Editor (Preview)
In case if you are working in Experience Editor `SitecorePagePropsFactory` in this case next.js is working in [preview](https://nextjs.org/docs/advanced-features/preview-mode) mode. Our sample uses `editingDataService` which will take `layoutData`, `dictionary` and `language` from `context.previewData` it contains data already sent along with the editing request.
