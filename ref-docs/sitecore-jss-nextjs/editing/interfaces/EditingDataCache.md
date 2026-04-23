[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataCache

# Interface: EditingDataCache

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:10](https://github.com/Sitecore/jss/blob/de5a366b5c64e694b6838ed9bfcd3f3d778e5453/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L10)

Defines an editing data cache implementation

## Methods

### get()

> **get**(`key`): `Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/de5a366b5c64e694b6838ed9bfcd3f3d778e5453/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L12)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/de5a366b5c64e694b6838ed9bfcd3f3d778e5453/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>
