[@sitecore-jss/sitecore-jss](../README.md) / LayoutService

# Interface: LayoutService

## Table of contents

### Methods

- [fetchLayoutData](layoutservice.md#fetchlayoutdata)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`: *string*, `language?`: *string*, `req?`: *IncomingMessage*, `res?`: *ServerResponse*): *Promise*<[*LayoutServiceData*](layoutservicedata.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | *string* |
| `language?` | *string* |
| `req?` | *IncomingMessage* |
| `res?` | *ServerResponse* |

**Returns:** *Promise*<[*LayoutServiceData*](layoutservicedata.md)\>

layout data

Defined in: [layout/layout-service.ts:13](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/layout-service.ts#L13)
