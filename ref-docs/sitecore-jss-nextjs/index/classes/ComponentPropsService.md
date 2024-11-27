[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / ComponentPropsService

# Class: ComponentPropsService

## Constructors

### new ComponentPropsService()

> **new ComponentPropsService**(): [`ComponentPropsService`](ComponentPropsService.md)

#### Returns

[`ComponentPropsService`](ComponentPropsService.md)

## Methods

### collectRequests()

> `protected` **collectRequests**\<`NextContext`\>(`params`): `Promise`\<`ComponentPropsRequest`\<`NextContext`\>[]\>

Go through layout service data, check all renderings using displayName, which should make some side effects.
Write result in requests variable

#### Type Parameters

| Type Parameter |
| ------ |
| `NextContext` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `object` | params |
| `params.context` | `NextContext` |  |
| `params.fetchFunctionFactory` | `FetchFunctionFactory`\<`NextContext`\> |  |
| `params.layoutData` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) |  |
| `params.placeholders`? | [`PlaceholdersData`](../type-aliases/PlaceholdersData.md) |  |
| `params.requests`? | `ComponentPropsRequest`\<`NextContext`\>[] |  |

#### Returns

`Promise`\<`ComponentPropsRequest`\<`NextContext`\>[]\>

array of requests

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:115](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L115)

***

### execRequests()

> `protected` **execRequests**\<`NextContext`\>(`requests`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:163](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L163)

***

### fetchComponentProps()

> `protected` **fetchComponentProps**\<`NextContext`\>(`fetchFunctionFactory`, `layoutData`, `context`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

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

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:88](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L88)

***

### fetchServerSideComponentProps()

> **fetchServerSideComponentProps**(`params`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

SSR mode
Fetch component props using getServerSideProps function

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `FetchComponentPropsArguments`\<`GetServerSidePropsContext`\> | fetch params |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

props

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:38](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L38)

***

### fetchStaticComponentProps()

> **fetchStaticComponentProps**(`params`): `Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

SSG mode
Fetch component props using getStaticProps function

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `FetchComponentPropsArguments`\<`GetStaticPropsContext`\> | fetch arguments |

#### Returns

`Promise`\<[`ComponentPropsCollection`](../type-aliases/ComponentPropsCollection.md)\>

props

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:62](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L62)

***

### flatRenderings()

> `protected` **flatRenderings**(`placeholders`): [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>[]

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

#### Defined in

[sitecore-jss-nextjs/src/services/component-props-service.ts:217](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L217)
