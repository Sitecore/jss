[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:16](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L16)

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new ImageDirective**(): `ImageDirective`

#### Returns

`ImageDirective`

#### Inherited from

`BaseFieldDirective.constructor`

## Properties

### attrs

> **attrs**: `object` = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:32](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L32)

#### Index Signature

\[`param`: `string`\]: `unknown`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)

#### Overrides

`BaseFieldDirective.editable`

***

### field

> **field**: [`ImageField`](../interfaces/ImageField.md)

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:17](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L17)

#### Overrides

`BaseFieldDirective.field`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix?**: `RegExp`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:28](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L28)

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

***

### urlParams

> **urlParams**: `object` = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:30](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L30)

#### Index Signature

\[`param`: `string`\]: `string` \| `number`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:39](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/image.directive.ts#L39)

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

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
