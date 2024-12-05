[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedLayoutService

# Function: createDisconnectedLayoutService()

> **createDisconnectedLayoutService**(`config`): `object`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`DisconnectedLayoutServiceOptions`](../interfaces/DisconnectedLayoutServiceOptions.md) |  |

## Returns

`object`

### middleware()

> **middleware**: (`request`, `response`) => `Promise`\<`void`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `response` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |

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

[sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts:362](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts#L362)
