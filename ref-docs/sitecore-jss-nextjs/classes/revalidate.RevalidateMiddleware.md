[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [revalidate](../modules/revalidate.md) / RevalidateMiddleware

# Class: RevalidateMiddleware

[revalidate](../modules/revalidate.md).RevalidateMiddleware

Middleware / handler for on-demand ISR (e.g. '/api/revalidate').

## Table of contents

### Constructors

- [constructor](revalidate.RevalidateMiddleware.md#constructor)

### Properties

- [config](revalidate.RevalidateMiddleware.md#config)
- [personalizeService](revalidate.RevalidateMiddleware.md#personalizeservice)

### Methods

- [extractPaths](revalidate.RevalidateMiddleware.md#extractpaths)
- [extractSiteName](revalidate.RevalidateMiddleware.md#extractsitename)
- [getFilteredUpdates](revalidate.RevalidateMiddleware.md#getfilteredupdates)
- [getHandler](revalidate.RevalidateMiddleware.md#gethandler)
- [getPathName](revalidate.RevalidateMiddleware.md#getpathname)
- [getPersonalizedResults](revalidate.RevalidateMiddleware.md#getpersonalizedresults)
- [getSiteName](revalidate.RevalidateMiddleware.md#getsitename)
- [handleMultiSitePersonalization](revalidate.RevalidateMiddleware.md#handlemultisitepersonalization)
- [handleNonMultiSitePersonalization](revalidate.RevalidateMiddleware.md#handlenonmultisitepersonalization)
- [handler](revalidate.RevalidateMiddleware.md#handler)
- [isEmpty](revalidate.RevalidateMiddleware.md#isempty)

## Constructors

### constructor

• **new RevalidateMiddleware**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `RevalidateConfig` |

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:72](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L72)

## Properties

### config

• `Protected` **config**: `RevalidateConfig`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:72](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L72)

___

### personalizeService

• `Private` **personalizeService**: `GraphQLPersonalizeService`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:70](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L70)

## Methods

### extractPaths

▸ `Protected` **extractPaths**(`filteredUpdates`): `string`[]

Extracts the paths from the updated paths

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filteredUpdates` | `UpdatedPaths`[] | Updated paths |

#### Returns

`string`[]

paths

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:144](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L144)

___

### extractSiteName

▸ `Protected` **extractSiteName**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:183](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L183)

___

### getFilteredUpdates

▸ `Protected` **getFilteredUpdates**(`req`): `UpdatedPaths`[]

Filters out the updated paths and language from the request body

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | Next.js API request |

#### Returns

`UpdatedPaths`[]

updated paths

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:193](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L193)

___

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`\<`any`\>) => `Promise`\<`void`\>

Generates a Next.js API route handler that executes a revalidation process.

#### Returns

`fn`

The route handler function for handling Next.js API requests.

▸ (`req`, `res`): `Promise`\<`void`\>

Generates a Next.js API route handler that executes a revalidation process.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

##### Returns

`Promise`\<`void`\>

The route handler function for handling Next.js API requests.

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:82](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L82)

___

### getPathName

▸ `Protected` **getPathName**(`fullPath`): `string`

Gets the path name from the full path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fullPath` | `string` | Full path |

#### Returns

`string`

path name

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:171](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L171)

___

### getPersonalizedResults

▸ **getPersonalizedResults**(`filteredUpdates`): `Promise`\<\{ `nonPersonalized`: \{ `path`: `string`  }[] = nonPersonalizedResults; `personalized`: `PersonalizedResult`[] = personalizedResults }\>

Gets personalized results for the updated paths

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filteredUpdates` | `UpdatedPaths`[] | Updated paths |

#### Returns

`Promise`\<\{ `nonPersonalized`: \{ `path`: `string`  }[] = nonPersonalizedResults; `personalized`: `PersonalizedResult`[] = personalizedResults }\>

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:99](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L99)

___

### getSiteName

▸ `Protected` **getSiteName**(`pathname`): `string`

Gets the site name from the path name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | Path name |

#### Returns

`string`

site name

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:153](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L153)

___

### handleMultiSitePersonalization

▸ `Protected` **handleMultiSitePersonalization**(`personalizeInfo`, `pathsToRevalidate`, `getPathName`, `getSiteName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `personalizeInfo` | `Object` |
| `personalizeInfo.nonPersonalized` | \{ `path`: `string`  }[] |
| `personalizeInfo.personalized` | `PersonalizedResult`[] |
| `pathsToRevalidate` | `string`[] |
| `getPathName` | (`x`: `string`) => `string` |
| `getSiteName` | (`x`: `string`) => `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:216](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L216)

___

### handleNonMultiSitePersonalization

▸ `Protected` **handleNonMultiSitePersonalization**(`personalizeInfo`, `pathsToRevalidate`, `getPathName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `personalizeInfo` | `Object` |
| `personalizeInfo.nonPersonalized` | \{ `path`: `string`  }[] |
| `personalizeInfo.personalized` | `PersonalizedResult`[] |
| `pathsToRevalidate` | `string`[] |
| `getPathName` | (`x`: `string`) => `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:249](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L249)

___

### handler

▸ `Private` **handler**(`req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:273](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L273)

___

### isEmpty

▸ `Protected` **isEmpty**(`data`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `UpdatedPaths`[] |

#### Returns

`boolean`

#### Defined in

[sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts:135](https://github.com/Sitecore/jss/blob/8ed837934/packages/sitecore-jss-nextjs/src/revalidate/revalidate-middleware.ts#L135)
