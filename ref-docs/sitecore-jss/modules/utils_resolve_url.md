[Sitecore JavaScript Rendering SDK](../README.md) / utils/resolve-url

# Module: utils/resolve-url

## Table of contents

### Functions

- [default](utils_resolve_url.md#default)

## Functions

### default

▸ **default**(`urlBase`, `params?`): `string`

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

**`throws`** {RangeError} if the provided url is an empty string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlBase` | `string` | the base URL that may contain query string parameters |
| `params` | `querystring.ParsedUrlQueryInput` | query string parameters |

#### Returns

`string`

a URL string

#### Defined in

[utils/resolve-url.ts:24](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/utils/resolve-url.ts#L24)
