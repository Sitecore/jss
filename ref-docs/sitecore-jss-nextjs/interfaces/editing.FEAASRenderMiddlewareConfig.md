[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / FEAASRenderMiddlewareConfig

# Interface: FEAASRenderMiddlewareConfig

[editing](../modules/editing.md).FEAASRenderMiddlewareConfig

Configuration for `FEAASRenderMiddleware`.

## Table of contents

### Properties

- [pageUrl](editing.FEAASRenderMiddlewareConfig.md#pageurl)

## Properties

### pageUrl

• `Optional` **pageUrl**: `string`

Defines FEAAS page route to render.
This may be necessary for certain custom Next.js routing configurations.

**`Default`**

```ts
/feaas/render
```

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:16](https://github.com/Sitecore/jss/blob/93e2925da/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L16)
