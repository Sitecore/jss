@sitecore-jss/sitecore-jss

# @sitecore-jss/sitecore-jss

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaapi.md)

### Enumerations

- [LayoutServicePageState](enums/layoutservicepagestate.md)

### Classes

- [AxiosDataFetcher](classes/axiosdatafetcher.md)
- [GraphQLDictionaryService](classes/graphqldictionaryservice.md)
- [GraphQLLayoutService](classes/graphqllayoutservice.md)
- [GraphQLRequestClient](classes/graphqlrequestclient.md)
- [RestDictionaryService](classes/restdictionaryservice.md)
- [RestLayoutService](classes/restlayoutservice.md)

### Interfaces

- [ComponentFields](interfaces/componentfields.md)
- [ComponentParams](interfaces/componentparams.md)
- [ComponentRendering](interfaces/componentrendering.md)
- [DictionaryPhrases](interfaces/dictionaryphrases.md)
- [DictionaryService](interfaces/dictionaryservice.md)
- [Field](interfaces/field.md)
- [GraphQLDictionaryServiceConfig](interfaces/graphqldictionaryserviceconfig.md)
- [HtmlElementRendering](interfaces/htmlelementrendering.md)
- [HttpResponse](interfaces/httpresponse.md)
- [Item](interfaces/item.md)
- [LayoutService](interfaces/layoutservice.md)
- [LayoutServiceConfig](interfaces/layoutserviceconfig.md)
- [LayoutServiceContext](interfaces/layoutservicecontext.md)
- [LayoutServiceContextData](interfaces/layoutservicecontextdata.md)
- [LayoutServiceData](interfaces/layoutservicedata.md)
- [LayoutServiceRequestOptions](interfaces/layoutservicerequestoptions.md)
- [PlaceholderData](interfaces/placeholderdata.md)
- [RouteData](interfaces/routedata.md)

### Type aliases

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

### Properties

