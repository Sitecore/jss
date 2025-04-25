[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / editingDataService

# Variable: editingDataService

> `const` **editingDataService**: [`BasicEditingDataService`](../classes/BasicEditingDataService.md) \| [`ServerlessEditingDataService`](../classes/ServerlessEditingDataService.md)

The `EditingDataService` default instance.
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

For information about the VERCEL environment variable, see
https://vercel.com/docs/environment-variables#system-environment-variables

## Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:223](https://github.com/Sitecore/jss/blob/2fed01e638c9921055ea981b743a0be6b6491b64/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L223)
