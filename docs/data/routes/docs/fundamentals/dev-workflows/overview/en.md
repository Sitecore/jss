---
name: overview
routeTemplate: ./data/component-templates/article.yml
title: Development Workflows
---

# Development workflows

A fundamental choice that must be made when starting a JSS implementation is how your team wants to use JSS. There are two main development workflows possible:

## Code-First Workflow

In a code-first workflow the JSS app creates a _manifest_ of its content data and data schema, from a set of files. This enables the JSS app to execute with local mock content, _without a Sitecore instance_. In this mode the JSS app is the master copy of all artifacts. The manifest gets _imported_ into Sitecore which creates the necessary structures to support the app.

Code-first workflow makes sense to select when:

* Early prototyping of a design, where a Sitecore instance may not be available to deploy to.
* The primary developers on the team are JavaScript developers.
* Frontend developers will not have their own Sitecore instances.
* The needs of the app are relatively simple from a content perspective.
* Hiring an external frontend agency to build a JSS app that will later be integrated to Sitecore.

[Learn more about code-first workflow](code-first)

## Sitecore-First Workflow

When JSS is used in a more traditional Sitecore setting, Sitecore-first workflow may make more sense. In this mode the JSS app _consumes_ data from Sitecore, but has no responsibility for defining the structure of that data, which components are registered with Sitecore, etc. In this workflow all developers will need their own development instance of Sitecore, and the JSS site will connect to it to acquire its content and layout data.

Most Sitecore-first projects will begin life with at least one code-first app deployment, just to create the structures in Sitecore for the app (app root, rendering root, template root, etc). After this initial deployment the app can [migrate to Sitecore-first](sitecore-first).

Sitecore-first workflow makes sense to select when:

* The project is led by experienced Sitecore developers who prefer to work in Sitecore.
* Complex content or backend architectural demands. (e.g. adding a JSS site into an existing Sitecore instance)
* Sitecore developers are also implementing the JavaScript application.
* JSS apps will be deployed and versioned using the same deployment process. (e.g. same source repository and CI process)

[Learn more about Sitecore-first workflow](sitecore-first)