[@sitecore-jss/sitecore-jss-angular](../README.md) / LinkDirective

# Class: LinkDirective

## Hierarchy

- **`LinkDirective`**

  ↳ [`RouterLinkDirective`](RouterLinkDirective.md)

  ↳ [`GenericLinkDirective`](GenericLinkDirective.md)

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](LinkDirective.md#constructor)

### Properties

- [attrs](LinkDirective.md#attrs)
- [editable](LinkDirective.md#editable)
- [field](LinkDirective.md#field)
- [inlineRef](LinkDirective.md#inlineref)
- [renderer](LinkDirective.md#renderer)
- [templateRef](LinkDirective.md#templateref)
- [viewContainer](LinkDirective.md#viewcontainer)

### Methods

- [getElementAttrs](LinkDirective.md#getelementattrs)
- [ngOnChanges](LinkDirective.md#ngonchanges)
- [renderInlineWrapper](LinkDirective.md#renderinlinewrapper)
- [renderTemplate](LinkDirective.md#rendertemplate)
- [updateView](LinkDirective.md#updateview)

## Constructors

### constructor

• **new LinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`<`any`\> |

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:19](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L19)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:17](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L17)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:21](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L21)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:15](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L15)

___

### renderer

• `Protected` **renderer**: `Renderer2`

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`<`unknown`\>

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:108](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L108)

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

[sitecore-jss-angular/src/components/link.directive.ts:30](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L30)

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

[sitecore-jss-angular/src/components/link.directive.ts:86](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L86)

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

[sitecore-jss-angular/src/components/link.directive.ts:54](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L54)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:42](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/link.directive.ts#L42)
