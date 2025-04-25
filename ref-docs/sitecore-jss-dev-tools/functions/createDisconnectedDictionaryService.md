[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedDictionaryService

# Function: createDisconnectedDictionaryService()

> **createDisconnectedDictionaryService**(`__namedParameters`): `object`

## Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`DisconnectedDictionaryServiceOptions`](../interfaces/DisconnectedDictionaryServiceOptions.md) |

## Returns

`object`

### middleware()

> **middleware**: (`request`, `response`) => `Promise`\<`void`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `any` |
| `response` | `any` |

#### Returns

`Promise`\<`void`\>

### updateManifest()

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newManifest` | [`ManifestInstance`](../interfaces/ManifestInstance.md) |

#### Returns

`void`

## Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/ba3fd744ad70b8c25b046dee6c203dc708cd1f8b/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)
