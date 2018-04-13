import React from 'react';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-react';
import GraphQLData from '../../../../lib/GraphQL/GraphQLData';
import PageQuery from './ConnectedPage.graphql';

// A simple example of a JSS + GraphQL component, with GraphQL
// data loaded via HTTP calls to the GraphQL endpoint.
// This technique is useful when you wish to load the content asynchronously,
// without using the Sitecore Layout Service to run your GraphQL queries.
// For example, if a query took long enough to run that it was desirable to get page load
// executing before starting that query, as opposed to blocking layouting until the query is complete.

// See IntegratedPage component for an example of doing the same thing with LayoutService queries.

// destructure props for cleaner local variables
// the `data` prop is a query object from react-apollo
// that is the result of the GraphQL query in ConnectedPage.graphql
const ConnectedPage = ({ data: { datasource, contextItem, loading, error }, copyright }) => {
  // handle async loading and query errors easily
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading component. {error.message}</span>;

  // render component
  return (
    <div>
      <div id="Header">
        <Image media={datasource.logoImage.jss} id="scLogo" />
      </div>
      <div id="Content">
        <div id="LeftContent">
          <Text tag="h1" className="contentTitle" field={datasource.title.jss} />
          <RichText className="contentDescription" field={datasource.text.jss} />

          <h3>My Children</h3>
          {contextItem.children.map((child) => (
            <div key={child.displayName}>{child.displayName}</div>
          ))}
          {contextItem.children.length === 0 && <div>No child items</div>}
        </div>
      </div>
      <div id="Footer">
        <hr className="divider" />
        {copyright}
      </div>
    </div>
  );
};

ConnectedPage.defaultProps = {
  copyright: 'Copyright Sitecore A/S',
  data: {
    loading: true,
  },
};

// the GraphQLData _higher order component_ wraps this component,
// and handles all of the data access logic for it.
// This component is nearly identical to react-apollo's `graphql`
// component except for some Sitecore datasource handling.
export default GraphQLData(PageQuery)(ConnectedPage);
