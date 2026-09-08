[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / tryParseEnvValue

# Function: tryParseEnvValue()

> **tryParseEnvValue**\<`T`\>(`envValue`, `defaultValue`): `T`

Defined in: [packages/sitecore-jss/src/utils/env.ts:7](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/utils/env.ts#L7)

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
