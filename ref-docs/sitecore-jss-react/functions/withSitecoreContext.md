[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withSitecoreContext

# Function: withSitecoreContext()

> **withSitecoreContext**(`options?`): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:29](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L29)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md) |  |

## Returns

> \<`ComponentProps`\>(`Component`): (`props`) => `Element`

### Type Parameters

| Type Parameter |
| ------ |
| `ComponentProps` *extends* [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `Component` | `ComponentType`\<`ComponentProps`\> |

### Returns

> (`props`): `Element`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`WithSitecoreContextHocProps`](../type-aliases/WithSitecoreContextHocProps.md)\<`ComponentProps`\> |

#### Returns

`Element`
