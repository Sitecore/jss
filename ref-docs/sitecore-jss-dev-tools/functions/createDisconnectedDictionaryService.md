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

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/a15efa5d093b942bf15d369c501495a2d7251cd3/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)
