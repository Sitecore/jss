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

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:12](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L12)

***

### name

> **name**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:9](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L9)

***

### resolve?

> `optional` **resolve**: `object`

#### Index Signature

 \[`key`: `string`\]: [`JssResolve`](../interfaces/JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](../interfaces/JssResolve.md)\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:17](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L17)

***

### type

> **type**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:10](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L10)
