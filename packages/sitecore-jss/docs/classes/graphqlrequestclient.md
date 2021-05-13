[@sitecore-jss/sitecore-jss](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

## Table of contents

### Constructors

- [constructor](graphqlrequestclient.md#constructor)

### Properties

- [client](graphqlrequestclient.md#client)
- [debug](graphqlrequestclient.md#debug)
- [headers](graphqlrequestclient.md#headers)

### Methods

- [request](graphqlrequestclient.md#request)

## Constructors

### constructor

\+ **new GraphQLRequestClient**(`endpoint`: *string*, `clientConfig?`: [*GraphQLRequestClientConfig*](../README.md#graphqlrequestclientconfig)): [*GraphQLRequestClient*](graphqlrequestclient.md)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `endpoint` | *string* | - | The Graphql endpoint |
| `clientConfig` | [*GraphQLRequestClientConfig*](../README.md#graphqlrequestclientconfig) | {} | - |

**Returns:** [*GraphQLRequestClient*](graphqlrequestclient.md)

Defined in: [graphql-request-client.ts:19](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L19)

## Properties

### client

• `Private` **client**: *GraphQLClient*

Defined in: [graphql-request-client.ts:17](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L17)

___

### debug

• `Private` **debug**: Debugger

Defined in: [graphql-request-client.ts:19](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L19)

___

### headers

• `Private` **headers**: *Record*<string, string\>= {}

Defined in: [graphql-request-client.ts:18](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L18)

## Methods

### request

▸ **request**<T\>(`query`: *string* \| DocumentNode, `variables?`: { [key: string]: *unknown*;  }): *Promise*<T\>

Execute graphql request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | *string* \| DocumentNode | graphql query |
| `variables?` | *object* | graphql variables |

**Returns:** *Promise*<T\>

Defined in: [graphql-request-client.ts:39](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/graphql-request-client.ts#L39)
