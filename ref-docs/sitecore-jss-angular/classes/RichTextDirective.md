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
- [renderer](RichTextDirective.md#renderer)
- [router](RichTextDirective.md#router)
- [templateRef](RichTextDirective.md#templateref)
- [viewContainer](RichTextDirective.md#viewcontainer)
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

[sitecore-jss-angular/src/components/rich-text.directive.ts:25](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L25)

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:19](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L19)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:21](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L21)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:28](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L28)

___

### router

• `Private` **router**: `Router`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:29](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L29)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:27](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L27)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:26](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L26)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:23](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L23)

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

[sitecore-jss-angular/src/components/rich-text.directive.ts:32](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L32)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/rich-text.directive.ts:43](https://github.com/Sitecore/jss/blob/900ccd739/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L43)
