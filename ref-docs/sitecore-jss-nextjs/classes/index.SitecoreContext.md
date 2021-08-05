[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / SitecoreContext

# Class: SitecoreContext<ContextType\>

[index](../modules/index.md).SitecoreContext

## Type parameters

| Name | Type |
| :------ | :------ |
| `ContextType` | `any` |

## Hierarchy

- `Component`<`SitecoreContextProps`<`ContextType`\>, [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\>

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
- [forceUpdate](index.SitecoreContext.md#forceupdate)
- [getSnapshotBeforeUpdate](index.SitecoreContext.md#getsnapshotbeforeupdate)
- [render](index.SitecoreContext.md#render)
- [setState](index.SitecoreContext.md#setstate)
- [shouldComponentUpdate](index.SitecoreContext.md#shouldcomponentupdate)

## Constructors

### constructor

• **new SitecoreContext**<`ContextType`\>(`props`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ContextType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SitecoreContextProps`<`ContextType`\> |

#### Overrides

React.Component&lt;SitecoreContextProps&lt;ContextType\&gt;, SitecoreContextState&lt;ContextType\&gt;\&gt;.constructor

#### Defined in

node_modules/@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext.d.ts:21

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

node_modules/@types/react/index.d.ts:473

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`<`ContextType`\>\> & `Readonly`<`Object`\>

#### Inherited from

React.Component.props

#### Defined in

node_modules/@types/react/index.d.ts:498

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

node_modules/@types/react/index.d.ts:504

___

### setContext

• **setContext**: (`value`: `ContextType`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ContextType` |

##### Returns

`void`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext.d.ts:22

___

### state

• **state**: `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\>

#### Inherited from

React.Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

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

node_modules/@types/react/index.d.ts:455

___

### displayName

▪ `Static` **displayName**: `string`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext.d.ts:20

___

### propTypes

▪ `Static` **propTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Validator`<`any`\> |
| `componentFactory` | `Requireable`<`fn`\> |
| `context` | `Requireable`<`any`\> |

#### Defined in

node_modules/@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext.d.ts:15

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

node_modules/@types/react/index.d.ts:711

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
| `nextProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:743

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
| `nextProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

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

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `prevState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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

node_modules/@types/react/index.d.ts:697

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
| `nextProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

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

node_modules/@types/react/index.d.ts:635

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
| `nextProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

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

node_modules/@types/react/index.d.ts:490

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
| `prevProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `prevState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

node_modules/@sitecore-jss/sitecore-jss-react/types/components/SitecoreContext.d.ts:23

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"setContext"`` \| ``"context"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\> \| (`prevState`: `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\>, `props`: `Readonly`<`SitecoreContextProps`<`ContextType`\>\>) => ``null`` \| [`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\> \| `Pick`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>, `K`\> \| `Pick`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

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
| `nextProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
