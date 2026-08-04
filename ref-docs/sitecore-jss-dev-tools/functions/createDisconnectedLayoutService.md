[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedLayoutService

# Function: createDisconnectedLayoutService()

> **createDisconnectedLayoutService**(`config`): `object`

Defined in: [disconnected-server/layout-service.ts:362](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts#L362)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`DisconnectedLayoutServiceOptions`](../interfaces/DisconnectedLayoutServiceOptions.md) | - |

## Returns

`object`

### middleware

> **middleware**: (`request`, `response`) => `Promise`\<`void`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `Request` |
| `response` | `Response` |

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
