[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / ComponentLayoutRequestParams

# Interface: ComponentLayoutRequestParams

Params for requesting component data from service in Component Library mode

## Properties

### componentUid

> **componentUid**: `string`

Component identifier. Can be either taken from item's layout details or
an arbitrary one (component renderingId and datasource would be used for identification then)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:18](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L18)

***

### dataSourceId?

> `optional` **dataSourceId**: `string`

optional component datasource

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:26](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L26)

***

### editMode?

> `optional` **editMode**: [`EditMode`](../../layout/enumerations/EditMode.md)

edit mode (edit, preview) to be rendered component in. Component is rendered in normal mode by default

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:38](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L38)

***

### itemId

> **itemId**: `string`

Item id to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:13](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L13)

***

### language?

> `optional` **language**: `string`

language to render component in

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:22](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L22)

***

### renderingId?

> `optional` **renderingId**: `string`

ID of the component definition rendering item in Sitecore

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:30](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L30)

***

### siteName?

> `optional` **siteName**: `string`

site name to be used as context for rendering the component

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:42](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L42)

***

### variant?

> `optional` **variant**: `string`

variant to be rendered for component if set (works with rendering existing component)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:46](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L46)

***

### version?

> `optional` **version**: `string`

version of the context item (latest by default)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:34](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L34)
