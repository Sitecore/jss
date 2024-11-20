[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [utils](../README.md) / getPublicUrl

# Function: getPublicUrl()

> **getPublicUrl**(): `string`

Get the publicUrl.
This is used primarily to enable compatibility with Sitecore editors.
This is set to http://localhost:3000 by default.
VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
preview deployment has unique url, we don't know exact url.
Similarly, DEPLOY_URL is provided by Netlify and would give us the deploy URL
In production non-editing environments it is desirable to use relative urls, so in that case set PUBLIC_URL = ''

## Returns

`string`

## Defined in

[sitecore-jss-nextjs/src/utils/utils.ts:12](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/utils/utils.ts#L12)
