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

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L24)
