[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L28)

Registers a lazily loaded component by name and module to lazy load when it's needed

## Properties

### canActivate?

> `optional` **canActivate**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:36](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L36)

***

### loadChildren()

> **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:35](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L35)

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

#### Returns

`Promise`\<`Type`\<`unknown`\>\>

***

### path

> **path**: `string`

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:30](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L30)

Name of the component

***

### resolve?

> `optional` **resolve**: `object`

Defined in: [packages/sitecore-jss-angular/src/services/placeholder.token.ts:41](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/placeholder.token.ts#L41)

#### Index Signature

\[`key`: `string`\]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>
