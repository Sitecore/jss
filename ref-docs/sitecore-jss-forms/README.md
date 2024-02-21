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

### Type Aliases

- [FieldChangeCallback](README.md#fieldchangecallback)
- [LabelProps](README.md#labelprops)
- [ListFieldProps](README.md#listfieldprops)
- [ValueFieldProps](README.md#valuefieldprops)

### Functions

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
- [createDefaultFieldFactory](README.md#createdefaultfieldfactory)

## Type Aliases

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

[src/FieldProps.ts:54](https://github.com/Sitecore/jss/blob/f015de159/packages/sitecore-jss-react-forms/src/FieldProps.ts#L54)

___

### LabelProps

Ƭ **LabelProps**\<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)\<`ValueFormField`\<`TViewModel`\>, `string` \| `string`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `InputViewModel` = `InputViewModel` |

#### Defined in

[src/FieldProps.ts:69](https://github.com/Sitecore/jss/blob/f015de159/packages/sitecore-jss-react-forms/src/FieldProps.ts#L69)

___

### ListFieldProps

Ƭ **ListFieldProps**\<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)\<`ValueFormField`\<`TViewModel`\>, `string`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `ListViewModel` = `ListViewModel` |

#### Defined in

[src/FieldProps.ts:61](https://github.com/Sitecore/jss/blob/f015de159/packages/sitecore-jss-react-forms/src/FieldProps.ts#L61)

___

### ValueFieldProps

Ƭ **ValueFieldProps**\<`TViewModel`\>: [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)\<`ValueFormField`\<`TViewModel`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TViewModel` | extends `InputViewModel` = `InputViewModel` |

#### Defined in

[src/FieldProps.ts:65](https://github.com/Sitecore/jss/blob/f015de159/packages/sitecore-jss-react-forms/src/FieldProps.ts#L65)

## Functions

### Button

▸ **Button**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FieldProps`](interfaces/FieldProps.md)\<`ButtonFormField`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Checkbox

▸ **Checkbox**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`InputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### CheckboxList

▸ **CheckboxList**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ListFieldProps`](README.md#listfieldprops)\<`ListViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### DateField

▸ **DateField**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`DateInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### DropdownList

▸ **DropdownList**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ListFieldProps`](README.md#listfieldprops)\<`DropdownListViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Email

▸ **Email**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`StringInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Label

▸ **Label**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LabelProps`](README.md#labelprops)\<`InputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### ListBox

▸ **ListBox**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ListFieldProps`](README.md#listfieldprops)\<`ListBoxViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### MultipleLineText

▸ **MultipleLineText**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`MultiLineStringInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### NumberField

▸ **NumberField**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`NumberInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Password

▸ **Password**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`StringInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### RadioButtonList

▸ **RadioButtonList**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ListFieldProps`](README.md#listfieldprops)\<`ListViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Section

▸ **Section**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FieldProps`](interfaces/FieldProps.md)\<`FormFieldSection`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### SingleLineText

▸ **SingleLineText**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`StringInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### Telephone

▸ **Telephone**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ValueFieldProps`](README.md#valuefieldprops)\<`StringInputViewModel`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### TextField

▸ **TextField**(`props`, `context?`): ``null`` \| `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FieldWithValueProps`](interfaces/FieldWithValueProps.md)\<`FormField`\<`TextViewModel`\>, `string`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`\<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:568

___

### createDefaultFieldFactory

▸ **createDefaultFieldFactory**(): [`FieldFactory`](classes/FieldFactory.md)

Create default field factory

#### Returns

[`FieldFactory`](classes/FieldFactory.md)

#### Defined in

[src/default-field-factory.tsx:23](https://github.com/Sitecore/jss/blob/f015de159/packages/sitecore-jss-react-forms/src/default-field-factory.tsx#L23)
