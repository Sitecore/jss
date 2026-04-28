[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [personalize](../README.md) / PersonalizeConfig

# Type Alias: PersonalizeConfig

> **PersonalizeConfig** = `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L28)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### cdpConfig

> **cdpConfig**: `CdpServiceConfig`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:62](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L62)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:62](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L62)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Configuration for your Sitecore CDP endpoint

***

### defaultHostname?

> `optional` **defaultHostname?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:45](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L45)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:45](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L45)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

***

### defaultLanguage?

> `optional` **defaultLanguage?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:50](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L50)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:50](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L50)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fallback language in case language can't be read from layout data

#### Default

```ts
'en'
```

***

### disabled?

> `optional` **disabled?**: (`req?`, `res?`) => `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L34)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:58](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L58)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:58](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L58)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Configuration for your Sitecore Experience Edge endpoint

***

### excludeRoute?

> `optional` **excludeRoute?**: (`pathname`) => `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:40](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L40)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:40](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L40)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **scope?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:66](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L66)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:66](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L66)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

***

### sitecoreSiteName

> **sitecoreSiteName**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:54](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/personalize.ts#L54)
=======
Defined in: [sitecore-jss-proxy/src/types/personalize.ts:54](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/personalize.ts#L54)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Site name for current site
