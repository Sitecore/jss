[@sitecore-jss/sitecore-jss-react](../README.md) / BYOCComponent

# Class: BYOCComponent

BYOCComponent facilitate the rendering of external components. It manages potential errors,
missing components, and customization of error messages or alternative rendering components.

**`Param`**

component props

## Hierarchy

- `Component`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>

  ↳ **`BYOCComponent`**

## Table of contents

### Constructors

- [constructor](BYOCComponent.md#constructor)

### Properties

- [context](BYOCComponent.md#context)
- [props](BYOCComponent.md#props)
- [state](BYOCComponent.md#state)
- [contextType](BYOCComponent.md#contexttype)
- [propTypes](BYOCComponent.md#proptypes)

### Methods

- [UNSAFE\_componentWillMount](BYOCComponent.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](BYOCComponent.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](BYOCComponent.md#unsafe_componentwillupdate)
- [componentDidCatch](BYOCComponent.md#componentdidcatch)
- [componentDidMount](BYOCComponent.md#componentdidmount)
- [componentDidUpdate](BYOCComponent.md#componentdidupdate)
- [componentWillMount](BYOCComponent.md#componentwillmount)
- [componentWillReceiveProps](BYOCComponent.md#componentwillreceiveprops)
- [componentWillUnmount](BYOCComponent.md#componentwillunmount)
- [componentWillUpdate](BYOCComponent.md#componentwillupdate)
- [forceUpdate](BYOCComponent.md#forceupdate)
- [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
- [render](BYOCComponent.md#render)
- [setState](BYOCComponent.md#setstate)
- [shouldComponentUpdate](BYOCComponent.md#shouldcomponentupdate)
- [getDerivedStateFromError](BYOCComponent.md#getderivedstatefromerror)

## Constructors

### constructor

• **new BYOCComponent**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BYOCComponentProps`](../README.md#byoccomponentprops) |

#### Overrides

React.Component\&lt;BYOCComponentProps\&gt;.constructor

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:87](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L87)

## Properties

### context

• **context**: `unknown`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

**`Example`**

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`See`**

[React Docs](https://react.dev/reference/react/Component#context)

#### Inherited from

React.Component.context

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:946

___

### props

• `Readonly` **props**: `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>

#### Inherited from

React.Component.props

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:962

___

### state

• **state**: `Readonly`\<\{ `error?`: `Error`  }\>

#### Overrides

React.Component.state

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:85](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L85)

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`\<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

**`Example`**

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

[https://react.dev/reference/react/Component#static-contexttype](https://react.dev/reference/react/Component#static-contexttype)

#### Inherited from

React.Component.contextType

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:922

___

### propTypes

▪ `Static` `Optional` **propTypes**: `any`

Ignored by React.

**`Deprecated`**

Only kept in types for backwards compatibility. Will be removed in a future major release.

#### Inherited from

React.Component.propTypes

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:928

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before Component.render.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use [componentDidMount](BYOCComponent.md#componentdidmount) or the constructor instead

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1266

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [setState](BYOCComponent.md#setstate) generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1300

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [setState](BYOCComponent.md#setstate) here.

This method will not stop working in React 17.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`\<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1330

___

### componentDidCatch

▸ **componentDidCatch**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

#### Overrides

React.Component.componentDidCatch

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:97](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L97)

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1172

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate) is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `prevState` | `Readonly`\<{}\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1235

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before Component.render.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Returns

`void`

**`Deprecated`**

16.3, use [componentDidMount](BYOCComponent.md#componentdidmount) or the constructor instead; will stop working in React 17

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.componentWillMount

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1251

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling [setState](BYOCComponent.md#setstate) generally does not trigger this method.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead; will stop working in React 17

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1282

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

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1188

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call [setState](BYOCComponent.md#setstate) here.

Note: the presence of [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate)
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`\<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

**`Deprecated`**

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`See`**

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1314

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

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:959

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of Component.render render to the document, and
returns an object to be given to [componentDidUpdate](BYOCComponent.md#componentdidupdate). Useful for saving
things such as scroll position before Component.render render causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `prevState` | `Readonly`\<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1229

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:101](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L101)

___

### setState

▸ **setState**\<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | {} \| (`prevState`: `Readonly`\<{}\>, `props`: `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>) => {} \| `Pick`\<{}, `K`\> \| `Pick`\<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:954

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, Component.render, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`\<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`\<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

packages/sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:1183

___

### getDerivedStateFromError

▸ `Static` **getDerivedStateFromError**(`error`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:92](https://github.com/Sitecore/jss/blob/6ee0b69111/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L92)
