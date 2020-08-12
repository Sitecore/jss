---
name: query-recipes
routeTemplate: ./data/component-templates/guide.yml
title: Query Recipes
---
## Sample queries for Integrated GraphQL

### Get an item by path, specify which fields to fetch
```graphql
{
  item(path:"/") {
    id
    name
    displayName
    url
    icon
    path
  }
}
```
> *Note*: in this example, the url value could be unreliable because it is based on the `rootPath` value of your GraphQL endpoint, which may differ from you site path.

---

### Get an item by path, customize how fields are labeled in response
```graphql
{
  item(path:"/") {
    id
    name
    test: id
  }
}
```

---

### Get an item by path, and get all fields
```graphql
{
  item(path:"/") {
     fields  {
        name
        value
     }
  }
}
```

---

### Get an item by path, and get a specific field value by field name
```graphql
{
  item(path:"/") {
     field(name : "title") {
       title: value
      }
  }
}
```

---

### Get an item using the `$contextItem` variable
```graphql
query Query($contextItem: String!)
{
  item(path: $contextItem) {
    id
    name
  }
}
```

---

### Get the child items
```graphql
query Query($contextItem: String!)
{
  item(path: $contextItem) {
    id
    name
    children {
      displayName
      url
      path
    }
  }
}
```

---

### Get the child items of child items
```graphql
query Query($contextItem: String!)
{
  item(path: $contextItem) {
    id
    name
    children {
      id
      displayName
      url
      path
      children{
        id
        displayName
        url
        path
      }
    }
  }
}
```

#### Same query, using Fragments
```graphql
query Query($contextItem: String!)
{
  item(path: $contextItem) {
    ...getFields
    children {
      ...getFields
      children{
        ...getFields
      }
    }
  }
}

fragment getFields on Item {
  name
  displayName
  id
  path
}
```

---

### Get the parent item
```graphql
query Query($contextItem: String!)
{
  item(path: $contextItem) {
    id
    name
    parent {
      id
      name
    }
  }
}
```

---

### Get an item using the `$datasource` variable
```graphql
query MyDemoQuery($datasource: String!)
{
  item(path: $datasource) {
    id
    name
  }
}
```

---

### Execute multiple queries (using multiple variables) in a single statement
```graphql
query Query($contextItem: String!, $datasource: String!) {
  datasource: item(path: $datasource) {
    id
    name
  }
  contextItem: item(path: $contextItem) {
    id
    name
  }
}
```

---

### Querying a strongly-typed template with a Droptree and Treelist
```graphql
query MyDemoQuery( $contextItem: String!) 
{
  contextItem: item(path: $contextItem) {
    ...on Jsspage {
      text {
        editable
      }
      myDroptree {
        id
        targetItem {
          displayName
          children {
            name
          }
        }
      }
      myTreelist {
         editable
         targetItems {
          name
        }
      }
    }
  }
}
```

> *Note*: the field `editable` returns the field value when the page is rendering for the end-user, and returns a special Experience Editor-friendly string when rendering in authoring mode.

---

## Sample queries for Connected GraphQL

### Get items using the Search API, using filters, facets, and pagination
```graphql
{
  search(
    fieldsEqual:[{name:"_fullpath", value:"/sitecore/content/home*" }]
      facetOn:["contenttype", "category"]
      first: 5
      after: "0") {
    facets {
      name
      values {
        value
        count
      }
    }
    results {
      items {
        item {
          name
          path
          url
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
```

## Community References
- [Starting with Sitecore JSS Integrated GraphQL by Jan Bluemink](http://www.stockpick.nl/english/jss-integrated-graphql/)

- [Sitecore JSS Integrated GraphQL Queries by Jan Bluemink](http://www.stockpick.nl/english/jss-integrated-graphql-queries/)

- [Implementing a faceted search page with Sitecore JSS and React by Adam Lamarre](https://www.adamlamarre.com/implementing-a-search-page-with-sitecore-jss/)