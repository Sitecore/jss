[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / scaffoldFile

# Function: scaffoldFile()

> **scaffoldFile**(`filePath`, `fileContent`): `null` \| `string`

Defined in: [sitecore-jss-dev-tools/src/templating/scaffold.ts:22](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/templating/scaffold.ts#L22)

Creates a file relative to the specified path if the file doesn't exist.
Creates directories as needed.
Does not overwrite existing files.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | `string` | the file path |
| `fileContent` | `string` | the file content |

## Returns

`null` \| `string`

the file path if the file was created, otherwise null
