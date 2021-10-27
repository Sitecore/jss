[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldFactory

# Class: FieldFactory

Maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
into an implementing React component - this is very similar to the JSS componentFactory,
but it maps form element components instead of layout components

## Table of contents

### Constructors

- [constructor](FieldFactory.md#constructor)

### Properties

- [\_defaultComponent](FieldFactory.md#_defaultcomponent)
- [\_fieldMap](FieldFactory.md#_fieldmap)

### Methods

- [get](FieldFactory.md#get)
- [setComponent](FieldFactory.md#setcomponent)
- [setComponentNotFoundComponent](FieldFactory.md#setcomponentnotfoundcomponent)

## Constructors

### constructor

• **new FieldFactory**()

#### Defined in

[src/field-factory.tsx:18](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L18)

## Properties

### \_defaultComponent

• `Private` **\_defaultComponent**: `ComponentType`<`FormField`<`ViewModel`\>\>

#### Defined in

[src/field-factory.tsx:16](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L16)

___

### \_fieldMap

• `Private` **\_fieldMap**: `Map`<`string`, `ComponentType`<`unknown`\>\>

#### Defined in

[src/field-factory.tsx:15](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L15)

## Methods

### get

▸ **get**(`field`, `props`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `FormField`<`ViewModel`\> |
| `props` | [`FieldProps`](../interfaces/FieldProps.md)<`FormField`<`ViewModel`\>\> |

#### Returns

`ReactNode`

#### Defined in

[src/field-factory.tsx:35](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L35)

___

### setComponent

▸ **setComponent**<`TProps`\>(`type`, `component`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TProps` | extends [`FieldProps`](../interfaces/FieldProps.md)<`FormField`<`ViewModel`\>, `TProps`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`FieldTypes`](../enums/FieldTypes.md) |
| `component` | `FormFieldComponent`<`TProps`\> |

#### Returns

`void`

#### Defined in

[src/field-factory.tsx:31](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L31)

___

### setComponentNotFoundComponent

▸ **setComponentNotFoundComponent**(`component`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `ComponentType`<`FormField`<`ViewModel`\>\> |

#### Returns

`void`

#### Defined in

[src/field-factory.tsx:27](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react-forms/src/field-factory.tsx#L27)
