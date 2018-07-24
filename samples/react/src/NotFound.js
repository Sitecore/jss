import React from 'react';

// Renders a route-not-found message when no route is available from Sitecore
// The JSS equivalent of a 404 Not Found page.

// This is invoked from RouteHandler when Sitecore returns no valid route data.

const NotFound = (props) => <h1>Page not found</h1>;

export default NotFound;
