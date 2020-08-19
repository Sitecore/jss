---
name: routing
routeTemplate: ./data/component-templates/guide.yml
title: Routing Guide
---

## Route handling in JSS

### Why does JSS need custom route handling?
In Sitecore, Content Authors have the power to control the URL of each page by organizing the content tree is accordance with the desired URL structure.

For example, assuming the content items in this Sitecore tree structure are pages (i.e. routes)...
```
content
  site 1
    Home
      About
      Products
        Product X
        Product Y
        Product Z
  site 2
    Home
  site 3
    Home
```

Sitecore would automatically map those pages to these URLs.
```
https://site-1-hostname/
  https://site-1-hostname/about
  https://site-1-hostname/products
    https://site-1-hostname/products/product-x
    https://site-1-hostname/products/product-y
    https://site-1-hostname/products/product-y

https://site-2-hostname/

https://site-3-hostname/
```

> Note: Site hostnames, and rules for how to map page names to URL segments (casing, white-space replacement, etc) are defined in XML configs. Discuss with the Sitecore developers on your team if this needs to be customized per business requirements. Any customizations to how Sitecore handles routing requirements collaboration between front-end and back-end developers.

JSS apps are expected to fully support this feature, which is why the sample apps define custom routing implementations.

- [React route handler](https://github.com/Sitecore/jss/blob/dev/samples/react/src/RouteHandler.js)

- [Vue route handler](https://github.com/Sitecore/jss/blob/dev/samples/vue/src/RouteHandler.vue)

- [Angular route handler](https://github.com/Sitecore/jss/blob/e8a8368ea63d8c55ec03b0c118a903b00c0e9017/samples/angular/src/app/jss-context.service.ts#L40) | [Angular server-side route handler](https://github.com/Sitecore/jss/blob/e8a8368ea63d8c55ec03b0c118a903b00c0e9017/samples/angular/src/app/jss-context.server-side.service.ts#L26)

- [React Native route handler](https://github.com/Sitecore/jss/blob/dev/samples/react-native/src/dataService/dataService.connected.js#L35)

### How does JSS route handling work?

Changing routes boils down to making a call to Layout Service to fetch data for the new route. Refer to [Invoking the Layout Service from JSS](/docs/fundamentals/services/layout-service#invoking-the-layout-service-from-jss) documentation for an explanation of how this process works.


### Customizing route handling

As described in the documentation, fetching page data from the Layout Service API requires calling [`dataApi.fetchRouteData`](https://github.com/Sitecore/jss/blob/e8a8368ea63d8c55ec03b0c118a903b00c0e9017/packages/sitecore-jss/src/dataApi.ts#L97), which takes an `options` object. These options can be used for points of customization.

Supported `options` properties are:
- `host` (host name of the Sitecore instance serving Layout Service requests)
- `configurationName` (Layout Service "named" configuration)
- `serviceUrl` (overrides the default layout service URL)
- `querystringParams` (object of key:value pairs)
- `fetcher` (function that performs the HTTP request and returns a promise to JSON)

> View TypeScript definitions in [dataApi.ts](https://github.com/Sitecore/jss/blob/e8a8368ea63d8c55ec03b0c118a903b00c0e9017/packages/sitecore-jss/src/dataApi.ts#L77)

#### Using the `querystringParams` option

Layout service recognizes the following query string params [Reference](https://doc.sitecore.com/developers/100/developer-tools/en/sitecore-layout-service.html):
-  `sc_site`: Specify which site to fetch items from
- `sc_lang`: Specify which language to fetch data in
- `item`: Fetch an item by path or GUID
- `sc_apikey`

> Additional custom params could be added. This requires patching in custom UrlResolver or ItemResolver pipelines on the back-en.

#### Using the `fetcher` option

The `fetcher` function handles the actual call to Layout Service and returns a promise. JSS provides a default implementation of the `fetcher` function that utilizes `Axios`.

Being able to provide your own `fetcher` function is very powerful, as this enables you to customize how server responses are processes. For example, you can write logic to handle different http response codes in different ways, you can add logging to measure the roundtrip speed of Layout Service calls, you can even override values in the response.

Since the `fetcher` returns a `Promise` object, instead of rewriting it, we recommend chaining promise handler to it before passing it to `fetchRouteData`. This allows you to encapsulate customizations into individual steps, and provide error handling at every step.

---

## Routing impact on performance

A common pitfall found in JSS apps that are experiencing performance issues is that, as an end-user navigates through an app, every page is loaded using SSR. 

To avoid full page reloads when clicking links, convert Sitecore links into router links.

The following guide on how to route Sitecore links in JSS was written by JSS developer [Kam Figy](https://twitter.com/kamsar), on his [blog](https://kamsar.net/index.php/2018/09/Routing-Sitecore-links-with-JSS/). It is copied here with Kam's permission.

----
When building a single-page app with Sitecore JSS and defining internal links in Sitecore content, you may notice that clicking the link in the JSS app does not act like a single page app. Instead the link click causes a full page refresh to occur, because the routing library used by the app is not aware that the link emitted by JSS can be treated as a route link.

Maybe you don’t want that to happen, because you like the fluidity of single-page apps or want to reduce bandwidth. Excellent! You’ve come to the right place.

The following examples use React, but the same architectural principles will translate well to Vue or Angular apps and the JSS field data schema is identical.

There are two places where we can receive links back from Sitecore:

### Link Fields
Sitecore supports content fields that are explicitly hyperlinks (usually General Link fields, also referred to as CommonFieldTypes.GeneralLink in JSS disconnected data). When returned these fields contain link data (a href, optionally body text, CSS class, target, etc). In JSS apps, these are rendered using the Link component like so:

```javascript
import { Link } from '@sitecore-jss/sitecore-jss-react';

export default MyJSSComponent = props =>
    <Link field={props.fields.externalLink} />;
```

This gives us normal anchor tag output in the DOM:

```javascript
<a href="/path">Link Text</a>
```

But in react-router, a link needs to be rendered using react-router-dom‘s Link component instead, for example:

```javascript
import { Link } from 'react-router-dom';

export default RouterLinkComponent = () => <Link to="/path">Link Text</Link>;
```
To make JSS general links render using react-router links for internal links, we can create a component that conditionally chooses the link component like this:


```javascript
import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-react';
// note we're aliasing the router's link component name, since it conflicts with JSS' link component
import { Link as RouterLink } from 'react-router-dom';

/** React component that turns Sitecore link values that start with / into react-router route links */
const RoutableSitecoreLink = (props) => {
  const hasValidHref = props.field && props.field.value && props.field.value.href;
  const isEditing = props.editable && props.field.editable;

  // only want to apply the routing link if not editing (if editing, need to render editable link value)
  if(hasValidHref && !isEditing) {
    const value = props.field.value;

    // determine if a link is a route or not. This logic may not be appropriate for all usages.
    if(value.href.startsWith('/')) {
      return (
        <RouterLink to={value.href} title={value.title} target={value.target} className={value.class}>
          {props.children || value.text || value.href}
        </RouterLink>
      );
    }
  }

  return <Link {...props} />;
};

// usage - drop-in replacement for JSS' Link component
export default MyJSSComponent = (props) =>
    <RoutableSitecoreLink field={props.fields.externalLink} />;
```

With this component, now your internal link values will be turned into router links and result in only a new fetch of route data instead of a page refresh!

### Rich Text Fields
Rich Text fields are a more interesting proposition because they contain free text that is placed into the DOM, and we cannot inject RouterLink components directly into the HTML blob. Instead we can use React’s DOM access to attach an event handler to the rich text markup after it’s rendered by React that will trigger route navigation.

Similar to the general link field handling, we can wrap the JSS default RichText component with our own component that selects whether to bind the route handling events based on whether we’re editing the page or not:

```javascript
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
    this.props.history.push(event.target.pathname);
  }

  // rebinds event handlers to route links within this component
  // fired both on mount and update
  bindRouteLinks() {
    const hasText = this.props.field && this.props.field.value;
    const isEditing = this.props.editable && this.props.field.editable;

    if(hasText && !isEditing) {
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
};

// augment the component with the react-router context using withRouter()
// this gives us props.history to push new routes
RouteLinkedRichText = withRouter(RouteLinkedRichText);

// usage - drop-in replacement for JSS' RichText component
export default MyJSSComponent = (props) =>
  <RouteLinkedRichText field={props.fields.richText} />;
```

Now internal links entered in rich text fields will also be treated as route links.

### Advanced Usages
These examples use simple internal link detection that consists of “starts with /.” There are some edge cases that can defeat simple link detection, such as:

Scheme-insensitive links (//google.com) that are HTTP or HTTPS depending on the current page. These are an antipattern; encrypt all your resources.
Links to static files (i.e. media files).
For use cases such as this, more advanced detection of internal links may be required that is situational for your implementation.

----



Avoid page reloads when clicking links, make sure to you are converting Sitecore links into router links.

If using SSR, it will be used for the first rendering of your application, but by using router links it will then only require the Layout Service from there, instead of performing a SSR on every page load.

### References
- https://kamsar.net/index.php/2018/09/Routing-Sitecore-links-with-JSS
- https://blog.vitaliitylyk.com/guide-on-refactoring-your-sitecore-solution-to-sitecore-jss/

