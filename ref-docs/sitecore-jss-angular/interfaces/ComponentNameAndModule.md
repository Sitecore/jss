[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

Registers a lazily loaded component by name and module to lazy load when it's needed

## Properties

### canActivate?

> `optional` **canActivate**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:29](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L29)

***

### loadChildren()

> **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L28)

***

### path

> **path**: `string`

Name of the component

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:23](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L23)

***

### resolve?

> `optional` **resolve**: `object`

#### Index Signature

 \[`key`: `string`\]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:34](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L34)
