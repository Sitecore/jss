[**@sitecore-jss/sitecore-jss-proxy**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [index](../README.md) / RenderResponse

# Interface: RenderResponse

Response object produced by the AppRenderer callback function.

## Properties

### html

> **html**: `string`

The rendered HTML to return to the client

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)

***

### redirect?

> `optional` **redirect**: `string`

Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
Note: when using this you must set the status code to 301 or 302.

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)

***

### status?

> `optional` **status**: `number`

Set the HTTP status code. If not set, the status code returned from Layout Service is returned.

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)
