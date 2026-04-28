[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / SiteResolver

# Class: SiteResolver

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:9](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L9)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:9](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L9)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Resolves site based on the provided host or site name

## Constructors

### Constructor

> **new SiteResolver**(`sites`): `SiteResolver`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L13)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L13)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sites` | [`SiteInfo`](../type-aliases/SiteInfo.md)[] | Array of sites to be used in resolution |

#### Returns

`SiteResolver`

## Properties

### sites

> `readonly` **sites**: [`SiteInfo`](../type-aliases/SiteInfo.md)[]

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L13)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L13)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Array of sites to be used in resolution

## Methods

### getByHost()

> **getByHost**(`hostName`): [`SiteInfo`](../type-aliases/SiteInfo.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L21)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L36)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L48)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Returns

`Map`\<`string`, [`SiteInfo`](../type-aliases/SiteInfo.md)\>

***

### matchesPattern()

> `protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/site-resolver.ts#L80)
=======
Defined in: [packages/sitecore-jss/src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/site-resolver.ts#L80)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `hostname` | `string` |
| `pattern` | `string` |

#### Returns

`boolean`
