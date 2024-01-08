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

• **new ImageDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`\<`any`\> |

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `unknown`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:18](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L18)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:39](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L39)

___

### field

• **field**: ``""`` \| [`ImageField`](../interfaces/ImageField.md)

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:16](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L16)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)

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

[sitecore-jss-angular/src/components/image.directive.ts:27](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L27)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:38](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L38)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:37](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L37)

___

### urlParams

• **urlParams**: `Object` = `{}`

#### Index signature

▪ [param: `string`]: `string` \| `number`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:29](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L29)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:36](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L36)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:134](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L134)

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

[sitecore-jss-angular/src/components/image.directive.ts:97](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L97)

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

[sitecore-jss-angular/src/components/image.directive.ts:42](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L42)

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

[sitecore-jss-angular/src/components/image.directive.ts:152](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L152)

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

[sitecore-jss-angular/src/components/image.directive.ts:125](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L125)

___

### updateView

▸ `Private` **updateView**(): ``null`` \| `void`

#### Returns

``null`` \| `void`

#### Defined in

[sitecore-jss-angular/src/components/image.directive.ts:54](https://github.com/Sitecore/jss/blob/0c5d8361c/packages/sitecore-jss-angular/src/components/image.directive.ts#L54)
