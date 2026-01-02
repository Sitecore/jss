[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FileUpload

# Class: FileUpload

Defined in: [src/components/field-templates/file-upload.tsx:8](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L8)

## Extends

- `Component`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\>

## Constructors

### Constructor

> **new FileUpload**(`props`): `FileUpload`

Defined in: node\_modules/@types/react/index.d.ts:949

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md) |

#### Returns

`FileUpload`

#### Inherited from

`Component<ValueFieldProps<FileInputViewModel>>.constructor`

### Constructor

> **new FileUpload**(`props`, `context`): `FileUpload`

Defined in: node\_modules/@types/react/index.d.ts:957

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md) |  |
| `context` | `any` | value of the parent [Context](https://react.dev/reference/react/Component#context) specified in `contextType`. |

#### Returns

`FileUpload`

#### Inherited from

`Component<ValueFieldProps<FileInputViewModel>>.constructor`

## Properties

### context

> **context**: `unknown`

Defined in: node\_modules/@types/react/index.d.ts:946

If using React Context, re-declare this in your class to be the
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

`Component.context`

***

### fileInputRef

> **fileInputRef**: `RefObject`\<`null` \| `HTMLInputElement`\>

Defined in: [src/components/field-templates/file-upload.tsx:9](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L9)

***

### props

> `readonly` **props**: `Readonly`\<`P`\>

Defined in: node\_modules/@types/react/index.d.ts:970

#### Inherited from

`Component.props`

***

### SIZE\_UNITS

> **SIZE\_UNITS**: `object`

Defined in: [src/components/field-templates/file-upload.tsx:11](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L11)

#### Index Signature

\[`key`: `string`\]: `string`

***

### state

> **state**: `Readonly`\<`S`\>

Defined in: node\_modules/@types/react/index.d.ts:971

#### Inherited from

`Component.state`

***

### contextType?

> `static` `optional` **contextType**: `Context`\<`any`\>

Defined in: node\_modules/@types/react/index.d.ts:922

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

`Component.contextType`

***

### ~~propTypes?~~

> `static` `optional` **propTypes**: `any`

Defined in: node\_modules/@types/react/index.d.ts:928

Ignored by React.

#### Deprecated

Only kept in types for backwards compatibility. Will be removed in a future major release.

#### Inherited from

`Component.propTypes`

## Methods

### componentDidCatch()?

> `optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Defined in: node\_modules/@types/react/index.d.ts:1210

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

`Component.componentDidCatch`

***

### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Defined in: node\_modules/@types/react/index.d.ts:1189

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

`Component.componentDidMount`

***

### componentDidUpdate()

> **componentDidUpdate**(`prevProps`): `void`

Defined in: [src/components/field-templates/file-upload.tsx:18](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L18)

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](#getsnapshotbeforeupdate) is present and returns non-null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\> |

#### Returns

`void`

#### Overrides

`Component.componentDidUpdate`

***

### ~~componentWillMount()?~~

> `optional` **componentWillMount**(): `void`

Defined in: node\_modules/@types/react/index.d.ts:1268

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

`Component.componentWillMount`

***

### ~~componentWillReceiveProps()?~~

> `optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/@types/react/index.d.ts:1299

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling Component.setState generally does not trigger this method.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead; will stop working in React 17

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`Component.componentWillReceiveProps`

***

### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Defined in: node\_modules/@types/react/index.d.ts:1205

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

`Component.componentWillUnmount`

***

### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/@types/react/index.d.ts:1331

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call Component.setState here.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

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

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`Component.componentWillUpdate`

***

### forceUpdate()

> **forceUpdate**(`callback?`): `void`

Defined in: node\_modules/@types/react/index.d.ts:967

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

`Component.forceUpdate`

***

### getEnabledValidation()

> **getEnabledValidation**(`itemId`): `undefined` \| `ValidationDataModel`

Defined in: [src/components/field-templates/file-upload.tsx:24](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L24)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemId` | `string` |

#### Returns

`undefined` \| `ValidationDataModel`

***

### getFileSizeUnitName()

> **getFileSizeUnitName**(`value`): `string`

Defined in: [src/components/field-templates/file-upload.tsx:30](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`string`

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Defined in: node\_modules/@types/react/index.d.ts:1246

Runs before React applies the result of Component.render render to the document, and
returns an object to be given to [componentDidUpdate](#componentdidupdate). Useful for saving
things such as scroll position before Component.render render causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<`P`\> |
| `prevState` | `Readonly`\<`S`\> |

#### Returns

`any`

#### Inherited from

`Component.getSnapshotBeforeUpdate`

***

### onChangeField()

> **onChangeField**(`files`, `field`, `cb`): `void`

Defined in: [src/components/field-templates/file-upload.tsx:34](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `files` | `null` \| `FileList` |
| `field` | `ValueFormField`\<`FileInputViewModel`\> |
| `cb` | [`FieldChangeCallback`](../type-aliases/FieldChangeCallback.md) |

#### Returns

`void`

***

### render()

> **render**(): `Element`

Defined in: [src/components/field-templates/file-upload.tsx:98](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L98)

#### Returns

`Element`

#### Overrides

`Component.render`

***

### setState()

> **setState**\<`K`\>(`state`, `callback?`): `void`

Defined in: node\_modules/@types/react/index.d.ts:962

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `never` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | `null` \| \{ \} \| (`prevState`, `props`) => `null` \| \{ \} \| `Pick`\<\{ \}, `K`\> \| `Pick`\<\{ \}, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

`Component.setState`

***

### shouldComponentUpdate()?

> `optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Defined in: node\_modules/@types/react/index.d.ts:1200

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, Component.render, `componentWillUpdate`
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

`Component.shouldComponentUpdate`

***

### ~~UNSAFE\_componentWillMount()?~~

> `optional` **UNSAFE\_componentWillMount**(): `void`

Defined in: node\_modules/@types/react/index.d.ts:1283

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

`Component.UNSAFE_componentWillMount`

***

### ~~UNSAFE\_componentWillReceiveProps()?~~

> `optional` **UNSAFE\_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Defined in: node\_modules/@types/react/index.d.ts:1317

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling Component.setState generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<`P`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Deprecated

16.3, use static StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps instead

#### See

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`Component.UNSAFE_componentWillReceiveProps`

***

### ~~UNSAFE\_componentWillUpdate()?~~

> `optional` **UNSAFE\_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Defined in: node\_modules/@types/react/index.d.ts:1347

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call Component.setState here.

This method will not stop working in React 17.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

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

 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update)
 - [https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path)

#### Inherited from

`Component.UNSAFE_componentWillUpdate`
