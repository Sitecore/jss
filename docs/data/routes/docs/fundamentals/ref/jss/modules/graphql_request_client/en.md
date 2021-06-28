---
name: graphql_request_client
routeTemplate: ./data/component-templates/article.yml
title: graphql_request_client
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / graphql-request-client

# Module: graphql-request-client

## Table of contents

### Classes

- [GraphQLRequestClient](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient)

### Interfaces

- [GraphQLClient](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

### Type aliases

- [GraphQLRequestClientConfig](/docs/fundamentals/ref/jss/modules/graphql_request_client#graphqlrequestclientconfig)

## Type aliases

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement @see GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [`Debugger`](/docs/fundamentals/ref/jss/modules/debug#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |
