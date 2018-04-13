import React from 'react';
import { withPlaceholder } from '@sitecore-jss/sitecore-jss-react';
import Navigation from './components/Navigation';
import ContextItem from './components/ContextItem';

import '../../assets/css/default.css';

// The root of the application. If you're a Sitecore developer,
// this is similar to a Sitecore Layout, but just the part inside <body>

const App = ({ mainPlaceholder }) => {
  return (
    <div>
      <Navigation />
      <div id="CenterColumn">
        <div id="InnerCenter">
          {mainPlaceholder}
          <ContextItem />
        </div>
      </div>
    </div>
  );
};

export default withPlaceholder(
  { placeholder: 'main', prop: 'mainPlaceholder' },
  {
    resolvePlaceholderDataFromProps: (props) => props.route,
  }
)(App);
