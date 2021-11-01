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
- [sitecoreApiHost](FormProps.md#sitecoreapihost)
- [sitecoreApiKey](FormProps.md#sitecoreapikey)
- [trackerFetcher](FormProps.md#trackerfetcher)

### Methods

- [onRedirect](FormProps.md#onredirect)

## Properties

### className

• `Optional` **className**: `string`

#### Defined in

[src/components/form.tsx:26](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L26)

___

### errorComponent

• `Optional` **errorComponent**: `ComponentType`<[`ErrorComponentProps`](ErrorComponentProps.md)\>

#### Defined in

[src/components/form.tsx:31](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L31)

___

### fieldFactory

• `Optional` **fieldFactory**: [`FieldFactory`](../classes/FieldFactory.md)

#### Defined in

[src/components/form.tsx:27](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L27)

___

### fieldValidationErrorsComponent

• `Optional` **fieldValidationErrorsComponent**: `ComponentType`<[`LabelProps`](../README.md#labelprops)<`InputViewModel`\>\>

Optionally override the field validation errors display component for any field components that render validation errors

#### Defined in

[src/components/form.tsx:38](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L38)

___

### fieldWrapperComponent

• `Optional` **fieldWrapperComponent**: `ComponentType`<[`FieldWithValueProps`](FieldWithValueProps.md)<`FormField`<`ViewModel`\>, `string`\>\>

#### Defined in

[src/components/form.tsx:32](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L32)

___

### form

• **form**: `SitecoreForm`

#### Defined in

[src/components/form.tsx:25](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L25)

___

### formFetcher

• `Optional` **formFetcher**: `FormFetcher`

Fetch function used when submitting the form (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:41](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L41)

___

### labelComponent

• `Optional` **labelComponent**: `ComponentType`<[`LabelProps`](../README.md#labelprops)<`InputViewModel`\>\>

Optionally override the label component for any field components that render a label

#### Defined in

[src/components/form.tsx:35](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L35)

___

### sitecoreApiHost

• **sitecoreApiHost**: `string`

#### Defined in

[src/components/form.tsx:28](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L28)

___

### sitecoreApiKey

• **sitecoreApiKey**: `string`

#### Defined in

[src/components/form.tsx:29](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L29)

___

### trackerFetcher

• `Optional` **trackerFetcher**: `TrackerFetcher`

Fetch function used when posting form field tracking data (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:44](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L44)

## Methods

### onRedirect

▸ `Optional` **onRedirect**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

[src/components/form.tsx:30](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-react-forms/src/components/form.tsx#L30)
