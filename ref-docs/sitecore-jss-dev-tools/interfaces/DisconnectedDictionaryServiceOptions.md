[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedDictionaryServiceOptions

# Interface: DisconnectedDictionaryServiceOptions

## Table of contents

### Properties

- [manifest](DisconnectedDictionaryServiceOptions.md#manifest)

### Methods

- [customizeDictionary](DisconnectedDictionaryServiceOptions.md#customizedictionary)
- [manifestLanguageChangeCallback](DisconnectedDictionaryServiceOptions.md#manifestlanguagechangecallback)

## Properties

### manifest

• **manifest**: [`ManifestInstance`](ManifestInstance.md)

#### Defined in

[disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)

## Methods

### customizeDictionary

▸ `Optional` **customizeDictionary**(`finalDictionary`, `rawDictionary`, `currentManifest`, `request?`, `response?`): `DictionaryServiceOutput`

#### Parameters

| Name | Type |
| :------ | :------ |
| `finalDictionary` | `DictionaryServiceOutput` |
| `rawDictionary` | `any` |
| `currentManifest` | [`ManifestInstance`](ManifestInstance.md) |
| `request?` | `any` |
| `response?` | `any` |

#### Returns

`DictionaryServiceOutput`

#### Defined in

[disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)

___

### manifestLanguageChangeCallback

▸ `Optional` **manifestLanguageChangeCallback**(`language`): `Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)
