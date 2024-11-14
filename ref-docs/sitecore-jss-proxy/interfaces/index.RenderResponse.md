[@sitecore-jss/sitecore-jss-proxy](../README.md) / [index](../modules/index.md) / RenderResponse

# Interface: RenderResponse

[index](../modules/index.md).RenderResponse

Response object produced by the AppRenderer callback function.

## Table of contents

### Properties

- [html](index.RenderResponse.md#html)
- [redirect](index.RenderResponse.md#redirect)
- [status](index.RenderResponse.md#status)

## Properties

### html

• **html**: `string`

The rendered HTML to return to the client

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)

___

### redirect

• `Optional` **redirect**: `string`

Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
Note: when using this you must set the status code to 301 or 302.

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)

___

### status

• `Optional` **status**: `number`

Set the HTTP status code. If not set, the status code returned from Layout Service is returned.

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)
