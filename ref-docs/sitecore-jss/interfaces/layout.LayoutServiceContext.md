[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / LayoutServiceContext

# Interface: LayoutServiceContext

[layout](../modules/layout.md).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](layout.LayoutServiceContext.md#language)
- [pageEditing](layout.LayoutServiceContext.md#pageediting)
- [pageState](layout.LayoutServiceContext.md#pagestate)
- [site](layout.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](layout.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

#### Defined in

[layout/models.ts:25](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss/src/layout/models.ts#L25)

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

[layout/models.ts:24](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss/src/layout/models.ts#L24)

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/layout.LayoutServicePageState.md)

#### Defined in

[layout/models.ts:26](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss/src/layout/models.ts#L26)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

[layout/models.ts:28](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss/src/layout/models.ts#L28)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

[layout/models.ts:27](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss/src/layout/models.ts#L27)
