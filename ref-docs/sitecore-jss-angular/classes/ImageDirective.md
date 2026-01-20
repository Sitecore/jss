[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:19](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L19)

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

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)

#### Index Signature

\[`param`: `string`\]: `unknown`

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\> = `DefaultEmptyImageFieldEditingComponent`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:45](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L45)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:22](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L22)

#### Overrides

`BaseFieldDirective.editable`

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

***

### field

> **field**: [`ImageField`](../interfaces/ImageField.md)

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:20](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L20)

#### Overrides

`BaseFieldDirective.field`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix**: `RegExp`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)

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

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)

#### Index Signature

\[`param`: `string`\]: `string` \| `number`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/image.directive.ts:52](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/image.directive.ts#L52)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:36](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L36)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
