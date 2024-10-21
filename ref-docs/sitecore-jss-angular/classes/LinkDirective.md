[@sitecore-jss/sitecore-jss-angular](../README.md) / LinkDirective

# Class: LinkDirective

## Hierarchy

- `BaseFieldDirective`

  ↳ **`LinkDirective`**

  ↳↳ [`RouterLinkDirective`](RouterLinkDirective.md)

  ↳↳ [`GenericLinkDirective`](GenericLinkDirective.md)

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](LinkDirective.md#constructor)

### Properties

- [attrs](LinkDirective.md#attrs)
- [defaultFieldEditingComponent](LinkDirective.md#defaultfieldeditingcomponent)
- [editable](LinkDirective.md#editable)
- [elementRef](LinkDirective.md#elementref)
- [emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)
- [field](LinkDirective.md#field)
- [inlineRef](LinkDirective.md#inlineref)
- [renderer](LinkDirective.md#renderer)
- [templateRef](LinkDirective.md#templateref)
- [viewContainer](LinkDirective.md#viewcontainer)
- [viewRef](LinkDirective.md#viewref)

### Methods

- [getElementAttrs](LinkDirective.md#getelementattrs)
- [ngOnChanges](LinkDirective.md#ngonchanges)
- [renderEmpty](LinkDirective.md#renderempty)
- [renderInlineWrapper](LinkDirective.md#renderinlinewrapper)
- [renderMetadata](LinkDirective.md#rendermetadata)
- [renderTemplate](LinkDirective.md#rendertemplate)
- [shouldRender](LinkDirective.md#shouldrender)
- [updateAttribute](LinkDirective.md#updateattribute)
- [updateView](LinkDirective.md#updateview)

## Constructors

### constructor

• **new LinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`\<`any`\> |

#### Overrides

BaseFieldDirective.constructor

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:37](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L37)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:21](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L21)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:19](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L19)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:41](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L41)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:35](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L35)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:154](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L154)

___

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:47](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L47)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

___

### renderInlineWrapper

▸ `Private` **renderInlineWrapper**(`editableFirstPart`, `editableLastPart`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `editableFirstPart` | `string` |
| `editableLastPart` | `string` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:134](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L134)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

___

### renderTemplate

▸ `Protected` **renderTemplate**(`props`, `linkText?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `linkText?` | `string` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:59](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L59)

___

### shouldRender

▸ `Protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present and we are not in edit mode 'metadata'
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Overrides

BaseFieldDirective.shouldRender

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:102](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L102)

___

### updateAttribute

▸ `Protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue?` | `unknown` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:73](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L73)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:109](https://github.com/Sitecore/jss/blob/f0fda3301/packages/sitecore-jss-angular/src/components/link.directive.ts#L109)
