[@sitecore-jss/sitecore-jss-react](../README.md) / BYOCComponent

# Class: BYOCComponent

BYOCComponent facilitate the rendering of external components. It manages potential errors,
missing components, and customization of error messages or alternative rendering components.

**`Param`**

component props

## Hierarchy

- `Component`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>

  ↳ **`BYOCComponent`**

## Table of contents

### Constructors

- [constructor](BYOCComponent.md#constructor)

### Properties

- [context](BYOCComponent.md#context)
- [props](BYOCComponent.md#props)
- [refs](BYOCComponent.md#refs)
- [state](BYOCComponent.md#state)
- [contextType](BYOCComponent.md#contexttype)

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

React.Component&lt;BYOCComponentProps\&gt;.constructor

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:87](https://github.com/Sitecore/jss/blob/c8e1faa23/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L87)

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

https://react.dev/reference/react/Component#context

#### Inherited from

React.Component.context

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:482

___

### props

• `Readonly` **props**: `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>

#### Inherited from

React.Component.props

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:502

___

### refs

• **refs**: `Object`

**`Deprecated`**

https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

React.Component.refs

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:508

___

### state

• **state**: `Readonly`<{ `error?`: `Error`  }\>

#### Overrides

React.Component.state

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:85](https://github.com/Sitecore/jss/blob/c8e1faa23/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L85)

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

https://react.dev/reference/react/Component#static-contexttype

#### Inherited from

React.Component.contextType

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:465

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:699

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillReceiveProps

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:731

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:759

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

[sitecore-jss-react/src/components/BYOCComponent.tsx:97](https://github.com/Sitecore/jss/blob/c8e1faa23/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L97)

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:607

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `prevState` | `Readonly`<{}\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:670

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

React.Component.componentWillMount

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:685

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillReceiveProps

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:714

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

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:623

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

 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
 - https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:744

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

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:499

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
| `prevProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `prevState` | `Readonly`<{}\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:664

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:101](https://github.com/Sitecore/jss/blob/c8e1faa23/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L101)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | {} \| (`prevState`: `Readonly`<{}\>, `props`: `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\>) => {} \| `Pick`<{}, `K`\> \| `Pick`<{}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:494

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
| `nextProps` | `Readonly`<[`BYOCComponentProps`](../README.md#byoccomponentprops)\> |
| `nextState` | `Readonly`<{}\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:618

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

[sitecore-jss-react/src/components/BYOCComponent.tsx:92](https://github.com/Sitecore/jss/blob/c8e1faa23/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L92)
