[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedServerOptions

# Interface: DisconnectedServerOptions

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:12](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L12)

## Properties

### afterMiddlewareRegistered()?

> `optional` **afterMiddlewareRegistered**: (`server`) => `void`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:58](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L58)

Hook function that is called after the disconnected server middleware is registered with the server,
but before the server starts listening. Useful to add your own middleware after the disconnected middleware.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `server` | `any` |

#### Returns

`void`

***

### appName

> **appName**: `string`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:13](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L13)

***

### appRoot

> **appRoot**: `string`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:18](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L18)

Root physical path to the app (i.e. where your package.json is)

***

### customizeContext?

> `optional` **customizeContext**: [`CustomizeContextFunction`](../type-aliases/CustomizeContextFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:80](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L80)

Hook function to allow customizing the disconnected Sitecore Context mock.
Useful for faking a customized server-side context in disconnected mode.

***

### customizeRendering?

> `optional` **customizeRendering**: [`CustomizeRenderFunction`](../type-aliases/CustomizeRenderFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:93](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L93)

Hook function to allow customizing rendering (component) data.
The first parameter is the default rendering data; return an object to
use as the final rendering data. Return falsy to use the default object.

***

### customizeRoute?

> `optional` **customizeRoute**: [`CustomizeRouteFunction`](../type-aliases/CustomizeRouteFunction.md)

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:86](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L86)

Hook function to allow customizing route data.
The 'route' param is the default route data result.

***

### language

> **language**: `string`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:29](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L29)

The language to create the server in initially.

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:68](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L68)

Hook function invoked when an error occurs in the server.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`

***

### onListening()?

> `optional` **onListening**: () => `void`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:63](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L63)

Hook function invoked when the server starts listening on a port

#### Returns

`void`

***

### onManifestUpdated()?

> `optional` **onManifestUpdated**: (`manifest`) => `void`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:74](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L74)

Hook function invoked when the manifest updates, either due to file changes or language changes.
Useful to respond when the data is updated in custom middleware, etc.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `manifest` | [`ManifestInstance`](ManifestInstance.md) |

#### Returns

`void`

***

### port?

> `optional` **port**: `number`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:46](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L46)

Specify the port the server should run on. If unspecified, the server will not start listening.

***

### requireArg?

> `optional` **requireArg**: `null` \| `string`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:34](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L34)

Module to require before starting the disconnected server (i.e. a transpiler, or a config script that loads one)

***

### server?

> `optional` **server**: `any`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:41](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L41)

Express-like server instance to attach to. Defaults to a new Express instance if not passed.
Extra middleware, etc can be attached before passing the option.

***

### sourceFiles?

> `optional` **sourceFiles**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:51](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L51)

The source file specifications for the manifest generation.

***

### watchPaths

> **watchPaths**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:24](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L24)

File path(s) to watch for changes, and reload the manifest when they occur.
Paths can be relative (to the app root) or absolute.
