[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [services/component-props-service](../modules/services_component_props_service.md) / ComponentPropsService

# Class: ComponentPropsService

[services/component-props-service](../modules/services_component_props_service.md).ComponentPropsService

## Table of contents

### Constructors

- [constructor](services_component_props_service.ComponentPropsService.md#constructor)

### Methods

- [collectRequests](services_component_props_service.ComponentPropsService.md#collectrequests)
- [execRequests](services_component_props_service.ComponentPropsService.md#execrequests)
- [fetchComponentProps](services_component_props_service.ComponentPropsService.md#fetchcomponentprops)
- [fetchServerSideComponentProps](services_component_props_service.ComponentPropsService.md#fetchserversidecomponentprops)
- [fetchStaticComponentProps](services_component_props_service.ComponentPropsService.md#fetchstaticcomponentprops)
- [flatRenderings](services_component_props_service.ComponentPropsService.md#flatrenderings)

## Constructors

### constructor

• **new ComponentPropsService**()

## Methods

### collectRequests

▸ `Protected` **collectRequests**<`NextContext`\>(`params`): [`ComponentPropsRequest`](../modules/services_component_props_service.md#componentpropsrequest)<`NextContext`\>[]

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
| `params.layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |  |
| `params.placeholders?` | [`PlaceholdersData`](../modules/index.md#placeholdersdata)<`string`\> | - |
| `params.requests?` | [`ComponentPropsRequest`](../modules/services_component_props_service.md#componentpropsrequest)<`NextContext`\>[] |  |

#### Returns

[`ComponentPropsRequest`](../modules/services_component_props_service.md#componentpropsrequest)<`NextContext`\>[]

array of requests

#### Defined in

[src/services/component-props-service.ts:115](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L115)

___

### execRequests

▸ `Protected` **execRequests**<`NextContext`\>(`requests`): `Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

Execute request for component props

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | [`ComponentPropsRequest`](../modules/services_component_props_service.md#componentpropsrequest)<`NextContext`\>[] | requests |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

requests result

#### Defined in

[src/services/component-props-service.ts:161](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L161)

___

### fetchComponentProps

▸ `Protected` **fetchComponentProps**<`NextContext`\>(`fetchFunctionFactory`, `layoutData`, `context`): `Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

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
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) | layout data |
| `context` | `NextContext` | next context |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

component props

#### Defined in

[src/services/component-props-service.ts:88](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L88)

___

### fetchServerSideComponentProps

▸ **fetchServerSideComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

SSR mode
Fetch component props using getServerSideProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FetchComponentPropsArguments`](../modules/services_component_props_service.md#fetchcomponentpropsarguments)<`GetServerSidePropsContext`<`ParsedUrlQuery`\>\> | fetch params |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

props

#### Defined in

[src/services/component-props-service.ts:38](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L38)

___

### fetchStaticComponentProps

▸ **fetchStaticComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

SSG mode
Fetch component props using getStaticProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FetchComponentPropsArguments`](../modules/services_component_props_service.md#fetchcomponentpropsarguments)<`GetStaticPropsContext`<`ParsedUrlQuery`\>\> | fetch arguments |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/sharedTypes_component_props.md#componentpropscollection)\>

props

#### Defined in

[src/services/component-props-service.ts:62](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L62)

___

### flatRenderings

▸ `Protected` **flatRenderings**(`placeholders`): [`ComponentRendering`](../interfaces/index.ComponentRendering.md)[]

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
| `placeholders` | [`PlaceholdersData`](../modules/index.md#placeholdersdata)<`string`\> | placeholders |

#### Returns

[`ComponentRendering`](../interfaces/index.ComponentRendering.md)[]

renderings

#### Defined in

[src/services/component-props-service.ts:214](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L214)
