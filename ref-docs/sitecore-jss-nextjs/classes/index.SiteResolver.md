[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / SiteResolver

# Class: SiteResolver

[index](../modules/index.md).SiteResolver

Resolves site based on the provided host or site name

## Table of contents

### Constructors

- [constructor](index.SiteResolver.md#constructor)

### Properties

- [getByHost](index.SiteResolver.md#getbyhost)
- [getByName](index.SiteResolver.md#getbyname)
- [getHostMap](index.SiteResolver.md#gethostmap)
- [sites](index.SiteResolver.md#sites)

### Methods

- [matchesPattern](index.SiteResolver.md#matchespattern)

## Constructors

### constructor

• **new SiteResolver**(`sites`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sites` | [`SiteInfo`](../modules/index.md#siteinfo)[] | Array of sites to be used in resolution |

#### Defined in

packages/sitecore-jss/types/site/site-resolver.d.ts:10

## Properties

### getByHost

• **getByHost**: (`hostName`: `string`) => [`SiteInfo`](../modules/index.md#siteinfo)

#### Type declaration

▸ (`hostName`): [`SiteInfo`](../modules/index.md#siteinfo)

Resolve site by host name

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | the host name |

##### Returns

[`SiteInfo`](../modules/index.md#siteinfo)

the resolved site

**`Throws`**

if a matching site is not found

#### Defined in

packages/sitecore-jss/types/site/site-resolver.d.ts:17

___

### getByName

• **getByName**: (`siteName`: `string`) => [`SiteInfo`](../modules/index.md#siteinfo)

#### Type declaration

▸ (`siteName`): [`SiteInfo`](../modules/index.md#siteinfo)

Resolve site by site name

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `siteName` | `string` | the site name |

##### Returns

[`SiteInfo`](../modules/index.md#siteinfo)

the resolved site

**`Throws`**

if a matching site is not found

#### Defined in

packages/sitecore-jss/types/site/site-resolver.d.ts:24

___

### getHostMap

• `Protected` **getHostMap**: () => `Map`\<`string`, [`SiteInfo`](../modules/index.md#siteinfo)\>

#### Type declaration

▸ (): `Map`\<`string`, [`SiteInfo`](../modules/index.md#siteinfo)\>

##### Returns

`Map`\<`string`, [`SiteInfo`](../modules/index.md#siteinfo)\>

#### Defined in

packages/sitecore-jss/types/site/site-resolver.d.ts:25

___

### sites

• `Readonly` **sites**: [`SiteInfo`](../modules/index.md#siteinfo)[]

#### Defined in

packages/sitecore-jss/types/site/site-resolver.d.ts:6

## Methods

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

packages/sitecore-jss/types/site/site-resolver.d.ts:26
