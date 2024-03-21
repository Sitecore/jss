[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / Context

# Class: Context\<SDKModules\>

[index](../modules/index.md).Context

Context instance that is used to initialize the application Context and associated Software Development Kits (SDKs).

## Type parameters

| Name | Type |
| :------ | :------ |
| `SDKModules` | extends `SDKModulesType` |

## Table of contents

### Constructors

- [constructor](index.Context.md#constructor)

### Properties

- [isInitialized](index.Context.md#isinitialized)
- [pageState](index.Context.md#pagestate)
- [props](index.Context.md#props)
- [sdkErrors](index.Context.md#sdkerrors)
- [sdkPromises](index.Context.md#sdkpromises)
- [sdks](index.Context.md#sdks)
- [siteName](index.Context.md#sitename)
- [sitecoreEdgeContextId](index.Context.md#sitecoreedgecontextid)
- [sitecoreEdgeUrl](index.Context.md#sitecoreedgeurl)

### Methods

- [getSDK](index.Context.md#getsdk)
- [init](index.Context.md#init)
- [initSDK](index.Context.md#initsdk)

## Constructors

### constructor

• **new Context**\<`SDKModules`\>(`props`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SDKModules` | extends `SDKModulesType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ContextConfig`](../interfaces/index.ContextConfig.md)\<`SDKModules`\> |

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:98](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L98)

## Properties

### isInitialized

• **isInitialized**: `boolean` = `false`

Indicates whether the Context and SDK(s) have been initialized

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:70](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L70)

___

### pageState

• **pageState**: [`LayoutServicePageState`](../enums/index.LayoutServicePageState.md)

Sitecore page state (normal, preview, edit)

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:86](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L86)

___

### props

• `Protected` **props**: [`ContextConfig`](../interfaces/index.ContextConfig.md)\<`SDKModules`\>

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:98](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L98)

___

### sdkErrors

• `Protected` **sdkErrors**: \{ [module in string \| number \| symbol]?: string } = `{}`

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:96](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L96)

___

### sdkPromises

• `Protected` **sdkPromises**: \{ [module in string \| number \| symbol]?: Promise\<SDKModules[module]["sdk"]\> } = `{}`

Promises for the SDKs

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:94](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L94)

___

### sdks

• `Readonly` **sdks**: \{ [module in string \| number \| symbol]?: SDKModules[module]["sdk"] } = `{}`

Software Development Kits (SDKs) to be initialized

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:90](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L90)

___

### siteName

• **siteName**: `string`

The Sitecore site name

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:82](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L82)

___

### sitecoreEdgeContextId

• `Readonly` **sitecoreEdgeContextId**: `string`

The Sitecore Edge Context ID

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:78](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L78)

___

### sitecoreEdgeUrl

• `Readonly` **sitecoreEdgeUrl**: `string`

The Sitecore Edge URL

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:74](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L74)

## Methods

### getSDK

▸ **getSDK**\<`T`\>(`name`): `Promise`\<`SDKModules`[`T`][``"sdk"``]\>

Retrieves the Software Development Kit (SDK) instance, ensuring it is initialized before returning

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `T` | SDK name |

#### Returns

`Promise`\<`SDKModules`[`T`][``"sdk"``]\>

initialized SDK

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:131](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L131)

___

### init

▸ **init**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ContextInitProps` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:105](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L105)

___

### initSDK

▸ `Protected` **initSDK**\<`T`\>(`name`): `void`

Initializes the Software Development Kit (SDK)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `T` | SDK name |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-nextjs/src/context/context.ts:149](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss-nextjs/src/context/context.ts#L149)
