import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const GraphQLLayout = ({ sitecoreContext, rendering }) => {
  const disconnectedMode =
    sitecoreContext.route && sitecoreContext.route.layoutId === 'available-in-connected-mode';

  return (
    <div data-e2e-id="graphql-layout">
      {disconnectedMode && (
        <React.Fragment>
          <p>
            This app is running in disconnected mode. GraphQL requires connected mode, headless
            connected mode, or integrated mode to work.
          </p>
          <p>
            Libraries such as <code>graphql-tools</code> can provide GraphQL API mocking
            capabilities, which could enable disconnected GraphQL. This is not supported out of the
            box, however.
          </p>
          <p>
            To view the GraphQL samples, restart the app using <code>jss start:connected</code>
            &nbsp; or deploy the app to Sitecore to run in integrated mode per the JSS
            documentation.
          </p>
        </React.Fragment>
      )}
      {!disconnectedMode && <Placeholder name="jss-graphql-layout" rendering={rendering} />}
    </div>
  );
};

export default withSitecoreContext()(GraphQLLayout);
