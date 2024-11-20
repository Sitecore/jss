[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / withDatasourceCheck

# Function: withDatasourceCheck()

> **withDatasourceCheck**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `React.JSX.Element`

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

## Parameters

• **options?**: `WithDatasourceCheckOptions`

## Returns

`Function`

The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

### Type Parameters

• **ComponentProps** *extends* `WithDatasourceCheckProps`

### Parameters

• **Component**: `React.ComponentType`\<`ComponentProps`\>

### Returns

`Function`

#### Parameters

• **props**: `ComponentProps`

#### Returns

`React.JSX.Element`

## Defined in

sitecore-jss-react/types/enhancers/withDatasourceCheck.d.ts:22
