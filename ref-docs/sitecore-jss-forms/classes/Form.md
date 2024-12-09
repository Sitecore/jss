[**@sitecore-jss/sitecore-jss-react-forms**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / Form

# Class: Form

## Extends

- `Component`\<[`FormProps`](../interfaces/FormProps.md), `FormState` & `FieldStateCollection`\>

## Constructors

### new Form()

> **new Form**(`props`): [`Form`](Form.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`FormProps`](../interfaces/FormProps.md) |

#### Returns

[`Form`](Form.md)

#### Overrides

`Component<FormProps, FormState & FieldStateCollection>.constructor`

#### Defined in

[src/components/form.tsx:68](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L68)

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

### props

> `readonly` **props**: `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\>

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

### state

> **state**: `Readonly`\<`FormState` & `FieldStateCollection`\>

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

### collectCurrentFieldValues()

> **collectCurrentFieldValues**(): `object`[]

#### Returns

`object`[]

#### Defined in

[src/components/form.tsx:328](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L328)

***

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

### componentDidUpdate()?

> `optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot`?): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if [getSnapshotBeforeUpdate](Form.md#getsnapshotbeforeupdate) is present and returns non-null.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
| `prevState` | `Readonly`\<`FormState` & `FieldStateCollection`\> |
| `snapshot`? | `any` |

#### Returns

`void`

#### Inherited from

`Component.componentDidUpdate`

#### Defined in

node\_modules/@types/react/index.d.ts:1432

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
| `nextProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
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
| `nextProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`\<`FormState` & `FieldStateCollection`\> |
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

### createFieldComponent()

> **createFieldComponent**(`field`): `ReactNode`

Creates a field component to render a field based on the form schema data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | `FormField`\<`ViewModel`\> |  |

#### Returns

`ReactNode`

field component

#### Defined in

[src/components/form.tsx:135](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L135)

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

### getCurrentFieldState()

> **getCurrentFieldState**(`field`): `null` \| `FieldState`

Acquires the current form field state for a single field.
This state can come from two possible sources:
- The form schema/current data (default values, previously saved steps in multistep)
- This component's state (the mutated state of the field after user changes)
The field state includes both current value as well as current validity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | `FormField`\<`ViewModel`\> |  |

#### Returns

`null` \| `FieldState`

field state

#### Defined in

[src/components/form.tsx:167](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L167)

***

### getSnapshotBeforeUpdate()?

> `optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of Component.render render to the document, and
returns an object to be given to [componentDidUpdate](Form.md#componentdidupdate). Useful for saving
things such as scroll position before Component.render render causes changes to it.

Note: the presence of this method prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prevProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
| `prevState` | `Readonly`\<`FormState` & `FieldStateCollection`\> |

#### Returns

`any`

#### Inherited from

`Component.getSnapshotBeforeUpdate`

#### Defined in

node\_modules/@types/react/index.d.ts:1426

***

### onButtonClick()

> **onButtonClick**(`buttonName`): `void`

Handler triggered by child components that informs us which button triggered a submit.
This is important for multistep forms to disambiguate between back and next/submit buttons.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `buttonName` | `string` |  |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:211](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L211)

***

### onFieldChange()

> **onFieldChange**(`key`, `value`, `isValid`, `errors`): `void`

Handler triggered by child components that updates a given field's current value
(which we then push back down to the child via prop)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Field's name attribute |
| `value` | `string` \| `string`[] \| `File`[] | New field value |
| `isValid` | `boolean` | Whether the field is valid or not |
| `errors` | `string`[] | Validation error message(s) if field is invalid |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:223](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L223)

***

### onSubmit()

> **onSubmit**(`e`): `void`

Handler triggered when the form is submitted. May transition its state between
steps in a multistep form or handle a final submit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `e` | `FormEvent`\<`Element`\> |  |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:239](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L239)

***

### render()

> **render**(): `Element`

#### Returns

`Element`

#### Overrides

`Component.render`

#### Defined in

[src/components/form.tsx:90](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L90)

***

### resetFieldsState()

> **resetFieldsState**(): `void`

Removes the current fields' mutated state from this.state,
which prevents validation issues and mutable field state from following us
across steps in a multistep form.

#### Returns

`void`

#### Defined in

[src/components/form.tsx:341](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-react-forms/src/components/form.tsx#L341)

***

### setState()

> **setState**\<`K`\>(`state`, `callback`?): `void`

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `string` \| `number` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | `null` \| `FormState` & `FieldStateCollection` \| (`prevState`, `props`) => `null` \| `FormState` & `FieldStateCollection` \| `Pick`\<`FormState` & `FieldStateCollection`, `K`\> \| `Pick`\<`FormState` & `FieldStateCollection`, `K`\> |
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
| `nextProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`\<`FormState` & `FieldStateCollection`\> |
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
| `nextProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
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
| `nextProps` | `Readonly`\<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`\<`FormState` & `FieldStateCollection`\> |
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
