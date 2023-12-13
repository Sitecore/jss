[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / SiteResolver

# Class: SiteResolver

[site](../modules/site.md).SiteResolver

Resolves site based on the provided host or site name

## Table of contents

### Constructors

- [constructor](site.SiteResolver.md#constructor)

### Properties

- [sites](site.SiteResolver.md#sites)

### Methods

- [getByHost](site.SiteResolver.md#getbyhost)
- [getByName](site.SiteResolver.md#getbyname)
- [getHostMap](site.SiteResolver.md#gethostmap)
- [matchesPattern](site.SiteResolver.md#matchespattern)

## Constructors

### constructor

• **new SiteResolver**(`sites`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sites` | [`SiteInfo`](../modules/site.md#siteinfo)[] | Array of sites to be used in resolution |

#### Defined in

[src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Properties

### sites

• `Readonly` **sites**: [`SiteInfo`](../modules/site.md#siteinfo)[]

Array of sites to be used in resolution

#### Defined in

[src/site/site-resolver.ts:13](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L13)

## Methods

### getByHost

▸ **getByHost**(`hostName`): [`SiteInfo`](../modules/site.md#siteinfo)

Resolve site by host name

**`Throws`**

if a matching site is not found

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | the host name |

#### Returns

[`SiteInfo`](../modules/site.md#siteinfo)

the resolved site

#### Defined in

[src/site/site-resolver.ts:21](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L21)

___

### getByName

▸ **getByName**(`siteName`): [`SiteInfo`](../modules/site.md#siteinfo)

Resolve site by site name

**`Throws`**

if a matching site is not found

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `siteName` | `string` | the site name |

#### Returns

[`SiteInfo`](../modules/site.md#siteinfo)

the resolved site

#### Defined in

[src/site/site-resolver.ts:36](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L36)

___

### getHostMap

▸ `Protected` **getHostMap**(): `Map`<`string`, [`SiteInfo`](../modules/site.md#siteinfo)\>

#### Returns

`Map`<`string`, [`SiteInfo`](../modules/site.md#siteinfo)\>

#### Defined in

[src/site/site-resolver.ts:48](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L48)

___

### matchesPattern

▸ `Protected` **matchesPattern**(`hostname`, `pattern`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostname` | `string` |
| `pattern` | `string` |

#### Returns

`boolean`

#### Defined in

[src/site/site-resolver.ts:80](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss/src/site/site-resolver.ts#L80)
