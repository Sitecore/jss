[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / LinkDirective

# Class: LinkDirective

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:15](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L15)

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

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:18](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L18)

#### Index Signature

\[`attr`: `string`\]: `string`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:16](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L16)

#### Overrides

`BaseFieldDirective.editable`

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:20](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L20)

#### Overrides

`BaseFieldDirective.field`

***

### renderer

> `protected` **renderer**: `Renderer2`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`any`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:22](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L22)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

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

### renderTemplate()

> `protected` **renderTemplate**(`props`, `linkText?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:40](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L40)

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

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:83](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L83)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present.
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Overrides

`BaseFieldDirective.shouldRender`

***

### updateAttribute()

> `protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:54](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/components/link.directive.ts#L54)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue?` | `unknown` |

#### Returns

`void`
