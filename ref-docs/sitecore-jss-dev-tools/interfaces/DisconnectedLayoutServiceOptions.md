[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedLayoutServiceOptions

# Interface: DisconnectedLayoutServiceOptions

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:28](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L28)

## Properties

### customizeContext?

> `optional` **customizeContext?**: [`CustomizeContextFunction`](../type-aliases/CustomizeContextFunction.md)

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:30](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L30)

***

### customizeRendering?

> `optional` **customizeRendering?**: [`CustomizeRenderFunction`](../type-aliases/CustomizeRenderFunction.md)

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:32](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L32)

***

### customizeRoute?

> `optional` **customizeRoute?**: [`CustomizeRouteFunction`](../type-aliases/CustomizeRouteFunction.md)

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:31](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L31)

***

### manifest

> **manifest**: [`ManifestInstance`](ManifestInstance.md)

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:29](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L29)

***

### manifestLanguageChangeCallback?

> `optional` **manifestLanguageChangeCallback?**: (`language`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

Defined in: [disconnected-server/DisconnectedLayoutServiceOptions.ts:33](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L33)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>
