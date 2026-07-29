[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / resolveUrl

# Function: resolveUrl()

> **resolveUrl**(`urlBase`, `params?`): `string`

Defined in: [packages/sitecore-jss/src/utils/utils.ts:34](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss/src/utils/utils.ts#L34)

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlBase` | `string` | the base URL that may contain query string parameters |
| `params` | `ParsedUrlQueryInput` | query string parameters |

## Returns

`string`

a URL string

## Throws

if the provided url is an empty string
