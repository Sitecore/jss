import React from 'react';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-react';

// A simple example of a JSS + GraphQL component, with GraphQL
// data loaded integrated along with the Sitecore Layout Service call that retrieves the layout data.
// This technique is useful when you need to reshape the default LS-provided data,
// for example to process a datasource that relies on child items,
// without needing to resort to extending the backend pipelines.

// See ConnectedPage component for an example of doing the same thing with HTTP GraphQL queries.
// See sitecore/definitions/components/IntegratedPage.sitecore.graphql for the query definition.

// NOTE: the query definition can be made either in the disconnected manifest (like this is), or by directly
// setting the GraphQL Query field on the rendering item in Sitecore (for purely connected mode implementations)

// destructure props for cleaner local variables
// the `fields` prop is provided by Sitecore Layout Service
// that is the result of the GraphQL query in on the IntegratedPage rendering item in Sitecore
const IntegratedPage = ({ fields, copyright }) => {
  // handle the case of if GraphQL query execution results in errors
  // (you get a standard GraphQL error reply back; an array of objects with message props)
  if (fields.errors) {
    return (
      <div>
        <h4>Error loading component.</h4>
        {fields.errors.map((error) => <p key={error.message}>{error.message}</p>)}
      </div>
    );
  }

  const datasource = fields.data.datasource;
  const context = fields.data.contextItem;

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
          {context.children.map((child) => <div key={child.displayName}>{child.displayName}</div>)}
          {context.children.length === 0 && <div>No child items</div>}
        </div>
      </div>
      <div id="Footer">
        <hr className="divider" />
        {copyright}
      </div>
    </div>
  );
};

IntegratedPage.defaultProps = {
  copyright: 'Copyright Sitecore A/S',
};

export default IntegratedPage;
