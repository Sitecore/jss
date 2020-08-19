---
name: sxa-integration
routeTemplate: ./data/component-templates/guide.yml
title: SXA Integration Guide
---

## What is SXA?
SXA (Sitecore Experience Accelerator) is an add-on to the Sitecore platform that empowers Content Authors and minimizes their dependency on developers. Features include drag-and-drop website components and toolbar-driven site management.

- [Overview of SXA](https://www.sitecore.com/products/experience-manager/editing-experience)
- [SXA documentation](https://doc.sitecore.com/developers/sxa/100/sitecore-experience-accelerator/en/index-en.html)

---

## Why use SXA with JSS?
SXA is a standalone accelerator for Sitecore. Additionally, it can be used to supercharge JSS apps. The SXA-JSS integration was built to streamline building and managing multisite scenarios with the JSS technology stack.

---

## How do I use SXA with JSS?
Below are resources that cover this topic.

### Official SXA documentation

[Managing JSS apps with SXA](https://doc.sitecore.com/developers/sxa/100/sitecore-experience-accelerator/en/managing-jss-apps-with-sxa.html).

### Master Sitecore on YouTube

"JSS and SXA Integration" by [Anastasiya Flynn](https://twitter.com/AnastasiyaFlynn).
[9:04 min]
- Official Sitecore enablement content
- Describes the value that SXA brings to JSS (solves multi-tenancy management)
- Demo:
  - Creating a JSS Tenant in Sitecore 
  - Creating a JSS Site in Sitecore
  - Deploying JSS source code to Sitecore
  - Creating a centrally managed partial design
  - Sharing the partial design across 2 pages

<p>
  <iframe width="672" height="378" src="https://www.youtube.com/embed/Ohs3kSIFahw" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <small style="display:block">
    <a href="https://www.youtube.com/playlist?list=PL1jJVFm_lGnwZup4L4BjITS2sKr4rpMfI" target="_blank">
      View the entire Master Sitecore "Headless &amp; JSS" playlist on YouTube
    </a>
  </small>
</p>

### Unofficial Sitecore Training on YouTube

"SXA Feature Overload" by [Mohamed Cherif](https://twitter.com/moe_cherif)
[12:39 min] 
- Community-contributed content
- Recording of a developer working on a JSS-SXA project and describing what he's doing
  - Page and partial designs
  - Sharing content & design between sites

<iframe width="672" height="378" src="https://www.youtube.com/embed/-mDAG4BMt5g" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Key differences from "vanilla" JSS

1. When creating a JSS Site, the site name must match the JSS app name that will be imported

2. `JSS Sites` are grouped under `JSS Tenant` nodes. 
  > *Note*: Tenants are essentially just a way to logically group sites. This is useful for clients who need to manage multiple sites, and want to share content and/or components across those sites.
  
  When you deploy a JSS app to a JSS Site, all templates, components, and placeholders deploy to the *Tenant* level. That means that if you deploy additional JSS Sites to the same Tenant, and there are any name conflicts in the imported items, the new items will overwrite the older items.

  We recommend establishing a naming convention that includes a unique prefix per site.

3. Sitecore import (i.e. app deployment) works differently in JSS+SXA. Components/templates are imported into `Project/Tenant`, and then you can create more sites based on this.  When you import additional sites, duplicates are ignores.

---

## Can I mix JSS and SXA components?
To reiterate, the SXA-JSS integration is for adding multisite management capabilities to JSS, not to enable mixing components from the two technologies.

### Can I use SXA components in JSS Sites?
No. "Headed" features of SXA, like the drag-and-drop Experience Editor components and Creative Exchange, are not available to JSS sites.

### Can I use JSS components in SXA Sites?
- You can embed a JSS app in an SXA page using the [client side embedding technique](/docs/techniques/mvc-integration/client-side-embedding). A sample scenario is having an SXA site with a globally managed Header and Footer (via Partial Designs), and one part of the site needing to have an interactive interface (ex. checkout) while maintaining the Header and Footer.

- You cannot arbitrarily mix SXA components and JSS components in an SXA page.

---

## Version Compatibility Table

> ⚠️ Help Wanted
>
> TODO: Merge all tables from release notes into 1 master table
