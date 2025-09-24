[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / editingDataService

# Variable: editingDataService

> `const` **editingDataService**: [`BasicEditingDataService`](../classes/BasicEditingDataService.md) \| [`ServerlessEditingDataService`](../classes/ServerlessEditingDataService.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:229](https://github.com/Sitecore/jss/blob/fbe00e6660e3a6cec4ac12dfb40734cd8a9a9d7e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L229)

The `EditingDataService` default instance.
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

For information about the VERCEL environment variable, see
https://vercel.com/docs/environment-variables#system-environment-variables
