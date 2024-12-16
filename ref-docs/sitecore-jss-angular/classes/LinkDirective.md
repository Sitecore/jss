[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / LinkDirective

# Class: LinkDirective

## Extends

- `BaseFieldDirective`

## Extended by

- [`RouterLinkDirective`](RouterLinkDirective.md)
- [`GenericLinkDirective`](GenericLinkDirective.md)

## Implements

- `OnChanges`

## Constructors

### new LinkDirective()

> **new LinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`): [`LinkDirective`](LinkDirective.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`\<`any`\> |

#### Returns

[`LinkDirective`](LinkDirective.md)

#### Overrides

`BaseFieldDirective.constructor`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:37](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L37)

## Properties

### attrs

> **attrs**: `object` = `{}`

#### Index Signature

 \[`attr`: `string`\]: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:21](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L21)

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

***

### editable

> **editable**: `boolean` = `true`

#### Overrides

`BaseFieldDirective.editable`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:19](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L19)

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

`BaseFieldDirective.field`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

***

### renderer

> `protected` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

`BaseFieldDirective.viewContainer`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

`BaseFieldDirective.viewRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

A callback method that is invoked immediately after the
default change detector has checked data-bound properties
if at least one has changed, and before the view and content
children are checked.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `changes` | `SimpleChanges` | The changed properties. |

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:47](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L47)

***

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderMetadata`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

***

### renderTemplate()

> `protected` **renderTemplate**(`props`, `linkText`?): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `object` |
| `linkText`? | `string` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:59](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L59)

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present and we are not in edit mode 'metadata'
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Overrides

`BaseFieldDirective.shouldRender`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:102](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L102)

***

### updateAttribute()

> `protected` **updateAttribute**(`node`, `key`, `propValue`?): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue`? | `unknown` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:73](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/components/link.directive.ts#L73)
