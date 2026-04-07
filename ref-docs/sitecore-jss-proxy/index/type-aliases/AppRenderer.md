[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [index](../README.md) / AppRenderer

# Type Alias: AppRenderer()

> **AppRenderer** = (`callback`, `path`, `data`, `viewBag`) => `void`

Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:26](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L26)

AppRenderer is a function that renders a JSS app's markup for a given route and data.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`error`, `result`) => `void` |
| `path` | `string` |
| `data` | `LayoutServiceData` |
| `viewBag` | \{\[`key`: `string`\]: `unknown`; `dictionary`: `DictionaryPhrases`; \} |
| `viewBag.dictionary` | `DictionaryPhrases` |

## Returns

`void`
