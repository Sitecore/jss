[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / getEEMarkup

# Function: getEEMarkup()

> **getEEMarkup**(`imageField`, `imageParams?`, `mediaUrlPrefix?`, `otherProps?`): `Element`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:117](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L117)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `imageField` | [`ImageField`](../interfaces/ImageField.md) | {ImageField} provides the dynamicMedia which is used to render the image |
| `imageParams?` | \{\[`paramName`: `string`\]: `string` \| `number`; \} | {ImageProp['imageParams']}} provides the image parameters that will be attached to the image URL |
| `mediaUrlPrefix?` | `RegExp` | {RegExp} the url prefix regex used in the mediaApi |
| `otherProps?` | [`ImageProps`](../interfaces/ImageProps.md) | {ImageProps} all other props included on the image component |

## Returns

`Element`

Experience Editor Markup
