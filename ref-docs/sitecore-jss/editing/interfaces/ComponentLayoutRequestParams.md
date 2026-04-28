[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / ComponentLayoutRequestParams

# Interface: ComponentLayoutRequestParams

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:11](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L11)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:11](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L11)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Params for requesting component data from service in Design Library mode

## Properties

### componentUid

> **componentUid**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L20)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Component identifier. Can be either taken from item's layout details or
an arbitrary one (component renderingId and datasource would be used for identification then)

***

### dataSourceId?

> `optional` **dataSourceId?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L28)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

optional component datasource

***

### itemId

> **itemId**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:15](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L15)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:15](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L15)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Item id to be used as context for rendering the component

***

### language?

> `optional` **language?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:24](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L24)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:24](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L24)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

language to render component in

***

### mode?

> `optional` **mode?**: [`DesignLibraryMode`](../enumerations/DesignLibraryMode.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L44)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

mode to be used for rendering the component

***

### renderingId?

> `optional` **renderingId?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L32)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

ID of the component definition rendering item in Sitecore

***

### siteName

> **siteName**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:40](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L40)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:40](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L40)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

site name to be used as context for rendering the component

***

### version?

> `optional` **version?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L36)
=======
Defined in: [packages/sitecore-jss/src/editing/rest-component-layout-service.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

version of the context item (latest by default)
