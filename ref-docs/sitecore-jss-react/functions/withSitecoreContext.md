[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withSitecoreContext

# Function: withSitecoreContext()

> **withSitecoreContext**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options`? | [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md) |  |

## Returns

`Function`

### Type Parameters

| Type Parameter |
| ------ |
| `ComponentProps` *extends* [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `Component` | `ComponentType`\<`ComponentProps`\> |

### Returns

`Function`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`EnhancedOmit`](../type-aliases/EnhancedOmit.md)\<`ComponentProps`, keyof [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)\> |

#### Returns

`Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/7cd5f70c820c608aacd9a5de16ad48fc06c34c15/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L24)
