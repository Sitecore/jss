---
name: layout_graphql_layout_service
routeTemplate: ./data/component-templates/article.yml
title: layout_graphql_layout_service
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / layout/graphql-layout-service

# Module: layout/graphql-layout-service

## Table of contents

### Classes

- [GraphQLLayoutService](/docs/fundamentals/ref/jss/classes/layout_graphql_layout_service/graphqllayoutservice)

### Type aliases

- [GraphQLLayoutServiceConfig](/docs/fundamentals/ref/jss/modules/layout_graphql_layout_service#graphqllayoutserviceconfig)

## Type aliases

### GraphQLLayoutServiceConfig

Ƭ **GraphQLLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `formatLayoutQuery?` | (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string` | - |
| `siteName` | `string` | The JSS application name |
