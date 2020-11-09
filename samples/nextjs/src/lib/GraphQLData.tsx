import React from 'react';
import { graphql } from 'react-apollo';
import {
  withSitecoreContext,
  resetExperienceEditorChromes,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {DocumentNode, OperationDefinitionNode, VariableDefinitionNode} from 'graphql';

/**
 * Higher order component that abstracts common JSS + Apollo integration needs.
 *
 * This component works similar to react-apollo's graphql() HOC, but:
 * * Automatically injects $contextItem and $datasource GraphQL variable values, if the GraphQL declares usage of them
 * * Automatically disables execution of subscription queries when doing SSR
 * * Passes through any other props to its wrapped component
 *
 * @param {*} query The GraphQL AST to execute (should go through graphql-tag, no strings)
 * @param {*} configuration Values passed in are shipped to react-apollo configuration (https://www.apollographql.com/docs/react/basics/setup.html#graphql-config)
 */
function GraphQLData(query: DocumentNode, configuration: any = {}): (Component: React.ComponentClass | React.FC) => any {
  return function wrapComponent(Component: React.ComponentClass | React.FC) {
    interface SitecoreRenderingWrapperProps {
      sitecoreContext: {
        pageEditing?: boolean;
        language?: string;
        pageState?: 'preview' | 'edit' | 'normal';
        visitorIdentificationTimestamp?: number;
        site?: {
          name?: string;
        };
        itemId: string;
      };
      rendering: ComponentRendering;
    };

    class SitecoreRenderingWrapper extends React.Component<SitecoreRenderingWrapperProps> {
      static displayName = `JSSGraphQLComponent(${
        Component.displayName || Component.name || 'Component'
      })`;

      render(): JSX.Element {
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

        // build the props processing function that will set the result object to the name
        newConfiguration.props = (props: any) => {
          const innerQuery = props[newConfiguration.name];

          let resultProps: any = {};

          resultProps[newConfiguration.name] = innerQuery;

          // run a user-specified props function too if one exists
          if (configuration.props)
            resultProps = Object.assign(resultProps, configuration.props(props));

          return resultProps;
        };

        const GQL = graphql(query, newConfiguration)(Component);
        return <GQL {...this.props} />;
      }

      // eslint-disable-next-line class-methods-use-this
      componentDidUpdate() {
        resetExperienceEditorChromes();
      }
    }

    return withSitecoreContext()(SitecoreRenderingWrapper);
  };
}

function extractVariableNames(query: any) {
  const variableNames: { [s: string]: boolean; } = {};
  query.definitions
    .map((def: OperationDefinitionNode) => def.variableDefinitions)
    .filter((def: VariableDefinitionNode) => def)
    .forEach((defs: ReadonlyArray<VariableDefinitionNode>) =>
      defs.forEach((def: VariableDefinitionNode) => {
        if (def.kind && def.kind === 'VariableDefinition') {
          variableNames[def.variable.name.value] = true;
        }
      })
    );

  return variableNames;
}

export default GraphQLData;
