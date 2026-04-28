[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldFactory

# Class: FieldFactory

<<<<<<< HEAD
Defined in: [src/field-factory.tsx:14](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/field-factory.tsx#L14)
=======
Defined in: [src/field-factory.tsx:14](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/field-factory.tsx#L14)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
into an implementing React component - this is very similar to the JSS componentFactory,
but it maps form element components instead of layout components

## Constructors

### Constructor

> **new FieldFactory**(): `FieldFactory`

<<<<<<< HEAD
Defined in: [src/field-factory.tsx:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/field-factory.tsx#L18)
=======
Defined in: [src/field-factory.tsx:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/field-factory.tsx#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Returns

`FieldFactory`

## Methods

### get()

> **get**(`field`, `props`): `ReactNode`

<<<<<<< HEAD
Defined in: [src/field-factory.tsx:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/field-factory.tsx#L37)
=======
Defined in: [src/field-factory.tsx:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/field-factory.tsx#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |
| `props` | [`FieldProps`](../interfaces/FieldProps.md) |

#### Returns

`ReactNode`

***

### setComponent()

> **setComponent**\<`TProps`\>(`type`, `component`): `void`

<<<<<<< HEAD
Defined in: [src/field-factory.tsx:30](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/field-factory.tsx#L30)
=======
Defined in: [src/field-factory.tsx:30](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/field-factory.tsx#L30)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Type Parameters

| Type Parameter |
| ------ |
| `TProps` *extends* [`FieldProps`](../interfaces/FieldProps.md)\<`FormField`\<`ViewModel`\>\> |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `component` | `FormFieldComponent`\<`TProps`\> |

#### Returns

`void`

***

### setComponentNotFoundComponent()

> **setComponentNotFoundComponent**(`component`): `void`

<<<<<<< HEAD
Defined in: [src/field-factory.tsx:26](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/field-factory.tsx#L26)
=======
Defined in: [src/field-factory.tsx:26](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/field-factory.tsx#L26)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `component` | `ComponentType`\<`FormField`\<`ViewModel`\>\> |

#### Returns

`void`
