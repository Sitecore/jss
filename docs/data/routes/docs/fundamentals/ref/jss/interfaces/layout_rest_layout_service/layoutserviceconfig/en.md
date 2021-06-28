---
name: layoutserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: layoutserviceconfig
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service) / LayoutServiceConfig

# Interface: LayoutServiceConfig

[layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service).LayoutServiceConfig

## Table of contents

### Properties

- [configurationName](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig#configurationname)
- [host](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig#host)
- [serviceUrl](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig#serviceurl)

## Properties

### configurationName

• `Optional` **configurationName**: `string`

Layout Service "named" configuration

___

### host

• `Optional` **host**: `string`

Host name of the Sitecore instance serving Layout Service requests.

___

### serviceUrl

• `Optional` **serviceUrl**: `string`

This value overrides the default layout service URL.
Note: `host` and `configurationName` options are ignored if `layoutServiceUrl` is set.
