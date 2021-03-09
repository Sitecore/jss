---
name: architecture
routeTemplate: ./data/component-templates/article.yml
title: Experience Editor integration architecture and APIs
---
# Experience Editor Integration Architecture and APIs

A Next.js application uses the [JSS Http rendering engine](/docs/fundamentals/services/view-engine#http-rendering-engine) feature for integration to the Sitecore Experience Editor. This article summarizes the integration architecture and the APIs involved.

> This topic focuses on architecture. For details on connecting your Next.js app to the Experience Editor, see the [separate guide](/docs/nextjs/experience-editor/walkthrough).

## Architecture

Let's first look at a diagram of the architecture. In the diagram, APIs included with the JSS Next.js SDK have a <span style="color:#008998">teal</span> highlight. The others are part of the Next.js sample application.

<img src="/assets/img/nextjs-ee-architecture.svg" alt="Next.js Experience Editor Integration Architecture" />

### Routes

There are 3 Next.js routes involved in the integration process, all included with the sample Next.js application.

#### Render API Route

The Render API Route is a [Next.js API route](https://nextjs.org/docs/api-routes/introduction) (`pages\api\editing\render.ts`). This endpoint handles the Sitecore CM Experience Editor `POST` request, using logic encapsulated in the [`EditingRenderMiddleware`](#editingrendermiddleware). The Render API Route is the one you should use as `serverSideRenderingEngineEndpointUrl` in the [JSS app configuration](/docs/nextjs/experience-editor/walkthrough#jss-app-configuration).

#### Data API Route

The Data API route is a [Next.js dynamic API route](https://nextjs.org/docs/api-routes/dynamic-api-routes) (`pages\api\editing\data\[key].ts`). This endpoint handles the storage and retrieval of data sent from the Experience Editor (more details below), using logic encapsulated in the [`EditingDataMiddleware`](#editingdatamiddleware).

#### Page Route

The Page Route is the main [Next.js optional catch-all route](/docs/nextjs/page-routing/jss-routes) (`pages\[[...path]].tsx`). It renders all Sitecore page routes.

### JSS Editing Secret

The JSS Editing Secret is a token used to secure the additional Experience Editor API endpoints exposed by your Next.js app (`/api/editing/render` and `/api/editing/data/[key]`). You must set this token on both the client-side and the server-side.

> See the [separate guide](/docs/nextjs/experience-editor/walkthrough) for configuration details.

[`EditingRenderMiddleware`](#editingrendermiddleware) and [`EditingDataMiddleware`](#editingdatamiddleware) automatically validate the JSS editing secret. If validation fails, they return a HTTP `401` status code.

### Next.js Preview Mode

Preview Mode is a built-in feature of Next.js meant for CMS use-cases where you're writing draft content (such as the Sitecore Experience Editor), and you want to render pages with this content at **request time** (bypassing any Static Generation).

> See [Next.js documentation](https://nextjs.org/docs/advanced-features/preview-mode) to learn more about Preview Mode.

The Experience Editor integration uses this Next.js feature. In the diagram above, you can see that we: 
* Enable Next.js Preview Mode in the [`EditingRenderMiddleware`](#editingrendermiddleware), which creates specific cookies on the [Render API Route](#render-api-route) response and passes them along to the subsequent [Page Route](#page-route) request.
* Check if we are in Next.js Preview Mode in the *Page Props Factory*. If yes, we know this is a preview (editing) request and can use preview (editing) data.

### Understand Editing Data

The Experience Editor `POST` request includes everything we need to render a given *Page Route* including layout, dictionary, and language data. Besides *unsaved* layout information, the request includes extra metadata necessary for rendering in the Experience Editor.

Here, we refer to the data sent from the Experience Editor as *editing data* or *EE Data*.

The *[Page Props Factory] (https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/page-props-factory.ts)*  uses the editing data to populate the [page props](/docs/nextjs/data-fetching/data-services#page-props) (as opposed to fetching these individually in normal mode). The challenge with Next.js is getting the data to the Page Props Factory. 

### Maintaining Editing Data between requests

You may have noticed that the bottom half of the diagram shows storing and retrieving of editing data. **Why not just pass this along directly from the [Render API Route](#render-api-route) to the [Page Route](#page-route) as preview data**?

The reason is twofold:
1. Since Next.js stores preview data in a cookie, Next.js Preview Mode has a [size limitation of 2KB for preview data](https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits). Our editing data exceeds this limit. Thus we need another storage solution.
2. The storage solution needs to work with [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) on Vercel.

When [deploying to Vercel](/docs/nextjs/deploying-to-production/vercel), the [Render API Route](#render-api-route) will automatically become an isolated Serverless Function *completely separate from the [Page Route](#page-route)*. Therefore, we can't do something simple like stashing the editing data in a Node memory cache on the server.

We introduce another Next.js API route to handle this, serving as the mediator: the [Data API Route](#data-api-route). When deployed, it becomes another isolated Serverless Function. An [`EditingDataCache`](#editingdatacache) with a disk-based default implementation [`EditingDataDiskCache`](#editingdatadiskcache) fulfills the underlying storage mechanism.

> You can swap out the `EditingDataDiskCache` with your own `EditingDataCache` implementation, but note that a Node memory-based implementation will not work on Vercel Serverless Functions.

The [`EditingDataService`](#editingdataservice) is a convenience wrapper to make these API requests.

### Using the `sc_httprenderengineurl` parameter

One feature of the [JSS Http rendering engine](/docs/fundamentals/services/view-engine#http-rendering-engine) is the `sc_httprenderengineurl` query string parameter. 

It allows setting the rendering engine endpoint URL dynamically. With the help of tunneling software like [Ngrok](https://ngrok.com/), front-end developers can test Experience Editor integration by using their local Next.js apps by dynamically setting the rendering host URL in the Experience Editor. For example, adding `&sc_httprenderengineurl=https://2ea61a8f80b9.ngrok.io/api/editing/render`.

## APIs

The following lists the relevant APIs included with the JSS Next.js SDK and shown in the diagram above. 

Note you can find all except the `EditingDataService` in the `@sitecore-jss/sitecore-jss-nextjs` npm package under the `/middleware` sub-module. For example:

```javascript
import { EditingRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs';
```

### `EditingRenderMiddleware`

The `EditingRenderMiddleware` is a middleware/handler for the editing [Render API Route](#render-api-route) (e.g. */api/editing/render*).

The `EditingRenderMiddleware`:
1. Validates the [JSS Editing Secret](#jss-editing-secret).
2. Extracts editing data from the POST request payload and stash it via the `EditingDataService` that returns a key for retrieval.
3. Enables Next.js Preview Mode, passing our stashed editing data key as preview data.
4. Invokes the actual [Page Route](#page-route) request, passing along the Preview Mode cookies.
5. Returns the rendered page HTML to the Sitecore Experience Editor in expected JSON format.

### `EditingDataService`
The `EditingDataService` is the service responsible for maintaining Sitecore Experience Editor data (*editing data*) between requests.

There is also an `editingDataService` available, an `EditingDataService` singleton (with default values). It is typically the one you'll want.

### `EditingDataMiddleware`
The `EditingDataMiddleware` is a middleware/handler for the editing [Data API Route](#data-api-route) (e.g. */api/editing/data/[key]*).

The `EditingDataMiddleware`:
1. Validates the [JSS Editing Secret](#jss-editing-secret)
2. Sets (HTTP `PUT` request) or gets (HTTP `GET` request) editing data via the `EditingDataCache`.

### `EditingDataCache`
The `EditingDataCache` is an interface that defines an editing data cache implementation.

### `EditingDataDiskCache`
The `EditingDataDiskCache` is a disk-based `EditingDataCache` implementation (default). It is necessary for hosting on Vercel using [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction).