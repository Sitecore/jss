[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndType

# Class: ComponentNameAndType

Registers a statically loaded component

## Constructors

### new ComponentNameAndType()

> **new ComponentNameAndType**(): [`ComponentNameAndType`](ComponentNameAndType.md)

#### Returns

[`ComponentNameAndType`](ComponentNameAndType.md)

## Properties

### canActivate?

> `optional` **canActivate**: [`JssCanActivate`](../interfaces/JssCanActivate.md) \| `Type`\<[`JssCanActivate`](../interfaces/JssCanActivate.md)\> \| [`JssCanActivateFn`](../interfaces/JssCanActivateFn.md) \| ([`JssCanActivate`](../interfaces/JssCanActivate.md) \| `Type`\<[`JssCanActivate`](../interfaces/JssCanActivate.md)\> \| [`JssCanActivateFn`](../interfaces/JssCanActivateFn.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:19](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L19)

***

### name

> **name**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:16](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L16)

***

### resolve?

> `optional` **resolve**: `object`

#### Index Signature

 \[`key`: `string`\]: [`JssResolve`](../interfaces/JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](../interfaces/JssResolve.md)\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:24](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L24)

***

### type

> **type**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:17](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L17)
