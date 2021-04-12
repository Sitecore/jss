---
name: troubleshooting
routeTemplate: ./data/component-templates/article.yml
title: Documentation
---

# Troubleshooting

- [Debug logging](#debug-logging)
- [General setup checklist](#general-setup-checklist)
- [Server-side JavaScript errors](#server-side-javascript-errors)
- [Errors regarding SSL certificates](#errors-regarding-ssl-certificates)
- [Errors deploying a JSS app locally](#errors-deploying-a-jss-app-locally)
- [Data-fetching issues](#data-fetching-issues)
- [Errors in GraphiQL](#errors-in-graphiql)

## Debug logging

You can enable debug logging of the Sitecore JSS npm packages by setting the `DEBUG` environment variable. In your `.env` (or `.env.local` for local environments), add the following line:

```
DEBUG=sitecore-jss:*
```

This will output _all_ debug logs. However, you may wish to be more selective. Refer to [Debug logging](/docs/fundamentals/troubleshooting/debug-logging) for additional details.

## General setup checklist

You can prevent most errors by performing the following steps: 

- Verify that all environment variables used by the app have values. The sample app searches for environment variables in the following order:
  1. `scjssconfig.json`.
  2. `.env`.
  3. `.env.local` (for local environments only).

  If multiple files contain a definition of the same variable, the application will use the last value it finds.
  
  Refer to the [sample `.env` file](https://github.com/Sitecore/jss/blob/master/samples/nextjs/.env) for variable names and descriptions. 

- Check that you have correctly [set up the API key ](/docs/client-frameworks/getting-started/app-deployment#step-2-api-key).

- Check that your project's site definition and app definition are correct in your Sitecore configuration. Refer to the [sample app configuration](https://github.com/Sitecore/jss/blob/master/samples/nextjs/sitecore/config/JssNextWeb.config) for the list of required properties.

- Verify that you have [set the "JSS Editing Secret"](/docs/nextjs/experience-editor/walkthrough#jss-editing-secret). The `JSS_EDITING_SECRET` [value used by your Next.js app](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/.env#L18) must match the [value used by your Sitecore instance](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/sitecore/config/JssNextWeb.config#L37).

- Verify that the GraphQL endpoint is correct in [`package.json`](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/package.json#L12) and the Sitecore [app definition](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/sitecore/config/JssNextWeb.config#L72). Try opening the GraphiQL interface in a browser, using values from your config (`<sitecore hostname + graphQL endpoint>/ui?sc_apikey=<api key>`) to make sure the endpoint is working.

## Server-side JavaScript errors

If you encounter unexpected JavaScript errors during the `npm install` or `build` steps, especially errors that other team members can not reproduce, check the versions of Node and npm being used. From a terminal, run:
```
node -v
npm -v
```
Note that we test JSS using the **Long Term Support (TLS) versions of Node**. These are typically one major version behind the latest official Node version.

Note that the Node/npm version used by your CI/Production environments may differ from the version your local environment uses. When a project configuration does not require a specific Node/npm version in `package.json`, deployment agents commonly build using the most recent version available or an environment-specific "default" version.

If you need to swap between multiple Node versions on your local environment for testing, 3rd party packages like [n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm) can help with this task.

## Errors regarding SSL certificates

If you are working with a local Sitecore instance using a privately signed certificate, you might experience the following error: 

> Error: unable to verify the first certificate
>
> Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE

> UnauthorizedError: invalid signature

Ensure you've [configured Sitecore CA certificates for Node.js](/docs/fundamentals/troubleshooting/node-certificates).

## Errors deploying a JSS app locally

If the import role doesn't have the correct permissions, you might experience the following error:

```
IMPORT ERROR(S) OCCURRED!
Exception thrown while importing JSS app
Exception: Sitecore.Exceptions.AccessDeniedException
Message: AddFromTemplate - Add access required
```

Refer to [Errors when importing JSS application on Azure](https://kb.sitecore.net/articles/650791) for the solution.

## Data-fetching issues
The sample Next.js app's building and rendering depend on successfully fetching data using GraphQL. The most common cause of failed builds and apps that cannot render pages is an issue with this data-fetching process. 

The `GraphiQL` interface at `<sitecore hostname + graphQL endpoint>/ui?sc_apikey=<api key>` is a visual browser for GraphQL data. It is a great tool for diagnosing these types of issues.

To support static generation functionality, the sample app exports a `getStaticPaths` function from the <a href="https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.tsx">[\[...path\]] page</a>, which needs to provide the list of pages to pre-render to Next.js. To check whether `getStaticPaths` can get the list of pages, try running the query that `getStaticPaths` uses directly in GraphiQL.

```graphql
# YOUR_PATH should be the ID of your site root (home page) in lower-case, with dashes removed.
# YOUR_LANGUAGE should be your default language, as defined in package.json

query{
  search(where: {
    AND:[
      {
      name:"_path",
      value:"YOUR_PATH"
      },
      {
      name:"_language",
      value:"YOUR_LANGUAGE"
      },
      {
      name:"_hasLayout",
      value :"true"
      }
    ]
  })
  { 
    total
    results {
        url {
          path
        }
      }
  }"
}
```

If you do not see the expected results, try the following steps:

1. In the **Sitecore Control Panel**, use **Populate Solr Managed Schema** to populate the Solr Schema.

2. In the **Sitecore Control Panel**, use **Indexing Manager** to rebuild indexes.

3. Check that your content items have versions for the language you're trying to query.

## Errors in GraphiQL

**Problem: GraphiQL is blank, and developer tools show "Error: Mode graphql failed to advance stream"**

  ![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1.png)

  You will encounter this problem when the application can not restore the data in `localStorage`. For example, if you tried to open a URL with an embedded query and the query was invalid.

  To solve the problem, you must: 

  1. Clear all local storage from the relevant tab.
    ![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1-solution1.png)

  2. In Chrome's task manager, kill the process before it can write to local storage again.
    ![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1-solution2.png)

**Error: "XmlException: Root element is missing"**
![](/assets/img/docs/nextjs/troubleshooting/graphiql-error2.png)

This error occurs when loading GraphiQL in the same browser where you logged in to Sitecore.

To solve the issue, append `sc_mode=normal` to the URL query parameters.

## Known Issues

### Error in Experience Editor when attempting to type in an empty text field

```
Uncaught TypeError: Cannot read property 'baseNode' of undefined
```

A known issue in the Experience Editor, we expect to fix it in a future release. It does not affect the functionality, and you can safely ignore it.

Note that when running Next.js in development mode, Next.js will display runtime errors in an overlay.

This issue will not occur when Next.js runs in production mode and will not affect Content Authors.

### Error when trying to edit items in Sitecore
After creating a new user in the Sitecore Editor Role, attempting to edit JSS app items in Sitecore could warn that the user does not have read access rights.

The workaround is to set 'Workflow State Write' for the `System/Workflows/JSS development workflow' item manually, enabling the Published state, which is final, to be editable. It allows the user to create a new version of an item for editing using the "Lock and Edit" option.

## Other
These are less common issues that we have encountered.

### Errors when generating GraphQL introspection data

If the GraphQL schema changes, you must regenerate GraphQL introspection data. 

In the sample app, you regenerate introspection data using the command `jss graphql:update`.

> The script that this calls depends on the `scjssconfig.json` file being present and populated.

### Vercel unable to show data from a local Sitecore environment
If you are using [ngrok](https://ngrok.com/) to expose your local Sitecore endpoint to Vercel, verify that you are using the `host-header` flag.
For example,
```
ngrok http -host-header=rewrite <your-local-url>
```
