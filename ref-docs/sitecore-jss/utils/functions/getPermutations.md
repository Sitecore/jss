[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / getPermutations

# Function: getPermutations()

> **getPermutations**(`array`): [`string`, `string`][][]

Generates all possible permutations of an array of key-value pairs.
This is used to create every possible combination of URL query parameters.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | [`string`, `string`][] | The array of key-value pairs to permute. |

## Returns

[`string`, `string`][][]

- A 2D array where each inner array is a unique permutation of the input.

## Defined in

[packages/sitecore-jss/src/utils/utils.ts:170](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/utils/utils.ts#L170)
