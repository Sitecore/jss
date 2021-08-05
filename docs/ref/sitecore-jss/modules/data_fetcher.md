[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / data-fetcher

# Module: data-fetcher

## Table of contents

### Interfaces

- [HttpResponse](../interfaces/data_fetcher.HttpResponse.md)

### Type aliases

- [HttpDataFetcher](data_fetcher.md#httpdatafetcher)

### Functions

- [fetchData](data_fetcher.md#fetchdata)

## Type aliases

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: { [key: string]: `unknown`;  }) => `Promise`<[`HttpResponse`](../interfaces/data_fetcher.HttpResponse.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](../interfaces/data_fetcher.HttpResponse.md)<`T`\>\>

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `Object` |

##### Returns

`Promise`<[`HttpResponse`](../interfaces/data_fetcher.HttpResponse.md)<`T`\>\>

#### Defined in

[data-fetcher.ts:26](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/data-fetcher.ts#L26)

## Functions

### fetchData

▸ **fetchData**<`T`\>(`url`, `fetcher`, `params?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fetcher` | [`HttpDataFetcher`](data_fetcher.md#httpdatafetcher)<`T`\> |
| `params` | `querystring.ParsedUrlQueryInput` |

#### Returns

`Promise`<`T`\>

#### Defined in

[data-fetcher.ts:60](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/data-fetcher.ts#L60)
