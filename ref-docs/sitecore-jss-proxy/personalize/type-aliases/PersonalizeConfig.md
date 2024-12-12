[**@sitecore-jss/sitecore-jss-proxy**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [personalize](../README.md) / PersonalizeConfig

# Type Alias: PersonalizeConfig

> **PersonalizeConfig**: `object`

## Type declaration

### cdpConfig

> **cdpConfig**: `CdpServiceConfig`

Configuration for your Sitecore CDP endpoint

### defaultHostname?

> `optional` **defaultHostname**: `string`

Fallback hostname in case `host` header is not present

#### Default

```ts
localhost
```

### defaultLanguage?

> `optional` **defaultLanguage**: `string`

Fallback language in case language can't be read from layout data

#### Default

```ts
'en'
```

### disabled()?

> `optional` **disabled**: (`req`?, `res`?) => `boolean`

function, determines if personalization should be turned off, based on cookie, header, or other considerations

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req`? | `IncomingMessage` | request object |
| `res`? | `OutgoingMessage` | response object |

#### Returns

`boolean`

### edgeConfig

> **edgeConfig**: `Omit`\<`GraphQLPersonalizeServiceConfig`, `"fetch"`\>

Configuration for your Sitecore Experience Edge endpoint

### excludeRoute()?

> `optional` **excludeRoute**: (`pathname`) => `boolean`

Function used to determine if route should be excluded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pathname` | `string` | The pathname |

#### Returns

`boolean`

Whether to exclude the route

### scope?

> `optional` **scope**: `string`

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

### sitecoreSiteName

> **sitecoreSiteName**: `string`

Site name for current site

## Defined in

[sitecore-jss-proxy/src/types/personalize.ts:28](https://github.com/Sitecore/jss/blob/79b72df335ab50517e6c3357c25dd7db1965274d/packages/sitecore-jss-proxy/src/types/personalize.ts#L28)
