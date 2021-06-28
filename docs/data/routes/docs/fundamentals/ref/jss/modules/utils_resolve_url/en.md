---
name: utils_resolve_url
routeTemplate: ./data/component-templates/article.yml
title: utils_resolve_url
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / utils/resolve-url

# Module: utils/resolve-url

## Table of contents

### Functions

- [default](/docs/fundamentals/ref/jss/modules/utils_resolve_url#default)

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
