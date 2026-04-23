[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withDatasourceCheck

# Function: withDatasourceCheck()

> **withDatasourceCheck**(`options?`): \<`ComponentProps`\>(`Component`) => (`props`) => `Element`

Defined in: [packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/de5a366b5c64e694b6838ed9bfcd3f3d778e5453/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `WithDatasourceCheckOptions` | - |

## Returns

The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

\<`ComponentProps`\>(`Component`) => (`props`) => `Element`
