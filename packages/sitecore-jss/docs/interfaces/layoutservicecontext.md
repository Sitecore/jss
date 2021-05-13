[@sitecore-jss/sitecore-jss](../README.md) / LayoutServiceContext

# Interface: LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: *string*]: *unknown*

Shape of context data from the Sitecore Layout Service

## Table of contents

### Properties

- [language](layoutservicecontext.md#language)
- [pageEditing](layoutservicecontext.md#pageediting)
- [pageState](layoutservicecontext.md#pagestate)
- [site](layoutservicecontext.md#site)
- [visitorIdentificationTimestamp](layoutservicecontext.md#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: *string*

Defined in: [layout/models.ts:25](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L25)

___

### pageEditing

• `Optional` **pageEditing**: *boolean*

Defined in: [layout/models.ts:24](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L24)

___

### pageState

• `Optional` **pageState**: [*Preview*](../enums/layoutservicepagestate.md#preview) \| [*Edit*](../enums/layoutservicepagestate.md#edit) \| [*Normal*](../enums/layoutservicepagestate.md#normal)

Defined in: [layout/models.ts:26](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L26)

___

### site

• `Optional` **site**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | *string* |

Defined in: [layout/models.ts:28](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L28)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: *number*

Defined in: [layout/models.ts:27](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L27)
