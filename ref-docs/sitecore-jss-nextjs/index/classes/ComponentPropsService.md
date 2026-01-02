[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / ComponentPropsService

# Class: ComponentPropsService

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:31](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L31)

## Constructors

### Constructor

> **new ComponentPropsService**(): `ComponentPropsService`

#### Returns

`ComponentPropsService`

## Methods

### collectRequests()

> `protected` **collectRequests**\<`NextContext`\>(`params`): `Promise`\<`ComponentPropsRequest`\<`NextContext`\>[]\>

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:115](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L115)

Go through layout service data, check all renderings using displayName, which should make some side effects.
Write result in requests variable

#### Type Parameters

| Type Parameter |
| ------ |
| `NextContext` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `context`: `NextContext`; `fetchFunctionFactory`: `FetchFunctionFactory`\<`NextContext`\>; `layoutData`: [`LayoutServiceData`](../interfaces/LayoutServiceData.md); `placeholders?`: [`PlaceholdersData`](../type-aliases/PlaceholdersData.md); `requests?`: `ComponentPropsRequest`\<`NextContext`\>[]; \} | params |
| `params.context` | `NextContext` |  |
| `params.fetchFunctionFactory` | `FetchFunctionFactory`\<`NextContext`\> |  |
| `params.layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) |  |
| `params.placeholders?` | [`PlaceholdersData`](../type-aliases/PlaceholdersData.md) |  |
| `params.requests?` | `ComponentPropsRequest`\<`NextContext`\>[] |  |

#### Returns

`Promise`\<`ComponentPropsRequest`\<`NextContext`\>[]\>

array of requests

***

### execRequests()

> `protected` **execRequests**\<`NextContext`\>(`requests`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:163](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L163)

Execute request for component props

#### Type Parameters

| Type Parameter |
| ------ |
| `NextContext` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `requests` | `ComponentPropsRequest`\<`NextContext`\>[] | requests |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

requests result

***

### fetchComponentProps()

> `protected` **fetchComponentProps**\<`NextContext`\>(`fetchFunctionFactory`, `layoutData`, `context`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:88](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L88)

Traverse Layout Service data tree and call side effects on component level.
Side effect function can be: getStaticProps (SSG) or getServerSideProps (SSR)

#### Type Parameters

| Type Parameter |
| ------ |
| `NextContext` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fetchFunctionFactory` | `FetchFunctionFactory`\<`NextContext`\> | fetch function factory |
| `layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) | layout data |
| `context` | `NextContext` | next context |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

component props

***

### fetchServerSideComponentProps()

> **fetchServerSideComponentProps**(`params`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:38](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L38)

SSR mode
Fetch component props using getServerSideProps function

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `FetchComponentPropsArguments`\<`GetServerSidePropsContext`\> | fetch params |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

props

***

### fetchStaticComponentProps()

> **fetchStaticComponentProps**(`params`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:62](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L62)

SSG mode
Fetch component props using getStaticProps function

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `FetchComponentPropsArguments`\<`GetStaticPropsContext`\> | fetch arguments |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

props

***

### flatRenderings()

> `protected` **flatRenderings**(`placeholders`): [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>[]

Defined in: [sitecore-jss-nextjs/src/services/component-props-service.ts:217](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L217)

Take renderings from all placeholders and returns a flat array of renderings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `placeholders` | [`PlaceholdersData`](../type-aliases/PlaceholdersData.md) | placeholders |

#### Returns

[`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>[]

renderings

#### Example

```ts
const placeholders = {
   x1: [{ uid: 1 }, { uid: 2 }],
   x2: [{ uid: 11 }, { uid: 22 }]
}

flatRenderings(placeholders);

RESULT: [{ uid: 1 }, { uid: 2 }, { uid: 11 }, { uid: 22 }]
```
