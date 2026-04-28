[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedDictionaryServiceOptions

# Interface: DisconnectedDictionaryServiceOptions

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:31](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L31)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:31](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L31)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### customizeDictionary?

> `optional` **customizeDictionary?**: (`finalDictionary`, `rawDictionary`, `currentManifest`, `request?`, `response?`) => `DictionaryServiceOutput`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### manifestLanguageChangeCallback?

> `optional` **manifestLanguageChangeCallback?**: (`language`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L39)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>
