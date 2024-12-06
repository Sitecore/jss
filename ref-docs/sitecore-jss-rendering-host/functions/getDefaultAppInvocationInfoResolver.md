[**@sitecore-jss/sitecore-jss-rendering-host**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-rendering-host](../README.md) / getDefaultAppInvocationInfoResolver

# Function: getDefaultAppInvocationInfoResolver()

> **getDefaultAppInvocationInfoResolver**(`baseAppPath`?): `AppInvocationInfoResolver`

Returns the default AppInvocationInfoResolver, which is responsible for resolving the function, within your app bundle,
that should be invoked for rendering your app.

By default, the resolver assumes a folder structure of:
`./{baseAppPath}/{JSSAppName}/{serverBundleName}.js`

`JSSAppName` is the `id` property of the JSON request body that is POSTed to the rendering host by Sitecore.

`serverBundleName` is the name of the JavaScript file (typically a bundle) that contains the function for rendering your app.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseAppPath`? | `object` | The base path to your JSS app(s), defaults to `./dist` |
| `baseAppPath.appPathResolver`? | `undefined` \| (`requestJson`) => `string` | - |
| `baseAppPath.baseAppPath`? | `undefined` \| `string` | - |
| `baseAppPath.serverBundleName`? | `undefined` \| `string` | - |

## Returns

`AppInvocationInfoResolver`

resolver

## Defined in

[defaultAppInvocationInfoResolver.ts:18](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-rendering-host/src/defaultAppInvocationInfoResolver.ts#L18)
