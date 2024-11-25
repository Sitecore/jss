[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withPlaceholder

# Function: withPlaceholder()

> **withPlaceholder**(`placeholders`, `options`?): (`WrappedComponent`) => (`props`) => `Element`

## Parameters

• **placeholders**: `WithPlaceholderSpec`

• **options?**: `WithPlaceholderOptions`

## Returns

`Function`

### Parameters

• **WrappedComponent**: `ComponentClass`\<`PlaceholderProps`, `any`\> \| `FunctionComponent`\<`PlaceholderProps`\>

### Returns

`Function`

#### Parameters

• **props**: [`EnhancedOmit`](../type-aliases/EnhancedOmit.md)\<`PlaceholderProps`, keyof [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)\>

#### Returns

`Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx:46](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx#L46)
