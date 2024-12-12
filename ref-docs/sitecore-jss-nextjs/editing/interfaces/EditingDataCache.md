[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataCache

# Interface: EditingDataCache

Defines an editing data cache implementation

## Methods

### get()

> **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/79b72df335ab50517e6c3357c25dd7db1965274d/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L12)

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/79b72df335ab50517e6c3357c25dd7db1965274d/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L11)
