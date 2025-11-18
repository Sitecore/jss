[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [personalize](../README.md) / PersonalizeConfig

# Type Alias: PersonalizeConfig

> **PersonalizeConfig** = `object`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:28](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L28)

## Properties

### cdpConfig

> **cdpConfig**: `CdpServiceConfig`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:62](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L62)

Configuration for your Sitecore CDP endpoint

***

### defaultHostname?

> `optional` **defaultHostname**: `string`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:45](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L45)

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

***

### defaultLanguage?

> `optional` **defaultLanguage**: `string`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:50](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L50)

Fallback language in case language can't be read from layout data

#### Default

```ts
'en'
```

***

### disabled()?

> `optional` **disabled**: (`req?`, `res?`) => `boolean`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:34](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L34)

function, determines if personalization should be turned off, based on cookie, header, or other considerations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `IncomingMessage` | request object |
| `res?` | `OutgoingMessage` | response object |

#### Returns

`boolean`

***

### edgeConfig

> **edgeConfig**: `Omit`\<`GraphQLPersonalizeServiceConfig`, `"fetch"`\>

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:58](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L58)

Configuration for your Sitecore Experience Edge endpoint

***

### excludeRoute()?

> `optional` **excludeRoute**: (`pathname`) => `boolean`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:40](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L40)

Function used to determine if route should be excluded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pathname` | `string` | The pathname |

#### Returns

`boolean`

Whether to exclude the route

***

### scope?

> `optional` **scope**: `string`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:66](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L66)

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

***

### sitecoreSiteName

> **sitecoreSiteName**: `string`

Defined in: [sitecore-jss-proxy/src/types/personalize.ts:54](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-proxy/src/types/personalize.ts#L54)

Site name for current site
