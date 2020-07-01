---
name: graphql-security
routeTemplate: ./data/component-templates/guide.yml
title: GraphQL Security
---

# GraphQL Security

## Recommendations

#### 1. Avoid using GraphQL mutations. 
 
Unless building a custom administrative app to modify Sitecore content, we do not recommend public sites pushing data back into Sitecore. There are optional GraphQL mutations that enable writing data back, but they are not registered by default for security reasons.
 
To disable mutations, simply omit the `<mutations>` section of the schema configuration.


#### Do not depend on protecting the GraphQL API key as a way to enforce security.

The API key is exposed since it needs to be sent with every query. The API key is not in any way a security token or password. It is public knowledge, and should not be treated as a secret – it’s just for attribution and provides the user context the API runs under, and the CORS settings to allow cross-domain access, if necessary.
 

#### Disable GraphiQL in Production 
GraphiQL can be disabled by setting the value of `<graphiql>` to `false`.  At a minimum, it is recommended that you disable this on Content Delivery servers. Any public-facing access should be blocked. 

```xml
<graphiql role:require=“ContentDelivery”>false</graphiql>
<enableSchemaExport role:require=“ContentDelivery”>false</enableSchemaExport>
<enableStats role:require=“ContentDelivery”>false</enableStats>
<enableCacheStats role:require=“ContentDelivery”>false</enableCacheStats>
<disableIntrospection role:require=“ContentDelivery”>true</disableIntrospection>
```
 
#### Preventing DoS attacks (query bombs)
Complexity configuration sets limits for GraphQL queries on your site
- maxDepth - sets how many levels of nesting your GraphQL can go before rejection
  > NOTE: maxDepth values less than 15 will prevent /ui from running
- maxComplexity - sets a limit on the full number of nodes selected across the query
 
## Customizing Schema
For very heavy security requirements, do create your own locked-down GraphQL schema to minimize the threat surface, and use query whitelisting to allow only authorized queries (which can be extracted at build time with integration tests if done right) to run.
Reference:  [JSS Docs - The Sitecore GraphQL API](https://jss.sitecore.com/docs/techniques/graphql/graphql-overview) 


To achieve higher security than what is provided out-of-the-box with GraphQL, there are number of ways to harden your endpoints. Consider the following:
- [Create your own GraphQL schema](https://jss.sitecore.com/docs/techniques/graphql/graphql-overview#creating-graphql-schemas) by creating your own Schema Provider. Doing so, you can further limit what root fields can be queried through more specific definitions. Extending existing providers will only allow you to add features, so creating a new schema is the appropriate approach to hardening.

- Enable a query whitelist using through the caching mechanism.  [Caching and Whitelisting](https://jss.sitecore.com/docs/techniques/graphql/graphql-overview#caching-and-whitelisting) can be achieved through a default implementation using the `WhitelistingGraphQLQueryCache` class.
 
- Typical authorization of GraphQL can and should be implemented at the node level. This means that the resolver function for that particular node will check authorization before returning any data. This allows you to query public and protected data from the same query and endpoint.

- If the entirety of a GraphQL API endpoint requires authorization, this can be achieved through  [configuration](https://jss.sitecore.com/docs/techniques/graphql/graphql-overview#authorization). This configuration can be set up to use Identity Server token, SSO token, etc