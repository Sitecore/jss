[@sitecore-jss/sitecore-jss-nextjs](../README.md) / SitecoreContext

# Class: SitecoreContext

## Hierarchy

- `Component`<`SitecoreContextProps`, [`SitecoreContextState`](../interfaces/SitecoreContextState.md)\>

  ↳ **`SitecoreContext`**

## Table of contents

### Constructors

- [constructor](SitecoreContext.md#constructor)

### Properties

- [context](SitecoreContext.md#context)
- [props](SitecoreContext.md#props)
- [refs](SitecoreContext.md#refs)
- [setContext](SitecoreContext.md#setcontext)
- [state](SitecoreContext.md#state)
- [contextType](SitecoreContext.md#contexttype)
- [displayName](SitecoreContext.md#displayname)
- [propTypes](SitecoreContext.md#proptypes)

### Methods

- [UNSAFE\_componentWillMount](SitecoreContext.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](SitecoreContext.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](SitecoreContext.md#unsafe_componentwillupdate)
- [componentDidCatch](SitecoreContext.md#componentdidcatch)
- [componentDidMount](SitecoreContext.md#componentdidmount)
- [componentDidUpdate](SitecoreContext.md#componentdidupdate)
- [componentWillMount](SitecoreContext.md#componentwillmount)
- [componentWillReceiveProps](SitecoreContext.md#componentwillreceiveprops)
- [componentWillUnmount](SitecoreContext.md#componentwillunmount)
- [componentWillUpdate](SitecoreContext.md#componentwillupdate)
- [constructContext](SitecoreContext.md#constructcontext)
- [forceUpdate](SitecoreContext.md#forceupdate)
- [getSnapshotBeforeUpdate](SitecoreContext.md#getsnapshotbeforeupdate)
- [render](SitecoreContext.md#render)
- [setState](SitecoreContext.md#setstate)
- [shouldComponentUpdate](SitecoreContext.md#shouldcomponentupdate)

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

sitecore-jss-react/types/components/SitecoreContext.d.ts:31

## Properties

### context

• **context**: `any`

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

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

React.Component.context

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:479

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`\> & `Readonly`<`Object`\>

#### Inherited from

React.Component.props

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:504

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:510

___

### setContext

• **setContext**: (`value`: [`LayoutServiceData`](../interfaces/LayoutServiceData.md) \| [`SitecoreContextValue`](../README.md#sitecorecontextvalue)) => `void`

#### Type declaration

▸ (`value`): `void`

Update context state. Value can be @type {LayoutServiceData} which will be automatically transformed
or you can provide exact @type {SitecoreContextValue}

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) \| [`SitecoreContextValue`](../README.md#sitecorecontextvalue) | New context value |

##### Returns

`void`

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:39

___

### state

• **state**: `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\>

#### Inherited from

React.Component.state

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:505

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

**`see`** https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

React.Component.contextType

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:461

___

### displayName

▪ `Static` **displayName**: `string`

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:30

___

### propTypes

▪ `Static` **propTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Validator`<`any`\> |
| `componentFactory` | `Requireable`<`fn`\> |
| `layoutData` | `Requireable`<`InferProps`<`Object`\>\> |

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:20

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:717

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

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

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

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:749

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:777

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

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:646

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:625

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

sitecore-jss-react/types/components/SitecoreContext.d.ts:33

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:703

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

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

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:732

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

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:641

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`SitecoreContextProps`\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:762

___

### constructContext

▸ **constructContext**(`layoutData?`): [`SitecoreContextValue`](../README.md#sitecorecontextvalue)

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutData?` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) |

#### Returns

[`SitecoreContextValue`](../README.md#sitecorecontextvalue)

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:32

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

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:496

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
| `prevState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:682

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:40

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`SitecoreContextState`](../interfaces/SitecoreContextState.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| [`SitecoreContextState`](../interfaces/SitecoreContextState.md) \| (`prevState`: `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\>, `props`: `Readonly`<`SitecoreContextProps`\>) => ``null`` \| [`SitecoreContextState`](../interfaces/SitecoreContextState.md) \| `Pick`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md), `K`\> \| `Pick`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md), `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:491

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
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

sitecore-jss-nextjs/node_modules/@types/react/index.d.ts:636
