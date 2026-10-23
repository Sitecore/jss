[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedDictionaryService

# Function: createDisconnectedDictionaryService()

> **createDisconnectedDictionaryService**(`__namedParameters`): `object`

Defined in: [disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/9e3c92b696008419e69707d989020708dd8162a7/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`DisconnectedDictionaryServiceOptions`](../interfaces/DisconnectedDictionaryServiceOptions.md) |

## Returns

`object`

### middleware

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
