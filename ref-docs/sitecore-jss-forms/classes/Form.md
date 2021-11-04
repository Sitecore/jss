[@sitecore-jss/sitecore-jss-react-forms](../README.md) / Form

# Class: Form

## Hierarchy

- `Component`<[`FormProps`](../interfaces/FormProps.md), `FormState` & `FieldStateCollection`\>

  ↳ **`Form`**

## Table of contents

### Constructors

- [constructor](Form.md#constructor)

### Properties

- [\_tracker](Form.md#_tracker)
- [context](Form.md#context)
- [props](Form.md#props)
- [refs](Form.md#refs)
- [state](Form.md#state)
- [contextType](Form.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](Form.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](Form.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](Form.md#unsafe_componentwillupdate)
- [collectCurrentFieldValues](Form.md#collectcurrentfieldvalues)
- [componentDidCatch](Form.md#componentdidcatch)
- [componentDidMount](Form.md#componentdidmount)
- [componentDidUpdate](Form.md#componentdidupdate)
- [componentWillMount](Form.md#componentwillmount)
- [componentWillReceiveProps](Form.md#componentwillreceiveprops)
- [componentWillUnmount](Form.md#componentwillunmount)
- [componentWillUpdate](Form.md#componentwillupdate)
- [createFieldComponent](Form.md#createfieldcomponent)
- [forceUpdate](Form.md#forceupdate)
- [getCurrentFieldState](Form.md#getcurrentfieldstate)
- [getSnapshotBeforeUpdate](Form.md#getsnapshotbeforeupdate)
- [onButtonClick](Form.md#onbuttonclick)
- [onFieldChange](Form.md#onfieldchange)
- [onSubmit](Form.md#onsubmit)
- [render](Form.md#render)
- [resetFieldsState](Form.md#resetfieldsstate)
- [setState](Form.md#setstate)
- [shouldComponentUpdate](Form.md#shouldcomponentupdate)

## Constructors

### constructor

• **new Form**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FormProps`](../interfaces/FormProps.md) |

#### Overrides

Component&lt;FormProps, FormState &amp; FieldStateCollection\&gt;.constructor

#### Defined in

[src/components/form.tsx:66](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L66)

## Properties

### \_tracker

• `Private` **\_tracker**: `FormTracker`

#### Defined in

[src/components/form.tsx:64](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L64)

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

Component.context

#### Defined in

node_modules/@types/react/index.d.ts:473

___

### props

• `Readonly` **props**: `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> & `Readonly`<`Object`\>

#### Inherited from

Component.props

#### Defined in

node_modules/@types/react/index.d.ts:498

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

Component.refs

#### Defined in

node_modules/@types/react/index.d.ts:504

___

### state

• **state**: `Readonly`<`FormState` & `FieldStateCollection`\>

#### Inherited from

Component.state

#### Defined in

node_modules/@types/react/index.d.ts:499

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

Component.contextType

#### Defined in

node_modules/@types/react/index.d.ts:455

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

Component.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:711

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
| `nextProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:743

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
| `nextProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`<`FormState` & `FieldStateCollection`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

___

### collectCurrentFieldValues

▸ **collectCurrentFieldValues**(): { `fieldName`: `string` ; `state`: `FieldState`  }[]

#### Returns

{ `fieldName`: `string` ; `state`: `FieldState`  }[]

#### Defined in

[src/components/form.tsx:315](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L315)

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

Component.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:640

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

Component.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:619

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `prevState` | `Readonly`<`FormState` & `FieldStateCollection`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:682

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

Component.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:697

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
| `nextProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:726

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

Component.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:635

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
| `nextProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`<`FormState` & `FieldStateCollection`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

___

### createFieldComponent

▸ **createFieldComponent**(`field`): `ReactNode`

Creates a field component to render a field based on the form schema data

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `FormField`<`ViewModel`\> |

#### Returns

`ReactNode`

field component

#### Defined in

[src/components/form.tsx:129](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L129)

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

Component.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:490

___

### getCurrentFieldState

▸ **getCurrentFieldState**(`field`): ``null`` \| `FieldState`

Acquires the current form field state for a single field.
This state can come from two possible sources:
- The form schema/current data (default values, previously saved steps in multistep)
- This component's state (the mutated state of the field after user changes)
The field state includes both current value as well as current validity.

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `FormField`<`ViewModel`\> |

#### Returns

``null`` \| `FieldState`

field state

#### Defined in

[src/components/form.tsx:161](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L161)

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
| `prevProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `prevState` | `Readonly`<`FormState` & `FieldStateCollection`\> |

#### Returns

`any`

#### Inherited from

Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onButtonClick

▸ **onButtonClick**(`buttonName`): `void`

Handler triggered by child components that informs us which button triggered a submit.
This is important for multistep forms to disambiguate between back and next/submit buttons.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buttonName` | `string` |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:205](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L205)

___

### onFieldChange

▸ **onFieldChange**(`key`, `value`, `isValid`, `errors`): `void`

Handler triggered by child components that updates a given field's current value
(which we then push back down to the child via prop)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Field's name attribute |
| `value` | `string` \| `File`[] \| `string`[] | New field value |
| `isValid` | `boolean` | Whether the field is valid or not |
| `errors` | `string`[] | Validation error message(s) if field is invalid |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:217](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L217)

___

### onSubmit

▸ **onSubmit**(`e`): `void`

Handler triggered when the form is submitted. May transition its state between
steps in a multistep form or handle a final submit.

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `FormEvent`<`Element`\> |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:233](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L233)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

Component.render

#### Defined in

[src/components/form.tsx:88](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L88)

___

### resetFieldsState

▸ **resetFieldsState**(): `void`

Removes the current fields' mutated state from this.state,
which prevents validation issues and mutable field state from following us
across steps in a multistep form.

#### Returns

`void`

#### Defined in

[src/components/form.tsx:328](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-react-forms/src/components/form.tsx#L328)

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| `FormState` & `FieldStateCollection` \| (`prevState`: `Readonly`<`FormState` & `FieldStateCollection`\>, `props`: `Readonly`<[`FormProps`](../interfaces/FormProps.md)\>) => ``null`` \| `FormState` & `FieldStateCollection` \| `Pick`<`FormState` & `FieldStateCollection`, `K`\> \| `Pick`<`FormState` & `FieldStateCollection`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Component.setState

#### Defined in

node_modules/@types/react/index.d.ts:485

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
| `nextProps` | `Readonly`<[`FormProps`](../interfaces/FormProps.md)\> |
| `nextState` | `Readonly`<`FormState` & `FieldStateCollection`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
