[@sitecore-jss/sitecore-jss-angular](../README.md) / RichTextDirective

# Class: RichTextDirective

## Hierarchy

- `BaseFieldDirective`

  ↳ **`RichTextDirective`**

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](RichTextDirective.md#constructor)

### Properties

- [defaultFieldEditingComponent](RichTextDirective.md#defaultfieldeditingcomponent)
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
- [renderEmpty](RichTextDirective.md#renderempty)
- [shouldRender](RichTextDirective.md#shouldrender)
- [updateView](RichTextDirective.md#updateview)

## Constructors

### constructor

• **new RichTextDirective**(`viewContainer`, `templateRef`, `renderer`, `router`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `router` | `Router` |

#### Overrides

BaseFieldDirective.constructor

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:35](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L35)

## Properties

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:33](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L33)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:21](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L21)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:28](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L28)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:23](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L23)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:38](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L38)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:39](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L39)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:37](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L37)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

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

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:45](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L45)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

___

### shouldRender

▸ `Protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

BaseFieldDirective.shouldRender

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:28](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L28)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:56](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L56)
