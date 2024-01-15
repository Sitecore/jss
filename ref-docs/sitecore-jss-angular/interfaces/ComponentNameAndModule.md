[@sitecore-jss/sitecore-jss-angular](../README.md) / ComponentNameAndModule

# Interface: ComponentNameAndModule

Registers a lazily loaded component by name and module to lazy load when it's needed

## Table of contents

### Properties

- [canActivate](ComponentNameAndModule.md#canactivate)
- [loadChildren](ComponentNameAndModule.md#loadchildren)
- [path](ComponentNameAndModule.md#path)
- [resolve](ComponentNameAndModule.md#resolve)

## Properties

### canActivate

• `Optional` **canActivate**: [`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md) \| ([`JssCanActivate`](JssCanActivate.md) \| `Type`\<[`JssCanActivate`](JssCanActivate.md)\> \| [`JssCanActivateFn`](JssCanActivateFn.md))[]

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:29](https://github.com/Sitecore/jss/blob/4e03c287a/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L29)

___

### loadChildren

• **loadChildren**: () => `Promise`\<`Type`\<`unknown`\>\>

#### Type declaration

▸ (): `Promise`\<`Type`\<`unknown`\>\>

Dynamic import of the component,
e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)

##### Returns

`Promise`\<`Type`\<`unknown`\>\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:28](https://github.com/Sitecore/jss/blob/4e03c287a/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L28)

___

### path

• **path**: `string`

Name of the component

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:23](https://github.com/Sitecore/jss/blob/4e03c287a/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L23)

___

### resolve

• `Optional` **resolve**: `Object`

#### Index signature

▪ [key: `string`]: [`JssResolve`](JssResolve.md)\<`unknown`\> \| `Type`\<[`JssResolve`](JssResolve.md)\<`unknown`\>\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:34](https://github.com/Sitecore/jss/blob/4e03c287a/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L34)
