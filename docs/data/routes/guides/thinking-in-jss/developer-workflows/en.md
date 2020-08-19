---
name: developer-workflows
routeTemplate: ./data/component-templates/guide.yml
title: Developer Workflows Guide
---

## Our recommendation

We recommend that **all JSS projects start `Code-First`**, even if the intent is to switch to `Sitecore-First` right after scaffolding the new app. Initializing projects from our Code-First starters and then importing them into Sitecore takes care of the grunt work of settings up proper item structures in Sitecore.

We recommend that **all projects switch to `Sitecore-First` as soon as possible**, with the exception of apps built for [client-side embedding](/docs/techniques/mvc-integration/client-side-embedding).

Multisite projects, in particular, have more complex information architectures, and therefore benefit the most from switching to `Sitecore-First` early on.

### Dev workflow by application type

1. JSS app as a full site. This is the standard way of building JSS apps.
    - Sitecore's list of site definitions contains an entry that matches the JSS app name
    - JSS components are used across the entire site
    - **Standard recommendation applies**

2. JSS app embedded in a single (MVC or SXA) page.
    - The JSS app is treated like a page component; it does not need a site definition entry.
    - Any front-end components built in the JSS app can only be used in the page where the app is embedded.
    - Based on client feedback, **embedded apps can successfully use Code-First all the way to production**. The reason is that all components and templates are scoped to a single page on the site, so complexities like templates inheritance and multisite considerations don't come into play. This allows front-end developers to have greater control over templates and even deviate from traditional Sitecore conventions (assuming the authoring experiences is not compromised).

---

## Code-First
In Code-First workflow, Sitecore templates and content are created in JavaScript by using the [manifest API](/docs/techniques/working-disconnected/manifest-api#manifest-api-reference).

### When to switch to Sitecore-First

The manifest API is not a complete replica of everything that can be done with Sitecore items in Sitecore. If your team has hit a roadblock in Code-First workflow, consider whether it's time to switch to Sitecore-First. Examples of such scenarios:
- You need to create branch templates
- You need to add renderings to the layout of standard values items
- You need the ability to configure the "Datasource Location" field on components
- You need more control over the Layout Service response

### Tools for Front-End Centric Workflow

[StoryBook JS](https://storybook.js.org/) is a great tool for developing your components in isolation from the rest of your system.

### When to use
The embedded app can have front-end devs who have only trained on JSS documentation driving the JSS app code-first. And the reasoning is that in this scenario, whatever page and datasource templates the front-end devs create won’t need to be scaled, so it’s ok if they don’t follow traditional Sitecore conventions. This approach would probably be ok for single-site apps too for the reason reasoning, though I haven’t seen this in practice since most clients have multi-site needs.

### Reducing risk in log-term Code-First development
Sometimes teams are requires to stay in Code-First for the majority of development time. Here is what your team can do to reduce the risk in such scenarios.

- As part of front-end developer on boarding, front-end developers should get a chance to poke around Experience Editor. They need to understand what components, fields, rendering parameters, and placeholders are from the author’s POV. Also, they need to understand that sometimes components need to be rendered in special ways for Experience Editor (ex, a modal would be hidden on page load normally, but visible on page load in EE so that the content can be edited).
    > Tip: The [Sitecore Front-End Developer Trial](http://sitecore.com/trial) grants temporary access to a pre-configured Sitecore instance, and provides guided instructions for those who are new to the interface.

- If all front-end developers are required to work in disconnected mode, we recommend having a Sitecore developer on the team to collaborate on the design of templates.

---

## Sitecore-First
Disconnected mode is NOT “Sitecore Light”, it does not represent the entirety of what you can so with Sitecore.

You should not expect to complete an entire project as code-first. It’s good for initial setup and import, but at some point you will need to convert to Sitecore-first. Code-first is for basic scaffolding, and then you want to jump over to Sitecore to customize and refine the experience. Sitecore-first is also the best join for multi-site scenarios.

There are standard “Sitecore things” that front-end developers don’t deal with when they work code-first.
- Template inheritance
- Template/field naming
- Field validations
- Usage of standard values (for layout)
- Usage of placeholders(How they should be driven by business/content author logic, not code - organization)
- How the page is composed (how layout works)
- Insert options
- Placeholder settings
- Branch templates
- Multisite considerations
  - Content sharing
  - Users & roles
  - Content Author workflow and review process

These are things that front-end devs don’t typically have experience with, and some of these, like creating branch templates and editing layout on standard values, aren’t even possible from code-first.

JSS import puts everything into `Project` - the point is to import everything into a reasonable starting point. However, once you switch to Sitecore-first, Sitecore devs are free to reogranize templates and components to be more Helix oriented.

So to reiterate, the recommendation is that if you’re using JSS for a multi-site project, include Sitecore developers into the team to handle the information architecture, and go Sitecore-first as soon as possible so that front-end devs are only responsible for the presentation code.

---

## Contract-First

Contract-first is a 3rd type of workflow (in addition to code-first and Sitecore-first) where the Layout Service json that represents the end-state of the page is built out by some custom or manual way. Then front-end devs and back-end devs work in parallel, with respect to this "contract".

Your team may be working Contract-First without even realizing it. For many, the approach looks like this:
- Front-end developers control component code under `/src` and Sitecore developers control templates, rendering definitions, placeholder settings, and other Sitecore information architecture pieces in Sitecore.
- Sitecore developers work on their own Sitecore instances, save Sitecore changes using a serializing tool like TDS, and push changes to the repository.
- Front-end developers work on component code on their local machines, but they don't have their own Sitecore instances.They connect to a remote Sitecore instance for testing via connected mode. Code changes are pushed to the repository.
- When templates are updated from the Sitecore side, or when new components are added from the front-end side, the front-end and back-end developers need to align on the updates. Sitecore changes need to be checked in and deployed first to allow front-end developers to test their code against the remote Sitecore instance.

The above process is technically Sitecore-First, with an element of a "verbal contract". The issue is that this ends up being a waterfall approach, where front-end developers could get blocked waiting for Sitecore templates or rendering definitions to get deployed.

To solve this, the community has adopted different variations of a `Contract-First` workflow, where the contract is generated, and therefor neither side is blocked.

### Implementation
In Code-First workflow, the manifest API generates a JSON file (which represents a mock of Layout Service output) based on usage of the manifest API and yaml/json files that describe page layout and content. Since this JSON file represents Layout Service output - this file is the contract.

In Contract-First mode, generation of the JSON contract from the manifest API is disabled, and the team takes over managing the JSON contract. This can be done manually during team sync meetings, or more sophisticated generation can be implemented (ex. generate the JSON contract using Glass Mapper).

### Benefit
The benefits of Contract-First workflow are less blockers and increased delivery speed. If front-end developers need something in the contract changed (ex. adding a new component), they don't have to wait for a Sitecore developer to make the change in Sitecore and deploy it. They can request the change, then modify the contract locally, and proceed with their work.

### Community Guide

[Contract first Sitecore JSS development workflow](http://www.jeroenbreuer.nl/blog/contract-first-sitecore-jss-development-workflow/) by [Jeroen Breuer](https://twitter.com/j_breuer)