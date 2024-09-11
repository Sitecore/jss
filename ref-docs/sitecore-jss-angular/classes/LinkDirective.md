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

[packages/sitecore-jss-angular/src/components/link.directive.ts:36](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L36)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:20](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L20)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:32](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L32)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:18](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L18)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:27](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L27)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:22](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L22)

___

### inlineRef

• `Private` **inlineRef**: ``null`` \| `HTMLSpanElement` = `null`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:34](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L34)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:38](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L38)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

## Methods

### getElementAttrs

▸ `Private` **getElementAttrs**(): `Object`

#### Returns

`Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:152](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L152)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:46](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L46)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:132](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L132)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:58](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L58)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:101](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L101)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:72](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L72)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:108](https://github.com/Sitecore/jss/blob/a792e20a8/packages/sitecore-jss-angular/src/components/link.directive.ts#L108)
