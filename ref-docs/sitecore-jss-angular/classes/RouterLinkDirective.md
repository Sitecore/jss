[@sitecore-jss/sitecore-jss-angular](../README.md) / RouterLinkDirective

# Class: RouterLinkDirective

## Hierarchy

- [`LinkDirective`](LinkDirective.md)

  ↳ **`RouterLinkDirective`**

## Table of contents

### Constructors

- [constructor](RouterLinkDirective.md#constructor)

### Properties

- [attrs](RouterLinkDirective.md#attrs)
- [defaultFieldEditingComponent](RouterLinkDirective.md#defaultfieldeditingcomponent)
- [editable](RouterLinkDirective.md#editable)
- [emptyFieldEditingTemplate](RouterLinkDirective.md#emptyfieldeditingtemplate)
- [field](RouterLinkDirective.md#field)
- [renderer](RouterLinkDirective.md#renderer)
- [router](RouterLinkDirective.md#router)
- [templateRef](RouterLinkDirective.md#templateref)
- [viewContainer](RouterLinkDirective.md#viewcontainer)
- [viewRef](RouterLinkDirective.md#viewref)

### Methods

- [ngOnChanges](RouterLinkDirective.md#ngonchanges)
- [renderEmpty](RouterLinkDirective.md#renderempty)
- [renderMetadata](RouterLinkDirective.md#rendermetadata)
- [renderTemplate](RouterLinkDirective.md#rendertemplate)
- [shouldRender](RouterLinkDirective.md#shouldrender)
- [updateAttribute](RouterLinkDirective.md#updateattribute)

## Constructors

### constructor

• **new RouterLinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`, `router`)

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

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:28](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L28)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:17](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L17)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Inherited from

[LinkDirective](LinkDirective.md).[defaultFieldEditingComponent](LinkDirective.md#defaultfieldeditingcomponent)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:15](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L15)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

[LinkDirective](LinkDirective.md).[emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:24](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L24)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:19](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L19)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:33](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L33)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[viewRef](LinkDirective.md#viewref)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:47](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L47)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderEmpty](LinkDirective.md#renderempty)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

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

[LinkDirective](LinkDirective.md).[renderMetadata](LinkDirective.md#rendermetadata)

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:38](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L38)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:102](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L102)

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

[packages/sitecore-jss-angular/src/components/link.directive.ts:73](https://github.com/Sitecore/jss/blob/456b9dfc4/packages/sitecore-jss-angular/src/components/link.directive.ts#L73)
