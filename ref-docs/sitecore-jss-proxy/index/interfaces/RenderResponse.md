[**@sitecore-jss/sitecore-jss-proxy**](../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../README.md) / [index](../README.md) / RenderResponse

# Interface: RenderResponse

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:7](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L7)
=======
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:7](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L7)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Response object produced by the AppRenderer callback function.

## Properties

### html

> **html**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)
=======
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:11](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L11)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The rendered HTML to return to the client

***

### redirect?

> `optional` **redirect?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)
=======
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
Note: when using this you must set the status code to 301 or 302.

***

### status?

> `optional` **status?**: `number`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)
=======
Defined in: [sitecore-jss-proxy/src/types/AppRenderer.ts:15](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L15)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Set the HTTP status code. If not set, the status code returned from Layout Service is returned.
