[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L28)

Registers a lazily loaded component by name and module to lazy load when it's needed

## Properties

### canActivate?

> `optional` **canActivate**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:36](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L36)

***

### loadChildren()

> **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:35](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L35)

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

***

### path

> **path**: `string`

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:30](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L30)

Name of the component

***

### resolve?

> `optional` **resolve**: `object`

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:41](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L41)

#### Index Signature

\[`key`: `string`\]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>
