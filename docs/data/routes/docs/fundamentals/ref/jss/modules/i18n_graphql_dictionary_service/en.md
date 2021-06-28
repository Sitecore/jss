---
name: i18n_graphql_dictionary_service
routeTemplate: ./data/component-templates/article.yml
title: i18n_graphql_dictionary_service
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / i18n/graphql-dictionary-service

# Module: i18n/graphql-dictionary-service

## Table of contents

### Classes

- [GraphQLDictionaryService](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice)

### Interfaces

- [GraphQLDictionaryServiceConfig](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig)

### Type aliases

- [DictionaryQueryResult](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service#dictionaryqueryresult)

### Variables

- [queryError](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service#queryerror)

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

## Variables

### queryError

• `Const` `Private` **queryError**: ``"Valid value for rootItemId not provided and failed to auto-resolve app root item."``
