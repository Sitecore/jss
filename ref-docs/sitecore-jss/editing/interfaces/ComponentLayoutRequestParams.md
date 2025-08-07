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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:20](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L20)

***

### dataSourceId?

> `optional` **dataSourceId**: `string`

optional component datasource

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:28](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L28)

***

### itemId

> **itemId**: `string`

Item id to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:15](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L15)

***

### language?

> `optional` **language**: `string`

language to render component in

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:24](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L24)

***

### mode?

> `optional` **mode**: [`DesignLibraryMode`](../enumerations/DesignLibraryMode.md)

mode to be used for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:44](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L44)

***

### renderingId?

> `optional` **renderingId**: `string`

ID of the component definition rendering item in Sitecore

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:32](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L32)

***

### siteName

> **siteName**: `string`

site name to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:40](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L40)

***

### version?

> `optional` **version**: `string`

version of the context item (latest by default)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:36](https://github.com/Sitecore/jss/blob/64c629cff7519105a7ad04e0db221a0147c64298/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L36)
