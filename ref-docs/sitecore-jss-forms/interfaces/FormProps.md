[**@sitecore-jss/sitecore-jss-react-forms**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FormProps

# Interface: FormProps

## Properties

### className?

> `optional` **className**: `string`

#### Defined in

[src/components/form.tsx:27](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L27)

***

### errorComponent?

> `optional` **errorComponent**: `ComponentType`\<[`ErrorComponentProps`](ErrorComponentProps.md)\>

#### Defined in

[src/components/form.tsx:32](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L32)

***

### fieldFactory?

> `optional` **fieldFactory**: [`FieldFactory`](../classes/FieldFactory.md)

#### Defined in

[src/components/form.tsx:28](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L28)

***

### fieldValidationErrorsComponent?

> `optional` **fieldValidationErrorsComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\>

Optionally override the field validation errors display component for any field components that render validation errors

#### Defined in

[src/components/form.tsx:39](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L39)

***

### fieldWrapperComponent?

> `optional` **fieldWrapperComponent**: `ComponentType`\<[`FieldWithValueProps`](FieldWithValueProps.md)\<`FormField`\<`ViewModel`\>, `string`\>\>

#### Defined in

[src/components/form.tsx:33](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L33)

***

### form

> **form**: `SitecoreForm`

#### Defined in

[src/components/form.tsx:25](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L25)

***

### formFetcher?

> `optional` **formFetcher**: `FormFetcher`

Fetch function used when submitting the form (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:42](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L42)

***

### labelComponent?

> `optional` **labelComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\>

Optionally override the label component for any field components that render a label

#### Defined in

[src/components/form.tsx:36](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L36)

***

### language?

> `optional` **language**: `string`

#### Defined in

[src/components/form.tsx:26](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L26)

***

### onRedirect()?

> `optional` **onRedirect**: (`url`) => `void`

#### Parameters

• **url**: `string`

#### Returns

`void`

#### Defined in

[src/components/form.tsx:31](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L31)

***

### sitecoreApiHost

> **sitecoreApiHost**: `string`

#### Defined in

[src/components/form.tsx:29](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L29)

***

### sitecoreApiKey

> **sitecoreApiKey**: `string`

#### Defined in

[src/components/form.tsx:30](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L30)

***

### trackerFetcher?

> `optional` **trackerFetcher**: `TrackerFetcher`

Fetch function used when posting form field tracking data (defaults to using `fetch`)

#### Defined in

[src/components/form.tsx:45](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react-forms/src/components/form.tsx#L45)
