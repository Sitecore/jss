[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / EnhancedOmit

# Type Alias: EnhancedOmit\<T, K\>

> **EnhancedOmit**\<`T`, `K`\>: `{ [P in keyof T as Exclude<P, K>]: T[P] }`

Omit properties from T that are in K. This is a simplified version of TypeScript's built-in `Omit` utility type.
Since default `Omit` doesn't support indexing types, we had to introduce this custom implementation.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `K` *extends* `PropertyKey` |

## Defined in

[packages/sitecore-jss/src/utils/utils.ts:11](https://github.com/Sitecore/jss/blob/3aae2e35053278731eae58b2f4fd233b24ef9bc0/packages/sitecore-jss/src/utils/utils.ts#L11)
