[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedDictionaryServiceOptions

# Interface: DisconnectedDictionaryServiceOptions

## Properties

### customizeDictionary()?

> `optional` **customizeDictionary**: (`finalDictionary`, `rawDictionary`, `currentManifest`, `request`?, `response`?) => `DictionaryServiceOutput`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `finalDictionary` | `DictionaryServiceOutput` |
| `rawDictionary` | `any` |
| `currentManifest` | [`ManifestInstance`](ManifestInstance.md) |
| `request`? | `any` |
| `response`? | `any` |

#### Returns

`DictionaryServiceOutput`

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)

***

### manifest

> **manifest**: [`ManifestInstance`](ManifestInstance.md)

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)

***

### manifestLanguageChangeCallback()?

> `optional` **manifestLanguageChangeCallback**: (`language`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)
