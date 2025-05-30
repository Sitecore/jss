[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / ComponentLayoutRequestParams

# Interface: ComponentLayoutRequestParams

Params for requesting component data from service in Design Library mode

## Properties

### componentUid

> **componentUid**: `string`

Component identifier. Can be either taken from item's layout details or
an arbitrary one (component renderingId and datasource would be used for identification then)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:19](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L19)

***

### dataSourceId?

> `optional` **dataSourceId**: `string`

optional component datasource

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:27](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L27)

***

### itemId

> **itemId**: `string`

Item id to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:14](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L14)

***

### language?

> `optional` **language**: `string`

language to render component in

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:23](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L23)

***

### renderingId?

> `optional` **renderingId**: `string`

ID of the component definition rendering item in Sitecore

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:31](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L31)

***

### siteName

> **siteName**: `string`

site name to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:39](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L39)

***

### version?

> `optional` **version**: `string`

version of the context item (latest by default)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:35](https://github.com/Sitecore/jss/blob/2bef66b6ad3587763cf728655e6eb081350ededd/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L35)
