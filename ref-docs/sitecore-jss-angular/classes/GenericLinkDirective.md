[@sitecore-jss/sitecore-jss-angular](../README.md) / GenericLinkDirective

# Class: GenericLinkDirective

## Hierarchy

- [`LinkDirective`](LinkDirective.md)

  ↳ **`GenericLinkDirective`**

## Table of contents

### Constructors

- [constructor](GenericLinkDirective.md#constructor)

### Properties

- [attrs](GenericLinkDirective.md#attrs)
- [defaultFieldEditingComponent](GenericLinkDirective.md#defaultfieldeditingcomponent)
- [editable](GenericLinkDirective.md#editable)
- [emptyFieldEditingTemplate](GenericLinkDirective.md#emptyfieldeditingtemplate)
- [extras](GenericLinkDirective.md#extras)
- [field](GenericLinkDirective.md#field)
- [renderer](GenericLinkDirective.md#renderer)
- [router](GenericLinkDirective.md#router)
- [templateRef](GenericLinkDirective.md#templateref)
- [viewContainer](GenericLinkDirective.md#viewcontainer)
- [viewRef](GenericLinkDirective.md#viewref)

### Methods

- [ngOnChanges](GenericLinkDirective.md#ngonchanges)
- [renderEmpty](GenericLinkDirective.md#renderempty)
- [renderTemplate](GenericLinkDirective.md#rendertemplate)
- [shouldRender](GenericLinkDirective.md#shouldrender)
- [updateAttribute](GenericLinkDirective.md#updateattribute)

## Constructors

### constructor

• **new GenericLinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`, `router`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`\<`any`\> |
| `router` | `Router` |

#### Overrides

[LinkDirective](LinkDirective.md).[constructor](LinkDirective.md#constructor)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:31](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L31)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:18](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L18)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Inherited from

[LinkDirective](LinkDirective.md).[defaultFieldEditingComponent](LinkDirective.md#defaultfieldeditingcomponent)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:32](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L32)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:16](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L16)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

[LinkDirective](LinkDirective.md).[emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:27](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L27)

___

### extras

• `Optional` **extras**: `NavigationExtras`

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:22](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L22)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:20](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L20)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:36](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L36)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:38](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L38)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[viewRef](LinkDirective.md#viewref)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

## Methods

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Inherited from

[LinkDirective](LinkDirective.md).[ngOnChanges](LinkDirective.md#ngonchanges)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:46](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L46)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderEmpty](LinkDirective.md#renderempty)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

___

### renderTemplate

▸ `Protected` **renderTemplate**(`props`, `linkText`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `linkText` | `string` |

#### Returns

`void`

#### Overrides

[LinkDirective](LinkDirective.md).[renderTemplate](LinkDirective.md#rendertemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:41](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L41)

___

### shouldRender

▸ `Protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present and we are not in edit mode 'metadata'
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Inherited from

[LinkDirective](LinkDirective.md).[shouldRender](LinkDirective.md#shouldrender)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:101](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L101)

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

#### Inherited from

[LinkDirective](LinkDirective.md).[updateAttribute](LinkDirective.md#updateattribute)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:72](https://github.com/Sitecore/jss/blob/3f785d38d/packages/sitecore-jss-angular/src/components/link.directive.ts#L72)
