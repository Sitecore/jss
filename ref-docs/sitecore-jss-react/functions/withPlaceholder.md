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

[packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx:46](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx#L46)
