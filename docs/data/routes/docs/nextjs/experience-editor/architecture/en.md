---
name: architecture
routeTemplate: ./data/component-templates/article.yml
title: Experience Editor integration architecture and APIs
---
# Experience Editor Integration Architecture and APIs

A Next.js application utilizes the [JSS Http rendering engine](/docs/fundamentals/services/view-engine#http-rendering-engine) feature for integration to the Sitecore Experience Editor. This article provides an overview of the integration architecture and the APIs involved.

> This topic focuses on architecture. For details on connecting your Next.js app to the Experience Editor, see the [separate guide](/docs/nextjs/experience-editor/walkthrough).

## Architecture

Let's first take a look at a diagram of the architecture. In the diagram, APIs which are included with the JSS Next.js SDK are highlighted in <span style="color:#008998">teal</span>. The others are part of the Next.js sample application.

<img src="/assets/img/nextjs-ee-architecture.svg" alt="Next.js Experience Editor Integration Architecture" />

### Routes

There are 3 Next.js routes involved in the process. These are all included with the sample Next.js application.

#### Render API Route

A [Next.js API route](https://nextjs.org/docs/api-routes/introduction) (`pages\api\editing\render.ts`) which handles the Sitecore CM Experience Editor `POST` request. This logic is encapsulated in the [`EditingRenderMiddleware`](#editingrendermiddleware). This endpoint is used as the `serverSideRenderingEngineEndpointUrl` on the [JSS app configuration](/docs/nextjs/experience-editor/walkthrough#jss-app-configuration).

#### Data API Route

A [Next.js dynamic API route](https://nextjs.org/docs/api-routes/dynamic-api-routes) (`pages\api\editing\data\[key].ts`) which handles storage and retrieval of data sent from the Experience Editor (more details below). This logic is encapsulated in the [`EditingDataMiddleware`](#editingdatamiddleware).

#### Page Route

The main [Next.js optional catch-all route](/docs/nextjs/page-routing/jss-routes) (`pages\[[...path]].tsx`) which renders all Sitecore page routes.

### JSS Editing Secret

To secure the additional Experience Editor API endpoints exposed by your Next.js app (`/api/editing/render` and `/api/editing/data/[key]`), a secret token is used. The JSS editing secret must be set on both client-side and server-side.

> See the [separate guide](/docs/nextjs/experience-editor/walkthrough) for configuration details.

You'll see this editing secret is automatically validated in the [`EditingRenderMiddleware`](#editingrendermiddleware) and [`EditingDataMiddleware`](#editingdatamiddleware). A HTTP `401` status code is returned if validation fails.

### Next.js Preview Mode

Preview Mode is a built-in feature of Next.js which is meant for CMS use-cases where you're writing draft content (i.e. Sitecore Experience Editor) and want to render pages with this content at **request time** (bypassing any Static Generation).

> See [Next.js documentation](https://nextjs.org/docs/advanced-features/preview-mode) to learn more about Preview Mode.

The Experience Editor integration uses this Next.js feature. In the diagram above, you can see that we: 
* Enable Next.js Preview Mode in the [`EditingRenderMiddleware`](#editingrendermiddleware), which creates specific cookies on the [Render API Route](#render-api-route) response. These preview cookies are passed along to the subsequent [Page Route](#page-route) request.
* Check if we are in Next.js Preview Mode in the *Page Props Factory*. If yes, then we know this is a preview (editing) request and can use preview (editing) data.

### Understand Editing Data

The Experience Editor `POST` request includes everything we need to render a given *Page Route* including layout, dictionary, and language data. This includes extra metadata necessary for rendering in the Experience Editor in addition to *unsaved* layout information.

This data sent from the Experience Editor is referred to as *editing data* or *EE Data* here.

You can see how the editing data is ultimately used in the *[Page Props Factory](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props-factory.ts)* to populate the [page props](/docs/nextjs/data-fetching/data-services#page-props) (as opposed to fetching these individually in normal mode). The challenge with Next.js is getting it there.

### Maintaining Editing Data between requests

You may have noticed that the bottom half of the diagram is dedicated to what amounts to storage and retrieval of the editing data. **Why not just pass this along directly from the [Render API Route](#render-api-route) to the [Page Route](#page-route) as preview data**?

The reason is twofold.
1. Next.js Preview Mode has a [size limitation of 2KB for preview data](https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits) since the data is stored in a cookie. Our editing data exceeds this, thus we need another storage solution.
2. The storage solution needs to work with [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) on Vercel.

When [deploying to Vercel](/docs/nextjs/deploying-to-production/vercel), the [Render API Route](#render-api-route) will automatically become an isolated Serverless Function *completely separate from the [Page Route](#page-route)*. This means we can't do something simple like stash the editing data in a Node memory cache on the server.

Another Next.js API route is introduced to handle this, serving as the mediator: the [Data API Route](#data-api-route) (which becomes another isolated Serverless Function when deployed). The underlying storage mechanism is fulfilled by an [`EditingDataCache`](#editingdatacache) with a disk-based default implementation [`EditingDataDiskCache`](#editingdatadiskcache).

> You can swap out the `EditingDataDiskCache` with your own `EditingDataCache` implementation, but note that a Node memory-based implementation will not work on Vercel Serverless Functions.

The [`EditingDataService`](#editingdataservice) is a convenience wrapper to make these API requests.

### Using the `sc_httprenderengineurl` parameter

One of the features of [JSS Http rendering engine](/docs/fundamentals/services/view-engine#http-rendering-engine) is the `sc_httprenderengineurl` query string parameter. This allows the rendering engine endpoint URL to be set dynamically.

This means that with the help of tunneling software like [Ngrok](https://ngrok.com/), frontend developers are able to test Experience Editor integration by using their local Next.js apps. This is possible by dynamically setting the rendering host URL in the Experience Editor. For example, adding `&sc_httprenderengineurl=https://2ea61a8f80b9.ngrok.io/api/editing/render`.

## APIs

The following lists the relevant APIs included with the JSS Next.js SDK and shown in the diagram above. 

Note all except the `EditingDataService` are found in the `@sitecore-jss/sitecore-jss-nextjs` npm package under the `/middleware` sub-module. For example:

```javascript
import { EditingRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs';
```

### `EditingRenderMiddleware`

Middleware / handler for use in the editing [Render API Route](#render-api-route) (e.g. */api/editing/render*).

The `EditingRenderMiddleware` will:
1. Validate the [JSS Editing Secret](#jss-editing-secret)
2. Extract editing data from the POST request payload and stash it via the `EditingDataService`, which returns a key for retrieval
3. Enable Next.js Preview Mode, passing our stashed editing data key as preview data
4. Invoke the actual [Page Route](#page-route) request, passing along the Preview Mode cookies
5. Return the rendered page HTML to the Sitecore Experience Editor in expected JSON format

### `EditingDataService`
Service responsible for maintaining Sitecore Experience Editor data (*editing data*) between requests.

There is also an `editingDataService` available, which is an `EditingDataService` singleton (with default values). This is typically the one you'll want.

### `EditingDataMiddleware`
Middleware / handler for use in the editing [Data API Route](#data-api-route) (e.g. */api/editing/data/[key]*).

The `EditingDataMiddleware` will:
1. Validate the [JSS Editing Secret](#jss-editing-secret)
2. Set (HTTP `PUT` request) or get (HTTP `GET` request) editing data via the `EditingDataCache`

### `EditingDataCache`
Interface which defines an editing data cache implementation.

### `EditingDataDiskCache`
A disk-based `EditingDataCache` implementation (default). This is required for hosting on Vercel via [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction).