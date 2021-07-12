import React from 'react';
import ReactDOM from 'react-dom';
import { RichText } from '@sitecore-jss/sitecore-jss-react';
import { withRouter } from 'react-router-dom';

/** Binds route handling to internal links within a rich text field */
class RouteLinkedRichText extends React.Component {
  constructor(props) {
    super(props);

    this.routeHandler = this.routeHandler.bind(this);
  }

  // handler function called on click of route links
  // pushes the click into the router history thus changing the route
  // props.history comes from the react-router withRouter() higher order component.
  routeHandler(event) {
    event.preventDefault();
    // Sometimes the event.target is an element wrapped in an anchor.
    // In those cases, the previous code would not work, as `pathname` might be undefined.
    // To fix, establish proper target.
    const target = event.target.pathname ? event.target : event.target.parentElement

    const hash = target.hash

    let destination = hash ? `${target.pathname}${hash}` : target.pathname

    this.props.history.push(destination);
  }

  // rebinds event handlers to route links within this component
  // fired both on mount and update
  bindRouteLinks() {
    const hasText = this.props.field && this.props.field.value;
    const isEditing = this.props.editable && this.props.field.value.editable;

    if (hasText && !isEditing) {
      const node = ReactDOM.findDOMNode(this);
      // selects all links that start with '/' - this logic may be inappropriate for some advanced uses
      const internalLinks = node.querySelectorAll('a[href^="/"]');

      internalLinks.forEach((link) => {
        // the component can be updated multiple times during its lifespan,
        // and we don't want to bind the same event handler several times so unbind first
        link.removeEventListener('click', this.routeHandler, false);
        link.addEventListener('click', this.routeHandler, false);
      });
    }
  }

  // called once when component is created
  componentDidMount() {
    this.bindRouteLinks();
  }

  // called if component data changes _after_ created
  componentDidUpdate() {
    this.bindRouteLinks();
  }

  render() {
    // strip the 'staticContext' prop from withRouter()
    // to avoid confusing React before we pass it down
    const { staticContext, ...props } = this.props;

    return <RichText {...props} />;
  }
}

// augment the component with the react-router context using withRouter()
// this gives us props.history to push new routes
export default withRouter(RouteLinkedRichText);
