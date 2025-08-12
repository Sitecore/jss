[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedDictionaryService

# Function: createDisconnectedDictionaryService()

> **createDisconnectedDictionaryService**(`__namedParameters`): `object`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)

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

> **updateManifest**(`newManifest`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `newManifest` | [`ManifestInstance`](../interfaces/ManifestInstance.md) |

#### Returns

`void`
