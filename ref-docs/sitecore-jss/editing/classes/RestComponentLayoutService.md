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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:67](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L67)

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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:69](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L69)

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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:101](https://github.com/Sitecore/jss/blob/082b16026014ecf76df80c0539ec900b7788c3da/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L101)
