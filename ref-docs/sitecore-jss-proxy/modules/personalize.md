[@sitecore-jss/sitecore-jss-proxy](../README.md) / personalize

# Module: personalize

## Table of contents

### Classes

- [PersonalizeHelper](../classes/personalize.PersonalizeHelper.md)

### Type Aliases

- [PersonalizeConfig](personalize.md#personalizeconfig)

## Type Aliases

### PersonalizeConfig

Ƭ **PersonalizeConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cdpConfig` | `CdpServiceConfig` | Configuration for your Sitecore CDP endpoint |
| `defaultHostname?` | `string` | Fallback hostname in case `host` header is not present **`Default`** ```ts localhost ``` |
| `defaultLanguage?` | `string` | Fallback language in case language can't be read from layout data **`Default`** ```ts 'en' ``` |
| `disabled?` | (`req?`: `IncomingMessage`, `res?`: `OutgoingMessage`) => `boolean` | function, determines if personalization should be turned off, based on cookie, header, or other considerations |
| `edgeConfig` | `Omit`\<`GraphQLPersonalizeServiceConfig`, ``"fetch"``\> | Configuration for your Sitecore Experience Edge endpoint |
| `excludeRoute?` | (`pathname`: `string`) => `boolean` | Function used to determine if route should be excluded. |
| `scope?` | `string` | Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments |
| `sitecoreSiteName` | `string` | Site name for current site |

#### Defined in

[sitecore-jss-proxy/src/types/personalize.ts:28](https://github.com/Sitecore/jss/blob/ff6900fa4/packages/sitecore-jss-proxy/src/types/personalize.ts#L28)
