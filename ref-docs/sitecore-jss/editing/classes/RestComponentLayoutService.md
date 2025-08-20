[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / RestComponentLayoutService

# Class: RestComponentLayoutService

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:66](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L66)

REST service that enables design Library functionality
Returns layoutData for one single rendered component

## Constructors

### Constructor

> **new RestComponentLayoutService**(`config`): `RestComponentLayoutService`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:67](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L67)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `RestComponentLayoutServiceConfig` |

#### Returns

`RestComponentLayoutService`

## Methods

### fetchComponentData()

> **fetchComponentData**(`params`): `Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:69](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L69)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |

#### Returns

`Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

***

### getComponentFetchParams()

> `protected` **getComponentFetchParams**(`params`): `any`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:101](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L101)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |

#### Returns

`any`
