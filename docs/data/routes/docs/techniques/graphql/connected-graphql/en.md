---
name: connected-graphql
routeTemplate: ./data/component-templates/article.yml
title: Connected GraphQL
---
# Connected GraphQL in JSS Apps

With _connected_ GraphQL, a JSS app makes direct HTTP requests to a Sitecore GraphQL endpoint. This mode is identical to using a GraphQL API in any JavaScript application, and is not JSS-specific.

## Prerequisites

* Define a [Sitecore GraphQL endpoint](/docs/techniques/graphql/graphql-overview) that has the schema you wish to query. Get this working first, and play with the schema using GraphiQL (`$endpointUrl/ui`) to ensure it works. Generally the endpoint should be defined using the JSS app's config patch file (stored under `/sitecore/config` in the JSS app, but can also be stored with Sitecore).
* Install and configure a GraphQL client to query the API endpoint. The sample app uses and integrates with Apollo Client.

## Usage

Connected GraphQL is exactly like using any other GraphQL API from a JavaScript application. All JSS [sample applications](/docs/client-frameworks/getting-started/quick-start) contain GraphQL usage examples with the [Apollo GraphQL Client](https://www.apollographql.com), but any GraphQL client - including plain `fetch` - will work.

## Troubleshooting

#### When querying using typed fragments, my query works but the component doesn't receive the data.

When executing a query such as this example, where template typing-based fragments are being used:

```graphql
item {
  # AppRoute is a Sitecore Template-based GraphQL type
  ...on AppRoute {
    pageTitle {
      value
    }
  }
}
```

You may encounter a situation with Apollo Client where the raw GraphQL response returns the `value`, but the JSS app does not receive it at the component level. Apollo Client maintains a smart cache of GraphQL data; in order to cache GraphQL types effectively it needs to know some information about the schema of the GraphQL API. When the schema changes, such as in response to refactoring your Sitecore templates, this schema data can become out of date - and incorrect schema data may result in improper caching.

To update the schema data, run `jss graphql:update` to get the latest schema data from the GraphQL endpoint. The updated data should be committed to source control.