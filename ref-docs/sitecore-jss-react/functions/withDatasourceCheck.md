[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withDatasourceCheck

# Function: withDatasourceCheck()

> **withDatasourceCheck**(`options`?): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options`? | `WithDatasourceCheckOptions` |  |

## Returns

`Function`

The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

### Type Parameters

| Type Parameter |
| ------ |
| `ComponentProps` *extends* `WithDatasourceCheckProps` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `Component` | `ComponentType`\<`ComponentProps`\> |

### Returns

`Function`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `ComponentProps` |

#### Returns

`Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/8dfc30480738a6477e61c78f1cd69e312022dcef/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)
