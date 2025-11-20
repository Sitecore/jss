[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [index](../README.md) / RenderResponse

# Interface: RenderResponse

Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:7](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L7)

Response object produced by the AppRenderer callback function.

## Properties

### html

> **html**: `string`

Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)

The rendered HTML to return to the client

***

### redirect?

> `optional` **redirect**: `string`

Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)

Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
Note: when using this you must set the status code to 301 or 302.

***

### status?

> `optional` **status**: `number`

Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)

Set the HTTP status code. If not set, the status code returned from Layout Service is returned.
