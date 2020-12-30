---
name: working-connected
routeTemplate: ./data/component-templates/article.yml
title: Working Connected
---
# Working with JSS in Connected Mode

To create a new component in _connected_ mode:

1. Determine the placeholder name that the component needs to live in (this placeholder name must be defined in the app root JS or another component's JS, to define where in the HTML source the component will be injected)
1. Use the `jss deploy component <componentName> --allowedPlaceholders=[placeholderName]` command to deploy the component's registration to the Sitecore database. This command can also specify data fields that the component needs; use `jss deploy component --help` for details.
1. Create the component in the JSS app (this is JS-library-specific; e.g. for React, create a React component and register it with the `componentFactory.js`)
1. Deploy the JSS app's build to Sitecore (_integrated mode_ is necessary here so that we can use Experience Editor to add the component to a route). `jss deploy files` will do this for any app.
1. Login to Sitecore and open a route on the app with the _Experience Editor_. You should be able to add your new component to its allowed placeholder from the UI.
> NOTE: New setting has been added to the Sitecore Web.config file - `<httpCookies sameSite="None" requireSSL="true" />`. According to this new setting all cookies (session and analytic) will be marked as `requireSSL="true"`, and they won't be accepted for sites which use the http protocol.

> In order for visits to be tracked - add SSL to your development environment, or set `<httpCookies sameSite="None" requireSSL="false" />`