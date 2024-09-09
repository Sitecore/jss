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

[packages/sitecore-jss-angular/src/components/image.directive.ts:48](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L48)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:34](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L34)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:44](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L44)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:21](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L21)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:39](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L39)

___

### field

• **field**: [`ImageField`](../interfaces/ImageField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:46](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L46)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:30](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L30)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:51](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L51)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:50](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L50)

___

### urlParams

• **urlParams**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:32](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L32)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:151](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L151)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:114](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L114)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:58](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L58)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:169](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L169)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:142](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L142)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:28](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L28)

___

### updateView

▸ `Private` **updateView**(): ``null`` \| `void`

#### Returns

``null`` \| `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:70](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/image.directive.ts#L70)
