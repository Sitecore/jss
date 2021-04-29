---
name: edge-api
routeTemplate: ./data/component-templates/article.yml
title: Unified GraphQL Schema
---
# Unified GraphQL Schema

Unified = serves data from multiple authoring sources through a single endpoint.

## Queries

### search
Need to specify operator required  for the multi-value fields like _path and _templates.

Ex. [Dictionary search query](https://github.com/Sitecore/jss/blob/6a2f9497d9fa377ae4ce489d1e76bb341f385751/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L11)

Even though _hasLayout should always be "true" in this query, using a variable is necessary for compatibility with Edge.

TODO: Will there be a KB article that describes this known issue?
