[@sitecore-jss/sitecore-jss-react-native](../README.md) / SitecoreContext

# Class: SitecoreContext

## Hierarchy

- `Component`<`SitecoreContextProps`\>

  ↳ **`SitecoreContext`**

## Table of contents

### Constructors

- [constructor](SitecoreContext.md#constructor)

### Properties

- [componentFactory](SitecoreContext.md#componentfactory)
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
- [setState](SitecoreContext.md#setstate)
- [shouldComponentUpdate](SitecoreContext.md#shouldcomponentupdate)

## Constructors

### constructor

• **new SitecoreContext**(`props`, `context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SitecoreContextProps` |
| `context` | `unknown` |

#### Overrides

React.Component&lt;SitecoreContextProps\&gt;.constructor

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:24](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L24)

## Properties

### componentFactory

• **componentFactory**: `ComponentFactory`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:22](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L22)

___

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:447

___

### props

• `Readonly` **props**: `Readonly`<`SitecoreContextProps`\> & `Readonly`<`Object`\>

#### Inherited from

React.Component.props

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:472

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:478

___

### state

• **state**: `Readonly`<`Object`\>

#### Inherited from

React.Component.state

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:473

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:429

___

### displayName

▪ `Static` **displayName**: `string` = `'SitecoreContext'`

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:20](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L20)

___

### propTypes

▪ `Static` **propTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Validator`<`any`\> |
| `componentFactory` | `Requireable`<`fn`\> |

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L15)

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:660

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:692

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
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.UNSAFE\_componentWillUpdate

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:720

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:589

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

React.Component.componentDidMount

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:568

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`SitecoreContextProps`\> |
| `prevState` | `Readonly`<`Object`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentDidUpdate

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:631

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:646

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:675

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:584

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
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

React.Component.componentWillUpdate

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:705

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

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:464

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
| `prevState` | `Readonly`<`Object`\> |

#### Returns

`any`

#### Inherited from

React.Component.getSnapshotBeforeUpdate

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:625

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

#### Defined in

[sitecore-jss-react-native/src/components/SitecoreContext.tsx:29](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-react-native/src/components/SitecoreContext.tsx#L29)

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
| `state` | {} \| (`prevState`: `Readonly`<`Object`\>, `props`: `Readonly`<`SitecoreContextProps`\>) => {} \| `Pick`<`Object`, `K`\> \| `Pick`<`Object`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

React.Component.setState

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:459

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
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

React.Component.shouldComponentUpdate

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:579
