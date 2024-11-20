[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedLayoutService

# Function: createDisconnectedLayoutService()

> **createDisconnectedLayoutService**(`config`): `object`

## Parameters

• **config**: [`DisconnectedLayoutServiceOptions`](../interfaces/DisconnectedLayoutServiceOptions.md)

## Returns

`object`

### middleware()

> **middleware**: (`request`, `response`) => `Promise`\<`void`\>

#### Parameters

• **request**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

• **response**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

#### Returns

`Promise`\<`void`\>

### updateManifest()

#### Parameters

• **newManifest**: [`ManifestInstance`](../interfaces/ManifestInstance.md)

#### Returns

`void`

## Defined in

[sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts:362](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts#L362)
