[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDisconnectedDictionaryService

# Function: createDisconnectedDictionaryService()

> **createDisconnectedDictionaryService**(`__namedParameters`): `object`

## Parameters

• **\_\_namedParameters**: [`DisconnectedDictionaryServiceOptions`](../interfaces/DisconnectedDictionaryServiceOptions.md)

## Returns

`object`

### middleware()

> **middleware**: (`request`, `response`) => `Promise`\<`void`\>

#### Parameters

• **request**: `any`

• **response**: `any`

#### Returns

`Promise`\<`void`\>

### updateManifest()

#### Parameters

• **newManifest**: [`ManifestInstance`](../interfaces/ManifestInstance.md)

#### Returns

`void`

## Defined in

[sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)
