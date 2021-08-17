---
name: graphql
routeTemplate: ./data/component-templates/article.yml
title: Using GraphQL with JSS
---
# Using GraphQL with JSS

JSS applications can use GraphQL to query and update data.

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for your API. Think of it in SQL terms as "the world's best `SELECT` statement." When you use GraphQL, only the exact data that the frontend application needs is returned by the server. Compared to a REST API, GraphQL allows for well-crafted queries that save bandwidth. Because GraphQL is a protocol, it enables additional optimizations like _query batching_ that are impossible with a REST API.

> TIP! You can learn GraphQL using the official [tutorials](http://graphql.org/learn/). You can create a  GraphQL server and query it right in a browser by using tools such as [Apollo Launchpad](https://launchpad.graphql.com/).

## What is the Sitecore GraphQL API?

The Sitecore GraphQL API is an implementation of a GraphQL server on top of Sitecore. It is designed to be a generic GraphQL service platform, not simply a content API, and can serve or aggregate any data that you can access from the Sitecore server and present it via GraphQL queries. The API also supports real-time data using GraphQL subscriptions.

[Check out the API documentation](/docs/techniques/graphql/graphql-overview) for a more detailed look at the Sitecore GraphQL API.

## Using GraphQL with JSS apps

JSS apps have several choices in terms of using GraphQL. With _integrated_ GraphQL, the format of the [layout data](/docs/techniques/working-disconnected/manifest-api) returned for a specific component by the Sitecore [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) can be modified into the result of a GraphQL query. With _connected_ GraphQL, a JSS app makes direct HTTP requests to a Sitecore GraphQL endpoint.

> All JSS sample apps come with examples of using GraphQL, both Integrated and Connected. Refer to the apps for more detailed usage examples and commented code.

### _Integrated_ GraphQL

With _integrated_ GraphQL, the format of the [layout data](/docs/techniques/working-disconnected/manifest-api) returned for a specific component by the Sitecore Layout Service can be modified into the result of a GraphQL query. This means that you can define a GraphQL query that defines the data you require to power a front-end component, and then receive the data from that query back as a property (i.e. `props.fields` for a React component). This gives you tight control over getting only what data you need, and also gives you the power of GraphQL if you require advanced data sources such as child items or CRM data.

**When to use Integrated GraphQL**

* Your component needs more data than its datasource template fields that is part of your GraphQL schema.
* The datasource template contains extra fields that you do not need to render.
* You do not wish to have any client-side GraphQL libraries such as Apollo (integrated requires no additional dependency other than JSS).

**When to avoid Integrated GraphQL**

* The component uses only content template field data. The default layout data output is sufficient without needing GraphQL.
* Your GraphQL query is not performant. For example, it aggregates 3-4 REST API calls behind the scenes. Integrated GraphQL blocks the rendering of the app until all queries for the layout have completed because it's all one HTTP request for the layout data + GraphQL queries; use Connected GraphQL to defer longer running queries until after the initial layout is rendered.
* The component needs to issue additional GraphQL queries in response to state changes. Integrated queries run only when the layout data is loaded.
* The component needs to run _mutations_ (updates) or _subscriptions_ (real-time data). Only queries can run in integrated mode.

**How to use Integrated GraphQL**

See [this page](/docs/techniques/graphql/integrated-graphql) for instructions.

### _Connected_ GraphQL

With _connected_ GraphQL, a JSS app makes direct HTTP requests to a Sitecore GraphQL endpoint. This mode is identical to using a GraphQL API in any JavaScript application, and is not JSS-specific. Usage of a JS GraphQL client is recommended, such as [Apollo Client](https://www.apollographql.com/) which is used in the samples.

**When to use Connected GraphQL**

* You need to load data asynchronously after the page layout is rendered, or in response to app state changes other than route change.
* The component needs to run _mutations_ (updates) or _subscriptions_ (real-time data).
* You need full control over the lifecycle of your app's queries and state, such as integration with Redux or [apollo-link-state](https://github.com/apollographql/apollo-link-state).

**When to avoid Connected GraphQL**

* The component uses only content template field data. The default layout data output is sufficient without needing GraphQL.
* The added page weight of a GraphQL client library is undesirable.

**How to use Connected GraphQL**

See [this page](/docs/techniques/graphql/connected-graphql) for instructions.