[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / createDefaultDocumentMiddleware

# Function: createDefaultDocumentMiddleware()

> **createDefaultDocumentMiddleware**(`config`): (`req`, `res`, `next`) => `void`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`DefaultDocumentMiddlewareOptions`](../interfaces/DefaultDocumentMiddlewareOptions.md) |  |

## Returns

`Function`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |
| `next` | `NextFunction` |

### Returns

`void`

## Defined in

[sitecore-jss-dev-tools/src/disconnected-server/default-document.ts:14](https://github.com/Sitecore/jss/blob/8d80ded991891a848a3a0b07806683864fddae51/packages/sitecore-jss-dev-tools/src/disconnected-server/default-document.ts#L14)
