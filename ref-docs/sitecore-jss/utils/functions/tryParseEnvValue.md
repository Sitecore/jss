[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / tryParseEnvValue

# Function: tryParseEnvValue()

> **tryParseEnvValue**\<`T`\>(`envValue`, `defaultValue`): `T`

Defined in: [packages/sitecore-jss/src/utils/env.ts:7](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss/src/utils/env.ts#L7)

Method to parse JSON-formatted environment variables

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `envValue` | `undefined` \| `string` | can be undefined when providing values via process.env |
| `defaultValue` | `T` | default value |

## Returns

`T`

parsed value
