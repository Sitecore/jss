import React from 'react';
import GraphQLData from '../../../../lib/GraphQL/GraphQLData';
import ContextQuery from './ContextItem.graphql';

// An example component that pulls data from the context (page) item
// This component is statically bound on the app, but could also be used as a dynamic rendering
// if desired.

// destructure props for cleaner local variables
// the `data` prop is a query object from react-apollo
// that is the result of the GraphQL query in ContextItem.graphql
const ContextItem = ({ data: { item, loading, error }, copyright }) => {
  // handle loading and query errors easily
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading component. {error.message}</span>;

  // render component
  return (
    <div>
      You&apos;re looking at
      <img src={item.icon} width="16" height="16" alt={item.displayName} />
      {item.displayName}
      (<small>
        {item.path} - {item.id} {item.language.name}#{item.version}
      </small>)
    </div>
  );
};

// the GraphQLData _higher order component_ wraps this component,
// and handles all of the data access logic for it.
// This component is nearly identical to react-apollo's `graphql`
// component except for some Sitecore datasource handling.
export default GraphQLData(ContextQuery)(ContextItem);
