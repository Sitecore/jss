[**@sitecore-jss/sitecore-jss-react-native**](../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-native](../../../README.md) / [mediaApi](../README.md) / updateImageUrl

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

• **params?**

The querystring parameters to use

• **mediaUrlPrefix?**: `RegExp`

The regex to match the media URL prefix

## Returns

`string`

The prepared URL

## Defined in

sitecore-jss/types/media/media-api.d.ts:45
