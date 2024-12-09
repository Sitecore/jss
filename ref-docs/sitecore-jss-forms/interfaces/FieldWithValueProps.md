[**@sitecore-jss/sitecore-jss-react-forms**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldWithValueProps

# Interface: FieldWithValueProps\<TFormField, TValueType\>

## Extends

- [`FieldProps`](FieldProps.md)\<`TFormField`\>

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TFormField` *extends* `FormField` | `FormField` |
| `TValueType` *extends* `string` \| `string`[] | `string` |

## Properties

### children?

> `optional` **children**: `ReactNode`

#### Defined in

[src/FieldProps.ts:51](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L51)

***

### errors

> **errors**: `string`[]

If the field is not valid, this contains a list of messages detailing why

#### Defined in

[src/FieldProps.ts:32](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L32)

***

### field

> **field**: `TFormField`

Form field schema data

#### Overrides

[`FieldProps`](FieldProps.md).[`field`](FieldProps.md#field)

#### Defined in

[src/FieldProps.ts:26](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L26)

***

### fieldFactory()

> **fieldFactory**: (`field`) => `ReactNode`

Function that can be called to create child form field components (used for sections)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField`\<`ViewModel`\> |

#### Returns

`ReactNode`

#### Overrides

[`FieldProps`](FieldProps.md).[`fieldFactory`](FieldProps.md#fieldfactory)

#### Defined in

[src/FieldProps.ts:34](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L34)

***

### fieldValidationErrorsComponent?

> `optional` **fieldValidationErrorsComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

Optionally override the field validation errors display component for any field components that render validation errors

#### Defined in

[src/FieldProps.ts:44](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L44)

***

### isValid

> **isValid**: `boolean`

Whether the field is currently in a valid state (always starts as true until user input)

#### Defined in

[src/FieldProps.ts:30](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L30)

***

### key?

> `optional` **key**: `string`

#### Overrides

[`FieldProps`](FieldProps.md).[`key`](FieldProps.md#key)

#### Defined in

[src/FieldProps.ts:49](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L49)

***

### labelComponent?

> `optional` **labelComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

Optionally override the label component for any field components that render a label

#### Defined in

[src/FieldProps.ts:41](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L41)

***

### onButtonClick()

> **onButtonClick**: (`buttonFieldName`) => `void`

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buttonFieldName` | `string` |

#### Returns

`void`

#### Overrides

[`FieldProps`](FieldProps.md).[`onButtonClick`](FieldProps.md#onbuttonclick)

#### Defined in

[src/FieldProps.ts:38](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L38)

***

### onChange

> **onChange**: [`FieldChangeCallback`](../type-aliases/FieldChangeCallback.md)

Callback for when the value of the form field changes. Will cause the parent form state and value prop to be updated.

#### Defined in

[src/FieldProps.ts:36](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L36)

***

### tracker

> **tracker**: `FormTracker`

Analytics tracker on form field actions

#### Defined in

[src/FieldProps.ts:47](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L47)

***

### value

> **value**: `TValueType`

The current value of the form field

#### Defined in

[src/FieldProps.ts:28](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-react-forms/src/FieldProps.ts#L28)
