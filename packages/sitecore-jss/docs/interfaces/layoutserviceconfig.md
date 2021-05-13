[@sitecore-jss/sitecore-jss](../README.md) / LayoutServiceConfig

# Interface: LayoutServiceConfig

## Table of contents

### Properties

- [configurationName](layoutserviceconfig.md#configurationname)
- [host](layoutserviceconfig.md#host)
- [serviceUrl](layoutserviceconfig.md#serviceurl)

## Properties

### configurationName

• `Optional` **configurationName**: *string*

Layout Service "named" configuration

Defined in: [layout/rest-layout-service.ts:82](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L82)

___

### host

• `Optional` **host**: *string*

Host name of the Sitecore instance serving Layout Service requests.

Defined in: [layout/rest-layout-service.ts:77](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L77)

___

### serviceUrl

• `Optional` **serviceUrl**: *string*

This value overrides the default layout service URL.
Note: `host` and `configurationName` options are ignored if `layoutServiceUrl` is set.

Defined in: [layout/rest-layout-service.ts:88](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L88)
