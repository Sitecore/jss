[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedServerOptions

# Interface: DisconnectedServerOptions

## Table of contents

### Properties

- [appName](DisconnectedServerOptions.md#appname)
- [appRoot](DisconnectedServerOptions.md#approot)
- [customizeContext](DisconnectedServerOptions.md#customizecontext)
- [customizeRendering](DisconnectedServerOptions.md#customizerendering)
- [customizeRoute](DisconnectedServerOptions.md#customizeroute)
- [language](DisconnectedServerOptions.md#language)
- [port](DisconnectedServerOptions.md#port)
- [requireArg](DisconnectedServerOptions.md#requirearg)
- [server](DisconnectedServerOptions.md#server)
- [sourceFiles](DisconnectedServerOptions.md#sourcefiles)
- [watchPaths](DisconnectedServerOptions.md#watchpaths)

### Methods

- [afterMiddlewareRegistered](DisconnectedServerOptions.md#aftermiddlewareregistered)
- [onError](DisconnectedServerOptions.md#onerror)
- [onListening](DisconnectedServerOptions.md#onlistening)
- [onManifestUpdated](DisconnectedServerOptions.md#onmanifestupdated)

## Properties

### appName

• **appName**: `string`

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:14](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L14)

___

### appRoot

• **appRoot**: `string`

Root physical path to the app (i.e. where your package.json is)

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:19](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L19)

___

### customizeContext

• `Optional` **customizeContext**: [`CustomizeContextFunction`](../README.md#customizecontextfunction)

Hook function to allow customizing the disconnected Sitecore Context mock.
Useful for faking a customized server-side context in disconnected mode.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:81](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L81)

___

### customizeRendering

• `Optional` **customizeRendering**: [`CustomizeRenderFunction`](../README.md#customizerenderfunction)

Hook function to allow customizing rendering (component) data.
The first parameter is the default rendering data; return an object to
use as the final rendering data. Return falsy to use the default object.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:94](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L94)

___

### customizeRoute

• `Optional` **customizeRoute**: [`CustomizeRouteFunction`](../README.md#customizeroutefunction)

Hook function to allow customizing route data.
The 'route' param is the default route data result.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:87](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L87)

___

### language

• **language**: `string`

The language to create the server in initially.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:30](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L30)

___

### port

• `Optional` **port**: `number`

Specify the port the server should run on. If unspecified, the server will not start listening.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:47](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L47)

___

### requireArg

• `Optional` **requireArg**: ``null`` \| `string`

Module to require before starting the disconnected server (i.e. a transpiler, or a config script that loads one)

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:35](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L35)

___

### server

• `Optional` **server**: `any`

Express-like server instance to attach to. Defaults to a new Express instance if not passed.
Extra middleware, etc can be attached before passing the option.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:42](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L42)

___

### sourceFiles

• `Optional` **sourceFiles**: `string`[]

The source file specifications for the manifest generation.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:52](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L52)

___

### watchPaths

• **watchPaths**: `string`[]

File path(s) to watch for changes, and reload the manifest when they occur.
Paths can be relative (to the app root) or absolute.

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:25](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L25)

## Methods

### afterMiddlewareRegistered

▸ `Optional` **afterMiddlewareRegistered**(`server`): `void`

Hook function that is called after the disconnected server middleware is registered with the server,
but before the server starts listening. Useful to add your own middleware after the disconnected middleware.

#### Parameters

| Name | Type |
| :------ | :------ |
| `server` | `any` |

#### Returns

`void`

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:59](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L59)

___

### onError

▸ `Optional` **onError**(`error`): `void`

Hook function invoked when an error occurs in the server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:69](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L69)

___

### onListening

▸ `Optional` **onListening**(): `void`

Hook function invoked when the server starts listening on a port

#### Returns

`void`

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:64](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L64)

___

### onManifestUpdated

▸ `Optional` **onManifestUpdated**(`manifest`): `void`

Hook function invoked when the manifest updates, either due to file changes or language changes.
Useful to respond when the data is updated in custom middleware, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`ManifestInstance`](ManifestInstance.md) |

#### Returns

`void`

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:75](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L75)
