[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / GenericLinkDirective

# Class: GenericLinkDirective

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:8](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L8)

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

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:11](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L11)

#### Index Signature

\[`key`: `string`\]: `string`

#### Overrides

[`LinkDirective`](LinkDirective.md).[`attrs`](LinkDirective.md#attrs)

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:9](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L9)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`editable`](LinkDirective.md#editable)

***

### extras?

> `optional` **extras?**: `NavigationExtras`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:15](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L15)

***

### field

> **field**: [`LinkField`](../interfaces/LinkField.md)

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:13](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L13)

#### Overrides

[`LinkDirective`](LinkDirective.md).[`field`](LinkDirective.md#field)

***

### renderer

> `protected` **renderer**: `Renderer2`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:23](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/link.directive.ts#L23)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`renderer`](LinkDirective.md#renderer)

***

### templateRef

> `protected` **templateRef**: `TemplateRef`\<`any`\>

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:22](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/link.directive.ts#L22)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`templateRef`](LinkDirective.md#templateref)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewContainer`](LinkDirective.md#viewcontainer)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`viewRef`](LinkDirective.md#viewref)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

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

### renderTemplate()

> `protected` **renderTemplate**(`props`, `linkText`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/generic-link.directive.ts:19](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L19)

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

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:83](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/link.directive.ts#L83)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
or link field text is present.
The right side of the expression was added to preserve existing functionality

#### Returns

`boolean`

#### Inherited from

[`LinkDirective`](LinkDirective.md).[`shouldRender`](LinkDirective.md#shouldrender)

***

### updateAttribute()

> `protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/link.directive.ts:54](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-angular/src/components/link.directive.ts#L54)

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
