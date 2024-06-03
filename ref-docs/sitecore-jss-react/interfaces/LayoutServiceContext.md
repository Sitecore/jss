[@sitecore-jss/sitecore-jss-react](../README.md) / LayoutServiceContext

# Interface: LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [clientData](LayoutServiceContext.md#clientdata)
- [clientScripts](LayoutServiceContext.md#clientscripts)
- [editMode](LayoutServiceContext.md#editmode)
- [language](LayoutServiceContext.md#language)
- [pageEditing](LayoutServiceContext.md#pageediting)
- [pageState](LayoutServiceContext.md#pagestate)
- [renderingType](LayoutServiceContext.md#renderingtype)
- [site](LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:55

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:54

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/EditMode.md)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:53

___

### language

• `Optional` **language**: `string`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:47

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:46

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/LayoutServicePageState.md)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:48

___

### renderingType

• `Optional` **renderingType**: `Component`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:45

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:50

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:49
