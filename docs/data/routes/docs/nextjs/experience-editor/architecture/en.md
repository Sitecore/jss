---
name: architecture
routeTemplate: ./data/component-templates/article.yml
title: Experience Editor integration architecture and APIs
---
# Experience Editor Integration Architecture and APIs

## APIs

* `EditingRenderMiddleware` - Middleware / handler for use in the editing render Next.js API route (e.g. */api/editing/render*).
* `EditingDataMiddleware` - Middleware / handler for use in the editing data Next.js API dynamic route (e.g. */api/editing/data/[key]*).
* `EditingDataCache` - Defines an editing data cache implementation.
* `EditingDataDiskCache` - A disk-based editing data cache implementation (required for hosting on Vercel via [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)).
* `EditingDataService` - Service responsible for maintaining Sitecore Experience Editor data between requests.