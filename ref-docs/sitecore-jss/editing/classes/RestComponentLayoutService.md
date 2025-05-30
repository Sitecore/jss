[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / RestComponentLayoutService

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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:62](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L62)

## Methods

### fetchComponentData()

> **fetchComponentData**(`params`): `Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |

#### Returns

`Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:64](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L64)

***

### getComponentFetchParams()

> `protected` **getComponentFetchParams**(`params`): `any`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |

#### Returns

`any`

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:92](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L92)
