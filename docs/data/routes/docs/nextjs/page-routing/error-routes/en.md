---
name: error-routes
routeTemplate: ./data/component-templates/article.yml
title: Error Routes
---
# Error Routes

Next.js supports custom [Error Pages](https://nextjs.org/docs/advanced-features/custom-error-page).

## 404 Page

The sample app provides custom [404 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/404.tsx).

The sample app will render 404 page in case:
* You returned `notFound: true` in [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) or [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering). By default `notFound` property provided by [SitecorePagePropsFactory](/docs/nextjs/data-fetching/data-services) and it can be `true` in case if `Sitecore Layout Service` returned `404` status code.
* You are using [Static Export](/docs/nextjs/deploying-to-production/export) and you visited route that is not provided by [getStaticPaths](/docs/nextjs/data-fetching/getStaticPaths). It happens because `Static Export` supports only [fallback: false](https://nextjs.org/docs/basic-features/data-fetching#fallback-false).

## 500 Page

The sample app provides custom [500 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/_error.tsx).

Next.js handles 500 errors both client-side and server-side. This page will be rendered in case of all errors except of 404.

> NOTE: [500 Page](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/_error.tsx) is only used in production. In development mode you will get an error with the call stack.
