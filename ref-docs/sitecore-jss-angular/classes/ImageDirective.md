[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](ImageDirective.md#constructor)

### Properties

- [attrs](ImageDirective.md#attrs)
- [editable](ImageDirective.md#editable)
- [elementRef](ImageDirective.md#elementref)
- [field](ImageDirective.md#field)
- [inlineRef](ImageDirective.md#inlineref)
- [mediaUrlPrefix](ImageDirective.md#mediaurlprefix)
- [renderer](ImageDirective.md#renderer)
- [templateRef](ImageDirective.md#templateref)
- [urlParams](ImageDirective.md#urlparams)
- [viewContainer](ImageDirective.md#viewcontainer)

### Methods

- [getElementAttrs](ImageDirective.md#getelementattrs)
- [getImageAttrs](ImageDirective.md#getimageattrs)
- [ngOnChanges](ImageDirective.md#ngonchanges)
- [renderInlineWrapper](ImageDirective.md#renderinlinewrapper)
- [renderTemplate](ImageDirective.md#rendertemplate)
- [updateView](ImageDirective.md#updateview)

## Constructors

### constructor

• **new ImageDirective**()

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:32](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L32)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:38](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L38)

___

### field

• **field**: ``""`` \| [`ImageField`](../interfaces/ImageField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:17](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L17)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:34](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L34)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:28](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L28)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:37](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L37)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:36](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L36)

___

### urlParams

• **urlParams**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:30](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L30)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:132](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L132)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:95](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L95)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:150](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L150)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:123](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L123)

___

### updateView

▸ `Private` **updateView**(): ``null`` \| `void`

#### Returns

``null`` \| `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)
