[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / scaffoldFile

# Function: scaffoldFile()

> **scaffoldFile**(`filePath`, `fileContent`): `string` \| `null`

Creates a file relative to the specified path if the file doesn't exist.
Creates directories as needed.
Does not overwrite existing files.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filePath` | `string` | the file path |
| `fileContent` | `string` | the file content |

## Returns

`string` \| `null`

the file path if the file was created, otherwise null

## Defined in

[sitecore-jss-dev-tools/src/templating/scaffold.ts:22](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/templating/scaffold.ts#L22)
