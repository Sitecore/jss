[@sitecore-jss/sitecore-jss-react](../README.md) / SitecoreContext

# Class: SitecoreContext<ContextType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `ContextType` | `any` |

## Hierarchy

- `Component`<`SitecoreContextProps`<`ContextType`\>, [`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\>

  ↳ **`SitecoreContext`**

## Table of contents

### Constructors

- [constructor](SitecoreContext.md#constructor)

### Properties

- [context](SitecoreContext.md#context)
- [props](SitecoreContext.md#props)
- [refs](SitecoreContext.md#refs)
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
- [forceUpdate](SitecoreContext.md#forceupdate)
- [getSnapshotBeforeUpdate](SitecoreContext.md#getsnapshotbeforeupdate)
- [render](SitecoreContext.md#render)
- [setContext](SitecoreContext.md#setcontext)
- [setState](SitecoreContext.md#setstate)
- [shouldComponentUpdate](SitecoreContext.md#shouldcomponentupdate)

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

React.Component&lt;
  SitecoreContextProps&lt;ContextType\&gt;,
  SitecoreContextState&lt;ContextType\&gt;
\&gt;.constructor

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:36](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L36)

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:473

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`<`ContextType`\>\> & `Readonly`<`Object`\>

#### Inherited from

React.Component.props

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:498

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\>

#### Inherited from

React.Component.state

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:499

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:455

___

### displayName

▪ `Static` **displayName**: `string` = `'SitecoreContext'`

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:34](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L34)

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

[sitecore-jss-react/src/components/SitecoreContext.tsx:28](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L28)

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:711

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:743

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
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:771

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `any` |

#### Returns

`void`

#### Overrides

React.Component.componentDidUpdate

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:57](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L57)

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:697

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:726

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:635

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
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:756

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

sitecore-jss-react/node_modules/@types/react/index.d.ts:490

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
| `prevState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:676

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:75](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L75)

___

### setContext

▸ **setContext**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ContextType` |

#### Returns

`void`

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:67](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L67)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\> \| (`prevState`: `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\>, `props`: `Readonly`<`SitecoreContextProps`<`ContextType`\>\>) => [`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\> \| `Pick`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>, `K`\> \| `Pick`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:485

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
| `nextState` | `Readonly`<[`SitecoreContextState`](../interfaces/SitecoreContextState.md)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/index.d.ts:630
