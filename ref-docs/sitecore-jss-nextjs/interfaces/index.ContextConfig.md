[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / ContextConfig

# Interface: ContextConfig<SDKModules\>

[index](../modules/index.md).ContextConfig

Configuration that is passed to the Context.

## Type parameters

| Name | Type |
| :------ | :------ |
| `SDKModules` | extends `SDKModulesType` |

## Table of contents

### Properties

- [sdks](index.ContextConfig.md#sdks)
- [siteName](index.ContextConfig.md#sitename)
- [sitecoreEdgeContextId](index.ContextConfig.md#sitecoreedgecontextid)
- [sitecoreEdgeUrl](index.ContextConfig.md#sitecoreedgeurl)

## Properties

### sdks

• **sdks**: { [module in string \| number \| symbol]: SDKModules[module] }

Software Development Kits (SDKs) to be initialized

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:49](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-nextjs/src/context/context.ts#L49)

___

### siteName

• **siteName**: `string`

Your Sitecore site name

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:45](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-nextjs/src/context/context.ts#L45)

___

### sitecoreEdgeContextId

• **sitecoreEdgeContextId**: `string`

Your Sitecore Edge Context ID

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:41](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-nextjs/src/context/context.ts#L41)

___

### sitecoreEdgeUrl

• **sitecoreEdgeUrl**: `string`

Your Sitecore Edge URL

#### Defined in

[sitecore-jss-nextjs/src/context/context.ts:37](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-nextjs/src/context/context.ts#L37)
