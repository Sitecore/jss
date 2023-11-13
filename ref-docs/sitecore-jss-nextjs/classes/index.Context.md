[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / Context

# Class: Context<SDKModules\>

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
- [props](index.Context.md#props)
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

• **new Context**<`SDKModules`\>(`props`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SDKModules` | extends `SDKModulesType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ContextConfig`](../interfaces/index.ContextConfig.md)<`SDKModules`\> |

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:86](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L86)

## Properties

### isInitialized

• **isInitialized**: `boolean` = `false`

Indicates whether the Context and SDK(s) have been initialized

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:64](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L64)

___

### props

• `Protected` **props**: [`ContextConfig`](../interfaces/index.ContextConfig.md)<`SDKModules`\>

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:86](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L86)

___

### sdkPromises

• `Protected` **sdkPromises**: { [module in string \| number \| symbol]?: Promise<SDKModules[module]["sdk"]\> } = `{}`

Promises for the SDKs

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:84](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L84)

___

### sdks

• `Readonly` **sdks**: { [module in string \| number \| symbol]?: SDKModules[module]["sdk"] } = `{}`

Software Development Kits (SDKs) to be initialized

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:80](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L80)

___

### siteName

• **siteName**: `string`

The Sitecore site name

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:76](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L76)

___

### sitecoreEdgeContextId

• `Readonly` **sitecoreEdgeContextId**: `string`

The Sitecore Edge Context ID

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:72](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L72)

___

### sitecoreEdgeUrl

• `Readonly` **sitecoreEdgeUrl**: `string`

The Sitecore Edge URL

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:68](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L68)

## Methods

### getSDK

▸ **getSDK**<`T`\>(`name`): `undefined` \| `Promise`<`SDKModules`[`T`][``"sdk"``]\>

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

`undefined` \| `Promise`<`SDKModules`[`T`][``"sdk"``]\>

initialized SDK

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:114](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L114)

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

[sitecore-jss-nextjs/src/context/context.ts:92](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L92)

___

### initSDK

▸ `Protected` **initSDK**<`T`\>(`name`): `void`

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

[sitecore-jss-nextjs/src/context/context.ts:124](https://github.com/Sitecore/jss/blob/e0b438b92/packages/sitecore-jss-nextjs/src/context/context.ts#L124)
