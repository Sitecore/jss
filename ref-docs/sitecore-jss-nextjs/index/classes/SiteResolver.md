[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / SiteResolver

# Class: SiteResolver

Resolves site based on the provided host or site name

## Constructors

### new SiteResolver()

> **new SiteResolver**(`sites`): [`SiteResolver`](SiteResolver.md)

#### Parameters

• **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

Array of sites to be used in resolution

#### Returns

[`SiteResolver`](SiteResolver.md)

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:10

## Properties

### getByHost()

> **getByHost**: (`hostName`) => [`SiteInfo`](../type-aliases/SiteInfo.md)

Resolve site by host name

#### Parameters

• **hostName**: `string`

the host name

#### Returns

[`SiteInfo`](../type-aliases/SiteInfo.md)

the resolved site

#### Throws

if a matching site is not found

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:17

***

### getByName()

> **getByName**: (`siteName`) => [`SiteInfo`](../type-aliases/SiteInfo.md)

Resolve site by site name

#### Parameters

• **siteName**: `string`

the site name

#### Returns

[`SiteInfo`](../type-aliases/SiteInfo.md)

the resolved site

#### Throws

if a matching site is not found

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:24

***

### getHostMap()

> `protected` **getHostMap**: () => `Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:25

***

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:6

## Methods

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

#### Parameters

• **hostname**: `string`

• **pattern**: `string`

#### Returns

`boolean`

#### Defined in

sitecore-jss/types/site/site-resolver.d.ts:26
