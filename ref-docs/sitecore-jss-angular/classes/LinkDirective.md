[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / LinkDirective

# Class: LinkDirective

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:18](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L18)

## Extends

- `BaseFieldDirective`

## Extended by

- [`RouterLinkDirective`](RouterLinkDirective.md)
- [`GenericLinkDirective`](GenericLinkDirective.md)

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new LinkDirective**(): `LinkDirective`

#### Returns

`LinkDirective`

#### Inherited from

`BaseFieldDirective.constructor`

## Properties

### attrs

> **attrs**: `object` = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:21](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L21)

#### Index Signature

\[`attr`: `string`\]: `string`

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\> = `DefaultEmptyFieldEditingComponent`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:19](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L19)

#### Overrides

`BaseFieldDirective.editable`

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

#### Overrides

`BaseFieldDirective.field`

***

### renderer

> `protected` **renderer**: `Renderer2`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:35](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L35)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`any`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:34](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L34)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

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

***

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderMetadata`

***

### renderTemplate()

> `protected` **renderTemplate**(`props`, `linkText?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:52](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L52)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | \{\[`prop`: `string`\]: `unknown`; \} |
| `linkText?` | `string` |

#### Returns

`void`

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:95](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L95)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present and we are not in edit mode 'metadata'
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Overrides

`BaseFieldDirective.shouldRender`

***

### updateAttribute()

> `protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:66](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/components/link.directive.ts#L66)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue?` | `unknown` |

#### Returns

`void`
