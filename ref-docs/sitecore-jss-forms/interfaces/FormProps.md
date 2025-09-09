[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FormProps

# Interface: FormProps

Defined in: [src/components/form.tsx:24](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L24)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/components/form.tsx:27](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L27)

***

### errorComponent?

> `optional` **errorComponent**: `ComponentType`\<[`ErrorComponentProps`](ErrorComponentProps.md)\>

Defined in: [src/components/form.tsx:32](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L32)

***

### fieldFactory?

> `optional` **fieldFactory**: [`FieldFactory`](../classes/FieldFactory.md)

Defined in: [src/components/form.tsx:28](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L28)

***

### fieldValidationErrorsComponent?

> `optional` **fieldValidationErrorsComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\>

Defined in: [src/components/form.tsx:39](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L39)

Optionally override the field validation errors display component for any field components that render validation errors

***

### fieldWrapperComponent?

> `optional` **fieldWrapperComponent**: `ComponentType`\<[`FieldWithValueProps`](FieldWithValueProps.md)\<`FormField`\<`ViewModel`\>, `string`\>\>

Defined in: [src/components/form.tsx:33](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L33)

***

### form

> **form**: `SitecoreForm`

Defined in: [src/components/form.tsx:25](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L25)

***

### formFetcher?

> `optional` **formFetcher**: `FormFetcher`

Defined in: [src/components/form.tsx:42](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L42)

Fetch function used when submitting the form (defaults to using `fetch`)

***

### labelComponent?

> `optional` **labelComponent**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\>

Defined in: [src/components/form.tsx:36](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L36)

Optionally override the label component for any field components that render a label

***

### language?

> `optional` **language**: `string`

Defined in: [src/components/form.tsx:26](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L26)

***

### onRedirect()?

> `optional` **onRedirect**: (`url`) => `void`

Defined in: [src/components/form.tsx:31](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |

#### Returns

`void`

***

### sitecoreApiHost

> **sitecoreApiHost**: `string`

Defined in: [src/components/form.tsx:29](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L29)

***

### sitecoreApiKey

> **sitecoreApiKey**: `string`

Defined in: [src/components/form.tsx:30](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L30)

***

### trackerFetcher?

> `optional` **trackerFetcher**: `TrackerFetcher`

Defined in: [src/components/form.tsx:45](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react-forms/src/components/form.tsx#L45)

Fetch function used when posting form field tracking data (defaults to using `fetch`)
