[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / GenericLinkDirective

# Class: GenericLinkDirective

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:15](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L15)

## Extends

- [`LinkDirective`](LinkDirective.md)

## Constructors

### Constructor

> **new GenericLinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`, `router`): `GenericLinkDirective`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:31](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef` |
| `router` | `Router` |

#### Returns

`GenericLinkDirective`

#### Overrides

[`LinkDirective`](LinkDirective.md).[`constructor`](LinkDirective.md#constructor)

## Properties

### attrs

> **attrs**: `object` = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:18](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L18)

#### Index Signature

\[`key`: `string`\]: `string`

#### Overrides

[`LinkDirective`](LinkDirective.md).[`attrs`](LinkDirective.md#attrs)

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`defaultFieldEditingComponent`](LinkDirective.md#defaultfieldeditingcomponent)

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:16](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L16)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`editable`](LinkDirective.md#editable)

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:27](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L27)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

[`LinkDirective`](LinkDirective.md).[`emptyFieldEditingTemplate`](LinkDirective.md#emptyfieldeditingtemplate)

***

### extras?

> `optional` **extras**: `NavigationExtras`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:22](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L22)

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:20](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L20)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`field`](LinkDirective.md#field)

***

### renderer

> `protected` **renderer**: `Renderer2`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderer`](LinkDirective.md#renderer)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:39](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L39)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`templateRef`](LinkDirective.md#templateref)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewContainer`](LinkDirective.md#viewcontainer)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewRef`](LinkDirective.md#viewref)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:47](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L47)

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

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`ngOnChanges`](LinkDirective.md#ngonchanges)

***

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderEmpty`](LinkDirective.md#renderempty)

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderMetadata`](LinkDirective.md#rendermetadata)

***

### renderTemplate()

> `protected` **renderTemplate**(`props`, `linkText`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:41](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | \{\[`key`: `string`\]: `string`; \} |
| `linkText` | `string` |

#### Returns

`void`

#### Overrides

[`LinkDirective`](LinkDirective.md).[`renderTemplate`](LinkDirective.md#rendertemplate)

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:102](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L102)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present and we are not in edit mode 'metadata'
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`shouldRender`](LinkDirective.md#shouldrender)

***

### updateAttribute()

> `protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:73](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/link.directive.ts#L73)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue?` | `unknown` |

#### Returns

`void`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`updateAttribute`](LinkDirective.md#updateattribute)
