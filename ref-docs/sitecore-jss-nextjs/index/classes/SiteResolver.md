[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / SiteResolver

# Class: SiteResolver

Defined in: sitecore-jss/types/site/site-resolver.d.ts:5

Resolves site based on the provided host or site name

## Constructors

### Constructor

> **new SiteResolver**(`sites`): `SiteResolver`

Defined in: sitecore-jss/types/site/site-resolver.d.ts:10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sites` | [`SiteInfo`](../type-aliases/SiteInfo.md)[] | Array of sites to be used in resolution |

#### Returns

`SiteResolver`

## Properties

### getByHost()

> **getByHost**: (`hostName`) => [`SiteInfo`](../type-aliases/SiteInfo.md)

Defined in: sitecore-jss/types/site/site-resolver.d.ts:17

Resolve site by host name

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hostName` | `string` | the host name |

#### Returns

[`SiteInfo`](../type-aliases/SiteInfo.md)

the resolved site

#### Throws

if a matching site is not found

***

### getByName()

> **getByName**: (`siteName`) => [`SiteInfo`](../type-aliases/SiteInfo.md)

Defined in: sitecore-jss/types/site/site-resolver.d.ts:24

Resolve site by site name

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` | the site name |

#### Returns

[`SiteInfo`](../type-aliases/SiteInfo.md)

the resolved site

#### Throws

if a matching site is not found

***

### getHostMap()

> `protected` **getHostMap**: () => `Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

Defined in: sitecore-jss/types/site/site-resolver.d.ts:25

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

***

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

Defined in: sitecore-jss/types/site/site-resolver.d.ts:6

## Methods

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

Defined in: sitecore-jss/types/site/site-resolver.d.ts:26

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `hostname` | `string` |
| `pattern` | `string` |

#### Returns

`boolean`
