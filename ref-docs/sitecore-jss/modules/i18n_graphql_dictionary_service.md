[Sitecore JavaScript Rendering SDK](../README.md) / i18n/graphql-dictionary-service

# Module: i18n/graphql-dictionary-service

## Table of contents

### Classes

- [GraphQLDictionaryService](../classes/i18n_graphql_dictionary_service.GraphQLDictionaryService.md)

### Interfaces

- [GraphQLDictionaryServiceConfig](../interfaces/i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md)

### Type aliases

- [DictionaryQueryResult](i18n_graphql_dictionary_service.md#dictionaryqueryresult)

### Variables

- [queryError](i18n_graphql_dictionary_service.md#queryerror)

## Type aliases

### DictionaryQueryResult

Ƭ **DictionaryQueryResult**: `Object`

The schema of data returned in response to a dictionary query request.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Object` |
| `key.value` | `string` |
| `phrase` | `Object` |
| `phrase.value` | `string` |

#### Defined in

[i18n/graphql-dictionary-service.ts:72](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L72)

## Variables

### queryError

• `Const` `Private` **queryError**: ``"Valid value for rootItemId not provided and failed to auto-resolve app root item."``

#### Defined in

[i18n/graphql-dictionary-service.ts:9](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L9)
