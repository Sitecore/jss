[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / getEdgeProxyFormsUrl

# Function: getEdgeProxyFormsUrl()

> **getEdgeProxyFormsUrl**(`sitecoreEdgeContextId`, `formId`, `sitecoreEdgeUrl`?): `string`

Generates a URL for accessing Sitecore Edge Platform Forms using the provided form ID and context ID.

## Parameters

• **sitecoreEdgeContextId**: `string`

The unique context id.

• **formId**: `string`

The unique form id.

• **sitecoreEdgeUrl?**: `string` = `SITECORE_EDGE_URL_DEFAULT`

The base endpoint URL for the Edge Platform. Default is https://edge-platform.sitecorecloud.io

## Returns

`string`

The complete URL for accessing forms through the Edge Platform.

## Defined in

[packages/sitecore-jss/src/graphql/graphql-edge-proxy.ts:21](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/graphql/graphql-edge-proxy.ts#L21)
