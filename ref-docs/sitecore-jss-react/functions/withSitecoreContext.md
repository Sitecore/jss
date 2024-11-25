[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withSitecoreContext

# Function: withSitecoreContext()

> **withSitecoreContext**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

## Parameters

• **options?**: [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md)

## Returns

`Function`

### Type Parameters

• **ComponentProps** *extends* [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)

### Parameters

• **Component**: `ComponentType`\<`ComponentProps`\>

### Returns

`Function`

#### Parameters

• **props**: [`EnhancedOmit`](../type-aliases/EnhancedOmit.md)\<`ComponentProps`, keyof [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)\>

#### Returns

`Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L24)
