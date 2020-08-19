---
name: implementation-patterns
routeTemplate: ./data/component-templates/guide.yml
title: Implementation Patterns
---

## Multisite in JSS
With the out-of-the-box configuration, each JSS app creates one site definition and generates an independent code bundle. So to support multisite scenarios, it is necessary to create and deploy multiple JSS apps.

If you deploy 3 JSS apps to the same Sitecore instance, this will create 3 independent sites, and 3 independent webpack bundles on the filesystem that would be structured like this:

```
<sitecore installation root>
  /dist
    /site 1
    /site 2
    /site 3
```

After deploying all the apps and switching to Sitecore-first workflow, there is no technical limitation preventing you from re-organizing item and references from the Sitecore side to be more multisite compatible. For example, sharing templates between the sites, settings up placeholder settings in such a way as to share components between sites, etc. The challenge is that from the code side, each app only sees it’s own code, so achieving actual sharing capabilities requires some customization.

### Microsites under the same domain
Micro-sites can be separate JSS apps and stay under the same domain. In their site definitions, they need to have different virtual paths and different site names.

You need to ensure that the sc_site parameter is always populated in calls to Layout Service to use this technique. 

**Sharing templates**
- Disconnected JSS only has a single-app view. But there is nothing stopping you from sharing templates and components from Sitecore side.
- Defining layout on standard values can only be done on Sitecore side.

### Code-first or Sitecore-first?
For multi-site scenarios, we recommend moving to Sitecore-first as soon as possible. 
The reason is that when you get into data architecture for multi-site, you need to have experienced Sitecore developers involved.

JSS imports everything into the `Project` folder in Sitecore, but after switching to Sitecore-First, Sitecore developers are free to reorganize templates/components to be more Helix oriented (it’s a good idea to do so).

### Using Monorepos

One way to solve the challenge of not being able to share components between apps is to use a Monorepo structure for your apps, and manage it with a tool like [Lerna](https://github.com/lerna/lerna). With this approach, shared code can be pulled out into a separate JS project. And the JSS apps that need the shared code can simply import it from the code side.

Sample project structure
```
/structural-components
/commerce-components
/site-1
  /src
    /components
      /MyComponent.js
        @import * from 'commerce-components';
package.json
lerna.json
```

---

## Multisite in JSS with SXA

The SXA integration adds Content-Author-friendly site management capabilities to JSS apps.
- Automated scaffolding for JSS tenants/sites in Content Editor
- Management of JSS site settings in Sitecore
- Full power of SXA’s page/partial designs in JSS sites
- Dialog-driven import of disconnected apps into Sitecore

Refer to the [SXA Integration Guide](/guides/sxa-integration) for more information on this topic.
