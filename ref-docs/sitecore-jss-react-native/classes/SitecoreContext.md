[**@sitecore-jss/sitecore-jss-react-native**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-native](../README.md) / SitecoreContext

# Class: SitecoreContext

## Extends

- `Component`\<`SitecoreContextProps`\>

## Constructors

### new SitecoreContext()

> **new SitecoreContext**(`props`, `context`): [`SitecoreContext`](SitecoreContext.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `SitecoreContextProps` |
| `context` | `unknown` |

#### Returns

[`SitecoreContext`](SitecoreContext.md)

#### Overrides

`React.Component<SitecoreContextProps>.constructor`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L24)

## Properties

### componentFactory

> **componentFactory**: `ComponentFactory`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:22](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L22)

***

### context

> **context**: `any`

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

#### See

https://react.dev/reference/react/Component#context

#### Inherited from

`React.Component.context`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:479

***

### props

> `readonly` **props**: `Readonly`\<`SitecoreContextProps`\> & `Readonly`\<`object`\>

#### Inherited from

`React.Component.props`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:504

***

### ~~refs~~

> **refs**: `object`

#### Index Signature

 \[`key`: `string`\]: `ReactInstance`

#### Deprecated

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Inherited from

`React.Component.refs`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:510

***

### state

> **state**: `Readonly`\<`object`\>

#### Inherited from

`React.Component.state`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:505

***

### contextType?

> `static` `optional` **contextType**: `Context`\<`any`\>

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

#### See

https://react.dev/reference/react/Component#static-contexttype

#### Inherited from

`React.Component.contextType`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:461

***

### displayName

> `static` **displayName**: `string` = `'SitecoreContext'`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:20](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L20)

***

### propTypes

> `static` **propTypes**: `object`

#### children

> **children**: `Validator`\<`any`\> = `PropTypes.any.isRequired`

#### componentFactory

> **componentFactory**: `Requireable`\<(...`args`) => `any`\> = `PropTypes.func`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L15)

## Methods

### componentDidCatch()?

> `optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

`React.Component.componentDidCatch`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:646

***

### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

`React.Component.componentDidMount`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:625

***

### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot`?): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<`SitecoreContextProps`\> |
| `prevState` | `Readonly`\<`object`\> |
| `snapshot`? | `any` |

#### Returns

`void`

#### Inherited from

`React.Component.componentDidUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:688

***

### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

#### Deprecated

16.3, use componentDidMount or the constructor instead; will stop working in React 17

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.componentWillMount`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:703

***

### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`SitecoreContextProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use static getDerivedStateFromProps instead; will stop working in React 17

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.componentWillReceiveProps`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:732

***

### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

`React.Component.componentWillUnmount`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:641

***

### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`SitecoreContextProps`\> |
| `nextState` | `Readonly`\<`object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.componentWillUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:762

***

### forceUpdate()

> **forceUpdate**(`callback`?): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback`? | () => `void` |

#### Returns

`void`

#### Inherited from

`React.Component.forceUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:496

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<`SitecoreContextProps`\> |
| `prevState` | `Readonly`\<`object`\> |

#### Returns

`any`

#### Inherited from

`React.Component.getSnapshotBeforeUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:682

***

### render()

> **render**(): `Element`

#### Returns

`Element`

#### Overrides

`React.Component.render`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:29](https://github.com/Sitecore/jss/blob/9cd15ca25619b116ad9c500eef4ef2dc9023209b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L29)

***

### setState()

> **setState**\<`K`\>(`state`, `callback`?): `void`

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `never` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | `object` \| (`prevState`, `props`) => `object` \| `Pick`\<`object`, `K`\> \| `Pick`\<`object`, `K`\> |
| `callback`? | () => `void` |

#### Returns

`void`

#### Inherited from

`React.Component.setState`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:491

***

### shouldComponentUpdate()?

> `optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`SitecoreContextProps`\> |
| `nextState` | `Readonly`\<`object`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

`React.Component.shouldComponentUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:636

***

### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Returns

`void`

#### Deprecated

16.3, use componentDidMount or the constructor instead

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.UNSAFE_componentWillMount`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:717

***

### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`SitecoreContextProps`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use static getDerivedStateFromProps instead

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.UNSAFE_componentWillReceiveProps`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:749

***

### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`SitecoreContextProps`\> |
| `nextState` | `Readonly`\<`object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use getSnapshotBeforeUpdate instead

#### See

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Inherited from

`React.Component.UNSAFE_componentWillUpdate`

#### Defined in

sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:777
