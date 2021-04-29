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

Ex.
```

```

Even though _hasLayout should always be "true" in this query, using a variable is necessary for compatibility with Edge.
TODO: Will there be a KB article that describes this known issue?
