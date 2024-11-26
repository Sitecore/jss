[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / SiteResolver

# Class: SiteResolver

Resolves site based on the provided host or site name

## Constructors

### new SiteResolver()

> **new SiteResolver**(`sites`): [`SiteResolver`](SiteResolver.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sites` | [`SiteInfo`](../type-aliases/SiteInfo.md)[] | Array of sites to be used in resolution |

#### Returns

[`SiteResolver`](SiteResolver.md)

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Properties

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

Array of sites to be used in resolution

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Methods

### getByHost()

> **getByHost**(`hostName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

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

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L21)

***

### getByName()

> **getByName**(`siteName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

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

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L36)

***

### getHostMap()

> `protected` **getHostMap**(): `Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L48)

***

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `hostname` | `string` |
| `pattern` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/sitecore-jss/src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss/src/site/site-resolver.ts#L80)
