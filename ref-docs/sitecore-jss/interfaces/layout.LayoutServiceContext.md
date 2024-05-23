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
- [renderingType](layout.LayoutServiceContext.md#renderingtype)
- [site](layout.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](layout.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:59](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L59)

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:58](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L58)

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/layout.EditMode.md)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:57](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L57)

___

### language

• `Optional` **language**: `string`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:51](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L51)

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:50](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L50)

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/layout.LayoutServicePageState.md)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:52](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L52)

___

### renderingType

• `Optional` **renderingType**: [`Component`](../enums/layout.RenderingType.md#component)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:49](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L49)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:54](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L54)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:53](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss/src/layout/models.ts#L53)
