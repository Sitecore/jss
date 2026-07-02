[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / isRegexOrUrl

# Function: isRegexOrUrl()

> **isRegexOrUrl**(`input`): `"url"` \| `"regex"`

Defined in: [packages/sitecore-jss/src/utils/utils.ts:162](https://github.com/Sitecore/jss/blob/339481bc59517cc51440ad39494433cdc1a21511/packages/sitecore-jss/src/utils/utils.ts#L162)

Determines whether the given input is a regular expression or resembles a URL.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The input string to evaluate. |

## Returns

`"url"` \| `"regex"`

- Returns 'url' if the input looks like a URL, otherwise 'regex'.
