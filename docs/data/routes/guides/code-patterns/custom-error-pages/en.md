---
name: custom-error-pages
routeTemplate: ./data/component-templates/guide.yml
title: Custom Error Pages
---

# Custom Error Pages

## JavaScript Errors
In addition to errors coming from the server, a JSS app needs to handle JavaScript errors as well. For that there are many possible implementations depending on what your specific use-case is. For example, React has  [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) , which let you bound the scope where an error is handled in React components.
 
## 404
The layout service returns HTTP 404 and the output of `src/NotFound.js` for items/routes not found in Sitecore. Customize that file to customize the 404 page content.
 
## 500
Assuming headless with SSR is being used… When the site is being accessed for the first time, the app expects to receive an HTML from the server. If a server error happens at this time, handle it the same way that it would be handled in an MVC project to send back a predefined static HTML error page. However, if the server error happens during a route change, then this is a matter of adding error handing to all the places where data is ajaxed (see “JavaScript Errors” above). 
 
## 401
By default, if an anonymous user accesses a page that requires you to be authenticated, the layout service returns 404. To implement a “Not Authorized” page:
1. Find the backend pipeline that sets the response code and patch that so that it sends 401 instead of 404 for this case.
2.  Update` src/RouteHandler.js` to handle the new HTTP code.
