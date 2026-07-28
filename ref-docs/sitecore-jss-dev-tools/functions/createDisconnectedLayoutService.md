[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedLayoutService

# Function: createDisconnectedLayoutService()

> **createDisconnectedLayoutService**(`config`): `object`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts:362](https://github.com/Sitecore/jss/blob/4d41f4ebbb82bcc6522f425860ad637a0b9e4704/packages/sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts#L362)

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
