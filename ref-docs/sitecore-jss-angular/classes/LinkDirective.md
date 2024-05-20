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
- [elementRef](LinkDirective.md#elementref)
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

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:17](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L17)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:15](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L15)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:27](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L27)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:19](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L19)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:21](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L21)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:26](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L26)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:25](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L25)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:24](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L24)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:118](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L118)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:30](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L30)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:98](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L98)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:42](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L42)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:56](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L56)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:79](https://github.com/Sitecore/jss/blob/a3c634085/packages/sitecore-jss-angular/src/components/link.directive.ts#L79)
