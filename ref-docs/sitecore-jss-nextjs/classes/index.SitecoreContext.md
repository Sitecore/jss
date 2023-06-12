[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / SitecoreContext

# Class: SitecoreContext

[index](../modules/index.md).SitecoreContext

## Hierarchy

- `Component`<`SitecoreContextProps`, [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\>

  ↳ **`SitecoreContext`**

## Table of contents

### Constructors

- [constructor](index.SitecoreContext.md#constructor)

### Properties

- [context](index.SitecoreContext.md#context)
- [props](index.SitecoreContext.md#props)
- [refs](index.SitecoreContext.md#refs)
- [setContext](index.SitecoreContext.md#setcontext)
- [state](index.SitecoreContext.md#state)
- [contextType](index.SitecoreContext.md#contexttype)
- [displayName](index.SitecoreContext.md#displayname)
- [propTypes](index.SitecoreContext.md#proptypes)

### Methods

- [UNSAFE\_componentWillMount](index.SitecoreContext.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](index.SitecoreContext.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](index.SitecoreContext.md#unsafe_componentwillupdate)
- [componentDidCatch](index.SitecoreContext.md#componentdidcatch)
- [componentDidMount](index.SitecoreContext.md#componentdidmount)
- [componentDidUpdate](index.SitecoreContext.md#componentdidupdate)
- [componentWillMount](index.SitecoreContext.md#componentwillmount)
- [componentWillReceiveProps](index.SitecoreContext.md#componentwillreceiveprops)
- [componentWillUnmount](index.SitecoreContext.md#componentwillunmount)
- [componentWillUpdate](index.SitecoreContext.md#componentwillupdate)
- [constructContext](index.SitecoreContext.md#constructcontext)
- [forceUpdate](index.SitecoreContext.md#forceupdate)
- [getSnapshotBeforeUpdate](index.SitecoreContext.md#getsnapshotbeforeupdate)
- [render](index.SitecoreContext.md#render)
- [setState](index.SitecoreContext.md#setstate)
- [shouldComponentUpdate](index.SitecoreContext.md#shouldcomponentupdate)

## Constructors

### constructor

• **new SitecoreContext**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SitecoreContextProps` |

#### Overrides

React.Component&lt;SitecoreContextProps, SitecoreContextState\&gt;.constructor

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:32

## Properties

### context

• **context**: `unknown`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`See`**

https://reactjs.org/docs/context.html

#### Inherited from

React.Component.context

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:471

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`\>

#### Inherited from

React.Component.props

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:491

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:497

___

### setContext

• **setContext**: (`value`: [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) \| [`SitecoreContextValue`](../modules/index.md#sitecorecontextvalue)) => `void`

#### Type declaration

▸ (`value`): `void`

Update context state. Value can be

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) \| [`SitecoreContextValue`](../modules/index.md#sitecorecontextvalue) | New context value |

##### Returns

`void`

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:40

___

### state

• **state**: `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\>

#### Inherited from

React.Component.state

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:492

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`See`**

https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

React.Component.contextType

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:454

___

### displayName

▪ `Static` **displayName**: `string`

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:31

___

### propTypes

▪ `Static` **propTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Validator`<`any`\> |
| `componentFactory` | `Requireable`<(...`args`: `any`[]) => `any`\> |
| `layoutData` | `Requireable`<`InferProps`<{ `sitecore`: `Requireable`<`InferProps`<{ `context`: `Requireable`<`any`\> ; `route`: `Requireable`<`any`\>  }\>\>  }\>\> |

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:21

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use componentDidMount or the constructor instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:688

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:720

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:748

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidCatch

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:617

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:596

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `SitecoreContextProps` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:34

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:674

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:703

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:612

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:733

___

### constructContext

▸ **constructContext**(`layoutData?`): [`SitecoreContextValue`](../modules/index.md#sitecorecontextvalue)

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutData?` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |

#### Returns

[`SitecoreContextValue`](../modules/index.md#sitecorecontextvalue)

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:33

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.forceUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:488

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`SitecoreContextProps`\> |
| `prevState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:653

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:41

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md) \| (`prevState`: `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\>, `props`: `Readonly`<`SitecoreContextProps`\>) => ``null`` \| [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md) \| `Pick`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md), `K`\> \| `Pick`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md), `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:483

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:607
