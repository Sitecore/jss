[**@sitecore-jss/sitecore-jss-react**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-react](../../../../README.md) / [mediaApi](../README.md) / findEditorImageTag

# Variable: findEditorImageTag()

> `const` **findEditorImageTag**: (`editorMarkup`) => \{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

Defined in: packages/sitecore-jss/types/media/media-api.d.ts:6

Makes a request to Sitecore Content Service for the specified item path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `editorMarkup` | `string` | the markup to parse |

## Returns

\{ `attrs`: \{\[`key`: `string`\]: `string`; \}; `imgTag`: `string`; \} \| `null`

found image tag; null in case if not found
