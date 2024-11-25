[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / BYOCComponent

# Class: BYOCComponent

BYOCComponent facilitate the rendering of external components. It manages potential errors,
missing components, and customization of error messages or alternative rendering components.

## Param

component props

## Extends

- `Component`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

## Constructors

### new BYOCComponent()

> **new BYOCComponent**(`props`): [`BYOCComponent`](BYOCComponent.md)

#### Parameters

• **props**: [`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)

#### Returns

[`BYOCComponent`](BYOCComponent.md)

#### Overrides

`React.Component<BYOCComponentProps>.constructor`

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:91](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L91)

## Properties

### context

> **context**: `unknown`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

#### Example

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

#### See

[React Docs](https://react.dev/reference/react/Component#context)

#### Inherited from

`React.Component.context`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1006

***

### props

> `readonly` **props**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

#### Inherited from

`React.Component.props`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1026

***

### ~~refs~~

> **refs**: `object`

#### Index Signature

 \[`key`: `string`\]: `ReactInstance`

#### Deprecated

#### See

[Legacy React Docs](https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)

#### Inherited from

`React.Component.refs`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1033

***

### state

> **state**: `Readonly`\<`object`\>

#### Type declaration

##### error?

> `optional` **error**: `Error`

#### Overrides

`React.Component.state`

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:89](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L89)

***

### contextType?

> `static` `optional` **contextType**: `Context`\<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

#### Example

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

[https://react.dev/reference/react/Component#static-contexttype](https://react.dev/reference/react/Component#static-contexttype)

#### Inherited from

`React.Component.contextType`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:988

## Methods

### componentDidCatch()

> **componentDidCatch**(`error`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

• **error**: `Error`

#### Returns

`void`

#### Overrides

`React.Component.componentDidCatch`

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:101](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L101)

***

### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

`React.Component.componentDidMount`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1369

***

### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot`?): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](BYOCComponent.md#getsnapshotbeforeupdate) is present and returns non-null.

#### Parameters

• **prevProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **prevState**: `Readonly`\<`object`\>

• **snapshot?**: `any`

#### Returns

`void`

#### Inherited from

`React.Component.componentDidUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1432

***

### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before Component.render.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Returns

`void`

#### Deprecated

16.3, use ComponentLifecycle.componentDidMount componentDidMount or the constructor instead; will stop working in React 17

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.componentWillMount`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1448

***

### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling Component.setState generally does not trigger this method.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

• **nextProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **nextContext**: `any`

#### Returns

`void`

#### Deprecated

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead; will stop working in React 17

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.componentWillReceiveProps`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1479

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

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1385

***

### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call Component.setState here.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

• **nextProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **nextState**: `Readonly`\<`object`\>

• **nextContext**: `any`

#### Returns

`void`

#### Deprecated

16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.componentWillUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1511

***

### forceUpdate()

> **forceUpdate**(`callback`?): `void`

#### Parameters

• **callback?**

#### Returns

`void`

#### Inherited from

`React.Component.forceUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1023

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of Component.render render to the document, and
returns an object to be given to [componentDidUpdate](BYOCComponent.md#componentdidupdate). Useful for saving
things such as scroll position before Component.render render causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

#### Parameters

• **prevProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **prevState**: `Readonly`\<`object`\>

#### Returns

`any`

#### Inherited from

`React.Component.getSnapshotBeforeUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1426

***

### render()

> **render**(): `Element`

#### Returns

`Element`

#### Overrides

`React.Component.render`

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:105](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L105)

***

### setState()

> **setState**\<`K`\>(`state`, `callback`?): `void`

#### Type Parameters

• **K** *extends* `never`

#### Parameters

• **state**: `object` \| (`prevState`, `props`) => `object` \| `Pick`\<`object`, `K`\> \| `Pick`\<`object`, `K`\>

• **callback?**

#### Returns

`void`

#### Inherited from

`React.Component.setState`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1018

***

### shouldComponentUpdate()?

> `optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, Component.render, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

• **nextProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **nextState**: `Readonly`\<`object`\>

• **nextContext**: `any`

#### Returns

`boolean`

#### Inherited from

`React.Component.shouldComponentUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1380

***

### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Called immediately before mounting occurs, and before Component.render.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Returns

`void`

#### Deprecated

16.3, use ComponentLifecycle.componentDidMount componentDidMount or the constructor instead

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.UNSAFE_componentWillMount`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1463

***

### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling Component.setState generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

• **nextProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **nextContext**: `any`

#### Returns

`void`

#### Deprecated

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.UNSAFE_componentWillReceiveProps`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1497

***

### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call Component.setState here.

This method will not stop working in React 17.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

• **nextProps**: `Readonly`\<[`BYOCComponentProps`](../type-aliases/BYOCComponentProps.md)\>

• **nextState**: `Readonly`\<`object`\>

• **nextContext**: `any`

#### Returns

`void`

#### Deprecated

16.3, use getSnapshotBeforeUpdate instead

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`React.Component.UNSAFE_componentWillUpdate`

#### Defined in

packages/sitecore-jss-react/node\_modules/@types/react/index.d.ts:1527

***

### getDerivedStateFromError()

> `static` **getDerivedStateFromError**(`error`): `object`

#### Parameters

• **error**: `Error`

#### Returns

`object`

##### error

> **error**: `Error`

#### Defined in

[packages/sitecore-jss-react/src/components/BYOCComponent.tsx:96](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L96)