- [debug](README.md#debug)

### Variables

- [dataApi](README.md#dataapi)

### Functions

- [fetchData](README.md#fetchdata)
- [getAppRootId](README.md#getapprootid)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [isServer](README.md#isserver)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)
- [resolveUrl](README.md#resolveurl)

## Type aliases

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: AxiosRequestConfig & AxiosDataFetcherOptions

Defined in: [axios-fetcher.ts:35](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L35)

___

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: IncomingMessage, `res?`: ServerResponse) => [*HttpDataFetcher*](README.md#httpdatafetcher)<T\>

Data fetcher resolver in order to provide custom data fetcher

**`param`** Request instance

**`param`** Response instance

#### Type declaration

▸ <T\>(`req?`: IncomingMessage, `res?`: ServerResponse): [*HttpDataFetcher*](README.md#httpdatafetcher)<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | IncomingMessage |
| `res?` | ServerResponse |

**Returns:** [*HttpDataFetcher*](README.md#httpdatafetcher)<T\>

Defined in: [layout/rest-layout-service.ts:149](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L149)

___

### Debugger

Ƭ **Debugger**: debug.Debugger

Defined in: [debug.ts:6](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/debug.ts#L6)

___

### GraphQLLayoutServiceConfig

Ƭ **GraphQLLayoutServiceConfig**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | *string* | The API key to use for authentication |
| `endpoint` | *string* | Your Graphql endpoint |
| `formatLayoutQuery?` | (`siteName`: *string*, `itemPath`: *string*, `locale?`: *string*) => *string* | Override default layout query  **`param`**  **`param`**  **`param`**  **`returns`** custom layout query   **`default`** Layout query layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}") |
| `siteName` | *string* | The JSS application name |

Defined in: [layout/graphql-layout-service.ts:6](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L6)

___

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | *string* | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [*Debugger*](README.md#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |

Defined in: [graphql-request-client.ts:5](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L5)

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**<T\>: (`url`: *string*, `data?`: { [key: string]: *unknown*;  }) => *Promise*<[*HttpResponse*](interfaces/httpresponse.md)<T\>\>

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`: *string*, `data?`: { [key: string]: *unknown*;  }): *Promise*<[*HttpResponse*](interfaces/httpresponse.md)<T\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `data?` | *object* |

**Returns:** *Promise*<[*HttpResponse*](interfaces/httpresponse.md)<T\>\>

Defined in: [data-fetcher.ts:26](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/data-fetcher.ts#L26)

___

### PlaceholdersData

Ƭ **PlaceholdersData**<TYPEDNAME\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[]}

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type | Default |
| :------ | :------ | :------ |
| `TYPEDNAME` | *string* | *string* |

Defined in: [layout/models.ts:64](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/models.ts#L64)

___

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: CacheOptions & { `apiHost`: *string* ; `apiKey`: *string* ; `dataFetcher?`: [*HttpDataFetcher*](README.md#httpdatafetcher)<[*RestDictionaryServiceData*](README.md#restdictionaryservicedata)\> ; `siteName`: *string*  }

Defined in: [i18n/rest-dictionary-service.ts:13](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L13)

___

### RestDictionaryServiceData

Ƭ **RestDictionaryServiceData**: *object*

A reply from the REST Sitecore Dictionary Service

#### Type declaration

| Name | Type |
| :------ | :------ |
| `phrases` | [*DictionaryPhrases*](interfaces/dictionaryphrases.md) |

Defined in: [i18n/rest-dictionary-service.ts:9](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L9)

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | *string* | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | *string* | The Sitecore SSC API key your app uses |
| `dataFetcherResolver?` | [*DataFetcherResolver*](README.md#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | *string* | The JSS application name |
| `tracking?` | *boolean* | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

Defined in: [layout/rest-layout-service.ts:118](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L118)

## Properties

### debug

• **debug**: *Readonly*<{ `dictionary`: Debugger ; `experienceEditor`: Debugger ; `http`: Debugger ; `layout`: Debugger ; `sitemap`: Debugger  }\>

## Variables

### dataApi

• `Const` **dataApi**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fetchPlaceholderData` | (`placeholderName`: *string*, `itemPath`: *string*, `options`: [*LayoutServiceRequestOptions*](interfaces/layoutservicerequestoptions.md)<[*PlaceholderData*](interfaces/placeholderdata.md)\>) => *Promise*<[*PlaceholderData*](interfaces/placeholderdata.md)\> |
| `fetchRouteData` | (`itemPath`: *string*, `options`: [*LayoutServiceRequestOptions*](interfaces/layoutservicerequestoptions.md)<[*LayoutServiceData*](interfaces/layoutservicedata.md)\>) => *Promise*<[*LayoutServiceData*](interfaces/layoutservicedata.md)\> |

Defined in: [index.ts:13](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/index.ts#L13)

## Functions

### fetchData

▸ **fetchData**<T\>(`url`: *string*, `fetcher`: [*HttpDataFetcher*](README.md#httpdatafetcher)<T\>, `params?`: querystring.ParsedUrlQueryInput): *Promise*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | *string* | - |
| `fetcher` | [*HttpDataFetcher*](README.md#httpdatafetcher)<T\> | - |
| `params` | querystring.ParsedUrlQueryInput | {} |

**Returns:** *Promise*<T\>

Defined in: [data-fetcher.ts:60](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/data-fetcher.ts#L60)

___

### getAppRootId

▸ **getAppRootId**(`client`: [*GraphQLRequestClient*](classes/graphqlrequestclient.md), `siteName`: *string*, `language`: *string*): *Promise*<string\>

Gets the ID of the JSS App root item from the Sitecore item tree.

**`throws`** Error if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*GraphQLRequestClient*](classes/graphqlrequestclient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | *string* | the name of the Sitecore site. |
| `language` | *string* | the item language version. |

**Returns:** *Promise*<string\>

the root item ID of the JSS App in Sitecore.

Defined in: [utils/graphql-queries.ts:37](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/utils/graphql-queries.ts#L37)

___

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`: [*ComponentRendering*](interfaces/componentrendering.md), `placeholderName`: *string*): ([*ComponentRendering*](interfaces/componentrendering.md) \| [*HtmlElementRendering*](interfaces/htmlelementrendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [*ComponentRendering*](interfaces/componentrendering.md) |
| `placeholderName` | *string* |

**Returns:** ([*ComponentRendering*](interfaces/componentrendering.md) \| [*HtmlElementRendering*](interfaces/htmlelementrendering.md))[]

child placeholder

Defined in: [layout/utils.ts:56](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/utils.ts#L56)

___

### getFieldValue

▸ **getFieldValue**<T\>(`renderingOrFields`: [*ComponentRendering*](interfaces/componentrendering.md) \| Fields, `fieldName`: *string*): T \| *undefined*

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [*ComponentRendering*](interfaces/componentrendering.md) \| Fields |
| `fieldName` | *string* |

**Returns:** T \| *undefined*

Defined in: [layout/utils.ts:9](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/utils.ts#L9)

▸ **getFieldValue**<T\>(`renderingOrFields`: [*ComponentRendering*](interfaces/componentrendering.md) \| Fields, `fieldName`: *string*, `defaultValue`: T): T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [*ComponentRendering*](interfaces/componentrendering.md) \| Fields |
| `fieldName` | *string* |
| `defaultValue` | T |

**Returns:** T

Defined in: [layout/utils.ts:13](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/utils.ts#L13)

___

### isExperienceEditorActive

▸ `Const` **isExperienceEditorActive**(): *boolean*

**Returns:** *boolean*

Defined in: [utils/experience-editor.ts:3](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/utils/experience-editor.ts#L3)

___

### isServer

▸ **isServer**(): *boolean*

Determines whether the current execution context is server-side

**Returns:** *boolean*

true if executing server-side

Defined in: [utils/is-server.ts:5](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/utils/is-server.ts#L5)

___

### resetExperienceEditorChromes

▸ `Const` **resetExperienceEditorChromes**(): *void*

**Returns:** *void*

Defined in: [utils/experience-editor.ts:12](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/utils/experience-editor.ts#L12)

___

### resolveUrl

▸ **resolveUrl**(`urlBase`: *string*, `params?`: querystring.ParsedUrlQueryInput): *string*

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

**`throws`** {RangeError} if the provided url is an empty string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `urlBase` | *string* | - | the base URL that may contain query string parameters |
| `params` | querystring.ParsedUrlQueryInput | {} | query string parameters |

**Returns:** *string*

a URL string

Defined in: [utils/resolve-url.ts:24](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/utils/resolve-url.ts#L24)
