[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / graphql-request-client

# Module: graphql-request-client

## Table of contents

### Classes

- [GraphQLRequestClient](../classes/graphql_request_client.GraphQLRequestClient.md)

### Interfaces

- [GraphQLClient](../interfaces/graphql_request_client.GraphQLClient.md)

### Type aliases

- [GraphQLRequestClientConfig](graphql_request_client.md#graphqlrequestclientconfig)

## Type aliases

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement @see GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [`Debugger`](debug.md#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |

#### Defined in

[graphql-request-client.ts:20](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/graphql-request-client.ts#L20)
