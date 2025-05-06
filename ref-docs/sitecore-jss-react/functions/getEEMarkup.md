[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / getEEMarkup

# Function: getEEMarkup()

> **getEEMarkup**(`imageField`, `imageParams`?, `mediaUrlPrefix`?, `otherProps`?): `Element`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `imageField` | [`ImageField`](../interfaces/ImageField.md) | {ImageField} provides the dynamicMedia which is used to render the image |
| `imageParams`? | `object` | {ImageProp['imageParams']}} provides the image parameters that will be attached to the image URL |
| `mediaUrlPrefix`? | `RegExp` | {RegExp} the url prefix regex used in the mediaApi |
| `otherProps`? | [`ImageProps`](../interfaces/ImageProps.md) | {ImageProps} all other props included on the image component |

## Returns

`Element`

Experience Editor Markup

## Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:118](https://github.com/Sitecore/jss/blob/f8b2f5972d6552525ec3d32da5e5524bb615e3dc/packages/sitecore-jss-react/src/components/Image.tsx#L118)
