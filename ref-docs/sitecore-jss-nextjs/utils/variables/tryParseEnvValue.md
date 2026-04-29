[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [utils](../README.md) / tryParseEnvValue

# Variable: tryParseEnvValue()

> `const` **tryParseEnvValue**: \<`T`\>(`envValue`, `defaultValue`) => `T`

Defined in: sitecore-jss/types/utils/env.d.ts:7

Method to parse JSON-formatted environment variables

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `envValue` | `string` \| `undefined` | can be undefined when providing values via process.env |
| `defaultValue` | `T` | default value |

## Returns

`T`

parsed value
