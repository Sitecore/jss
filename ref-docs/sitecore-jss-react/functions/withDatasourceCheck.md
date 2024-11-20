[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withDatasourceCheck

# Function: withDatasourceCheck()

> **withDatasourceCheck**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

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

• **Component**: `ComponentType`\<`ComponentProps`\>

### Returns

`Function`

#### Parameters

• **props**: `ComponentProps`

#### Returns

`Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)
