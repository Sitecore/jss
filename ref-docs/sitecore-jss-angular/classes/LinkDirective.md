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
- [emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)
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

• **new LinkDirective**()

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:18](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L18)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:16](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L16)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:32](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L32)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:25](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L25)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:20](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L20)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:31](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L31)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:29](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L29)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

___

### viewContainer

• **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:27](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L27)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:122](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L122)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:34](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L34)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:102](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L102)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:46](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L46)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:60](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L60)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:83](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L83)
