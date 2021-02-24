---
name: data-services
routeTemplate: ./data/component-templates/article.yml
title: Data services used by Next.js with JSS
---

# Data Services Used by Next.js with JSS

JSS Next.js applications support both forms of pre-rendering provided by Next.js: 

* Static Site Generation (SSG)
* Server-side Rendering (SSR). 

Next.js uses different data fetching strategies for each pre-rendering form. 

## JSS Next.js data fetching

The JSS Next.js sample application includes usage examples for both data fetching strategies available in Next.js, as follows: 

* `src/pages/[[path]].tsx` implements `GetStaticPaths` and `GetStaticProps` (SSG).
* `src/page_examples/[[path]].SSR.tsx` implements `GetServerSideProps` (SSR).

>  See the Next.js documentation on [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching) for more information about Next.js data fetching functions, and the `context` argument.

In the preceding examples, the implementations of `GetStaticProps`  and   `GetServerSideProps` leverage the `SitecorePagePropsFactory`. See the `SitecorePagePropsFactory` definition in [`src/lib/page-props-factory.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props-factory.ts).

The factory exposes the method  `create(context: GetServerSidePropsContext | GetStaticPropsContext)` that is responsible for fetching all data needed to render the page (the page `props`), depending on the `context` in which it is used. 

The method returns an object of the type `SitecorePageProps`.

```tsx
export type SitecorePageProps = {
  locale: string;
  layoutData: LayoutServiceData | null;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
};
```

 See the full definition of `SitecorePageProps` in [`src/lib/page-props.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props.ts).

## Page `props`

To prepare the page `props`, the `SitecorePagePropsFactory` uses the [Layout Service](/docs/fundamentals/services/layout-service).and the [Dictionary Service](/docs/fundamentals/services/dictionary-service). 

> If you need additional data for every page, you should fetch it inside the `SitecorePagePropsFactory` and return it together with the other properties.

> We are currently using standard REST-based dictionary and layout services. For Sitecore Experience Edge, we will soon provide GraphQL-based implementations.

### locale

The factory retrieves the `context` locale as configured in the `i18n` entry of `next.config.js`. Otherwise, it uses the `config.language` defined in `package.json`.

### layoutData

The `layoutData` prop stores `LayoutServiceData` from the Sitecore Layout Service provided by a `RestLayoutService` instance. The `RestLayoutServices` fetches `LayoutServiceData` using the Sitecore Layout Service REST API using Axios as the default data fetcher. In SSR mode, it will set up the required request and response `headers` using the attributes `context.req` and `context.res` to provide the ability to use [Sitecore Tracking](/docs/fundamentals/services/tracking#jss-tracking).

### dictionary

The `dictionary` prop contains `DictionaryPhrases` from the Sitecore Dictionary Service. A `RestDictionaryService` instance fetches dictionary data for the given language using the Sitecore Dictionary Service REST API. The `RestDictionaryService` uses Axios as the default data fetcher. By default, `caching` is enabled, and the `cacheTimeout` is 60 sec. You can disable/enable caching using the `cacheEnabled` property, and you can customize cache timeout using the `cacheTimeout` property.

### componentProps

The `componentProps` contain data fetched by `ComponentPropsService`. The `ComponentPropsService` executes `getStaticProps/getServerSideProp` in those components that implement these functions. See [Component-level data fetching](../component-level-data-fetching/en.md). 

`componentProps` is a key-value storage of the format `{ [renderingUID]: data }`. See this [example](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx).

### notFound

If the Layout Service returns a `404` status for our page route, it will update the value of `notFound` to `true`, triggering our custom [NotFound](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/NotFound.tsx) page with the correct `404` status. 

## Experience Editor (Next.js Preview Context)

While working in the Experience Editor, the sample Next.js application is in [preview](https://nextjs.org/docs/advanced-features/preview-mode)  mode. The `SitecorePagePropsFactory` uses the `editingDataService`. The service uses `layoutData`,  `dictionary`, and `language` data sent with the editing request in `context.previewData`.
