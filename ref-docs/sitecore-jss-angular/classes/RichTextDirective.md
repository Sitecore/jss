[@sitecore-jss/sitecore-jss-angular](../README.md) / RichTextDirective

# Class: RichTextDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](RichTextDirective.md#constructor)

### Properties

- [editable](RichTextDirective.md#editable)
- [field](RichTextDirective.md#field)
- [viewRef](RichTextDirective.md#viewref)

### Methods

- [ngOnChanges](RichTextDirective.md#ngonchanges)
- [updateView](RichTextDirective.md#updateview)

## Constructors

### constructor

• **new RichTextDirective**(`viewContainer`, `templateRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:22](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L22)

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:18](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L18)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:20](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L20)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:16](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L16)

## Methods

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:24](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L24)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:35](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L35)
