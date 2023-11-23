[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndType

# Class: ComponentNameAndType

Registers a statically loaded component

## Table of contents

### Constructors

- [constructor](ComponentNameAndType.md#constructor)

### Properties

- [canActivate](ComponentNameAndType.md#canactivate)
- [name](ComponentNameAndType.md#name)
- [resolve](ComponentNameAndType.md#resolve)
- [type](ComponentNameAndType.md#type)

## Constructors

### constructor

• **new ComponentNameAndType**()

## Properties

### canActivate

• `Optional` **canActivate**: [`JssCanActivate`](../interfaces/JssCanActivate.md) \| `Type`<[`JssCanActivate`](../interfaces/JssCanActivate.md)\> \| [`JssCanActivateFn`](../interfaces/JssCanActivateFn.md) \| ([`JssCanActivate`](../interfaces/JssCanActivate.md) \| `Type`<[`JssCanActivate`](../interfaces/JssCanActivate.md)\> \| [`JssCanActivateFn`](../interfaces/JssCanActivateFn.md))[]

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:12](https://github.com/Sitecore/jss/blob/e7fc6927e/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L12)

___

### name

• **name**: `string`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:9](https://github.com/Sitecore/jss/blob/e7fc6927e/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L9)

___

### resolve

• `Optional` **resolve**: `Object`

#### Index signature

▪ [key: `string`]: [`JssResolve`](../interfaces/JssResolve.md)<`unknown`\> \| `Type`<[`JssResolve`](../interfaces/JssResolve.md)<`unknown`\>\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:17](https://github.com/Sitecore/jss/blob/e7fc6927e/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L17)

___

### type

• **type**: `Type`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:10](https://github.com/Sitecore/jss/blob/e7fc6927e/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L10)
