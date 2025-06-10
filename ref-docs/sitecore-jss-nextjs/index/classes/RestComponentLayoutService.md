[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / RestComponentLayoutService

# Class: RestComponentLayoutService

REST service that enables design Library functionality
Returns layoutData for one single rendered component

## Constructors

### new RestComponentLayoutService()

> **new RestComponentLayoutService**(`config`): [`RestComponentLayoutService`](RestComponentLayoutService.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `RestComponentLayoutServiceConfig` |

#### Returns

[`RestComponentLayoutService`](RestComponentLayoutService.md)

#### Defined in

sitecore-jss/types/editing/rest-component-layout-service.d.ts:61

## Methods

### fetchComponentData()

> **fetchComponentData**(`params`): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `ComponentLayoutRequestParams` |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

#### Defined in

sitecore-jss/types/editing/rest-component-layout-service.d.ts:62

***

### getComponentFetchParams()

> `protected` **getComponentFetchParams**(`params`): `any`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `ComponentLayoutRequestParams` |

#### Returns

`any`

#### Defined in

sitecore-jss/types/editing/rest-component-layout-service.d.ts:63
