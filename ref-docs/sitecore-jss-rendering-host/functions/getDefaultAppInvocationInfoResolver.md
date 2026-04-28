[**@sitecore-jss/sitecore-jss-rendering-host**](../README.md)

***

[@sitecore-jss/sitecore-jss-rendering-host](../README.md) / getDefaultAppInvocationInfoResolver

# Function: getDefaultAppInvocationInfoResolver()

> **getDefaultAppInvocationInfoResolver**(`baseAppPath?`): `AppInvocationInfoResolver`

<<<<<<< HEAD
Defined in: [defaultAppInvocationInfoResolver.ts:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-rendering-host/src/defaultAppInvocationInfoResolver.ts#L18)
=======
Defined in: [defaultAppInvocationInfoResolver.ts:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-rendering-host/src/defaultAppInvocationInfoResolver.ts#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Returns the default AppInvocationInfoResolver, which is responsible for resolving the function, within your app bundle,
that should be invoked for rendering your app.

By default, the resolver assumes a folder structure of:
`./{baseAppPath}/{JSSAppName}/{serverBundleName}.js`

`JSSAppName` is the `id` property of the JSON request body that is POSTed to the rendering host by Sitecore.

`serverBundleName` is the name of the JavaScript file (typically a bundle) that contains the function for rendering your app.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseAppPath?` | \{ `appPathResolver?`: (`requestJson`) => `string`; `baseAppPath?`: `string`; `serverBundleName?`: `string`; \} | The base path to your JSS app(s), defaults to `./dist` |
| `baseAppPath.appPathResolver?` | (`requestJson`) => `string` | - |
| `baseAppPath.baseAppPath?` | `string` | - |
| `baseAppPath.serverBundleName?` | `string` | - |

## Returns

`AppInvocationInfoResolver`

resolver
