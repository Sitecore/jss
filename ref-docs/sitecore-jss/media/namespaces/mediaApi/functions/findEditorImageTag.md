[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / findEditorImageTag

# Function: findEditorImageTag()

> **findEditorImageTag**(`editorMarkup`): \{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

Defined in: [packages/sitecore-jss/src/media/media-api.ts:18](https://github.com/Sitecore/jss/blob/528a5c314410558456545441bea6e708690e5e01/packages/sitecore-jss/src/media/media-api.ts#L18)

Makes a request to Sitecore Content Service for the specified item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `editorMarkup` | `string` | the markup to parse |

## Returns

\{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

found image tag; null in case if not found
