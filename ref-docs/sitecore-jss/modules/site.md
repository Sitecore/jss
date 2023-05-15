[@sitecore-jss/sitecore-jss](../README.md) / site

# Module: site

## Table of contents

### Classes

- [GraphQLErrorPagesService](../classes/site.GraphQLErrorPagesService.md)
- [GraphQLRedirectsService](../classes/site.GraphQLRedirectsService.md)
- [GraphQLRobotsService](../classes/site.GraphQLRobotsService.md)
- [GraphQLSitemapXmlService](../classes/site.GraphQLSitemapXmlService.md)

### Type aliases

- [ErrorPages](site.md#errorpages)
- [GraphQLErrorPagesServiceConfig](site.md#graphqlerrorpagesserviceconfig)
- [GraphQLRedirectsServiceConfig](site.md#graphqlredirectsserviceconfig)
- [GraphQLRobotsServiceConfig](site.md#graphqlrobotsserviceconfig)
- [GraphQLSitemapXmlServiceConfig](site.md#graphqlsitemapxmlserviceconfig)
- [RedirectInfo](site.md#redirectinfo)
- [RedirectsQueryResult](site.md#redirectsqueryresult)
- [RobotsQueryResult](site.md#robotsqueryresult)
- [SitemapQueryResult](site.md#sitemapqueryresult)

### Variables

- [REDIRECT\_TYPE\_301](site.md#redirect_type_301)
- [REDIRECT\_TYPE\_302](site.md#redirect_type_302)
- [REDIRECT\_TYPE\_SERVER\_TRANSFER](site.md#redirect_type_server_transfer)

## Type aliases

### ErrorPages

Ƭ **ErrorPages**: `Object`

Object model of Error Pages result

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notFoundPagePath` | `string` |
| `serverErrorPagePath` | `string` |

#### Defined in

[site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)

___

### GraphQLErrorPagesServiceConfig

Ƭ **GraphQLErrorPagesServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `language` | `string` | The language |
| `siteName` | `string` | The JSS application name |

#### Defined in

[site/graphql-error-pages-service.ts:19](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L19)

___

### GraphQLRedirectsServiceConfig

Ƭ **GraphQLRedirectsServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `fetch?` | typeof `fetch` | Override fetch method. Uses 'GraphQLRequestClient' default otherwise. |
| `siteName` | `string` | The JSS application name |

#### Defined in

[site/graphql-redirects-service.ts:34](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L34)

___

### GraphQLRobotsServiceConfig

Ƭ **GraphQLRobotsServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `siteName` | `string` | The JSS application name |

#### Defined in

[site/graphql-robots-service.ts:16](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-robots-service.ts#L16)

___

### GraphQLSitemapXmlServiceConfig

Ƭ **GraphQLSitemapXmlServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `siteName` | `string` | The JSS application name |

#### Defined in

[site/graphql-sitemap-service.ts:18](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L18)

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

[site/graphql-redirects-service.ts:9](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L9)

___

### RedirectsQueryResult

Ƭ **RedirectsQueryResult**: `Object`

The schema of data returned in response to redirects array request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | `Object` |
| `site.siteInfo` | { `redirects`: [`RedirectInfo`](site.md#redirectinfo)[]  } \| ``null`` |

#### Defined in

[site/graphql-redirects-service.ts:56](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L56)

___

### RobotsQueryResult

Ƭ **RobotsQueryResult**: `Object`

The schema of data returned in response to robots.txt request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | `Object` |
| `site.siteInfo` | `Object` |
| `site.siteInfo.robots` | `string` |

#### Defined in

[site/graphql-robots-service.ts:34](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-robots-service.ts#L34)

___

### SitemapQueryResult

Ƭ **SitemapQueryResult**: `Object`

The schema of data returned in response to sitemaps request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `site` | `Object` |
| `site.siteInfo` | `Object` |
| `site.siteInfo.sitemap` | `string`[] |

#### Defined in

[site/graphql-sitemap-service.ts:36](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L36)

## Variables

### REDIRECT\_TYPE\_301

• **REDIRECT\_TYPE\_301**: ``"REDIRECT_301"``

#### Defined in

[site/graphql-redirects-service.ts:5](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L5)

___

### REDIRECT\_TYPE\_302

• **REDIRECT\_TYPE\_302**: ``"REDIRECT_302"``

#### Defined in

[site/graphql-redirects-service.ts:6](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L6)

___

### REDIRECT\_TYPE\_SERVER\_TRANSFER

• **REDIRECT\_TYPE\_SERVER\_TRANSFER**: ``"SERVER_TRANSFER"``

#### Defined in

[site/graphql-redirects-service.ts:7](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L7)
