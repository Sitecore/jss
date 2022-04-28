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
- [viewRef](TextDirective.md#viewref)

### Methods

- [ngOnChanges](TextDirective.md#ngonchanges)
- [updateView](TextDirective.md#updateview)

## Constructors

### constructor

• **new TextDirective**(`viewContainer`, `templateRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:24](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L24)

## Properties

### editable

• **editable**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:18](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L18)

___

### encode

• **encode**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:20](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L20)

___

### field

• **field**: [`TextField`](../interfaces/TextField.md)

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:22](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L22)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:16](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L16)

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

[sitecore-jss-angular/src/components/text.directive.ts:26](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L26)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/text.directive.ts:37](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-angular/src/components/text.directive.ts#L37)
