[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / findEditorImageTag

# Function: findEditorImageTag()

> **findEditorImageTag**(`editorMarkup`): \{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

Defined in: [packages/sitecore-jss/src/media/media-api.ts:18](https://github.com/Sitecore/jss/blob/80c29300efb14aa5d3f976572a1bdac104be1004/packages/sitecore-jss/src/media/media-api.ts#L18)

Makes a request to Sitecore Content Service for the specified item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `editorMarkup` | `string` | the markup to parse |

## Returns

\{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

found image tag; null in case if not found
