[**@sitecore-jss/sitecore-jss**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss](../../../../README.md) / [media](../../../README.md) / [mediaApi](../README.md) / getSrcSet

# Function: getSrcSet()

> **getSrcSet**(`url`, `srcSet`, `imageParams?`, `mediaUrlPrefix?`): `string`

Defined in: [packages/sitecore-jss/src/media/media-api.ts:128](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/media/media-api.ts#L128)

Receives an array of `srcSet` parameters that are iterated and used as parameters to generate
a corresponding set of updated Sitecore media URLs via

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to prepare |
| `srcSet` | `object`[] | The array of parameters to use |
| `imageParams?` | \{\[`key`: `string`\]: `undefined` \| `string` \| `number`; \} | The querystring parameters to use |
| `mediaUrlPrefix?` | `RegExp` | The regex to match the media URL prefix |

## Returns

`string`

The prepared URL

## See

updateImageUrl. The result is a comma-delimited
list of media URLs with respective dimension parameters.

## Example

```ts
// returns '/ipsum.jpg?h=1000&w=1000 1000w, /ipsum.jpg?mh=250&mw=250 250w'
getSrcSet('/ipsum.jpg', [{ h: 1000, w: 1000 }, { mh: 250, mw: 250 } ])
More information about `srcSet`: {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
```
