---
name: sitecorecontext
routeTemplate: ./data/component-templates/article.yml
title: sitecorecontext
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / SitecoreContext

# Class: SitecoreContext<ContextType\>

[index](/docs/nextjs/ref/modules/index).SitecoreContext

## Type parameters

| Name | Type |
| :------ | :------ |
| `ContextType` | `any` |

## Hierarchy

- `Component`<`SitecoreContextProps`<`ContextType`\>, [`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\>

  ↳ **`SitecoreContext`**

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/sitecorecontext#constructor)

### Properties

- [context](/docs/nextjs/ref/classes/index/sitecorecontext#context)
- [props](/docs/nextjs/ref/classes/index/sitecorecontext#props)
- [refs](/docs/nextjs/ref/classes/index/sitecorecontext#refs)
- [setContext](/docs/nextjs/ref/classes/index/sitecorecontext#setcontext)
- [state](/docs/nextjs/ref/classes/index/sitecorecontext#state)
- [contextType](/docs/nextjs/ref/classes/index/sitecorecontext#contexttype)
- [displayName](/docs/nextjs/ref/classes/index/sitecorecontext#displayname)
- [propTypes](/docs/nextjs/ref/classes/index/sitecorecontext#proptypes)

### Methods

- [UNSAFE\_componentWillMount](/docs/nextjs/ref/classes/index/sitecorecontext#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](/docs/nextjs/ref/classes/index/sitecorecontext#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#unsafe_componentwillupdate)
- [componentDidCatch](/docs/nextjs/ref/classes/index/sitecorecontext#componentdidcatch)
- [componentDidMount](/docs/nextjs/ref/classes/index/sitecorecontext#componentdidmount)
- [componentDidUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#componentdidupdate)
- [componentWillMount](/docs/nextjs/ref/classes/index/sitecorecontext#componentwillmount)
- [componentWillReceiveProps](/docs/nextjs/ref/classes/index/sitecorecontext#componentwillreceiveprops)
- [componentWillUnmount](/docs/nextjs/ref/classes/index/sitecorecontext#componentwillunmount)
- [componentWillUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#componentwillupdate)
- [forceUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#forceupdate)
- [getSnapshotBeforeUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#getsnapshotbeforeupdate)
- [render](/docs/nextjs/ref/classes/index/sitecorecontext#render)
- [setState](/docs/nextjs/ref/classes/index/sitecorecontext#setstate)
- [shouldComponentUpdate](/docs/nextjs/ref/classes/index/sitecorecontext#shouldcomponentupdate)

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

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`<`ContextType`\>\> & `Readonly`<`Object`\>

#### Inherited from

React.Component.props

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

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

___

### state

• **state**: `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\>

#### Inherited from

React.Component.state

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

___

### displayName

▪ `Static` **displayName**: `string`

___

### propTypes

▪ `Static` **propTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Validator`<`any`\> |
| `componentFactory` | `Requireable`<`fn`\> |
| `context` | `Requireable`<`any`\> |

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
| `nextState` | `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

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

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`SitecoreContextProps`<`ContextType`\>\> |
| `prevState` | `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

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

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

React.Component.componentWillUnmount

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
| `nextState` | `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

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
| `prevState` | `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

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
| `state` | ``null`` \| [`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\> \| (`prevState`: `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\>, `props`: `Readonly`<`SitecoreContextProps`<`ContextType`\>\>) => ``null`` \| [`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\> \| `Pick`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>, `K`\> \| `Pick`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

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
| `nextState` | `Readonly`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`ContextType`\>\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate
