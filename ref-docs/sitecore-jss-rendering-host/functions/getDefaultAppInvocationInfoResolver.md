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

• **baseAppPath?**

The base path to your JSS app(s), defaults to `./dist`

• **baseAppPath.appPathResolver?**: `undefined` \| (`requestJson`) => `string` = `...`

• **baseAppPath.baseAppPath?**: `undefined` \| `string` = `'./dist'`

• **baseAppPath.serverBundleName?**: `undefined` \| `string` = `'server.bundle'`

## Returns

`AppInvocationInfoResolver`

resolver

## Defined in

[defaultAppInvocationInfoResolver.ts:18](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-rendering-host/src/defaultAppInvocationInfoResolver.ts#L18)
