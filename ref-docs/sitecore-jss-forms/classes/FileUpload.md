[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FileUpload

# Class: FileUpload

## Hierarchy

- `Component`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\>

  ↳ **`FileUpload`**

## Table of contents

### Constructors

- [constructor](FileUpload.md#constructor)

### Properties

- [SIZE\_UNITS](FileUpload.md#size_units)
- [context](FileUpload.md#context)
- [fileInputRef](FileUpload.md#fileinputref)
- [props](FileUpload.md#props)
- [refs](FileUpload.md#refs)
- [state](FileUpload.md#state)
- [contextType](FileUpload.md#contexttype)

### Methods

- [UNSAFE\_componentWillMount](FileUpload.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](FileUpload.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](FileUpload.md#unsafe_componentwillupdate)
- [componentDidCatch](FileUpload.md#componentdidcatch)
- [componentDidMount](FileUpload.md#componentdidmount)
- [componentDidUpdate](FileUpload.md#componentdidupdate)
- [componentWillMount](FileUpload.md#componentwillmount)
- [componentWillReceiveProps](FileUpload.md#componentwillreceiveprops)
- [componentWillUnmount](FileUpload.md#componentwillunmount)
- [componentWillUpdate](FileUpload.md#componentwillupdate)
- [forceUpdate](FileUpload.md#forceupdate)
- [getEnabledValidation](FileUpload.md#getenabledvalidation)
- [getFileSizeUnitName](FileUpload.md#getfilesizeunitname)
- [getSnapshotBeforeUpdate](FileUpload.md#getsnapshotbeforeupdate)
- [onChangeField](FileUpload.md#onchangefield)
- [render](FileUpload.md#render)
- [setState](FileUpload.md#setstate)
- [shouldComponentUpdate](FileUpload.md#shouldcomponentupdate)

## Constructors

### constructor

• **new FileUpload**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\> \| `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |

#### Inherited from

Component<ValueFieldProps<FileInputViewModel\>\>.constructor

#### Defined in

node_modules/@types/react/index.d.ts:475

• **new FileUpload**(`props`, `context`)

**`deprecated`**

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\> |
| `context` | `any` |

#### Inherited from

Component<ValueFieldProps<FileInputViewModel\>\>.constructor

#### Defined in

node_modules/@types/react/index.d.ts:480

## Properties

### SIZE\_UNITS

• **SIZE\_UNITS**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/components/field-templates/file-upload.tsx:11](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L11)

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

### fileInputRef

• **fileInputRef**: `RefObject`<`HTMLInputElement`\>

#### Defined in

[src/components/field-templates/file-upload.tsx:9](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L9)

___

### props

• `Readonly` **props**: `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> & `Readonly`<`Object`\>

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

• **state**: `Readonly`<`Object`\>

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
| `nextProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
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
| `nextProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:771

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

▸ **componentDidUpdate**(`prevProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | [`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\> |

#### Returns

`void`

#### Overrides

Component.componentDidUpdate

#### Defined in

[src/components/field-templates/file-upload.tsx:18](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L18)

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
| `nextProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
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
| `nextProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:756

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

### getEnabledValidation

▸ **getEnabledValidation**(`itemId`): `undefined` \| `ValidationDataModel`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemId` | `string` |

#### Returns

`undefined` \| `ValidationDataModel`

#### Defined in

[src/components/field-templates/file-upload.tsx:24](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L24)

___

### getFileSizeUnitName

▸ **getFileSizeUnitName**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`string`

#### Defined in

[src/components/field-templates/file-upload.tsx:30](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L30)

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
| `prevProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
| `prevState` | `Readonly`<`Object`\> |

#### Returns

`any`

#### Inherited from

Component.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:676

___

### onChangeField

▸ **onChangeField**(`files`, `field`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | ``null`` \| `FileList` |
| `field` | `ValueFormField`<`FileInputViewModel`\> |
| `cb` | [`FieldChangeCallback`](../README.md#fieldchangecallback) |

#### Returns

`void`

#### Defined in

[src/components/field-templates/file-upload.tsx:34](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L34)

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

Component.render

#### Defined in

[src/components/field-templates/file-upload.tsx:98](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/components/field-templates/file-upload.tsx#L98)

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
| `state` | ``null`` \| {} \| (`prevState`: `Readonly`<`Object`\>, `props`: `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\>) => ``null`` \| {} \| `Pick`<`Object`, `K`\> \| `Pick`<`Object`, `K`\> |
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
| `nextProps` | `Readonly`<[`ValueFieldProps`](../README.md#valuefieldprops)<`FileInputViewModel`\>\> |
| `nextState` | `Readonly`<`Object`\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

Component.shouldComponentUpdate

#### Defined in

node_modules/@types/react/index.d.ts:630
