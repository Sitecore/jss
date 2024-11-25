[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / SiteResolver

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

[packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Properties

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

Array of sites to be used in resolution

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Methods

### getByHost()

> **getByHost**(`hostName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

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

[packages/sitecore-jss/src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L21)

***

### getByName()

> **getByName**(`siteName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

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

[packages/sitecore-jss/src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L36)

***

### getHostMap()

> `protected` **getHostMap**(): `Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L48)

***

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

#### Parameters

• **hostname**: `string`

• **pattern**: `string`

#### Returns

`boolean`

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/site/site-resolver.ts#L80)
