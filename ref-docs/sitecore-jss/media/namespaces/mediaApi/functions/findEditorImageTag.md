[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / findEditorImageTag

# Function: findEditorImageTag()

> **findEditorImageTag**(`editorMarkup`): `null` \| \{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \}

Defined in: [packages/sitecore-jss/src/media/media-api.ts:18](https://github.com/Sitecore/jss/blob/acb13458cc95b12de1f5d960ac1e6ac99235cb23/packages/sitecore-jss/src/media/media-api.ts#L18)

Makes a request to Sitecore Content Service for the specified item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `editorMarkup` | `string` | the markup to parse |

## Returns

`null` \| \{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \}

found image tag; null in case if not found
