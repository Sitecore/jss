---
name: help
routeTemplate: ./data/component-templates/full-page.yml
title: Help
---

# Help

## Support

Server-side JSS components are supported by Sitecore via normal support channels.
JavaScript open source JSS components are _not supported_ by Sitecore Support, but pull requests and issues on GitHub are welcome.

1. For any issues, post on [Sitecore Stack Exchange] (https://sitecore.stackexchange.com/questions/tagged/jss/) with `jss` tag
1. File an issue on [GitHub](https://github.com/Sitecore/jss)
1. For quick questions, [Sitecore Slack](slack://channel?team=T09SHRBNU&id=C7JT0NRQW)
1. [Sitecore Community](https://community.sitecore.net/)

## FAQ

### Is JSS ready for production?

Yes! JSS 11.0 for Sitecore 9.0 and 9.1 is considered stable for React, Angular, Vue, and Layout Service API usage.

[React Native](/docs/client-frameworks/react-native) and [JavaScript Renderings](/docs/techniques/mvc-integration/javascript-rendering) are considered experimental.

### Where can I get a Sitecore license for JSS?
JSS is a specifically enabled license feature. If you are a customer, contact your Sitecore account manager. If you are a partner, request a new license on [SPN](https://spn.sitecore.net/).

### What UI libraries and frameworks are supported?

Here are the UI libraries/frameworks supported by JSS:
1. React 16.3+
1. Angular 6+
1. React Native (experimental support)
1. Vue.js 2.5+

### Is JSS a framework?

No. It's a set of capabilities and you can pick what makes sense for your particular use case. To provide a smooth developer experience, the sample apps can seem like a framework, but it's easy to remove the default opinions and customize it to your needs.

### Do you recommend using code-first approach?

When possible, yes. There are definitely cases where it is inappropriate. See the [development workflows docs](/docs/fundamentals/dev-workflows/overview) for a discussion.

### Is JSS going to replace Sitecore MVC?
No. JSS is meant to provide an option for JavaScript developers, allowing them to build Sitecore solutions in modern JavaScript. If you prefer ASP.NET MVC, we won't hold it against you. Much.

### Where can I see a roadmap for JSS?
Unfortunately, we don't have a public roadmap to share at the moment.

### Can I use JSS with SXA?

JSS can _coexist_ with SXA on the same Sitecore instance, as a separate site. JSS is not currently capable of acting as an SXA tenant or using SXA's experience editor extensions (i.e. drag and drop components, variants, partials, etc).

### Can I use JSS with Sitecore Forms?

No, this is not currently supported.

### Can I use JSS with Sitecore Commerce?

No, this is not currently supported.

## Known Issues

### Azure PaaS

```
[NodeInvocationException: Attempt to connect to Node timed out after 60000ms.]
Sitecore.JavaScriptServices.ViewEngine.NodeServices.HostingModels.<InvokeExportAsync>d__13`1.MoveNext() +1335
...
```

```
Error Rendering Sitecore.JavaScriptServices.ViewEngine.Presentation.JsLayoutRenderer: 
Attempt to connect to Node timed out after 60000ms.
    at Sitecore.JavaScriptServices.ViewEngine.NodeServices.HostingModels.OutOfProcessNodeInstance.d__13`1.MoveNext()
  ...
```

**Solution**:

- add the following key to app settings in your Azure App Service:
    `WEBSITE_NODE_DEFAULT_VERSION=8.9.4`

    > the value of the setting may be different depending on the currently recommended version of node.js for production. Please, consult https://nodejs.org/

- restart the App Service afterwards.

### Other known issues

* XHTML validation rule may fail on a route-level item that has JSS layout and report that "The item must render as a valid XHTML document." The solution is to disable the XHTML validation rule on the `/sitecore/system/Settings/Validation Rules/Global Rules` item; JSS sites should not be validated this way.

* Users may have to hit `Save` in Experience Editor in order to see the list of allowed renderings for a placeholder on a newly placed component.

* Links in multi-site (multi-app) environment may not be resolved properly in Experience Editor if you log in using a host name that is not configured for the current application. For example if you login to Sitecore using `https://site.core`, and your app's configured `hostName` is `https://my.app`. This issue is not specific to JSS. Please make sure to login to Experience Editor using the host name configured for your JSS app.

* Changing an item's Display Name does not trigger workflow in Sitecore, and thus does not push JSS route items into [Content Mode](/docs/fundamentals/dev-workflows/sitecore-first). This could result in a changed Display Name being overwritten on the next import. When changing a route's Display Name without any other content changes, manually push the route into Content Mode using the *To Content Mode* workflow command in the *Review* ribbon. `Issue #178`.

* Placeholders defined in JSS will use the global `key` field on their Placeholder Settings. This means that conflicts may arise if non-JSS and JSS apps use the same placeholder key on a multi-site Sitecore installation. This is not a JSS-specific issue, and to avoid it give JSS apps unique placeholder names such as `myapp-main`. Note that JSS apps will _not_ conflict with each other when using the same placeholder keys, if there are multiple JSS sites.

* Site detection that is not based on `hostName` but on `virtualFolder` / `physicalFolder` attributes requires additional configuration and query string based site name specification. Search your app for `dataApi`, and find where the dataApi's `fetchRouteData()` function is being called. Add `sc_site` to the options passed to `fetchRouteData` like so:

```
const fetchOptions = {
  // ...
  querystringParams: {
    // ... (i.e. 'sc_lang')
    sc_site: 'name of your site definition in Sitecore'
  },
};

// pseudocode
dataApi.fetchRouteData(route, fetchOptions);
```

## Troubleshooting

### Missing Layout Service Placeholder Data

After adding a placeholder to a component, then deploying to Sitecore, your new placeholder's data is missing?
Does it still work in disconnected mode?

You might have forgot to set `placeholders` on your manifest component definition. Sitecore needs to be told what placeholders are exposed on a component.

For Sitecore-first development, this is mapped into a field on the _rendering item_.

Like this:

```
addComponent(manifest, {
  name: 'Tabs',
  // tells Sitecore that the 'Tabs' component can expose
  // the 'tabs' placeholder within itself
  placeholders: ['jss-tabs'],
});
```

### React components cannot be selected in Experience Editor mode

Ensure your React components render at least one HTML tag to work in Experience Editor. If the component returns null, Experience Editor will be unable to insert or select the component.

### License error "The Sitecore.JavaScriptServices module requires a JSS-enabled license."

JSS requires a specific license endorsement. All new partner licenses have this endorsement. If your customer license is does not have the JSS endorsement, please contact your Sitecore Account Representative.

### Code-first application deployment fails after running `jss deploy` scripts

This will usually show an error message. Start by reading it closely, as they are designed to help.

1. Check that the jss app config file (under `/sitecore/config` folder in sample apps) was deployed to your Sitecore instance.

    > This can either be done manually by copying the .config file under `App_Config/Include` or via `jss deploy config` script.

1. Make sure the shared secret matches between the remote Sitecore instance and your `scjssconfig.json` config.

#### API returns HTTP 400 - Bad Request

If any of the JSS services return `HTTP 400` (Bad Request), this likely means that your API key is either missing or not configured correctly. Please refer to [this doc](/docs/getting-started/app-deployment) for more info.