---
name: cli
routeTemplate: ./data/component-templates/article.yml
title: JSS CLI
---
# JSS CLI

During JSS development, you will be commonly using scripts provided by the _JSS CLI_ (command line interface). These scripts can be run from within a JSS application at your command line of choice (bash, PowerShell, cmd, etc).

## Frequently used scripts

These are the main scripts you will be using frequently during JSS development.
These were partially covered in [Quick start](/docs/client-frameworks/getting-started/quick-start).

### `jss create`
Creates a JSS application. You must provide an application name and a framework. 

```
jss create <your-app-name> <app-template-name>
```

**Required parameters**

|Parameter |Description| Value type| 
| --- | --- | --- | 
|name| The name of the app to create.|`String`|
|template| The template to create the app from; corresponds to folders in the [Official JSS repository](https://github.com/Sitecore/jss/tree/master/samples)|`String`|

**Optional parameters**

|Parameter| Description| Options | Default |Template|
| --- | --- | --- | --- | --- |
|`--version` | Show version number | - | `true` | all |
|`--help` | Show help for the command | - | `true` | all |
|`--hostName`, `-r` | Sets the host name of the Sitecore site if this app is deployed to Sitecore. | - | `$name.dev.local` | all |
|`--repository`, `-r` | Configures the repository to use for creating the JSS app | A repository: githubusername/reponame | `Sitecore/jss` | all |
|`--branch`, `-b` | Configures the branch of the repository to use for creating the JSS app |  A branch name | `master` | all |
|`--source`, `-s` | Sources the app template from a local filesystem path, instead of a GitHub repository. Use for custom JSS app templates | A local directory path |  - |  all |
|`--proxy`, `-p` |  Specifies a HTTP proxy when downloading templates. | A local directory path |  - |  all |
|`--fetchWith` |  Specifies how the applicaiton should fetch Sitecore layout and dictionary data. |`REST` or `GraphQL` | `REST` | nextjs |
|`--prerender` | Specifies the Next.js pre-rendering form for the primary `[[...path]].tsx` route. | `SSG` or `SSR` | `SSG` | nextjs |
|`--empty` | Specifies the Next.js app should be created empty | - | `false` | nextjs |

**Examples**
```
// React-based app using a specific version of JSS
jss create my-jss-app react --branch release/11.0.0

// Next.js-based application with Static Generation and fetching data using GraphQL
jss create my-jss-app nextjs --prerender SSG --fetchWith GraphQL

// Next.js-based application with Server-Side Rendering and fetching data using REST
jss create my-jss-app nextjs --prerender SSR --fetchWith REST
```

### `jss setup`

Runs the interactive setup process where you will optionally provide info about connecting/deploying to a Sitecore instance. The input is saved to `scjssconfig.json` file in the app root.

> Note: for CI deployments, `setup` accepts arguments to build the config from variables. Use `jss setup --help` for details.

### `jss start`

Starts the application in _disconnected mode_. Sitecore is not required, or used even if available. Content comes from local files.

### `jss start:connected`

Starts the application in _connected mode_, where it connects to Sitecore to retrieve the layout data and content but still runs locally.

### `jss deploy config`

Copies the Sitecore `.config` file from `/sitecore/config` to your Sitecore instance's `Website/App_Config/zzz` folder specified in `scjssconfig.json` file in the app root. This is a convenience script; you can also manually deploy the JSS app configuration in some other way, or have the config owned by the Sitecore instance instead of the JSS app.

### `jss deploy app`

Shorthand for `jss deploy items && jss deploy files`. Used to deploy both the app's manifest items (routes, templates, etc) and a production build of the app's code.

> `jss deploy app` accepts all options supported by `jss deploy items` or `jss deploy files`.

### `jss deploy items`

When you want to build a manifest and deploy items to Sitecore. This is applicable when using the code-first JSS development methodology.

> `jss deploy items` has many options that enable modifying how the package deploys, such as excluding content items with `--noContent`. Run `jss deploy items --help` to see all the options with descriptions.

> When run with default options, `jss deploy items` also runs `jss manifest`, and `jss package`. Options for all of these commands may also be passed to `deploy items`.

> Content, media, or dictionary items are excluded by default for safety, in case a content editor has changed the data. To deploy these items, run `jss deploy items --includeContent --includeDictionary` to deploy everything.

### `jss deploy files`

Builds your application for production (`jss build`) and copies all of its files to the configured Sitecore instance in `scjssconfig.json`. No items are deployed, and no manifest is generated.

> `jss deploy files` has many options that enable modifying how the files deploy, such as skipping a build and using existing `/dist` items with `--skipBuild`. Run `jss deploy files --help` to see all the options with descriptions.

> When run with default options, `jss deploy files` also runs `jss build`.

### `jss deploy component`

When using Sitecore-first/connected development methodology, this command scaffolds out a new component (rendering item, datasource template, and allowed placeholder settings) in Sitecore. The developer must still create the component in the JSS app and add the component to a route with Experience Editor, but this command takes care of the rest. `jss deploy component` can be used to also modify existing components (e.g. to add fields, change field types, or set display names). On an existing component, only explicitly specified arguments apply (e.g. using `--fields` will add/modify only the fields specified, and will not delete any other fields.

> `jss deploy component` should never be used if code-first/disconnected development is in use as it does not update the disconnected manifest, only Sitecore items.

> `jss deploy component` has many options that enable modifying how the component is scaffolded, such as specifying datasource template fields with `--fields` or setting a display name with `--displayName`. Run `jss deploy component --help` to see all the options with descriptions.

## Other scripts

All scripts you need to run during development are defined either via the `jss` CLI command (use `--help` for options) or as package scripts in `package.json`.

### `jss build`

Creates a production build for deploying to Sitecore. Result - a JS bundle and other static assets under `/dist` folder. 

### `jss manifest`

Runs the app's manifest generation process, which will generate the *app manifest* file under `/sitecore/manifest` in app root.

> `jss manifest` has options that enable modifying how the manifest generates, such as `--includeContent` to add content and routes data to the manifest. Run `jss manifest --help` to see all the options with descriptions.

> Manifest does not include content, media, or dictionary items by default for safety, in case a content editor has changed the data. To include these items, run `jss manifest --includeContent --includeDictionary` to include everything.

### `jss package`

Creates a Sitecore update package that includes both the app manifest and the production build artifacts.

> `jss package` has many options that enable modifying how the package deploys, such as excluding build artifacts with `--noFiles`. Run `jss package --help` to see all the options with descriptions.

> When run with default options, `jss package` also runs `jss build` and `jss manifest`. Options for all of these commands may also be passed to `package`.

### `jss deploy template`

When using Sitecore-first/connected development methodology, this command scaffolds out a new template in Sitecore. `jss deploy template` can be used to also modify existing templates (e.g. to add fields, change field types, or set display names). On an existing template, only explicitly specified arguments apply (e.g. using `--fields` will add/modify only the fields specified, and will not delete any other fields.

> `jss deploy template` should never be used if code-first/disconnected development is in use as it does not update the disconnected manifest, only Sitecore items.

> `jss deploy template` has options that enable modifying how the template is scaffolded, such as specifying template fields with `--fields` or setting a display name with `--displayName`. Run `jss deploy template --help` to see all the options with descriptions.

## Env File Support
The CLI supports loading environment variables from `.env` files. In particular, this can be used to populate environment variables such as `NODE_EXTRA_CA_CERTS` and `NODE_TLS_REJECT_UNAUTHORIZED` which you may have already configured in an `.env` file for communication with your Sitecore instance.

Variables will be loaded from `.env` files with the following priority:

* `.env.${NODE_ENV}.local`
* `.env.local` (unless `NODE_ENV` is "test")
* `.env.${NODE_ENV}`
* `.env`

The CLI will automatically expand variables (`$VAR`) inside of your `.env*` files. This allows you to reference other values. If you are attempting to use a `$` in a variable value, it needs to be escaped with a backslash (`\`).

```
PASSWORD=b

# becomes 'adminb'
EXPANDED=admin$PASSWORD

# becomes 'admin$PASSWORD'
ESCAPED=admin\$PASSWORD
```
