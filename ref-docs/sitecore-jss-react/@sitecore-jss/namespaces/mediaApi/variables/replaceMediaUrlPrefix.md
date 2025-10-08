[**@sitecore-jss/sitecore-jss-react**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-react](../../../../README.md) / [mediaApi](../README.md) / replaceMediaUrlPrefix

# Variable: replaceMediaUrlPrefix()

> `const` **replaceMediaUrlPrefix**: (`url`, `mediaUrlPrefix?`) => `string`

Defined in: packages/sitecore-jss/types/media/media-api.d.ts:33

Replace `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Can use `mediaUrlPrefix` in order to use a custom prefix.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to replace the media URL prefix in |
| `mediaUrlPrefix?` | `RegExp` | The regex to match the media URL prefix |

## Returns

`string`

The URL with the media URL prefix replaced
