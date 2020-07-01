# Docs for Sitecore JSS

> This branch is a work in progress of a new "Guides" areas of the documentation that will include recommended practices, learnings from live projects, and a listing of community resources.

## Guides Draft
(Note: image urls are relative to repo root. You can preview all text by browsing the pages in GitHub, since GitHub understands markdown, but the images won't show up. To view images, you will need to run the docs site locally or navigate to the image manually within the GitHub repo)

* **Sitecore for Front-End Devs**	
	* [JS vs JSS](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/sitecore-for-feds/js-vs-jss/en.md) 
	* [Terminology](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/sitecore-for-feds/terminology/en.md) 
	* [Common Pitfalls](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/sitecore-for-feds/common-pitfalls/en.md) 
* **Getting Started**	
	* [Migrating to JSS](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/getting-started/migrating/en.md) 
	* [Solution Setup](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/getting-started/solution-setup/en.md) 
	* [Solution Structure](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/getting-started/solution-structure/en.md) 
	* [Component Granularity](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/getting-started/component-granularity/en.md) 
* **DevEx**	
	* [Developer Workflows](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/devex/developer-workflows/en.md) 
	* [Tools](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/devex/tools/en.md) 
	* [Front-End Debugging](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/devex/front-end-debugging/en.md) 
	* [Back-End Debugging](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/devex/back-end-debugging/en.md) 
* **Code Patterns**	
	* [Validation](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/validation/en.md) 
	* [Media Handling](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/media-handling/en.md) 
	* [SSR](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/ssr/en.md) 
	* [Extend Layout Service](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/extend-layout-service/en.md) 
	* [Custom Error Pages](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/custom-error-pages/en.md) 
	* [Security](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/security/en.md) 
	* [Tracking & Personalization](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/tracking-and-personalization/en.md) 
	* [Dictionary Service](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/dictionary-service/en.md) 
	* [Routing](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/code-patterns/routing/en.md) 
* **Content Patterns**
	* [Shared Content](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/content-patterns/shared-content/en.md) 
* **Infrastructure**
	* [Deployment Topologies](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/infrastructure/deployment-topologies/en.md) 
	* [Performance](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/infrastructure/performance/en.md) 
* **GraphQL**
	* [Extending GraphQL](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/graphql/extending-graphql/en.md) 
	* [GraphQL Security](https://github.com/Sitecore/jss/tree/guides/docs/data/routes/guides/graphql/graphql-security/en.md)

## Setup

**First** run `npm i` to install dependencies.

**Second**, if you have not already, install the JSS CLI: `npm install -g @sitecore-jss/sitecore-jss-cli`.

## Development

Use `jss start` to run a local development server. It will start by default on `http://localhost:3001`.

## Contributing

The JSS docs are a JSS site, with a markdown-to-routes parser added. This means the documentation is authored in Markdown, and served via SSR'ed JSS in production using disconnected mode.

* `/data/routes/docs` -> the main documentation content area
* `src/app/sidenav.js` -> registers the structure of the docs navigation

## Limitations/Known Issues

* **This site is not intended to be deployed to Sitecore and is expected to function in disconnected mode only.**
