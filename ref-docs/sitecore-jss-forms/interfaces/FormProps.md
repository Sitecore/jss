[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FormProps

# Interface: FormProps

## Table of contents

### Properties

- [className](FormProps.md#classname)
- [errorComponent](FormProps.md#errorcomponent)
- [fieldFactory](FormProps.md#fieldfactory)
- [fieldValidationErrorsComponent](FormProps.md#fieldvalidationerrorscomponent)
- [fieldWrapperComponent](FormProps.md#fieldwrappercomponent)
- [form](FormProps.md#form)
- [formFetcher](FormProps.md#formfetcher)
- [labelComponent](FormProps.md#labelcomponent)
- [language](FormProps.md#language)
- [onRedirect](FormProps.md#onredirect)
- [sitecoreApiHost](FormProps.md#sitecoreapihost)
- [sitecoreApiKey](FormProps.md#sitecoreapikey)
- [trackerFetcher](FormProps.md#trackerfetcher)

## Properties

### className

• `Optional` **className**: `string`

#### Defined in

[src/components/form.tsx:27](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L27)

___

### errorComponent

• `Optional` **errorComponent**: `ComponentType`<[`ErrorComponentProps`](ErrorComponentProps.md)\>

#### Defined in

[src/components/form.tsx:32](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L32)

___

### fieldFactory

• `Optional` **fieldFactory**: [`FieldFactory`](../classes/FieldFactory.md)

#### Defined in

[src/components/form.tsx:28](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L28)

___

### fieldValidationErrorsComponent

• `Optional` **fieldValidationErrorsComponent**: `ComponentType`<[`LabelProps`](../README.md#labelprops)<`InputViewModel`\>\>

Optionally override the field validation errors display component for any field components that render validation errors

#### Defined in

[src/components/form.tsx:39](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L39)

___

### fieldWrapperComponent

• `Optional` **fieldWrapperComponent**: `ComponentType`<[`FieldWithValueProps`](FieldWithValueProps.md)<`FormField`<`ViewModel`\>, `string`\>\>

#### Defined in

[src/components/form.tsx:33](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L33)

___

### form

• **form**: `SitecoreForm`

#### Defined in

[src/components/form.tsx:25](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L25)

___

### formFetcher

• `Optional` **formFetcher**: `FormFetcher`

Fetch function used when submitting the form (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:42](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L42)

___

### labelComponent

• `Optional` **labelComponent**: `ComponentType`<[`LabelProps`](../README.md#labelprops)<`InputViewModel`\>\>

Optionally override the label component for any field components that render a label

#### Defined in

[src/components/form.tsx:36](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L36)

___

### language

• `Optional` **language**: `string`

#### Defined in

[src/components/form.tsx:26](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L26)

___

### onRedirect

• `Optional` **onRedirect**: (`url`: `string`) => `void`

#### Type declaration

▸ (`url`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

##### Returns

`void`

#### Defined in

[src/components/form.tsx:31](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L31)

___

### sitecoreApiHost

• **sitecoreApiHost**: `string`

#### Defined in

[src/components/form.tsx:29](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L29)

___

### sitecoreApiKey

• **sitecoreApiKey**: `string`

#### Defined in

[src/components/form.tsx:30](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L30)

___

### trackerFetcher

• `Optional` **trackerFetcher**: `TrackerFetcher`

Fetch function used when posting form field tracking data (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:45](https://github.com/Sitecore/jss/blob/878424c53/packages/sitecore-jss-react-forms/src/components/form.tsx#L45)
