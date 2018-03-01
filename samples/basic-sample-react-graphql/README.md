# Basic Application GraphQL Demo

Demonstrates an very basic JSS Application written using React with GraphQL.

Consult the primary JSS documentation at https://jss.sitecore.net for the latest documentation on JSS.

# Setup

**First** run `yarn` to install dependencies.

## Deploying to Sitecore

This is required as a prerequisite to running this application, and can also be used for ongoing deployment.

* Install the JSS server components on your local Sitecore installation according to the JSS documentation
* Install `Sitecore.Services.GraphQL` according to its documentation, including the examples and JSS assembly
* `yarn setup` to configure the connection to a local Sitecore installation
* Review the application config patch file in `sitecore/config` to ensure that it is configured appropriately for your Sitecore installation.
* `yarn deploy-config` to deploy the Sitecore config patch file to the Sitecore instance (you may need to add the `hostName` to your `hosts` file)
* Use `yarn deploy-codefirst` to deploy the sample app's code and items to Sitecore
* Visit `http://jssbasicappgraphql` to see the demonstration running in Sitecore

## Connected Development

Use `yarn start:connected` to run a local development server. Sitecore is required, and content data is pulled from Sitecore. The app is hosted using a local webserver, however, and is not integrated with Sitecore.

## Quick Deploy to Sitecore

Use `yarn deploy:watch` to start a constant build/copy to Sitecore script. Change a file, refresh app in Sitecore, see updates. This will cause the app to be rendered server-side by Sitecore ('integrated mode') and then subsequent transitions are handled on the client.

# GraphQL-Specific Tasks

## Introspection Fragment Cache

In order to properly match up GraphQL interface types that are used in GraphQL fragments to the Apollo Client cache, it's [necessary for Apollo to know a bit about your GraphQL schema](https://www.apollographql.com/docs/react/recipes/fragment-matching.html). When adding or removing new components that are part of your application (or any other Sitecore Template that your application uses), ensure that you run `yarn graphql:update-schema` after the changes are present in Sitecore. This will pull the latest GraphQL introspection data local so that the Apollo cache will keep your data cached without any mistakes. Commit any changes to the `sitecore/GraphQLFragmentTypes.json` file that result from this update.