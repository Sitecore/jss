[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / ComponentLayoutRequestParams

# Interface: ComponentLayoutRequestParams

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:11](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L11)

Params for requesting component data from service in Design Library mode

## Properties

### componentUid

> **componentUid**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:20](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L20)

Component identifier. Can be either taken from item's layout details or
an arbitrary one (component renderingId and datasource would be used for identification then)

***

### dataSourceId?

> `optional` **dataSourceId**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:28](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L28)

optional component datasource

***

### itemId

> **itemId**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:15](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L15)

Item id to be used as context for rendering the component

***

### language?

> `optional` **language**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:24](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L24)

language to render component in

***

### mode?

> `optional` **mode**: [`DesignLibraryMode`](../enumerations/DesignLibraryMode.md)

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:44](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L44)

mode to be used for rendering the component

***

### renderingId?

> `optional` **renderingId**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:32](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L32)

ID of the component definition rendering item in Sitecore

***

### siteName

> **siteName**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:40](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L40)

site name to be used as context for rendering the component

***

### version?

> `optional` **version**: `string`

Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:36](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L36)

version of the context item (latest by default)
