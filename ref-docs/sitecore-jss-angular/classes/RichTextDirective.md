[@sitecore-jss/sitecore-jss-angular](../README.md) / RichTextDirective

# Class: RichTextDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](RichTextDirective.md#constructor)

### Properties

- [editable](RichTextDirective.md#editable)
- [emptyFieldEditingTemplate](RichTextDirective.md#emptyfieldeditingtemplate)
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

• **new RichTextDirective**()

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:20](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L20)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:27](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L27)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:22](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L22)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:30](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L30)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:31](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L31)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:29](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L29)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:33](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L33)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:32](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L32)

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

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:35](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L35)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:46](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L46)
