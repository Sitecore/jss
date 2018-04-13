import React from 'react';
import { NavLink } from 'react-router-dom';
import GraphQLData from '../../../../lib/GraphQL/GraphQLData';
import NavigationQuery from './Navigation.graphql';

// If you import a CSS file it'll be added to the output CSS bundle
import './Navigation.css';

// A GraphQL-driven component that renders a static-bound top level navigation

const NavigationItem = ({ displayName, url, className }) => (
  <li className={className}>
    <NavLink to={url} exact>
      {displayName}
    </NavLink>
  </li>
);

const Navigation = ({ data: { nav, loading, error } }) => {
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading navigation. {error.message}</span>;

  // render component
  return (
    <div className="navigation">
      <ul>
        <NavigationItem {...nav} className="navigation__link" />
        {nav.children.map((navItem) => (
          <NavigationItem {...navItem} key={navItem.url} className="navigation__link" />
        ))}
      </ul>
    </div>
  );
};

// the GraphQLData _higher order component_ wraps this component,
// and handles all of the data access logic for it.
// This component is nearly identical to react-apollo's `graphql`
// component except for some Sitecore datasource handling.
export default GraphQLData(NavigationQuery, {
  options: {
    variables: {
      rootPath: '/sitecore/content/JssBasicAppGraphQL/home',
    },
  },
})(Navigation);
