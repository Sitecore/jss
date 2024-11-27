[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / LayoutServiceContext

# Interface: LayoutServiceContext

[layout](../modules/layout.md).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [clientData](layout.LayoutServiceContext.md#clientdata)
- [clientScripts](layout.LayoutServiceContext.md#clientscripts)
- [editMode](layout.LayoutServiceContext.md#editmode)
- [language](layout.LayoutServiceContext.md#language)
- [pageEditing](layout.LayoutServiceContext.md#pageediting)
- [pageState](layout.LayoutServiceContext.md#pagestate)
- [site](layout.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](layout.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:43](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L43)

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:42](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L42)

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/layout.EditMode.md)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:41](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L41)

___

### language

• `Optional` **language**: `string`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:35](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L35)

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:34](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L34)

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/layout.LayoutServicePageState.md)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:36](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L36)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:38](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L38)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:37](https://github.com/Sitecore/jss/blob/250ce2352/packages/sitecore-jss/src/layout/models.ts#L37)
