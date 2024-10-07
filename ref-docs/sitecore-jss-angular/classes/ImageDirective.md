[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

## Hierarchy

- `BaseFieldDirective`

  ↳ **`ImageDirective`**

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](ImageDirective.md#constructor)

### Properties

- [attrs](ImageDirective.md#attrs)
- [defaultFieldEditingComponent](ImageDirective.md#defaultfieldeditingcomponent)
- [editable](ImageDirective.md#editable)
- [elementRef](ImageDirective.md#elementref)
- [emptyFieldEditingTemplate](ImageDirective.md#emptyfieldeditingtemplate)
- [field](ImageDirective.md#field)
- [inlineRef](ImageDirective.md#inlineref)
- [mediaUrlPrefix](ImageDirective.md#mediaurlprefix)
- [renderer](ImageDirective.md#renderer)
- [templateRef](ImageDirective.md#templateref)
- [urlParams](ImageDirective.md#urlparams)
- [viewContainer](ImageDirective.md#viewcontainer)
- [viewRef](ImageDirective.md#viewref)

### Methods

- [getElementAttrs](ImageDirective.md#getelementattrs)
- [getImageAttrs](ImageDirective.md#getimageattrs)
- [ngOnChanges](ImageDirective.md#ngonchanges)
- [renderEmpty](ImageDirective.md#renderempty)
- [renderInlineWrapper](ImageDirective.md#renderinlinewrapper)
- [renderMetadata](ImageDirective.md#rendermetadata)
- [renderTemplate](ImageDirective.md#rendertemplate)
- [shouldRender](ImageDirective.md#shouldrender)
- [updateView](ImageDirective.md#updateview)

## Constructors

### constructor

• **new ImageDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:49](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L49)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:45](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L45)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:22](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L22)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:53](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L53)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)

___

### field

• **field**: [`ImageField`](../interfaces/ImageField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:20](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L20)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:47](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L47)

___

### mediaUrlPrefix

• `Optional` **mediaUrlPrefix**: `RegExp`

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

**`Example`**

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:51](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L51)

___

### urlParams

• **urlParams**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:154](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L154)

___

### getImageAttrs

▸ `Private` **getImageAttrs**(`fieldAttrs`, `parsedAttrs`, `imageParams`): ``null`` \| \{ `[attr: string]`: `string`;  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldAttrs` | [`ImageFieldValue`](../interfaces/ImageFieldValue.md) |
| `parsedAttrs` | `Object` |
| `imageParams` | `Object` |

#### Returns

``null`` \| \{ `[attr: string]`: `string`;  }

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:117](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L117)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:59](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L59)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

___

### renderInlineWrapper

▸ `Private` **renderInlineWrapper**(`editable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `editable` | `string` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:172](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L172)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

___

### renderTemplate

▸ `Private` **renderTemplate**(`imageProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `imageProps` | `Object` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:145](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L145)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)

___

### updateView

▸ `Private` **updateView**(): ``null`` \| `void`

#### Returns

``null`` \| `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:71](https://github.com/Sitecore/jss/blob/70a58c007/packages/sitecore-jss-angular/src/components/image.directive.ts#L71)
