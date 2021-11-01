[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedLayoutServiceOptions

# Interface: DisconnectedLayoutServiceOptions

## Table of contents

### Properties

- [customizeContext](DisconnectedLayoutServiceOptions.md#customizecontext)
- [customizeRendering](DisconnectedLayoutServiceOptions.md#customizerendering)
- [customizeRoute](DisconnectedLayoutServiceOptions.md#customizeroute)
- [manifest](DisconnectedLayoutServiceOptions.md#manifest)

### Methods

- [manifestLanguageChangeCallback](DisconnectedLayoutServiceOptions.md#manifestlanguagechangecallback)

## Properties

### customizeContext

• `Optional` **customizeContext**: [`CustomizeContextFunction`](../README.md#customizecontextfunction)

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:30](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L30)

___

### customizeRendering

• `Optional` **customizeRendering**: [`CustomizeRenderFunction`](../README.md#customizerenderfunction)

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:32](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L32)

___

### customizeRoute

• `Optional` **customizeRoute**: [`CustomizeRouteFunction`](../README.md#customizeroutefunction)

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:31](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L31)

___

### manifest

• **manifest**: [`ManifestInstance`](ManifestInstance.md)

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:29](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L29)

## Methods

### manifestLanguageChangeCallback

▸ `Optional` **manifestLanguageChangeCallback**(`language`): `Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:33](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L33)
