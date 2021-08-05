[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [layout/rest-layout-service](../modules/layout_rest_layout_service.md) / LayoutServiceConfig

# Interface: LayoutServiceConfig

[layout/rest-layout-service](../modules/layout_rest_layout_service.md).LayoutServiceConfig

## Table of contents

### Properties

- [configurationName](layout_rest_layout_service.LayoutServiceConfig.md#configurationname)
- [host](layout_rest_layout_service.LayoutServiceConfig.md#host)
- [serviceUrl](layout_rest_layout_service.LayoutServiceConfig.md#serviceurl)

## Properties

### configurationName

• `Optional` **configurationName**: `string`

Layout Service "named" configuration

#### Defined in

[layout/rest-layout-service.ts:82](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/layout/rest-layout-service.ts#L82)

___

### host

• `Optional` **host**: `string`

Host name of the Sitecore instance serving Layout Service requests.

#### Defined in

[layout/rest-layout-service.ts:77](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/layout/rest-layout-service.ts#L77)

___

### serviceUrl

• `Optional` **serviceUrl**: `string`

This value overrides the default layout service URL.
Note: `host` and `configurationName` options are ignored if `layoutServiceUrl` is set.

#### Defined in

[layout/rest-layout-service.ts:88](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/layout/rest-layout-service.ts#L88)
