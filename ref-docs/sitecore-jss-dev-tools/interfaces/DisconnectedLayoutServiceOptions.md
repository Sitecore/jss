[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedLayoutServiceOptions

# Interface: DisconnectedLayoutServiceOptions

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:28](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L28)

## Properties

### customizeContext?

> `optional` **customizeContext**: [`CustomizeContextFunction`](../type-aliases/CustomizeContextFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:30](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L30)

***

### customizeRendering?

> `optional` **customizeRendering**: [`CustomizeRenderFunction`](../type-aliases/CustomizeRenderFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:32](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L32)

***

### customizeRoute?

> `optional` **customizeRoute**: [`CustomizeRouteFunction`](../type-aliases/CustomizeRouteFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:31](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L31)

***

### manifest

> **manifest**: [`ManifestInstance`](ManifestInstance.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:29](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L29)

***

### manifestLanguageChangeCallback()?

> `optional` **manifestLanguageChangeCallback**: (`language`) => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts:33](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L33)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>
