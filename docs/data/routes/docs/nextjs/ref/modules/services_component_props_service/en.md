---
name: services_component_props_service
routeTemplate: ./data/component-templates/article.yml
title: services_component_props_service
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / services/component-props-service

# Module: services/component-props-service

## Table of contents

### Classes

- [ComponentPropsService](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice)

### Type aliases

- [ComponentPropsRequest](/docs/nextjs/ref/modules/services_component_props_service#componentpropsrequest)
- [FetchComponentPropsArguments](/docs/nextjs/ref/modules/services_component_props_service#fetchcomponentpropsarguments)

## Type aliases

### ComponentPropsRequest

Ƭ **ComponentPropsRequest**<`NextContext`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `context` | `NextContext` |
| `fetch` | [`ComponentPropsFetchFunction`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropsfetchfunction)<`NextContext`\> |
| `layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) |
| `rendering` | [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) |

___

### FetchComponentPropsArguments

Ƭ **FetchComponentPropsArguments**<`NextContext`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `componentModule` | [`ComponentModule`](/docs/nextjs/ref/modules/sharedtypes_component_module#componentmodule) |
| `context` | `NextContext` |
| `layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) |
