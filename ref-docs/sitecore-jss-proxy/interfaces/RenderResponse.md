[@sitecore-jss/sitecore-jss-proxy](../README.md) / RenderResponse

# Interface: RenderResponse

Response object produced by the AppRenderer callback function.

## Table of contents

### Properties

- [html](RenderResponse.md#html)
- [redirect](RenderResponse.md#redirect)
- [status](RenderResponse.md#status)

## Properties

### html

• **html**: `string`

The rendered HTML to return to the client

#### Defined in

[types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/20ac21597/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)

___

### redirect

• `Optional` **redirect**: `string`

Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
Note: when using this you must set the status code to 301 or 302.

#### Defined in

[types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/20ac21597/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)

___

### status

• `Optional` **status**: `number`

Set the HTTP status code. If not set, the status code returned from Layout Service is returned.

#### Defined in

[types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/20ac21597/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)
