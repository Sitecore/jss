---
name: layout_models
routeTemplate: ./data/component-templates/article.yml
title: layout_models
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / layout/models

# Module: layout/models

## Table of contents

### Enumerations

- [LayoutServicePageState](/docs/fundamentals/ref/jss/enums/layout_models/layoutservicepagestate)

### Interfaces

- [ComponentFields](/docs/fundamentals/ref/jss/interfaces/layout_models/componentfields)
- [ComponentParams](/docs/fundamentals/ref/jss/interfaces/layout_models/componentparams)
- [ComponentRendering](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering)
- [Field](/docs/fundamentals/ref/jss/interfaces/layout_models/field)
- [HtmlElementRendering](/docs/fundamentals/ref/jss/interfaces/layout_models/htmlelementrendering)
- [Item](/docs/fundamentals/ref/jss/interfaces/layout_models/item)
- [LayoutServiceContext](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext)
- [LayoutServiceContextData](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontextdata)
- [LayoutServiceData](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)
- [PlaceholderData](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)
- [RouteData](/docs/fundamentals/ref/jss/interfaces/layout_models/routedata)

### Type aliases

- [GenericFieldValue](/docs/fundamentals/ref/jss/modules/layout_models#genericfieldvalue)
- [PlaceholdersData](/docs/fundamentals/ref/jss/modules/layout_models#placeholdersdata)

## Type aliases

### GenericFieldValue

Ƭ **GenericFieldValue**: `string` \| `boolean` \| `number` \| { [key: string]: `unknown`;  } \| { [key: string]: `unknown`;  }[]

Field value data on a component

___

### PlaceholdersData

Ƭ **PlaceholdersData**<`TYPEDNAME`\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[]}

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string``string` |
