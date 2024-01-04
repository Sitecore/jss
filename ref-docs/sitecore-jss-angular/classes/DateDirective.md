[@sitecore-jss/sitecore-jss-angular](../README.md) / DateDirective

# Class: DateDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](DateDirective.md#constructor)

### Properties

- [datePipe](DateDirective.md#datepipe)
- [editable](DateDirective.md#editable)
- [field](DateDirective.md#field)
- [format](DateDirective.md#format)
- [locale](DateDirective.md#locale)
- [templateRef](DateDirective.md#templateref)
- [timezone](DateDirective.md#timezone)
- [viewContainer](DateDirective.md#viewcontainer)
- [viewRef](DateDirective.md#viewref)

### Methods

- [ngOnChanges](DateDirective.md#ngonchanges)
- [updateView](DateDirective.md#updateview)

## Constructors

### constructor

• **new DateDirective**(`viewContainer`, `templateRef`, `datePipe`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `datePipe` | `DatePipe` |

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:29](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L29)

## Properties

### datePipe

• `Private` **datePipe**: `DatePipe`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:32](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L32)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:23](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L23)

___

### field

• **field**: `DateField`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:25](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L25)

___

### format

• `Optional` **format**: `string`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:17](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L17)

___

### locale

• `Optional` **locale**: `string`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:21](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L21)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:31](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L31)

___

### timezone

• `Optional` **timezone**: `string`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:19](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L19)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:30](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L30)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:27](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L27)

## Methods

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:35](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L35)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/date.directive.ts:46](https://github.com/Sitecore/jss/blob/69bb6a620/packages/sitecore-jss-angular/src/components/date.directive.ts#L46)
