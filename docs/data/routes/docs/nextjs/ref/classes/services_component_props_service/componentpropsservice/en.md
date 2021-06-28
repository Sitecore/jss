---
name: componentpropsservice
routeTemplate: ./data/component-templates/article.yml
title: componentpropsservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [services/component-props-service](/docs/nextjs/ref/modules/services_component_props_service) / ComponentPropsService

# Class: ComponentPropsService

[services/component-props-service](/docs/nextjs/ref/modules/services_component_props_service).ComponentPropsService

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#constructor)

### Methods

- [collectRequests](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#collectrequests)
- [execRequests](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#execrequests)
- [fetchComponentProps](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#fetchcomponentprops)
- [fetchServerSideComponentProps](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#fetchserversidecomponentprops)
- [fetchStaticComponentProps](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#fetchstaticcomponentprops)
- [flatRenderings](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice#flatrenderings)

## Constructors

### constructor

• **new ComponentPropsService**()

## Methods

### collectRequests

▸ `Protected` **collectRequests**<`NextContext`\>(`params`): `Promise`<[`ComponentPropsRequest`](/docs/nextjs/ref/modules/services_component_props_service#componentpropsrequest)<`NextContext`\>[]\>

Go through layout service data, check all renderings using displayName, which should make some side effects.
Write result in requests variable

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | params |
| `params.context` | `NextContext` |  |
| `params.fetchFunctionFactory` | `FetchFunctionFactory`<`NextContext`\> |  |
| `params.layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) |  |
| `params.placeholders?` | [`PlaceholdersData`](/docs/nextjs/ref/modules/index#placeholdersdata)<`string`\> | - |
| `params.requests?` | [`ComponentPropsRequest`](/docs/nextjs/ref/modules/services_component_props_service#componentpropsrequest)<`NextContext`\>[] |  |

#### Returns

`Promise`<[`ComponentPropsRequest`](/docs/nextjs/ref/modules/services_component_props_service#componentpropsrequest)<`NextContext`\>[]\>

array of requests

___

### execRequests

▸ `Protected` **execRequests**<`NextContext`\>(`requests`): `Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

Execute request for component props

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`ComponentPropsRequest`](/docs/nextjs/ref/modules/services_component_props_service#componentpropsrequest)<`NextContext`\>[] | requests |

#### Returns

`Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

requests result

___

### fetchComponentProps

▸ `Protected` **fetchComponentProps**<`NextContext`\>(`fetchFunctionFactory`, `layoutData`, `context`): `Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

Traverse Layout Service data tree and call side effects on component level.
Side effect function can be: getStaticProps (SSG) or getServerSideProps (SSR)

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchFunctionFactory` | `FetchFunctionFactory`<`NextContext`\> | fetch function factory |
| `layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) | layout data |
| `context` | `NextContext` | next context |

#### Returns

`Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

component props

___

### fetchServerSideComponentProps

▸ **fetchServerSideComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

SSR mode
Fetch component props using getServerSideProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FetchComponentPropsArguments`](/docs/nextjs/ref/modules/services_component_props_service#fetchcomponentpropsarguments)<`GetServerSidePropsContext`<`ParsedUrlQuery`\>\> | fetch params |

#### Returns

`Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

props

___

### fetchStaticComponentProps

▸ **fetchStaticComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

SSG mode
Fetch component props using getStaticProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FetchComponentPropsArguments`](/docs/nextjs/ref/modules/services_component_props_service#fetchcomponentpropsarguments)<`GetStaticPropsContext`<`ParsedUrlQuery`\>\> | fetch arguments |

#### Returns

`Promise`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

props

___

### flatRenderings

▸ `Protected` **flatRenderings**(`placeholders`): [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering)[]

Take renderings from all placeholders and returns a flat array of renderings.

**`example`**
const placeholders = {
   x1: [{ uid: 1 }, { uid: 2 }],
   x2: [{ uid: 11 }, { uid: 22 }]
}

flatRenderings(placeholders);

RESULT: [{ uid: 1 }, { uid: 2 }, { uid: 11 }, { uid: 22 }]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `placeholders` | [`PlaceholdersData`](/docs/nextjs/ref/modules/index#placeholdersdata)<`string`\> | placeholders |

#### Returns

[`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering)[]

renderings
