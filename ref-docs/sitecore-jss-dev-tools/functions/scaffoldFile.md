[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / scaffoldFile

# Function: scaffoldFile()

> **scaffoldFile**(`filePath`, `fileContent`): `null` \| `string`

Defined in: [sitecore-jss-dev-tools/src/templating/scaffold.ts:22](https://github.com/Sitecore/jss/blob/4de6d9f2ab3a900511e90205b1b0a32718b97204/packages/sitecore-jss-dev-tools/src/templating/scaffold.ts#L22)

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
