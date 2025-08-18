[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedDictionaryServiceOptions

# Interface: DisconnectedDictionaryServiceOptions

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:31](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L31)

## Properties

### customizeDictionary()?

> `optional` **customizeDictionary**: (`finalDictionary`, `rawDictionary`, `currentManifest`, `request?`, `response?`) => `DictionaryServiceOutput`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `finalDictionary` | `DictionaryServiceOutput` |
| `rawDictionary` | `any` |
| `currentManifest` | [`ManifestInstance`](ManifestInstance.md) |
| `request?` | `any` |
| `response?` | `any` |

#### Returns

`DictionaryServiceOutput`

***

### manifest

> **manifest**: [`ManifestInstance`](ManifestInstance.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)

***

### manifestLanguageChangeCallback()?

> `optional` **manifestLanguageChangeCallback**: (`language`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>
