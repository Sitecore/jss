---
name: integrated-graphql
routeTemplate: ./data/component-templates/article.yml
title: Integrated GraphQL
---
# Integrated GraphQL in JSS Apps

With _integrated_ GraphQL, the format of the [route data](/docs/techniques/working-disconnected/manifest-api) returned for a specific component by the Sitecore Layout Service can be modified into the result of a GraphQL query.

## Usage

When the Sitecore Layout Service renders a page, it returns a JSON representation of the layout of the page and the data for each component. Normally the component data is a set of fields from the Sitecore _datasource item_. Integrated GraphQL lets you re-shape this into a GraphQL query result.

### Prerequisites

* Define a [Sitecore GraphQL endpoint](/docs/techniques/graphql/graphql-overview) that has the schema you wish to query. Get this working first, and play with the schema using GraphiQL (`$endpointUrl/ui`) to ensure it works. Generally the endpoint should be defined using the JSS app's config patch file (stored under `/sitecore/config` in the JSS app, but can also be stored with Sitecore).
* Attach your JSS app to the GraphQL endpoint. On the JSS `<app>` definition, add a `graphQLEndpoint` property pointing to the `url` of the endpoint.
    ```xml
    <app name="MyJssApp" graphQLEndpoint="/sitecore/api/jssbasicapp" />
    ```

### Sitecore-first Apps

Integrated GraphQL operates by storing the GraphQL query in the `Component GraphQL Query` field on the component's rendering item. For example the GraphQL sample app sets a query on `/sitecore/layout/Renderings/JssBasicAppGraphQL/IntegratedPage`.

![GraphQL Field](/assets/img/gql-field.png)

> The `Open xGraph Browser` button will open the GraphiQL query editor and prefill the current query value so that you can edit and test it. The query is not auto-saved back into Sitecore; copy and paste the modified query back when done.

When a layout request is received by Sitecore, if a component defines a GraphQL query that is not empty, the query is executed against the JSS app's `graphQLEndpoint`, in-process and the result replaces the normal rendering field values that would be returned.

### Code-first (manifest-driven) Apps

In a code-first app the actual mechanism for the query is identical to a Sitecore-first application, but the GraphQL query to execute is provided on the JSS manifest and imported into the Sitecore item field.

To define an integrated GraphQL query for a component:

* Find the component's manifest definition (normally `/sitecore/definitions/components/ComponentName.sitecore.js`)
* Create a parallel `.graphql` file to store the query, e.g. `/sitecore/definitions/components/ComponentName.sitecore.graphql`
* Set the `graphQLQuery` property when defining the component, for example:
    ```javascript
    import { readFileSync } from 'fs';

    const query = readFileSync(
      'sitecore/definitions/components/ComponentName.sitecore.graphql',
      'utf8'
    );

    export default manifest => {
        manifest.addComponent({
            name: "ComponentName",
            graphQLQuery: query
        });
    };

    ```

> Using `readFileSync` to include the GraphQL query is recommended so the query file can be linted, but literal strings are also allowed. Parsed GraphQL query ASTs (using `graphql-tag`'s `gql` helper) are _not_ allowed.