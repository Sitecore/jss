[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

Registers a lazily loaded component by name and module to lazy load when it's needed

## Properties

### canActivate?

> `optional` **canActivate**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:36](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L36)

***

### loadChildren()

> **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:35](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L35)

***

### path

> **path**: `string`

Name of the component

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:30](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L30)

***

### resolve?

> `optional` **resolve**: `object`

#### Index Signature

 \[`key`: `string`\]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>

#### Defined in

[packages/sitecore-jss-angular/src/services/placeholder.token.ts:41](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L41)
