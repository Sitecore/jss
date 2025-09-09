[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / SiteResolver

# Class: SiteResolver

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:9](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L9)

Resolves site based on the provided host or site name

## Constructors

### Constructor

> **new SiteResolver**(`sites`): `SiteResolver`

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L13)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sites` | [`SiteInfo`](../type-aliases/SiteInfo.md)[] | Array of sites to be used in resolution |

#### Returns

`SiteResolver`

## Properties

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L13)

Array of sites to be used in resolution

## Methods

### getByHost()

> **getByHost**(`hostName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L21)

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

> **getByName**(`siteName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L36)

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

> `protected` **getHostMap**(): `Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L48)

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

***

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss/src/site/site-resolver.ts#L80)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `hostname` | `string` |
| `pattern` | `string` |

#### Returns

`boolean`
