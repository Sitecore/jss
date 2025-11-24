[@sitecore-jss/sitecore-jss-angular](../README.md) / TextDirective

# Class: TextDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](TextDirective.md#constructor)

### Properties

- [editable](TextDirective.md#editable)
- [encode](TextDirective.md#encode)
- [field](TextDirective.md#field)
- [templateRef](TextDirective.md#templateref)
- [viewContainer](TextDirective.md#viewcontainer)
- [viewRef](TextDirective.md#viewref)

### Methods

- [ngOnChanges](TextDirective.md#ngonchanges)
- [updateView](TextDirective.md#updateview)

## Constructors

### constructor

• **new TextDirective**()

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:17](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L17)

___

### encode

• **encode**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:19](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L19)

___

### field

• **field**: [`TextField`](../interfaces/TextField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:21](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L21)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:25](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L25)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:27](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L27)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:23](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L23)

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

[packages/sitecore-jss-angular/src/components/text.directive.ts:29](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L29)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:40](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/text.directive.ts#L40)
