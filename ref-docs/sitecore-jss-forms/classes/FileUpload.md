[**@sitecore-jss/sitecore-jss-react-forms**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FileUpload

# Class: FileUpload

## Extends

- `Component`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\>

## Constructors

### new FileUpload()

> **new FileUpload**(`props`): [`FileUpload`](FileUpload.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\> |

#### Returns

[`FileUpload`](FileUpload.md)

#### Inherited from

`Component<ValueFieldProps<FileInputViewModel>>.constructor`

#### Defined in

node\_modules/@types/react/index.d.ts:1008

### new FileUpload()

> **new FileUpload**(`props`, `context`): [`FileUpload`](FileUpload.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\> |
| `context` | `any` |

#### Returns

[`FileUpload`](FileUpload.md)

#### Deprecated

#### See

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html)

#### Inherited from

`Component<ValueFieldProps<FileInputViewModel>>.constructor`

#### Defined in

node\_modules/@types/react/index.d.ts:1013

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

`Component.context`

#### Defined in

node\_modules/@types/react/index.d.ts:1006

***

### fileInputRef

> **fileInputRef**: `RefObject`\<`HTMLInputElement`\>

#### Defined in

[src/components/field-templates/file-upload.tsx:9](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L9)

***

### props

> `readonly` **props**: `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\>

#### Inherited from

`Component.props`

#### Defined in

node\_modules/@types/react/index.d.ts:1026

***

### ~~refs~~

> **refs**: `object`

#### Index Signature

 \[`key`: `string`\]: `ReactInstance`

#### Deprecated

#### See

[Legacy React Docs](https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)

#### Inherited from

`Component.refs`

#### Defined in

node\_modules/@types/react/index.d.ts:1033

***

### SIZE\_UNITS

> **SIZE\_UNITS**: `object`

#### Index Signature

 \[`key`: `string`\]: `string`

#### Defined in

[src/components/field-templates/file-upload.tsx:11](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L11)

***

### state

> **state**: `Readonly`\<`object`\>

#### Inherited from

`Component.state`

#### Defined in

node\_modules/@types/react/index.d.ts:1027

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

`Component.contextType`

#### Defined in

node\_modules/@types/react/index.d.ts:988

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

`Component.componentDidCatch`

#### Defined in

node\_modules/@types/react/index.d.ts:1390

***

### componentDidMount()?

> `optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

`Component.componentDidMount`

#### Defined in

node\_modules/@types/react/index.d.ts:1369

***

### componentDidUpdate()

> **componentDidUpdate**(`prevProps`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](FileUpload.md#getsnapshotbeforeupdate) is present and returns non-null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | [`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\> |

#### Returns

`void`

#### Overrides

`Component.componentDidUpdate`

#### Defined in

[src/components/field-templates/file-upload.tsx:18](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L18)

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

`Component.componentWillMount`

#### Defined in

node\_modules/@types/react/index.d.ts:1448

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

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
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

#### Defined in

node\_modules/@types/react/index.d.ts:1479

***

### componentWillUnmount()?

> `optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

`Component.componentWillUnmount`

#### Defined in

node\_modules/@types/react/index.d.ts:1385

***

### ~~componentWillUpdate()?~~

> `optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call Component.setState here.

Note: the presence of NewLifecycle.getSnapshotBeforeUpdate getSnapshotBeforeUpdate
or StaticLifecycle.getDerivedStateFromProps getDerivedStateFromProps prevents
this from being invoked.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`\<`object`\> |
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

#### Defined in

node\_modules/@types/react/index.d.ts:1511

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

`Component.forceUpdate`

#### Defined in

node\_modules/@types/react/index.d.ts:1023

***

### getEnabledValidation()

> **getEnabledValidation**(`itemId`): `undefined` \| `ValidationDataModel`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemId` | `string` |

#### Returns

`undefined` \| `ValidationDataModel`

#### Defined in

[src/components/field-templates/file-upload.tsx:24](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L24)

***

### getFileSizeUnitName()

> **getFileSizeUnitName**(`value`): `string`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`string`

#### Defined in

[src/components/field-templates/file-upload.tsx:30](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L30)

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of Component.render render to the document, and
returns an object to be given to [componentDidUpdate](FileUpload.md#componentdidupdate). Useful for saving
things such as scroll position before Component.render render causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
| `prevState` | `Readonly`\<`object`\> |

#### Returns

`any`

#### Inherited from

`Component.getSnapshotBeforeUpdate`

#### Defined in

node\_modules/@types/react/index.d.ts:1426

***

### onChangeField()

> **onChangeField**(`files`, `field`, `cb`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `files` | `null` \| `FileList` |
| `field` | `ValueFormField`\<`FileInputViewModel`\> |
| `cb` | [`FieldChangeCallback`](../type-aliases/FieldChangeCallback.md) |

#### Returns

`void`

#### Defined in

[src/components/field-templates/file-upload.tsx:34](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L34)

***

### render()

> **render**(): `Element`

#### Returns

`Element`

#### Overrides

`Component.render`

#### Defined in

[src/components/field-templates/file-upload.tsx:98](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L98)

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
| `state` | `null` \| `object` \| (`prevState`, `props`) => `null` \| `object` \| `Pick`\<`object`, `K`\> \| `Pick`\<`object`, `K`\> |
| `callback`? | () => `void` |

#### Returns

`void`

#### Inherited from

`Component.setState`

#### Defined in

node\_modules/@types/react/index.d.ts:1018

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

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`\<`object`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

`Component.shouldComponentUpdate`

#### Defined in

node\_modules/@types/react/index.d.ts:1380

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

`Component.UNSAFE_componentWillMount`

#### Defined in

node\_modules/@types/react/index.d.ts:1463

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

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
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

#### Defined in

node\_modules/@types/react/index.d.ts:1497

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

| Parameter | Type |
| ------ | ------ |
| `nextProps` | `Readonly`\<[`ValueFieldProps`](../type-aliases/ValueFieldProps.md)\<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`\<`object`\> |
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

#### Defined in

node\_modules/@types/react/index.d.ts:1527
