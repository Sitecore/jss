[@sitecore-jss/sitecore-jss](../README.md) / [personalize](../modules/personalize.md) / CdpService

# Class: CdpService

[personalize](../modules/personalize.md).CdpService

## Table of contents

### Constructors

- [constructor](personalize.CdpService.md#constructor)

### Properties

- [config](personalize.CdpService.md#config)
- [timeout](personalize.CdpService.md#timeout)

### Methods

- [executeExperience](personalize.CdpService.md#executeexperience)
- [generateBrowserId](personalize.CdpService.md#generatebrowserid)
- [getDefaultFetcher](personalize.CdpService.md#getdefaultfetcher)
- [getExecuteExperienceUrl](personalize.CdpService.md#getexecuteexperienceurl)
- [getFetcher](personalize.CdpService.md#getfetcher)
- [getGenerateBrowserIdUrl](personalize.CdpService.md#getgeneratebrowseridurl)

## Constructors

### constructor

• **new CdpService**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`CdpServiceConfig`](../modules/personalize.md#cdpserviceconfig) |

#### Defined in

[personalize/cdp-service.ts:77](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L77)

## Properties

### config

• `Protected` **config**: [`CdpServiceConfig`](../modules/personalize.md#cdpserviceconfig)

___

### timeout

• `Private` **timeout**: `number`

**`param`** CDP service config

#### Defined in

[personalize/cdp-service.ts:76](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L76)

## Methods

### executeExperience

▸ **executeExperience**(`contentId`, `browserId`, `userAgent`, `pointOfSale`, `params`): `Promise`<`undefined` \| `string`\>

Executes targeted experience for a page and params to determine the variant to render.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentId` | `string` | the friendly content id of the page |
| `browserId` | `string` | the browser id |
| `userAgent` | `string` | the user agent |
| `pointOfSale` | `string` | current point of sale |
| `params` | [`ExperienceParams`](../modules/personalize.md#experienceparams) | the experience params for the user |

#### Returns

`Promise`<`undefined` \| `string`\>

the execute experience result

#### Defined in

[personalize/cdp-service.ts:90](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L90)

___

### generateBrowserId

▸ **generateBrowserId**(): `Promise`<`undefined` \| `string`\>

Generates a new browser id

#### Returns

`Promise`<`undefined` \| `string`\>

browser id

#### Defined in

[personalize/cdp-service.ts:134](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L134)

___

### getDefaultFetcher

▸ `Protected` **getDefaultFetcher**<`T`\>(`config`): (`url`: `string`, `data?`: `unknown`) => `Promise`<`AxiosResponse`<`T`\>\>

Provides default @see AxiosDataFetcher data fetcher

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `DataFetcherConfig` |

#### Returns

`fn`

default fetcher

▸ (`url`, `data?`): `Promise`<`AxiosResponse`<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `unknown` |

##### Returns

`Promise`<`AxiosResponse`<`T`\>\>

#### Defined in

[personalize/cdp-service.ts:186](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L186)

___

### getExecuteExperienceUrl

▸ `Protected` **getExecuteExperienceUrl**(): `string`

Get formatted URL for executeExperience call

#### Returns

`string`

formatted URL

#### Defined in

[personalize/cdp-service.ts:166](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L166)

___

### getFetcher

▸ `Protected` **getFetcher**<`Response`\>(`headers?`): [`HttpDataFetcher`](../modules/index.md#httpdatafetcher)<`Response`\>

Returns provided data fetcher otherwise default one

#### Type parameters

| Name |
| :------ |
| `Response` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers?` | `Record`<`string`, `string`\> |

#### Returns

[`HttpDataFetcher`](../modules/index.md#httpdatafetcher)<`Response`\>

data fetcher

#### Defined in

[personalize/cdp-service.ts:175](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L175)

___

### getGenerateBrowserIdUrl

▸ `Protected` **getGenerateBrowserIdUrl**(): `string`

Get formatted URL for generateBrowserId call

#### Returns

`string`

formatted URL

#### Defined in

[personalize/cdp-service.ts:158](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/personalize/cdp-service.ts#L158)
