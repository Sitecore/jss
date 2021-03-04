---
name: troubleshooting
routeTemplate: ./data/component-templates/article.yml
title: Documentation
---

# Troubleshooting

This section has advice for troubleshooting issues with JSS development.

## Server-side JavaScript errors

If you encounter unexpected JavaScript errors during the `npm install` or `build` steps, especially errors that other team members can not reproduce, check the versions of Node and npm being used. From a terminal, run:
```
node -v
npm -v
```
Note that we test JSS using the Long Term Support (TLS) versions of Node. These are typically one major version behind the latest official Node version.

Note that the Node/npm version used by your CI/Production environments may be different from what is used by your local environment. If a project configuration does not require a specific Node/npm version in `package.json`, deployment agents commonly build using either the newest version available or an environment-specific "default" version.

If you need to switch the Node version on your local environment for testing, 3rd party packages like [n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm) can help with this task.

System Pre-requisites
Running Node LTS version (use node -v to check)

## App does not build, or Home Page shows 404

Use the GraphiQL interface to verify that the sitemap query returns the expected list of page routes. For example: 

```
# YOUR_PATH should be the ID of your site root (home page) in lower-case, with dashes removed
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

## Errors regarding SSL certificates

Error examples
> Error: unable to verify the first certificate
>
> Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE

> UnauthorizedError: invalid signature

If you are working with a local Sitecore instance using a privately signed certificate, ensure you've [configured Sitecore CA certificates for Node.js](/docs/temp/node-certificates)"

Note that the steps are different, depending on whether you're using a containerized or on-prem installation of Sitecore.

## Errors when generating GraphQL introspection data

If the GraphQL schema changes, you must regenerate GraphQL introspection data. 

In the sample app, you regenerate introspection data using the command `npm run graphql:update`.

> The scripts that this calls depends on the `scjssconfig.json` file being present and populated.

## Errors deploying a JSS app locally

```
IMPORT ERROR(S) OCCURRED!
Exception thrown while importing JSS app
Exception: Sitecore.Exceptions.AccessDeniedException
Message: AddFromTemplate - Add access required
```

You will see this type of error when the import role doesn't have the correct permissions. See the following Knowledge Base article for the solution: https://kb.sitecore.net/articles/650791.

## General solution checklist

- Verify that all environment variables defined in the [`.env` file](https://github.com/Sitecore/jss/blob/master/samples/nextjs/.env) file have values. In local environments,  you should use the `.env.local` file for this purpose.

- Check that your [API key is set up corerctly](/docs/client-frameworks/getting-started/app-deployment#step-2-api-key).

- Verify that the ["JSS Editing Secret" is set](/docs/nextjs/experience-editor/walkthrough#jss-editing-secret). And more specifically, the `JSS_EDITING_SECRET` [value used by your Next.js app](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/.env#L18) should match the [value used by your Sitecore instance](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/sitecore/config/JssNextWeb.config#L37).

- Verify that that GraphQL endpoint is correct in [`package.json`](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/package.json#L12) and the Sitecore [app definition](https://github.com/Sitecore/jss/blob/cb32d3a21b87f488bd4bb5d311d556fd1f8354c4/samples/nextjs/sitecore/config/JssNextWeb.config#L72). Try opening the GraphiQL interface in a browser, using `<sitecore hostname + graphQL endpoint>/ui?sc_apikey=<api key>`, to make sure the endpoint is working

- If using [ngrok](https://ngrok.com/) for any part of your local workflow, verify that you are using the `host-header` flag.
For example,
```
ngrok http -host-header=rewrite 3000
```

## GraphiQL errors

### Problem: GraphiQL is blank, and developer tools show "Error: Mode graphql failed to advance stream"

![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1.png)

You will encounter this problem when the data in localStorage cannot be restored. For example, if you tried to open a URL with an embedded query and the query was invalid.

To solve the problem, you must: 

1. Clear all local storage from the relevant tab.
  ![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1-solution1.png)

2. In Chrome's task manager, kill the process before it can write to local storage again.
  ![](/assets/img/docs/nextjs/troubleshooting/graphiql-error1-solution2.png)

### Error: "XmlException: Root element is missing"
![](/assets/img/docs/nextjs/troubleshooting/graphiql-error2.png)

This error occurs when loading GraphiQL in the same browser where you logged in to Sitecore.

To solve the issue, append `sc_mode=normal` to the URL query parameters.

## Known Issues

### Error in Experience Editor when attempting to type in an empty text field

```
Uncaught TypeError: Cannot read property 'baseNode' of undefined
```

A known issue in the Experience Editor, we expect to fix it in a future release. It does not impact the functionality, and you can safely ignore it.

Note that when running Next.js in development mode, Next.js will display runtime errors in an overlay.
![](/assets/img/docs/nextjs/troubleshooting/error-overlay.png)

This issue will not occur when Next.js runs in production mode and will not impact Content Authors.

### Error when trying to edit items in Sitecore
After creating a new user in the Sitecore Editor Role, attempting to edit JSS app items in Sitecore could warn that the user does not have read access rights.

The workaround is to manually set 'Workflow State Write' for the `System/Workflows/JSS development workflow' item, enabling the Published state, which is final, to be editable. It allows the user to create a new version of an item for editing using the "Lock and Edit" option.