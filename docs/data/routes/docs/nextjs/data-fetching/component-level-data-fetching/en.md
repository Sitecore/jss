---
name: component-level-data-fetching
routeTemplate: ./data/component-templates/article.yml
title: Component-level data fetching
---
# Component-Level Data Fetching

Next.js provides the ability to pre-render pages at build time using [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) or on each request using [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering). It expects you to fetch all required data in `getStaticProps`/`getServerSideProps`. We provide the ability to fetch page-level data using the [`SitecorePagePropsFactory`](./data-services). 

We can therefore pre-render pages with data fetched on the page level. But what if we want to fetch component-specific data at the component level? 

In the JSS Next.js sample application, we provide a simple way to fetch component-specific data at the component level. 

For this purpose, the `SitecorePagePropsFactory` uses the `ComponentPropsService`. 

## The ComponentPropsService

The `ComponentPropsService ` accepts the following parameters:

- `componentModule` - a function returning a Next.js component using `componentName`. You can find it in `temp/componentFactory`. If not present, generate it by running  `scripts/bootstrap.ts`.
- `layoutData`  - Layout Service data for your page.
- `context` - SSG or SSR Next.js context.

The `ComponentPropsService` goes through the layout service data and looks at all the renderings. To find the components that require data fetching,  the service "spies" on the component using the `rendering.componentName` against the list of component registrations in  `componentFactory`. 

If the component defines and exports the functions `getStaticProps` or `getServerSideProps`, the `ComponentPropsService` executes one of the functions as follows: 

- In SSR mode, it will call `getServerSideProps`.
- In SSG mode, it will call `getStaticProps`. 

After executing all side-effects, it will store all the data in the format `{ [rendering.uid]: data }`.

## An example with a ContentBlock component

Let's look at an example of a component with side-effects. 

In  `src/components/ContentBlock.tsx`, we define the `getStaticProps` or `getServerSideProps` functions  to fetch the post we want to render. 

We access the data with the help of `useComponentProps` and the `rendering.uid`.

> In the following example, we show an implementation of both `getStaticProps` and `getServerSideProps`, but you only need to define one of them, depending on the rendering mode you chose.


```tsx
import {
  Text,
  RichText,
  Field,
  GetServerSideComponentProps,
  GetStaticComponentProps,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

type PostEntity = {
  title: string;
  body: string;
};

type ContentBlockProps = {
  rendering: ComponentRendering;
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

const ContentBlock = ({ fields, rendering }: ContentBlockProps): JSX.Element => {
  const externalData = rendering.uid ? useComponentProps<PostEntity>(rendering.uid) : undefined;

  return (
    <>
      <Text tag="h2" className="display-4" field={fields.heading} />

      <RichText className="contentDescription" field={fields.content} />

      {externalData && (
        <div>
          <h1>{externalData?.title}</h1>
          <p>{externalData?.body}</p>
        </div>
      )}
    </>
  );
};

const fetchPost = () =>
  fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json());

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData, context) => {
  const post = await fetchPost();

  return post;
};

export const getServerSideProps: GetServerSideComponentProps = async (rendering, layoutData) => {
  const post = await fetchPost();

  return post;
};

export default ContentBlock;
```
