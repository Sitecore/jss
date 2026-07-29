[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / generateToFile

# Function: generateToFile()

> **generateToFile**(`config`): `Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

Defined in: [manifest/generator/generate.ts:214](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-dev-tools/src/manifest/generator/generate.ts#L214)

generates a JSON manifest and writes its contents to a directory. Media referenced in the manifest
is also copied to the directory.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `GenerateToFileOptions` | - |

## Returns

`Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>
