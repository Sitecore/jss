[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L28)
=======
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Registers a lazily loaded component by name and module to lazy load when it's needed

## Properties

### canActivate?

> `optional` **canActivate?**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L36)
=======
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### loadChildren

> **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L35)
=======
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

***

### path

> **path**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:30](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L30)
=======
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:30](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L30)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Name of the component

***

### resolve?

> `optional` **resolve?**: `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L41)
=======
Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Index Signature

\[`key`: `string`\]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>
