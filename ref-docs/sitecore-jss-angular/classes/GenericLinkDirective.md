[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / GenericLinkDirective

# Class: GenericLinkDirective

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:8](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L8)

## Extends

- [`LinkDirective`](LinkDirective.md)

## Constructors

### Constructor

> **new GenericLinkDirective**(): `GenericLinkDirective`

#### Returns

`GenericLinkDirective`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`constructor`](LinkDirective.md#constructor)

## Properties

### attrs

> **attrs**: `object` = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:11](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L11)

#### Index Signature

\[`key`: `string`\]: `string`

#### Overrides

[`LinkDirective`](LinkDirective.md).[`attrs`](LinkDirective.md#attrs)

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\> = `DefaultEmptyFieldEditingComponent`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:33](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L33)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`defaultFieldEditingComponent`](LinkDirective.md#defaultfieldeditingcomponent)

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:9](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L9)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`editable`](LinkDirective.md#editable)

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:20](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L20)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

[`LinkDirective`](LinkDirective.md).[`emptyFieldEditingTemplate`](LinkDirective.md#emptyfieldeditingtemplate)

***

### extras?

> `optional` **extras**: `NavigationExtras`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:15](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L15)

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:13](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L13)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`field`](LinkDirective.md#field)

***

### renderer

> `protected` **renderer**: `Renderer2`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:35](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L35)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderer`](LinkDirective.md#renderer)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`any`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:34](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L34)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`templateRef`](LinkDirective.md#templateref)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewContainer`](LinkDirective.md#viewcontainer)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewRef`](LinkDirective.md#viewref)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderEmpty`](LinkDirective.md#renderempty)

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)

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

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:25](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L25)

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

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:95](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L95)

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

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:66](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/link.directive.ts#L66)

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
