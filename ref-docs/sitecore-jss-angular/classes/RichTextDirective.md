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
- [renderMetadata](RichTextDirective.md#rendermetadata)
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

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:36](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L36)

## Properties

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:34](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L34)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:22](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L22)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:29](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L29)

___

### field

• **field**: [`RichTextField`](../interfaces/RichTextField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:24](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L24)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:39](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L39)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:40](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L40)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:38](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L38)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:46](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L46)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

___

### renderMetadata

▸ `Protected` **renderMetadata**(`kind`): `void`

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderMetadata

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/rich-text.directive.ts:53](https://github.com/Sitecore/jss/blob/27e39a81c/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L53)
