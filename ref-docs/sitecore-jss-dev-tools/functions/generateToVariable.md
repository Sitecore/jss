[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / generateToVariable

# Function: generateToVariable()

> **generateToVariable**(`config`): `Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

generates the JSON manifest and returns it as a variable
NOTE: media is not copied into the manifest when using this method,
and no files are written to disk. Use generateToFile() to make a manifest
that is designed to get packaged/imported.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `GenerateOptions` |  |

## Returns

`Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

## Defined in

[sitecore-jss-dev-tools/src/manifest/generator/generate.ts:173](https://github.com/Sitecore/jss/blob/856dc4f92242c60f55f8d81552010771c7f8647c/packages/sitecore-jss-dev-tools/src/manifest/generator/generate.ts#L173)
