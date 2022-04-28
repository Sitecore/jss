[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / ComponentPropsService

# Class: ComponentPropsService

[index](../modules/index.md).ComponentPropsService

## Table of contents

### Constructors

- [constructor](index.ComponentPropsService.md#constructor)

### Methods

- [collectRequests](index.ComponentPropsService.md#collectrequests)
- [execRequests](index.ComponentPropsService.md#execrequests)
- [fetchComponentProps](index.ComponentPropsService.md#fetchcomponentprops)
- [fetchServerSideComponentProps](index.ComponentPropsService.md#fetchserversidecomponentprops)
- [fetchStaticComponentProps](index.ComponentPropsService.md#fetchstaticcomponentprops)
- [flatRenderings](index.ComponentPropsService.md#flatrenderings)

## Constructors

### constructor

• **new ComponentPropsService**()

## Methods

### collectRequests

▸ `Protected` **collectRequests**<`NextContext`\>(`params`): `Promise`<`ComponentPropsRequest`<`NextContext`\>[]\>

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
| `params.requests?` | `ComponentPropsRequest`<`NextContext`\>[] |  |

#### Returns

`Promise`<`ComponentPropsRequest`<`NextContext`\>[]\>

array of requests

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:115](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L115)

___

### execRequests

▸ `Protected` **execRequests**<`NextContext`\>(`requests`): `Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

Execute request for component props

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requests` | `ComponentPropsRequest`<`NextContext`\>[] | requests |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

requests result

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:163](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L163)

___

### fetchComponentProps

▸ `Protected` **fetchComponentProps**<`NextContext`\>(`fetchFunctionFactory`, `layoutData`, `context`): `Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

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

`Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

component props

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:88](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L88)

___

### fetchServerSideComponentProps

▸ **fetchServerSideComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

SSR mode
Fetch component props using getServerSideProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `FetchComponentPropsArguments`<`GetServerSidePropsContext`<`ParsedUrlQuery`, `PreviewData`\>\> | fetch params |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

props

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:38](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L38)

___

### fetchStaticComponentProps

▸ **fetchStaticComponentProps**(`params`): `Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

SSG mode
Fetch component props using getStaticProps function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `FetchComponentPropsArguments`<`GetStaticPropsContext`<`ParsedUrlQuery`, `PreviewData`\>\> | fetch arguments |

#### Returns

`Promise`<[`ComponentPropsCollection`](../modules/index.md#componentpropscollection)\>

props

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:62](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L62)

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

[sitecore-jss-nextjs/src/services/component-props-service.ts:216](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L216)
