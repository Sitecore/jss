---
name: debug-logging
routeTemplate: ./data/component-templates/article.yml
title: Debug Logging
---
# Debug Logging in JSS

The Sitecore JSS npm packages utilize the [debug](https://www.npmjs.com/package/debug) module for debug logging.

> `debug` is like an augmented version of `console.log`, but unlike `console.log`, you don't have to comment out debug logs in production code. The flipside being that you can easily enable debug logs in production when necessary using _environment variables_.

All Sitecore JSS logs are organized under the root namespace `sitecore-jss`. Logging is turned off by default and can be conditionally turned on by using the `DEBUG` environment variable.

> Note: The debug logs currently only include server-side code, so there is no benefit to [enabling debug logging in the browser](https://www.npmjs.com/package/debug#browser-support).

To output all debug logs available, set the `DEBUG` environment variable to `sitecore-jss:*` (`*` is used as a wildcard).

```
DEBUG=sitecore-jss:*
```

Or be selective and show for example only HTTP logs.

```
DEBUG=sitecore-jss:http
```

Or show all _but_ HTTP logs (`-` prefix will exclude).

```
DEBUG=sitecore-jss:*,-sitecore-jss:http
```

> To learn more about the `DEBUG` syntax, see [debug](https://www.npmjs.com/package/debug#wildcards).

## Namespaces

The following lists all namespaces available, along with the applicable Sitecore JSS npm packages and sample applications.

| Namespace | Package(s) / Sample(s) | Description |
| --- | --- | --- |
| `sitecore-jss:http` | `sitecore-jss`, `nextjs`, `node-headless-ssr-experience-edge` | Low-level HTTP request and response logging for default fetch wrappers (`GraphQLRequestClient` and `AxiosDataFetcher`). |
| `sitecore-jss:dictionary` | `sitecore-jss`, `nextjs`, `node-headless-ssr-experience-edge` | Trace logging for dictionary service implementations (`GraphQLDictionaryService` and `RestDictionaryService`). |
| `sitecore-jss:layout` | `sitecore-jss`, `nextjs`, `node-headless-ssr-experience-edge` | Trace logging for layout service implementations (`GraphQLLayoutService` and `RestLayoutService`). |
| `sitecore-jss:experience-editor` | `sitecore-jss-nextjs`, `nextjs` | Trace logging for Next.js Experience Editor integration middleware. |
| `sitecore-jss:sitemap` | `sitecore-jss-nextjs`, `nextjs` | Trace logging for Next.js GraphQL sitemap service (`GraphQLSitemapService`). |

## Advanced options

When running through Node.js, you can set a few additional environment variables that will change the behavior of the debug logging.

| Name | Purpose |
| --- | --- |
| `DEBUG` |	Enables/disables specific debugging namespaces. |
| `DEBUG_COLORS` |	Whether or not to use colors in the debug output. Default is `true`. |
| `DEBUG_DEPTH` |	Object inspection depth. Default is `2`. |
| `DEBUG_SHOW_HIDDEN` |	Shows hidden properties on inspected objects. Default is `false`. |

> To learn more about the `DEBUG_` environment variables, see [debug](https://www.npmjs.com/package/debug#environment-variables).