Sitecore JavaScript Rendering SDK (JSS)

# Sitecore JavaScript Rendering SDK (JSS)

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)

### Enumerations

- [LayoutServicePageState](enums/LayoutServicePageState.md)

### Classes

- [AxiosDataFetcher](classes/AxiosDataFetcher.md)
- [DictionaryServiceBase](classes/DictionaryServiceBase.md)
- [ExperienceEditor](classes/ExperienceEditor.md)
- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [GraphQLRequestClient](classes/GraphQLRequestClient.md)
- [HorizonEditor](classes/HorizonEditor.md)
- [MemoryCacheClient](classes/MemoryCacheClient.md)
- [RestDictionaryService](classes/RestDictionaryService.md)
- [RestLayoutService](classes/RestLayoutService.md)
- [SearchQueryService](classes/SearchQueryService.md)

### Interfaces

- [CacheClient](interfaces/CacheClient.md)
- [CacheOptions](interfaces/CacheOptions.md)
- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [DictionaryPhrases](interfaces/DictionaryPhrases.md)
- [DictionaryService](interfaces/DictionaryService.md)
- [Field](interfaces/Field.md)
- [GraphQLClient](interfaces/GraphQLClient.md)
- [GraphQLDictionaryServiceConfig](interfaces/GraphQLDictionaryServiceConfig.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [HttpResponse](interfaces/HttpResponse.md)
- [Item](interfaces/Item.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContext](interfaces/LayoutServiceContext.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [PlaceholderData](interfaces/PlaceholderData.md)
- [RouteData](interfaces/RouteData.md)
- [SearchServiceConfig](interfaces/SearchServiceConfig.md)

### Type aliases

- [AppRootQueryResult](README.md#approotqueryresult)
- [AxiosDataFetcherConfig](README.md#axiosdatafetcherconfig)
- [DataFetcherResolver](README.md#datafetcherresolver)
- [Debugger](README.md#debugger)
- [GraphQLLayoutServiceConfig](README.md#graphqllayoutserviceconfig)
- [GraphQLRequestClientConfig](README.md#graphqlrequestclientconfig)
- [HttpDataFetcher](README.md#httpdatafetcher)
- [PlaceholdersData](README.md#placeholdersdata)
- [RestDictionaryServiceConfig](README.md#restdictionaryserviceconfig)
- [RestDictionaryServiceData](README.md#restdictionaryservicedata)
- [RestLayoutServiceConfig](README.md#restlayoutserviceconfig)
- [SearchQueryResult](README.md#searchqueryresult)
- [SearchQueryVariables](README.md#searchqueryvariables)

### Properties

- [debug](README.md#debug)

### Functions

- [fetchData](README.md#fetchdata)
- [getAppRootId](README.md#getapprootid)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [isServer](README.md#isserver)
- [resetEditorChromes](README.md#reseteditorchromes)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)
- [resolveUrl](README.md#resolveurl)

## Type aliases

### AppRootQueryResult

Ƭ **AppRootQueryResult**: `Object`

The schema of data returned in response to an app root query request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `layout` | `Object` |
| `layout.homePage` | `Object` |
| `layout.homePage.rootItem` | { `id`: `string`  }[] |

#### Defined in

[graphql/app-root-query.ts:28](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/app-root-query.ts#L28)

___

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: `AxiosRequestConfig` & `AxiosDataFetcherOptions`

#### Defined in

[axios-fetcher.ts:35](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L35)

___

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => [`HttpDataFetcher`](README.md#httpdatafetcher)<`T`\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): [`HttpDataFetcher`](README.md#httpdatafetcher)<`T`\>

Data fetcher resolver in order to provide custom data fetcher

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

##### Returns

[`HttpDataFetcher`](README.md#httpdatafetcher)<`T`\>

#### Defined in

[layout/rest-layout-service.ts:53](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/rest-layout-service.ts#L53)

___

### Debugger

Ƭ **Debugger**: `debug.Debugger`

#### Defined in

[debug.ts:6](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/debug.ts#L6)

___

### GraphQLLayoutServiceConfig

Ƭ **GraphQLLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `siteName` | `string` | The JSS application name |
| `formatLayoutQuery?` | (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string` | - |

#### Defined in

[layout/graphql-layout-service.ts:6](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L6)

___

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement @see GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [`Debugger`](README.md#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |

#### Defined in

[graphql-request-client.ts:20](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql-request-client.ts#L20)

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: `unknown`) => `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

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
| `data?` | `unknown` |

##### Returns

`Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

#### Defined in

[data-fetcher.ts:26](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/data-fetcher.ts#L26)

___

### PlaceholdersData

Ƭ **PlaceholdersData**<`TYPEDNAME`\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[] }

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string``string` |

#### Defined in

[layout/models.ts:64](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/models.ts#L64)

___

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: [`CacheOptions`](interfaces/CacheOptions.md) & { `apiHost`: `string` ; `apiKey`: `string` ; `dataFetcher?`: [`HttpDataFetcher`](README.md#httpdatafetcher)<[`RestDictionaryServiceData`](README.md#restdictionaryservicedata)\> ; `siteName`: `string`  }

#### Defined in

[i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)

___

### RestDictionaryServiceData

Ƭ **RestDictionaryServiceData**: `Object`

A reply from the REST Sitecore Dictionary Service

#### Type declaration

| Name | Type |
| :------ | :------ |
| `phrases` | [`DictionaryPhrases`](interfaces/DictionaryPhrases.md) |

#### Defined in

[i18n/rest-dictionary-service.ts:10](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L10)

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | [`DataFetcherResolver`](README.md#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

#### Defined in

[layout/rest-layout-service.ts:17](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/rest-layout-service.ts#L17)

___

### SearchQueryResult

Ƭ **SearchQueryResult**<`T`\>: `Object`

Schema of data returned in response to a "search" query request

**`template`** The type of objects being requested.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `search` | `Object` |
| `search.pageInfo` | `Object` |
| `search.pageInfo.endCursor` | `string` |
| `search.pageInfo.hasNext` | `boolean` |
| `search.results` | `T`[] |

#### Defined in

[graphql/search-service.ts:8](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L8)

___

### SearchQueryVariables

Ƭ **SearchQueryVariables**: `Object`

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | Required. The language versions to search for. Fetch pages that have versions in this language. |
| `pageSize?` | `number` | Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.  **`default`** 10 |
| `rootItemId?` | `string` | Optional. The ID of the search root item. Fetch items that have this item as an ancestor. |
| `templates?` | `string` | Optional. Sitecore template ID(s). Fetch items that inherit from this template(s). |

#### Defined in

[graphql/search-service.ts:34](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L34)

## Properties

### debug

• **debug**: `Readonly`<`Object`\>

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
| `fetcher` | [`HttpDataFetcher`](README.md#httpdatafetcher)<`T`\> |
| `params` | `ParsedUrlQueryInput` |

#### Returns

`Promise`<`T`\>

#### Defined in

[data-fetcher.ts:57](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/data-fetcher.ts#L57)

___

### getAppRootId

▸ **getAppRootId**(`client`, `siteName`, `language`, `jssAppTemplateId?`): `Promise`<`string` \| ``null``\>

Gets the ID of the JSS App root item for the specified site and language.

**`throws`** {RangeError} if a valid site name value is not provided.

**`throws`** {RangeError} if a valid language value is not provided.
This function intentionally avoids throwing an error if a root item is not found,
leaving that decision up to implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`GraphQLClient`](interfaces/GraphQLClient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

#### Returns

`Promise`<`string` \| ``null``\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.

#### Defined in

[graphql/app-root-query.ts:52](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/app-root-query.ts#L52)

___

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](interfaces/ComponentRendering.md) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md))[]

child placeholder

#### Defined in

[layout/utils.ts:58](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/utils.ts#L58)

___

### getFieldValue

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

#### Defined in

[layout/utils.ts:9](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/utils.ts#L9)

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

[layout/utils.ts:14](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/layout/utils.ts#L14)

___

### isEditorActive

▸ `Const` **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

[utils/editing.ts:67](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/editing.ts#L67)

___

### isExperienceEditorActive

▸ `Const` **isExperienceEditorActive**(): `boolean`

Determines whether the current execution context is within the Sitecore Experience Editor

**`deprecated`** Will be removed in a future release. Please use isEditorActive instead.

#### Returns

`boolean`

true if executing within the Sitecore Experience Editor

#### Defined in

[utils/editing.ts:87](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/editing.ts#L87)

___

### isServer

▸ **isServer**(): `boolean`

Determines whether the current execution context is server-side

#### Returns

`boolean`

true if executing server-side

#### Defined in

[utils/is-server.ts:5](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/is-server.ts#L5)

___

### resetEditorChromes

▸ `Const` **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

[utils/editing.ts:74](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/editing.ts#L74)

___

### resetExperienceEditorChromes

▸ `Const` **resetExperienceEditorChromes**(): `void`

Resets Sitecore Experience Editor "chromes"

**`deprecated`** Will be removed in a future release. Please use resetEditorChromes instead.

#### Returns

`void`

#### Defined in

[utils/editing.ts:93](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/editing.ts#L93)

___

### resolveUrl

▸ **resolveUrl**(`urlBase`, `params?`): `string`

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

**`throws`** {RangeError} if the provided url is an empty string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlBase` | `string` | the base URL that may contain query string parameters |
| `params` | `ParsedUrlQueryInput` | query string parameters |

#### Returns

`string`

a URL string

#### Defined in

[utils/resolve-url.ts:24](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/utils/resolve-url.ts#L24)
