[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / withSitecoreContext

# Function: withSitecoreContext()

> **withSitecoreContext**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `React.JSX.Element`

## Parameters

• **options?**: [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md)

## Returns

`Function`

### Type Parameters

• **ComponentProps** *extends* [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)

### Parameters

• **Component**: `React.ComponentType`\<`ComponentProps`\>

### Returns

`Function`

#### Parameters

• **props**: `EnhancedOmit`\<`ComponentProps`, keyof [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)\>

#### Returns

`React.JSX.Element`

## Defined in

sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:16
