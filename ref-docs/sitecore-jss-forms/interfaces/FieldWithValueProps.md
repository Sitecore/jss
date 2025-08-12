[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldWithValueProps

# Interface: FieldWithValueProps\<TFormField, TValueType\>

Defined in: [src/FieldProps.ts:21](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L21)

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

Defined in: [src/FieldProps.ts:51](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L51)

***

### errors

> **errors**: `string`[]

Defined in: [src/FieldProps.ts:32](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L32)

If the field is not valid, this contains a list of messages detailing why

***

### field

> **field**: `TFormField`

Defined in: [src/FieldProps.ts:26](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L26)

Form field schema data

#### Overrides

[`FieldProps`](FieldProps.md).[`field`](FieldProps.md#field)

***

### fieldFactory()

> **fieldFactory**: (`field`) => `ReactNode`

Defined in: [src/FieldProps.ts:34](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L34)

Function that can be called to create child form field components (used for sections)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |

#### Returns

`ReactNode`

#### Overrides

[`FieldProps`](FieldProps.md).[`fieldFactory`](FieldProps.md#fieldfactory)

***

### fieldValidationErrorsComponent?

> `optional` **fieldValidationErrorsComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

Defined in: [src/FieldProps.ts:44](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L44)

Optionally override the field validation errors display component for any field components that render validation errors

***

### isValid

> **isValid**: `boolean`

Defined in: [src/FieldProps.ts:30](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L30)

Whether the field is currently in a valid state (always starts as true until user input)

***

### key?

> `optional` **key**: `string`

Defined in: [src/FieldProps.ts:49](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L49)

#### Overrides

[`FieldProps`](FieldProps.md).[`key`](FieldProps.md#key)

***

### labelComponent?

> `optional` **labelComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

Defined in: [src/FieldProps.ts:41](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L41)

Optionally override the label component for any field components that render a label

***

### onButtonClick()

> **onButtonClick**: (`buttonFieldName`) => `void`

Defined in: [src/FieldProps.ts:38](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L38)

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buttonFieldName` | `string` |

#### Returns

`void`

#### Overrides

[`FieldProps`](FieldProps.md).[`onButtonClick`](FieldProps.md#onbuttonclick)

***

### onChange

> **onChange**: [`FieldChangeCallback`](../type-aliases/FieldChangeCallback.md)

Defined in: [src/FieldProps.ts:36](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L36)

Callback for when the value of the form field changes. Will cause the parent form state and value prop to be updated.

***

### tracker

> **tracker**: `FormTracker`

Defined in: [src/FieldProps.ts:47](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L47)

Analytics tracker on form field actions

***

### value

> **value**: `TValueType`

Defined in: [src/FieldProps.ts:28](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-react-forms/src/FieldProps.ts#L28)

The current value of the form field
