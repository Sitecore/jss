[**@sitecore-jss/sitecore-jss-react-native**](../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-native](../../../README.md) / [mediaApi](../README.md) / replaceMediaUrlPrefix

# Function: replaceMediaUrlPrefix()

> **replaceMediaUrlPrefix**(`url`, `mediaUrlPrefix`?): `string`

Replace `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Can use `mediaUrlPrefix` in order to use a custom prefix.

## Parameters

• **url**: `string`

The URL to replace the media URL prefix in

• **mediaUrlPrefix?**: `RegExp`

The regex to match the media URL prefix

## Returns

`string`

The URL with the media URL prefix replaced

## Defined in

sitecore-jss/types/media/media-api.d.ts:33
