[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Index Signature

\[`param`: `string`\]: `unknown`

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\> = `DefaultEmptyImageFieldEditingComponent`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:45](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L45)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:45](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L45)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

***

### editable

> **editable**: `boolean` = `true`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:22](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L22)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:22](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L22)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Overrides

`BaseFieldDirective.editable`

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

***

### field

> **field**: [`ImageField`](../interfaces/ImageField.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L20)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Overrides

`BaseFieldDirective.field`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix?**: `RegExp`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Index Signature

\[`param`: `string`\]: `string` \| `number`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)
=======
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)
=======
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)
=======
Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)
=======
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)
=======
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### shouldRender()

> `protected` **shouldRender**(): `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L36)
=======
Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
