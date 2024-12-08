[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ImageDirective

# Class: ImageDirective

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### new ImageDirective()

> **new ImageDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`): [`ImageDirective`](ImageDirective.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`\<`any`\> |

#### Returns

[`ImageDirective`](ImageDirective.md)

#### Overrides

`BaseFieldDirective.constructor`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:49](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L49)

## Properties

### attrs

> **attrs**: `object` = `{}`

#### Index Signature

 \[`param`: `string`\]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:35](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L35)

***

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:45](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L45)

***

### editable

> **editable**: `boolean` = `true`

#### Overrides

`BaseFieldDirective.editable`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:22](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L22)

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:40](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L40)

***

### field

> **field**: [`ImageField`](../interfaces/ImageField.md)

#### Overrides

`BaseFieldDirective.field`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:20](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L20)

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix**: `RegExp`

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:31](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L31)

***

### urlParams

> **urlParams**: `object` = `{}`

#### Index Signature

 \[`param`: `string`\]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-angular/src/components/image.directive.ts:33](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L33)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

`BaseFieldDirective.viewContainer`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

`BaseFieldDirective.viewRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/image.directive.ts:59](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/image.directive.ts#L59)

***

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)
