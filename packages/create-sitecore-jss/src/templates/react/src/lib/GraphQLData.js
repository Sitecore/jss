import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withSitecoreContext, resetEditorChromes } from '@sitecore-jss/sitecore-jss-react';

/**
 * Higher order component that abstracts common JSS + Apollo integration needs.
 *
 * This component works similar to @apollo/client's graphql() HOC, but:
 * * Automatically injects $contextItem and $datasource GraphQL variable values, if the GraphQL declares usage of them
 * * Automatically disables execution of subscription queries when doing SSR
 * * Passes through any other props to its wrapped component
 *
 * @param {*} query The GraphQL AST to execute (should go through graphql-tag, no strings)
 * @param {*} configuration Values passed in are shipped to @apollo/client configuration (https://www.apollographql.com/docs/react/basics/setup.html#graphql-config)
 */
function GraphQLData(query, configuration = {}) {
  return function wrapComponent(Component) {
    class SitecoreRenderingWrapper extends React.Component {
      static displayName = `JSSGraphQLComponent(${
        Component.displayName || Component.name || 'Component'
      })`;

      render() {
        if (!query) {
          throw new Error(
            'query was falsy in GraphQLData. It should be a GraphQL query from graphql-tag. Perhaps missing graphql-tag/loader?'
          );
        }

        const newConfiguration = { ...configuration };

        if (!newConfiguration.name) newConfiguration.name = 'data';

        // ensure variables object exists
        newConfiguration.options = newConfiguration.options || {};
        newConfiguration.options.variables = newConfiguration.options.variables || {};

        // if we're in experience editor or preview we need to disable SSR of GraphQL queries
        // because SSR queries are made unauthenticated, so they would have normal mode data = bad
        if (this.props.sitecoreContext && this.props.sitecoreContext.pageState !== 'normal') {
          newConfiguration.options.ssr = false;
        } else if (
          query.definitions.some(
            (def) => def.kind === 'OperationDefinition' && def.operation === 'subscription'
          )
        ) {
          // if the document includes any subscriptions, we also disable SSR as this hangs the SSR process
          // not to mention being quite silly to SSR when they're reactive
          newConfiguration.options.ssr = false;
        }

        // find all variable definitions in the GraphQL query, so we can send only ones we're using
        const variableNames = extractVariableNames(query);

        // set the datasource variable, if we're using it
        if (variableNames.datasource && this.props.rendering && this.props.rendering.dataSource) {
          newConfiguration.options.variables.datasource = this.props.rendering.dataSource;
        }

        // set the contextItem variable, if we're using it
        if (
          variableNames.contextItem &&
          this.props.sitecoreContext &&
          this.props.sitecoreContext.itemId
        ) {
          newConfiguration.options.variables.contextItem = this.props.sitecoreContext.itemId;
        }

        // set the language variable, if we're using it
        if (
          variableNames.language &&
          this.props.sitecoreContext &&
          this.props.sitecoreContext.language
        ) {
          newConfiguration.options.variables.language = this.props.sitecoreContext.language;
        }

        // build the props processing function that will set the result object to the name
        newConfiguration.props = (props) => {
          const innerQuery = props[newConfiguration.name];

          let resultProps = {};

          resultProps[newConfiguration.name] = innerQuery;

          // run a user-specified props function too if one exists
          if (configuration.props) {
            resultProps = Object.assign(resultProps, configuration.props(props));
          }

          return resultProps;
        };

        const GQL = graphql(query, newConfiguration)(Component);
        return <GQL {...this.props} />;
      }

      // eslint-disable-next-line class-methods-use-this
      componentDidUpdate() {
        resetEditorChromes();
      }
    }

    return withSitecoreContext()(SitecoreRenderingWrapper);
  };
}

function extractVariableNames(query) {
  const variableNames = {};
  query.definitions
    .map((def) => def.variableDefinitions)
    .filter((def) => def)
    .forEach((defs) =>
      defs.forEach((def) => {
        if (def.kind && def.kind === 'VariableDefinition') {
          variableNames[def.variable.name.value] = true;
        }
      })
    );

  return variableNames;
}

export default GraphQLData;
