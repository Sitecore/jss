[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / updateImageUrl

# Function: updateImageUrl()

> **updateImageUrl**(`url`, `params?`, `mediaUrlPrefix?`): `string`

Defined in: [packages/sitecore-jss/src/media/media-api.ts:83](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/media/media-api.ts#L83)

Prepares a Sitecore media URL with `params` for use by the JSS media handler.
This is done by replacing `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Provided `params` are used as the querystring parameters for the media URL.
Can use `mediaUrlPrefix` in order to use a custom prefix.
If no `params` are sent, the original media URL is returned.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `url` | `string` | `undefined` | The URL to prepare |
| `params?` | `null` \| \{\[`key`: `string`\]: `undefined` \| `string` \| `number`; \} | `undefined` | The querystring parameters to use |
| `mediaUrlPrefix?` | `RegExp` | `mediaUrlPrefixRegex` | The regex to match the media URL prefix |

## Returns

`string`

The prepared URL
