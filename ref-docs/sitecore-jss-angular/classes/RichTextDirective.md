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

• **new RichTextDirective**(`viewContainer`, `templateRef`, `renderer`, `router`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |
| `renderer` | `Renderer2` |
| `router` | `Router` |

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:25](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L25)

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:21](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L21)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:23](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L23)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:19](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L19)

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

[sitecore-jss-angular/src/components/rich-text.directive.ts:32](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L32)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:43](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L43)
