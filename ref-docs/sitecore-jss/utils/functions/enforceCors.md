[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / enforceCors

# Function: enforceCors()

> **enforceCors**(`req`, `res`, `allowedOrigins`?): `boolean`

Tests origin from incoming request against allowed origins list that can be
set in JSS's JSS_ALLOWED_ORIGINS env variable, passed via allowedOrigins param and/or
be already set in Access-Control-Allow-Origin by other logic.
Applies Access-Control-Allow-Origin and Access-Control-Allow-Methods on match
Also applies Access-Control-Allow-Headers for preflight requests

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `IncomingMessage` | incoming request |
| `res` | `OutgoingMessage`\<`IncomingMessage`\> | response to set CORS headers for |
| `allowedOrigins`? | `string`[] | additional list of origins to test against |

## Returns

`boolean`

true if incoming origin matches the allowed lists, false when it does not

## Defined in

[packages/sitecore-jss/src/utils/utils.ts:116](https://github.com/Sitecore/jss/blob/9430a13c8caaf891cbbe23c5ec29a556a732a8c3/packages/sitecore-jss/src/utils/utils.ts#L116)
