[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / ServerlessEditingDataServiceConfig

# Interface: ServerlessEditingDataServiceConfig

[editing](../modules/editing.md).ServerlessEditingDataServiceConfig

## Table of contents

### Properties

- [apiRoute](editing.ServerlessEditingDataServiceConfig.md#apiroute)
- [dataFetcher](editing.ServerlessEditingDataServiceConfig.md#datafetcher)

## Properties

### apiRoute

• `Optional` **apiRoute**: `string`

The Next.js API route to invoke.
This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
This endpoint should run the `EditingDataMiddleware`.

**`default`** '/api/editing/data/[key]'

**`see`** EditingDataMiddleware

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:116](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L116)

___

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:122](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L122)
