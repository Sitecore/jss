import React from 'react';
import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import { Link as RouterLink } from 'react-router-dom';
import { loader as gqlLoader } from 'graphql.macro';
import GraphQLData from '../../lib/GraphQLData';

const ConnectedDemoQuery = gqlLoader('./query.graphql');

const GraphQLConnectedDemo = (props) => {
  const graphQLResult = props.connectedQuery;

  // Async loading and error handling
  // Remember to never return null from a JSS component when loading,
  // this will break Experience Editor.
  const { error, loading } = graphQLResult;

  // Query results load in using the name of their root field (see query.graphql)
  const { datasource, contextItem } = graphQLResult;

  return (
    <div data-e2e-id="graphql-connected">
      <h2>GraphQL Connected Demo</h2>

      <p>
        Connected GraphQL executes GraphQL queries directly against the Sitecore GraphQL endpoint.
        You can review the query execution in the browser devtools network tab. Note that Apollo
        Client maintains a query cache - so the same query will not execute twice (i.e. after route
        changes) unless either the page is refreshed, or the <em>fetch policy</em> is set to not use
        the cache. Consult the Apollo documentation for details.
      </p>

      {loading && <p className="alert alert-info">GraphQL query is executing...</p>}
      {error && <p className="alert alert-danger">GraphQL query error: {error.toString()}</p>}
      {datasource && (
        <div>
          <h4>Datasource Item (via Connected GraphQL)</h4>
          id: {datasource.id}
          <br />
          name: {datasource.name}
          <br />
          sample1: {datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={datasource.sample1?.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {datasource.sample2?.text}</li>
            <li>url: {datasource.sample2?.url}</li>
            <li>target: {datasource.sample2?.target}</li>
            <li>
              editable: <Link field={datasource.sample2?.jsonValue} />
            </li>
            <li>field type: {datasource.sample2?.definition?.type}</li>
            <li>field is shared: {datasource.sample2?.definition.shared.toString()}</li>
          </ul>
        </div>
      )}
      {contextItem && (
        <div>
          <h4>Route Item (via Connected GraphQL)</h4>
          id: {contextItem.id}
          <br />
          page title: {contextItem.pageTitle?.value}
          <br />
          children:
          <ul>
            {contextItem?.children?.results?.map((child) => (
              <li key={child?.id}>
                <RouterLink to={child.url?.path} field={child.url?.path}>
                  {child.pageTitle?.value}
                </RouterLink>
                &nbsp; (editable title too! <Text field={child.pageTitle?.jsonValue} />)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// compose() (from react-apollo) can be used when you need more than one GraphQL query
// for a single query, e.g. `compose(GraphQLData(q1), GraphQLData(q2))(component)`
export default GraphQLData(ConnectedDemoQuery, { name: 'connectedQuery' })(GraphQLConnectedDemo);
