[**@sitecore-jss/sitecore-jss**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / updateImageUrl

# Function: updateImageUrl()

> **updateImageUrl**(`url`, `params`?, `mediaUrlPrefix`?): `string`

Prepares a Sitecore media URL with `params` for use by the JSS media handler.
This is done by replacing `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Provided `params` are used as the querystring parameters for the media URL.
Can use `mediaUrlPrefix` in order to use a custom prefix.
If no `params` are sent, the original media URL is returned.

## Parameters

• **url**: `string`

The URL to prepare

• **params?**: `null` \| `object`

The querystring parameters to use

• **mediaUrlPrefix?**: `RegExp` = `mediaUrlPrefixRegex`

The regex to match the media URL prefix

## Returns

`string`

The prepared URL

## Defined in

[packages/sitecore-jss/src/media/media-api.ts:83](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/media/media-api.ts#L83)
