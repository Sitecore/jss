[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / generateToVariable

# Function: generateToVariable()

> **generateToVariable**(`config`): `Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/generate.ts:172](https://github.com/Sitecore/jss/blob/80d93a2e62b243e152665d4c3a9018283b8fd469/packages/sitecore-jss-dev-tools/src/manifest/generator/generate.ts#L172)

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
