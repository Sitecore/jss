[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / fetchFEaaSComponentServerProps

# Function: fetchFEaaSComponentServerProps()

> **fetchFEaaSComponentServerProps**(`params`, `pageState`?, `endpointOverride`?): `Promise`\<[`FEaaSComponentProps`](../type-aliases/FEaaSComponentProps.md)\>

Fetches server component props required for server rendering, based on rendering params.
Component endpoint will either be retrieved from params or from endpointOverride

## Parameters

• **params**: [`FEaaSComponentParams`](../type-aliases/FEaaSComponentParams.md)

component params

• **pageState?**: [`LayoutServicePageState`](../enumerations/LayoutServicePageState.md)

page state to determine which component variant to use

• **endpointOverride?**: `string`

optional override for component endpoint

## Returns

`Promise`\<[`FEaaSComponentProps`](../type-aliases/FEaaSComponentProps.md)\>

## Defined in

sitecore-jss-react/types/components/FEaaSComponent.d.ts:63
