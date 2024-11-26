[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / TextDirective

# Class: TextDirective

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### new TextDirective()

> **new TextDirective**(`viewContainer`, `templateRef`): [`TextDirective`](TextDirective.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |

#### Returns

[`TextDirective`](TextDirective.md)

#### Overrides

`BaseFieldDirective.constructor`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:35](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L35)

## Properties

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:33](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L33)

***

### editable

> **editable**: `boolean` = `true`

#### Overrides

`BaseFieldDirective.editable`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:19](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L19)

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:28](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L28)

***

### encode

> **encode**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:21](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L21)

***

### field

> **field**: [`TextField`](../interfaces/TextField.md)

#### Overrides

`BaseFieldDirective.field`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:23](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L23)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

`BaseFieldDirective.viewContainer`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

`BaseFieldDirective.viewRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/text.directive.ts:40](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/text.directive.ts#L40)

***

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)
