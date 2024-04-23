[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedDictionaryServiceOptions

# Interface: DisconnectedDictionaryServiceOptions

## Table of contents

### Properties

- [customizeDictionary](DisconnectedDictionaryServiceOptions.md#customizedictionary)
- [manifest](DisconnectedDictionaryServiceOptions.md#manifest)
- [manifestLanguageChangeCallback](DisconnectedDictionaryServiceOptions.md#manifestlanguagechangecallback)

## Properties

### customizeDictionary

• `Optional` **customizeDictionary**: (`finalDictionary`: `DictionaryServiceOutput`, `rawDictionary`: `any`, `currentManifest`: [`ManifestInstance`](ManifestInstance.md), `request?`: `any`, `response?`: `any`) => `DictionaryServiceOutput`

#### Type declaration

▸ (`finalDictionary`, `rawDictionary`, `currentManifest`, `request?`, `response?`): `DictionaryServiceOutput`

##### Parameters

| Name | Type |
| :------ | :------ |
| `finalDictionary` | `DictionaryServiceOutput` |
| `rawDictionary` | `any` |
| `currentManifest` | [`ManifestInstance`](ManifestInstance.md) |
| `request?` | `any` |
| `response?` | `any` |

##### Returns

`DictionaryServiceOutput`

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/0fdefd685/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)

___

### manifest

• **manifest**: [`ManifestInstance`](ManifestInstance.md)

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/0fdefd685/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)

___

### manifestLanguageChangeCallback

• `Optional` **manifestLanguageChangeCallback**: (`language`: `string`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

#### Type declaration

▸ (`language`): `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

##### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/0fdefd685/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)
