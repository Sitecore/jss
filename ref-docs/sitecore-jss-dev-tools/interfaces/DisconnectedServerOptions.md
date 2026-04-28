[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / DisconnectedServerOptions

# Interface: DisconnectedServerOptions

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L12)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### afterMiddlewareRegistered?

> `optional` **afterMiddlewareRegistered?**: (`server`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:58](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L58)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:58](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L58)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:13](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L13)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:13](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L13)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### appRoot

> **appRoot**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L18)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Root physical path to the app (i.e. where your package.json is)

***

### customizeContext?

> `optional` **customizeContext?**: [`CustomizeContextFunction`](../type-aliases/CustomizeContextFunction.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:80](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L80)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:80](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L80)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hook function to allow customizing the disconnected Sitecore Context mock.
Useful for faking a customized server-side context in disconnected mode.

***

### customizeRendering?

> `optional` **customizeRendering?**: [`CustomizeRenderFunction`](../type-aliases/CustomizeRenderFunction.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:93](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L93)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:93](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L93)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hook function to allow customizing rendering (component) data.
The first parameter is the default rendering data; return an object to
use as the final rendering data. Return falsy to use the default object.

***

### customizeRoute?

> `optional` **customizeRoute?**: [`CustomizeRouteFunction`](../type-aliases/CustomizeRouteFunction.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:86](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L86)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:86](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L86)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hook function to allow customizing route data.
The 'route' param is the default route data result.

***

### language

> **language**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:29](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L29)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:29](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L29)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The language to create the server in initially.

***

### onError?

> `optional` **onError?**: (`error`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:68](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L68)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:68](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L68)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hook function invoked when an error occurs in the server.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`

***

### onListening?

> `optional` **onListening?**: () => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:63](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L63)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:63](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L63)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hook function invoked when the server starts listening on a port

#### Returns

`void`

***

### onManifestUpdated?

> `optional` **onManifestUpdated?**: (`manifest`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:74](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L74)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:74](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L74)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **port?**: `number`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:46](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L46)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:46](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L46)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Specify the port the server should run on. If unspecified, the server will not start listening.

***

### requireArg?

<<<<<<< HEAD
> `optional` **requireArg**: `null` \| `string`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L34)
=======
> `optional` **requireArg?**: `string` \| `null`

Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Module to require before starting the disconnected server (i.e. a transpiler, or a config script that loads one)

***

### server?

> `optional` **server?**: `any`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L41)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Express-like server instance to attach to. Defaults to a new Express instance if not passed.
Extra middleware, etc can be attached before passing the option.

***

### sourceFiles?

> `optional` **sourceFiles?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:51](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L51)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:51](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L51)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The source file specifications for the manifest generation.

***

### watchPaths

> **watchPaths**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:24](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L24)
=======
Defined in: [sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts:24](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L24)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

File path(s) to watch for changes, and reload the manifest when they occur.
Paths can be relative (to the app root) or absolute.
