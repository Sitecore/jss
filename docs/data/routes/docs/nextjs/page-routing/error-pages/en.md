---
name: error-pages
routeTemplate: ./data/component-templates/article.yml
title: Error Pages
---
# Error Pages

Next.js supports custom [Error Pages](https://nextjs.org/docs/advanced-features/custom-error-page).

## 404 Page

The sample app provides a custom [404 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/404.tsx).

The sample app will render the 404 Page in the following cases:
* When [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) or [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) return `notFound: true`. By default, the `notFound` property provided by [SitecorePagePropsFactory](/docs/nextjs/data-fetching/data-services) is set to `false`, and it should be programmatically set to `true` when the Layout Service responds with a `404` status code.
* When using [Static Export](/docs/nextjs/deploying-to-production/export), and requesting a route that is missing from the list of routes provided by [getStaticPaths](/docs/nextjs/data-fetching/getStaticPaths). This can happen if [`fallback: false`](https://nextjs.org/docs/basic-features/data-fetching#fallback-false) is used in the export.

## 500 Page

The sample app provides custom [500 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/_error.tsx).

Next.js handles 500 errors, both client-side and server-side. This page is rendered in case of all errors except 404. 

> NOTE: [500 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/_error.tsx) is only used in production. In development mode, you will get an error with the call stack.

If you want to handle specific status codes and render the built-in error page, you can by importing the `Error` component:

```jsx
import Error from 'src/pages/_error';

const Page = ({ errorCode, text }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Content: {text}</div>
}

export default Page
```
