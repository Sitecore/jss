---
name: data-services
routeTemplate: ./data/component-templates/article.yml
title: Data services used by Next.js with JSS
---

# Data Services Used by Next.js with JSS

A Next.js-based JSS applications support both forms of pre-rendering provided by Next.js: 

* Static Site Generation (SSG)
* Server-side Rendering (SSR). 

Next.js uses different data fetching strategies for each pre-rendering form. 

>  See the Next.js documentation on [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching) for more information about Next.js data fetching functions, and the `context` argument.

## JSS Next.js data fetching

The Next.js-based JSS sample application includes usage examples for both data fetching strategies available in Next.js, as follows: 

* [`src/pages/[[..path]].tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.tsx) implements `GetStaticPaths` and `GetStaticProps` (SSG).
* [`src/pages/[[..path]].SSR.tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.SSR.tsx) implements `GetServerSideProps` (SSR).

> You can choose the initial pre-rendering form for `[[..path]].tsx` during the application creation step with the optional `prerender` parameter. Consult the [JSS CLI reference](/docs/fundamentals/cli) for details about `jss create`.

In the preceding examples, the implementations of `GetStaticProps` and `GetServerSideProps` leverage the `SitecorePagePropsFactory`. See the `SitecorePagePropsFactory` definition in [`src/lib/page-props-factory.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props-factory.ts).

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

To prepare the page `props`, the `SitecorePagePropsFactory` uses the [Layout Service API](/docs/fundamentals/services/layout/overview) and the [Dictionary Service API](/docs/fundamentals/services/dictionary/overview). You may use either the REST-based or GraphQL-based dictionary and layout services depending on requirements.

> You can choose the initial dictionary and layout data fetch method during the application creation step with the optional `fetchWith` parameter. Consult the [JSS CLI reference](/docs/fundamentals/cli) for details about `jss create`.

> You can [switch the fetch method](/docs/nextjs/data-fetching/switching-fetch-method) after project creation.

> If you need additional data for every page, you should fetch it inside the `SitecorePagePropsFactory` and return it together with the other properties.

### locale

The factory retrieves the `context` locale as configured in the `i18n` entry of `next.config.js`. Otherwise, it uses the `config.language` defined in `package.json`.

### layoutData

The `layoutData` prop stores `LayoutServiceData` from either the Sitecore Layout Service REST API (`RestLayoutService`) or the Sitecore GraphQL Edge schema (`GraphQLLayoutService`). See [Layout Service API reference](/docs/fundamentals/services/layout/overview) for more information.

In SSR context, it will send the `context.req` and `context.res` to provide the ability to use [Sitecore Tracking & Analytics](/docs/nextjs/tracking-and-analytics/overview).

### dictionary

The `dictionary` prop contains `DictionaryPhrases` from either the Sitecore Dictionary Service REST API (`RestDictionaryService`) or the Sitecore GraphQL Edge schema (`GraphQLDictionaryService`). See [Dictionary Service API reference](/docs/fundamentals/services/dictionary/overview) for more information.

### componentProps

The `componentProps` contain data fetched by `ComponentPropsService`. The `ComponentPropsService` executes `getStaticProps/getServerSideProp` in those components that implement these functions. See [Component-level data fetching](/docs/nextjs/data-fetching/component-level-data-fetching). 

`componentProps` is a key-value storage of the format `{ [renderingUID]: data }`. See this [example](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx).

### notFound

If the Layout Service returns a `404` status for our page route, it will update the value of `notFound` to `true`, triggering our custom [NotFound](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/NotFound.tsx) page with the correct `404` status. 

## Experience Editor (Next.js Preview Context)

While working in the Experience Editor, the sample Next.js application is in [preview mode](https://nextjs.org/docs/advanced-features/preview-mode). In this case the `SitecorePagePropsFactory` uses the `editingDataService` to retrieve `layoutData`, `dictionary`, and `language` data sent with the editing request. See [Experience Editor Integration Architecture](/docs/nextjs/experience-editor/architecture) for more information.