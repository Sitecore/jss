[@sitecore-jss/sitecore-jss](../README.md) / site

# Module: site

## Table of contents

### Classes

- [GraphQLErrorPagesService](../classes/site.GraphQLErrorPagesService.md)
- [GraphQLRedirectsService](../classes/site.GraphQLRedirectsService.md)
- [GraphQLRobotsService](../classes/site.GraphQLRobotsService.md)
- [GraphQLSiteInfoService](../classes/site.GraphQLSiteInfoService.md)
- [GraphQLSitemapXmlService](../classes/site.GraphQLSitemapXmlService.md)
- [SiteResolver](../classes/site.SiteResolver.md)

### Interfaces

- [GraphQLErrorPagesServiceConfig](../interfaces/site.GraphQLErrorPagesServiceConfig.md)

### Type Aliases

- [ErrorPages](site.md#errorpages)
- [GraphQLRedirectsServiceConfig](site.md#graphqlredirectsserviceconfig)
- [GraphQLRobotsServiceConfig](site.md#graphqlrobotsserviceconfig)
- [GraphQLSiteInfoServiceConfig](site.md#graphqlsiteinfoserviceconfig)
- [GraphQLSitemapXmlServiceConfig](site.md#graphqlsitemapxmlserviceconfig)
- [RedirectInfo](site.md#redirectinfo)
- [RedirectsQueryResult](site.md#redirectsqueryresult)
- [RobotsQueryResult](site.md#robotsqueryresult)
- [SiteInfo](site.md#siteinfo)
- [SiteRewriteData](site.md#siterewritedata)
- [SitemapQueryResult](site.md#sitemapqueryresult)

### Variables

- [REDIRECT\_TYPE\_301](site.md#redirect_type_301)
- [REDIRECT\_TYPE\_302](site.md#redirect_type_302)
- [REDIRECT\_TYPE\_SERVER\_TRANSFER](site.md#redirect_type_server_transfer)

### Functions

- [getSiteRewrite](site.md#getsiterewrite)
- [getSiteRewriteData](site.md#getsiterewritedata)
- [normalizeSiteRewrite](site.md#normalizesiterewrite)

## Type Aliases

### ErrorPages

Ƭ **ErrorPages**: `Object`

Object model of Error Pages result

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notFoundPage` | \{ `rendered`: [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)  } |
| `notFoundPage.rendered` | [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) |
| `notFoundPagePath` | `string` |
| `serverErrorPage` | \{ `rendered`: [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)  } |
| `serverErrorPage.rendered` | [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) |
| `serverErrorPagePath` | `string` |

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:57](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L57)

___

### GraphQLRedirectsServiceConfig

Ƭ **GraphQLRedirectsServiceConfig**: `CacheOptions` & \{ `apiKey?`: `string` ; `clientFactory?`: [`GraphQLRequestClientFactory`](index.md#graphqlrequestclientfactory) ; `endpoint?`: `string` ; `fetch?`: typeof `fetch`  }

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:36](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L36)

___

### GraphQLRobotsServiceConfig

Ƭ **GraphQLRobotsServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication **`Deprecated`** use **`Param`** property instead |
| `clientFactory?` | [`GraphQLRequestClientFactory`](index.md#graphqlrequestclientfactory) | A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient. This factory function is used to create and configure GraphQL clients for making GraphQL API requests. |
| `endpoint?` | `string` | Your Graphql endpoint **`Deprecated`** use **`Param`** property instead |
| `siteName` | `string` | The JSS application name |

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:17](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-robots-service.ts#L17)

___

### GraphQLSiteInfoServiceConfig

Ƭ **GraphQLSiteInfoServiceConfig**: `CacheOptions` & \{ `apiKey?`: `string` ; `clientFactory?`: [`GraphQLRequestClientFactory`](index.md#graphqlrequestclientfactory) ; `endpoint?`: `string` ; `pageSize?`: `number` ; `useSiteQuery?`: `boolean`  }

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:73](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L73)

___

### GraphQLSitemapXmlServiceConfig

Ƭ **GraphQLSitemapXmlServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication **`Deprecated`** use **`Param`** property instead |
| `clientFactory?` | [`GraphQLRequestClientFactory`](index.md#graphqlrequestclientfactory) | A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient. This factory function is used to create and configure GraphQL clients for making GraphQL API requests. |
| `endpoint?` | `string` | Your Graphql endpoint **`Deprecated`** use **`Param`** property instead |
| `siteName` | `string` | The JSS application name |

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:19](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L19)

___

### RedirectInfo

Ƭ **RedirectInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isQueryStringPreserved` | `boolean` |
| `locale` | `string` |
| `pattern` | `string` |
| `redirectType` | `string` |
| `target` | `string` |

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:11](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L11)

___

### RedirectsQueryResult

Ƭ **RedirectsQueryResult**: `Object`

The schema of data returned in response to redirects array request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | \{ `siteInfo`: \{ `redirects`: [`RedirectInfo`](site.md#redirectinfo)[]  } \| ``null``  } |
| `site.siteInfo` | \{ `redirects`: [`RedirectInfo`](site.md#redirectinfo)[]  } \| ``null`` |

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:61](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L61)

___

### RobotsQueryResult

Ƭ **RobotsQueryResult**: `Object`

The schema of data returned in response to robots.txt request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | \{ `siteInfo`: \{ `robots`: `string`  }  } |
| `site.siteInfo` | \{ `robots`: `string`  } |
| `site.siteInfo.robots` | `string` |

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:42](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-robots-service.ts#L42)

___

### SiteInfo

Ƭ **SiteInfo**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostName` | `string` | Site host name. May include multiple values (separated by '\|') and wildcards ('*') |
| `language` | `string` | Site default language |
| `name` | `string` | Site name |

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:54](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L54)

___

### SiteRewriteData

Ƭ **SiteRewriteData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `siteName` | `string` |

#### Defined in

[packages/sitecore-jss/src/site/utils.ts:3](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/utils.ts#L3)

___

### SitemapQueryResult

Ƭ **SitemapQueryResult**: `Object`

The schema of data returned in response to sitemaps request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | \{ `siteInfo`: \{ `sitemap`: `string`[]  }  } |
| `site.siteInfo` | \{ `sitemap`: `string`[]  } |
| `site.siteInfo.sitemap` | `string`[] |

#### Defined in

[packages/sitecore-jss/src/site/graphql-sitemap-service.ts:44](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L44)

## Variables

### REDIRECT\_TYPE\_301

• `Const` **REDIRECT\_TYPE\_301**: ``"REDIRECT_301"``

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:7](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L7)

___

### REDIRECT\_TYPE\_302

• `Const` **REDIRECT\_TYPE\_302**: ``"REDIRECT_302"``

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:8](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L8)

___

### REDIRECT\_TYPE\_SERVER\_TRANSFER

• `Const` **REDIRECT\_TYPE\_SERVER\_TRANSFER**: ``"SERVER_TRANSFER"``

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:9](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L9)

## Functions

### getSiteRewrite

▸ **getSiteRewrite**(`pathname`, `data`): `string`

Get a site rewrite path for given pathname

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |
| `data` | [`SiteRewriteData`](site.md#siterewritedata) | the site data to include in the rewrite |

#### Returns

`string`

the rewrite path

#### Defined in

[packages/sitecore-jss/src/site/utils.ts:13](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/utils.ts#L13)

___

### getSiteRewriteData

▸ **getSiteRewriteData**(`pathname`, `defaultSiteName`): [`SiteRewriteData`](site.md#siterewritedata)

Get site data from the rewrite path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |
| `defaultSiteName` | `string` | the default site name |

#### Returns

[`SiteRewriteData`](site.md#siterewritedata)

the site data from the rewrite

#### Defined in

[packages/sitecore-jss/src/site/utils.ts:25](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/utils.ts#L25)

___

### normalizeSiteRewrite

▸ **normalizeSiteRewrite**(`pathname`): `string`

Normalize a site rewrite path (remove site data)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | the pathname |

#### Returns

`string`

the pathname with site data removed

#### Defined in

[packages/sitecore-jss/src/site/utils.ts:45](https://github.com/Sitecore/jss/blob/e455b1ea1/packages/sitecore-jss/src/site/utils.ts#L45)
