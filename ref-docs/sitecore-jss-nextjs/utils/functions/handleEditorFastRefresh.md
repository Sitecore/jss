[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [utils](../README.md) / handleEditorFastRefresh

# Function: handleEditorFastRefresh()

> **handleEditorFastRefresh**(`forceReload`?): `void`

Since Sitecore editors do not support Fast Refresh:
1. Subscribe on events provided by webpack.
2. Reset editor chromes when build is finished

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `forceReload`? | `boolean` | `false` | force page reload instead of reset chromes |

## Returns

`void`

## Defined in

[sitecore-jss-nextjs/src/utils/utils.ts:32](https://github.com/Sitecore/jss/blob/a3f9b7b54a030838a28594f59d310fde477b83ba/packages/sitecore-jss-nextjs/src/utils/utils.ts#L32)
