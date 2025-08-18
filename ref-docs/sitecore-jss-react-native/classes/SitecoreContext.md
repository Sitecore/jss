[**@sitecore-jss/sitecore-jss-react-native**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-native](../README.md) / SitecoreContext

# Class: SitecoreContext

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:14](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L14)

## Extends

- `Component`\<`SitecoreContextProps`\>

## Constructors

### Constructor

> **new SitecoreContext**(`props`, `context`): `SitecoreContext`

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `SitecoreContextProps` |
| `context` | `unknown` |

#### Returns

`SitecoreContext`

#### Overrides

`React.Component<SitecoreContextProps>.constructor`

## Properties

### componentFactory

> **componentFactory**: `ComponentFactory`

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:22](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L22)

***

### context

> **context**: `any`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:479

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

***

### props

> `readonly` **props**: `Readonly`\<`SitecoreContextProps`\> & `Readonly`\<\{ `children?`: `ReactNode`; \}\>

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:504

#### Inherited from

`React.Component.props`

***

### ~~refs~~

> **refs**: `object`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:510

#### Index Signature

\[`key`: `string`\]: `ReactInstance`

#### Deprecated

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Inherited from

`React.Component.refs`

***

### state

> **state**: `Readonly`\<`S`\>

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:505

#### Inherited from

`React.Component.state`

***

### contextType?

> `static` `optional` **contextType**: `Context`\<`any`\>

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:461

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

***

### displayName

> `static` **displayName**: `string` = `'SitecoreContext'`

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:20](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L20)

***

### propTypes

> `static` **propTypes**: `object`

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L15)

#### children

> **children**: `Validator`\<`any`\> = `PropTypes.any.isRequired`

#### componentFactory

> **componentFactory**: `Requireable`\<(...`args`) => `any`\> = `PropTypes.func`

## Methods

### componentDidCatch()?

> `optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:646

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

***

### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:625

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

`React.Component.componentDidMount`

***

### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:688

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<`P`\> |
| `prevState` | `Readonly`\<`S`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

`React.Component.componentDidUpdate`

***

### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:703

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

***

### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:732

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
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

***

### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:641

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

`React.Component.componentWillUnmount`

***

### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:762

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
| `nextState` | `Readonly`\<`S`\> |
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

***

### forceUpdate()

> **forceUpdate**(`callback?`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:496

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

`React.Component.forceUpdate`

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:682

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<`P`\> |
| `prevState` | `Readonly`\<`S`\> |

#### Returns

`any`

#### Inherited from

`React.Component.getSnapshotBeforeUpdate`

***

### render()

> **render**(): `Element`

Defined in: [sitecore-jss-react-native/src/components/SitecoreContext.tsx:29](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L29)

#### Returns

`Element`

#### Overrides

`React.Component.render`

***

### setState()

> **setState**\<`K`\>(`state`, `callback?`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:491

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `never` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | \{ \} \| (`prevState`, `props`) => \{ \} \| `Pick`\<\{ \}, `K`\> \| `Pick`\<\{ \}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

`React.Component.setState`

***

### shouldComponentUpdate()?

> `optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:636

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
| `nextState` | `Readonly`\<`S`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

`React.Component.shouldComponentUpdate`

***

### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:717

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

***

### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:749

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
| `nextProps` | `Readonly`\<`P`\> |
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

***

### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: sitecore-jss-react-native/node\_modules/@types/react/index.d.ts:777

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
| `nextState` | `Readonly`\<`S`\> |
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
