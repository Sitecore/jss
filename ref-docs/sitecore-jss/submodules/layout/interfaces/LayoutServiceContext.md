[@sitecore-jss/sitecore-jss](../README.md) / LayoutServiceContext

# Interface: LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](LayoutServiceContext.md#language)
- [pageEditing](LayoutServiceContext.md#pageediting)
- [pageState](LayoutServiceContext.md#pagestate)
- [site](LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

#### Defined in

[models.ts:25](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L25)

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

[models.ts:24](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L24)

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/LayoutServicePageState.md)

#### Defined in

[models.ts:26](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L26)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

[models.ts:28](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L28)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

[models.ts:27](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L27)
