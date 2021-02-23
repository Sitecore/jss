---
name: migration-guide
routeTemplate: ./data/component-templates/guide.yml
title: Migration Guide
---

> This page is still a work in progress. ⚠️ Help Wanted.

## Migrate from MVC to JSS
Before we get started with converting an existing MVC site to JSS, lets answer a few common questions.
- Do we need a separate JSS solution?
No, the MVC implementation and JSS implementation can exist in the same solution, however, the front-end application is typically in a separate folder.

- Can we incrementally refactor each component?
Yes and no. MVC and JSS structures are fundamentally different, thus it is not possible to mix MVC and JSS renderings. This means you will not be able to replace each MVC rendering with a JSS rendering on an existing page as you migrate them.

- We just need to add Node.js to our CD servers, right?
Your infrastructure will more than likely need to change depending on your selected [deployment topology](/docs/techniques/devops#choosing-a-deployment-topology).

With these concepts in mind, consider the following approach:

**1. Configure JSS Application**
Perform the [JSS Server Setup](/docs/getting-started/jss-server-install) and [App Deployment](/docs/getting-started/app-deployment) followed by creating the configuration file for your application. The configuration file varies based on your selected JavaScript Framework. Sitecore provides [example configurations](https://github.com/Sitecore/jss/tree/master/samples), such as the [JssReactWeb.config](https://github.com/Sitecore/jss/blob/master/samples/react/sitecore/config/JssReactWeb.config).

**2. Refactor Sitecore Templates**
While data source templates might not need to be refactored, page templates will need to be updated. Page templates will need to inherit the `/sitecore/templates/Foundation/JavaScript Services/Route` template and have JSS layout and JSS renderings configured.

**3. Create JSS Renderings**
This can be achieved by using one of the [out-of-the-box contents resolvers](/docs/techniques/extending-layout-service/layoutservice-rendering-contents#choose-or-configure-a-builtin-rendering-contents-resolver) or by creating your own for more complex structures. If you need to provide additional data to your renderings, consider where you might need to [extend the layout service](/docs/techniques/extending-layout-service/layoutservice-extending-context) or combining different data sources with [GraphQL](/docs/fundamentals/services/graphql).

**4. Refactor Analytics Code**
JSS ships with an analytics tracking API that allows pushing Sitecore analytics events to the xDB. The `JSS tracker` supports tracking Events, Goals, Outcomes, Campaigns, and Page (aka Route) Views by default. Any previous customizations should be updated.

**5. Update Infrastructure**
Depending on your selected [deployment topology](/docs/techniques/devops#choosing-a-deployment-topology), adjust your infrastructure accordingly.

---

## Community Guides

### Migrating from MVC to JSS, Contract First
[Guide on refactoring your Sitecore solution to Sitecore JSS](https://blog.vitaliitylyk.com/guide-on-refactoring-your-sitecore-solution-to-sitecore-jss/) by [Vitalii Tylyk](https://twitter.com/vitalii_tylyk).

### Migrating from JSS to JSS+SXA
[Sitecore From JSS to SXA JSS](https://hishaamn.wordpress.com/2019/09/03/sitecore-from-jss-to-sxa-jss/) by – [Hishaam Namooya](https://twitter.com/n_hishaam).


### Refactoring existing Sitecore solution to JSS
[Guide on refactoring your Sitecore solution to Sitecore JSS](https://blog.vitaliitylyk.com/guide-on-refactoring-your-sitecore-solution-to-sitecore-jss/) by [Vitalii Tylyk](https://twitter.com/vitalii_tylyk).
