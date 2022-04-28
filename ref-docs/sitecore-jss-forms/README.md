@sitecore-jss/sitecore-jss-react-forms

# @sitecore-jss/sitecore-jss-react-forms

## Table of contents

### Enumerations

- [FieldTypes](enums/FieldTypes.md)
- [ValidationDataModels](enums/ValidationDataModels.md)

### Classes

- [FieldFactory](classes/FieldFactory.md)
- [FileUpload](classes/FileUpload.md)
- [Form](classes/Form.md)

### Interfaces

- [ErrorComponentProps](interfaces/ErrorComponentProps.md)
- [FieldProps](interfaces/FieldProps.md)
- [FieldWithValueProps](interfaces/FieldWithValueProps.md)
- [FormProps](interfaces/FormProps.md)

### Type aliases

- [FieldChangeCallback](README.md#fieldchangecallback)
- [LabelProps](README.md#labelprops)
- [ListFieldProps](README.md#listfieldprops)
- [ValueFieldProps](README.md#valuefieldprops)

### Variables

- [Button](README.md#button)
- [Checkbox](README.md#checkbox)
- [CheckboxList](README.md#checkboxlist)
- [DateField](README.md#datefield)
- [DropdownList](README.md#dropdownlist)
- [Email](README.md#email)
- [Label](README.md#label)
- [ListBox](README.md#listbox)
- [MultipleLineText](README.md#multiplelinetext)
- [NumberField](README.md#numberfield)
- [Password](README.md#password)
- [RadioButtonList](README.md#radiobuttonlist)
- [Section](README.md#section)
- [SingleLineText](README.md#singlelinetext)
- [Telephone](README.md#telephone)
- [TextField](README.md#textfield)

### Functions

- [createDefaultFieldFactory](README.md#createdefaultfieldfactory)

## Type aliases

### FieldChangeCallback

Ƭ **FieldChangeCallback**: (`fieldName`: `string`, `newValue`: `string` \| `string`[] \| `File`[] \| `boolean`, `isValid`: `boolean`, `errorMessages`: `string`[]) => `void`

#### Type declaration

▸ (`fieldName`, `newValue`, `isValid`, `errorMessages`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |
| `newValue` | `string` \| `string`[] \| `File`[] \| `boolean` |
| `isValid` | `boolean` |
| `errorMessages` | `string`[] |

##### Returns

`void`

#### Defined in

[src/FieldProps.ts:52](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L52)

___

### LabelProps

Ƭ **LabelProps**<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)<`ValueFormField`<`TViewModel`\>, `string` \| `string`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `InputViewModel``InputViewModel` |

#### Defined in

[src/FieldProps.ts:67](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L67)

___

### ListFieldProps

Ƭ **ListFieldProps**<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)<`ValueFormField`<`TViewModel`\>, `string`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `ListViewModel``ListViewModel` |

#### Defined in

[src/FieldProps.ts:59](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L59)

___

### ValueFieldProps

Ƭ **ValueFieldProps**<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)<`ValueFormField`<`TViewModel`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `InputViewModel``InputViewModel` |

#### Defined in

[src/FieldProps.ts:63](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L63)

## Variables

### Button

• **Button**: `React.FunctionComponent`<[`FieldProps`](interfaces/FieldProps.md)<`ButtonFormField`\>\>

#### Defined in

[src/components/field-templates/button.tsx:9](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/button.tsx#L9)

___

### Checkbox

• **Checkbox**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)\>

#### Defined in

[src/components/field-templates/checkbox.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/checkbox.tsx#L7)

___

### CheckboxList

• **CheckboxList**: `React.FunctionComponent`<[`ListFieldProps`](README.md#listfieldprops)\>

#### Defined in

[src/components/field-templates/checkbox-list.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/checkbox-list.tsx#L7)

___

### DateField

• **DateField**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`DateInputViewModel`\>\>

#### Defined in

[src/components/field-templates/date.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/date.tsx#L7)

___

### DropdownList

• **DropdownList**: `React.FunctionComponent`<[`ListFieldProps`](README.md#listfieldprops)<`DropdownListViewModel`\>\>

#### Defined in

[src/components/field-templates/dropdown-list.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/dropdown-list.tsx#L7)

___

### Email

• **Email**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`StringInputViewModel`\>\>

#### Defined in

[src/components/field-templates/email.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/email.tsx#L7)

___

### Label

• **Label**: `React.FunctionComponent`<[`LabelProps`](README.md#labelprops)\>

#### Defined in

[src/components/field-templates/label.tsx:4](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/label.tsx#L4)

___

### ListBox

• **ListBox**: `React.FunctionComponent`<[`ListFieldProps`](README.md#listfieldprops)<`ListBoxViewModel`\>\>

#### Defined in

[src/components/field-templates/list-box.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/list-box.tsx#L7)

___

### MultipleLineText

• **MultipleLineText**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`MultiLineStringInputViewModel`\>\>

#### Defined in

[src/components/field-templates/multiple-line-text.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/multiple-line-text.tsx#L7)

___

### NumberField

• **NumberField**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`NumberInputViewModel`\>\>

#### Defined in

[src/components/field-templates/number.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/number.tsx#L7)

___

### Password

• **Password**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`StringInputViewModel`\>\>

#### Defined in

[src/components/field-templates/password.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/password.tsx#L7)

___

### RadioButtonList

• **RadioButtonList**: `React.FunctionComponent`<[`ListFieldProps`](README.md#listfieldprops)\>

#### Defined in

[src/components/field-templates/radio-button-list.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/radio-button-list.tsx#L7)

___

### Section

• **Section**: `React.FunctionComponent`<[`FieldProps`](interfaces/FieldProps.md)<`FormFieldSection`\>\>

#### Defined in

[src/components/field-templates/section.tsx:5](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/section.tsx#L5)

___

### SingleLineText

• **SingleLineText**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`StringInputViewModel`\>\>

#### Defined in

[src/components/field-templates/single-line-text.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/single-line-text.tsx#L7)

___

### Telephone

• **Telephone**: `React.FunctionComponent`<[`ValueFieldProps`](README.md#valuefieldprops)<`StringInputViewModel`\>\>

#### Defined in

[src/components/field-templates/telephone.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/telephone.tsx#L7)

___

### TextField

• **TextField**: `React.FunctionComponent`<[`FieldWithValueProps`](interfaces/FieldWithValueProps.md)<`FormField`<`TextViewModel`\>, `string`\>\>

#### Defined in

[src/components/field-templates/text.tsx:5](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/components/field-templates/text.tsx#L5)

## Functions

### createDefaultFieldFactory

▸ **createDefaultFieldFactory**(): [`FieldFactory`](classes/FieldFactory.md)

Create default field factory

#### Returns

[`FieldFactory`](classes/FieldFactory.md)

#### Defined in

[src/default-field-factory.tsx:23](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/default-field-factory.tsx#L23)
