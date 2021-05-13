[@sitecore-jss/sitecore-jss](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Fetch dictionary data using  Sitecore's GraphQL API.
Note: Uses graphql-request as the default library for fetching graphql data (@see GraphQLRequestClient).

## Hierarchy

- *DictionaryServiceBase*

  ↳ **GraphQLDictionaryService**

## Table of contents

### Constructors

- [constructor](graphqldictionaryservice.md#constructor)

### Properties

- [options](graphqldictionaryservice.md#options)

### Methods

- [fetchDictionaryData](graphqldictionaryservice.md#fetchdictionarydata)
- [getCacheValue](graphqldictionaryservice.md#getcachevalue)
- [getDictionaryPhrases](graphqldictionaryservice.md#getdictionaryphrases)
- [setCacheValue](graphqldictionaryservice.md#setcachevalue)

## Constructors

### constructor

\+ **new GraphQLDictionaryService**(`options`: [*GraphQLDictionaryServiceConfig*](../interfaces/graphqldictionaryserviceconfig.md)): [*GraphQLDictionaryService*](graphqldictionaryservice.md)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [*GraphQLDictionaryServiceConfig*](../interfaces/graphqldictionaryserviceconfig.md) | instance |

**Returns:** [*GraphQLDictionaryService*](graphqldictionaryservice.md)

Overrides: DictionaryServiceBase.constructor

Defined in: [i18n/graphql-dictionary-service.ts:104](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L104)

## Properties

### options

• **options**: [*GraphQLDictionaryServiceConfig*](../interfaces/graphqldictionaryserviceconfig.md)

Inherited from: DictionaryServiceBase.options

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`: *string*): *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

Fetches dictionary data for internalization.

**`default`** Search query
query DictionarySearch(
$rootItemId: String!,
$language: String!,
$dictionaryEntryTemplateId: String!,
$pageSize: Int = 10,
$after: String
) {
search(
where: {
AND:[
{ name: "_path",      value: $rootItemId },
{ name: "_templates", value: $dictionaryEntryTemplateId },
{ name: "_language",  value: $language }
]
}
first: $pageSize
after: $after
orderBy: { name: "Title", direction: ASC }
) {
total
pageInfo {
endCursor
hasNext
}
dictionaryPhrases: results {
key: field(name: "key") {
value
},
phrase: field(name: "phrase") {
value
}
}
}
}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | *string* | the language to fetch |

**Returns:** *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

Overrides: DictionaryServiceBase.fetchDictionaryData

Defined in: [i18n/graphql-dictionary-service.ts:153](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L153)

___

### getCacheValue

▸ `Protected` **getCacheValue**(`key`: *string*): ``null`` \| [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |

**Returns:** ``null`` \| [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

Inherited from: DictionaryServiceBase.getCacheValue

Defined in: [i18n/dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L55)

___

### getDictionaryPhrases

▸ **getDictionaryPhrases**(`client`: [*GraphQLRequestClient*](graphqlrequestclient.md), `language`: *string*): *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

Gets dictionary phrases

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [*GraphQLRequestClient*](graphqlrequestclient.md) | that fetches data from a GraphQL endpoint. |
| `language` | *string* |  |

**Returns:** *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

dictionary phrases

Defined in: [i18n/graphql-dictionary-service.ts:182](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L182)

___

### setCacheValue

▸ `Protected` **setCacheValue**(`key`: *string*, `value`: [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)): [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |
| `value` | [*DictionaryPhrases*](../interfaces/dictionaryphrases.md) |

**Returns:** [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

Inherited from: DictionaryServiceBase.setCacheValue

Defined in: [i18n/dictionary-service.ts:59](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L59)
