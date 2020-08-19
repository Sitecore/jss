---
name: http-status-codes
routeTemplate: ./data/component-templates/guide.yml
title: Handling HTTP Status Codes
---

## 404 Response Code
The OOTB JSS starter projects provide a [route handler implementation](https://github.com/Sitecore/jss/blob/dev/samples/react/src/RouteHandler.js) that is configured to handle `404` responses by rendering the [`NotFound` component](https://github.com/Sitecore/jss/blob/dev/samples/react/src/NotFound.js).

Updating the `NotFound` component allows you to customize the `404 page`.

---

## 500 Response Code
The `Node Proxy with SSR` configuration comes with an implementation for handling 500 errors.

GitHub references:
- [Error page](https://github.com/Sitecore/jss/blob/dev/samples/node-headless-ssr-proxy/error.html)
- [Error handler](https://github.com/Sitecore/jss/blob/dev/samples/node-headless-ssr-proxy/config.js#:~:text=onError)

---

## Other Error Codes
Handling other error codes is not configured OOTB, but this is possible customizing the `fetcher` option passed to `dataApi.fetchRouteData`. (Either add logic to the default fetcher, or chain Promise handlers to it.)

Refer to [Customizing route handling: Using the `querystringParams` option](/guides/code-patterns/routing#customizing-route-handling)
