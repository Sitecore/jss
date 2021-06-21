---
name: cli
routeTemplate: ./data/component-templates/article.yml
title: JSS CLI
---
# JSS CLI

## Env File Support

The CLI supports loading environment variables from `.env` files. Use a `.env` file to populate environment variables such as `NODE_EXTRA_CA_CERTS` and `NODE_TLS_REJECT_UNAUTHORIZED`, which you may have already configured in a `.env` file for communication with your Sitecore instance.

Variables will be loaded from `.env` files with the following priority:

* `.env.${NODE_ENV}.local`
* `.env.local` (unless `NODE_ENV` is "test")
* `.env.${NODE_ENV}`
* `.env`

The CLI will automatically expand variables (`$VAR`) inside your `.env*` files. This allows you to reference other values. If you are attempting to use a `$` in a variable value, it needs to be escaped with a backslash (`\`).

```
PASSWORD=b

# becomes 'adminb'
EXPANDED=admin$PASSWORD

# becomes 'admin$PASSWORD'
ESCAPED=admin\$PASSWORD
```

## JSS commands

During JSS development, you will commonly use scripts provided by the _JSS CLI_ (command-line interface). All scripts you need to run during development are defined either via the `jss` CLI command (use `--help` for options) or package scripts in `package.json`.

These scripts can be run from within a JSS application at your command line of choice (bash, PowerShell, cmd, and so on). 

Some JSS commands run globally, for example: `jss create`. Other commands are meant to run in the root directory of your JSS application. Such commands might have application specific arguments. In the root directory of your JSS app, run `jss --help` and `jss <command> --help` for application specific arguments.

### Quick links

* [`jss build`](#jss-build)
* [`jss clean`](#jss-clean)
* [`jss create`](#jss-create)
* [`jss deploy app`](#jss-deploy-app)
* [`jss deploy component`](#jss-deploy-component)
* [`jss deploy config`](#jss-deploy-config)
* [`jss deploy files`](#jss-deploy-files)
* [`jss deploy items`](#jss-deploy-items)
* [`jss deploy package`](#jss-deploy-package)
* [`jss deploy template`](#jss-deploy-template)
* [`jss deploy`](#jss-deploy)
* [`jss environment`](#jss-environment)
* [`jss manifest`](#jss-manifest)
* [`jss package`](#jss-package)
* [`jss setup`](#jss-setup)
* [`jss start`](#jss-start)
* [`jss start:connected`](#jss-startconnected)

### `jss build`

Creates a production build for deploying to Sitecore. Result - a JS bundle and other static assets under the `/dist` folder.

### `jss clean`

Cleans the contents of a directory.

|Parameter |Description| Value type|
| --- | --- | --- |
|`path`| The path to clean. Defaults to `buildArtifactsPath` config in `package.json`.|`String`|

### `jss create`

Creates a JSS application. You must provide an application name and a framework.

```bash
jss create <your-app-name> <app-template-name>
```

#### Required parameters

|Parameter |Description| Value type|
| --- | --- | --- |
|`name`| The name of the app to create.|`String`|
|`template`| The template to create the app from; corresponds to folders in the [Official JSS repository](https://github.com/Sitecore/jss/tree/master/samples)|`String`|

#### Optional parameters

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

#### Examples

```bash
// React-based app using a specific version of JSS
jss create my-jss-app react --branch release/11.0.0

// Next.js-based application with Static Generation and fetching data using GraphQL
jss create my-jss-app nextjs --prerender SSG --fetchWith GraphQL

// Next.js-based application with Server-Side Rendering and fetching data using REST
jss create my-jss-app nextjs --prerender SSR --fetchWith REST
```

### `jss deploy app`

Shorthand for `jss deploy items && jss deploy files`. Used to deploy both the app's manifest items (routes, templates, and so on) and a production build of the app's code.

Use `jss deploy app --help` for options.

> `jss deploy app` accepts all options supported by `jss deploy items` or `jss deploy files`.

### `jss deploy component`

When using Sitecore-first/connected development methodology, this command scaffolds a new component (rendering item, datasource template, and allowed placeholder settings) in Sitecore. The developer must still create the component in the JSS app and add the component to a route with Experience Editor. This command takes care of the rest. The command `jss deploy component` can also modify existing components (e.g., add fields, change field types, or set display names). Only explicitly specified arguments apply (e.g., using `--fields` will add/modify only the fields specified and will not delete any other fields.

|Parameter| Description| Value type|
| --- | --- | --- |
|`allowedPlaceholders`|The placeholder name(s) to allow the rendering to be placed in. For example --allowedPlaceholders Foo or --allowedPlaceholders Foo Bar|`Array`|
|`exposesPlaceholders`|The names of any placeholders exposed on this component (to place other components in). This will cause placeholder settings items to be generated for them.|`Array`|

> `jss deploy component` should never be used if code-first/disconnected development is in use as it does not update the disconnected manifest, only Sitecore items.

> `jss deploy component` has many options that enable modifying how the component is scaffolded, such as specifying datasource template fields with `--fields` or setting a display name with `--displayName`. Run `jss deploy component --help` to see all the options with descriptions.

### `jss deploy config`

Copies the Sitecore `.config` file from `/sitecore/config` to your Sitecore instance's `Website/App_Config/zzz` folder specified in `scjssconfig.json` file in the app root. This is a convenience script; you can also manually deploy the JSS app configuration in some other way or have the config owned by the Sitecore instance instead of the JSS app.

|Parameter |Description| Value type|
| --- | --- | --- |
|`source`|The source path of the config patches to deploy.<br />**Default:** `./sitecore/config`|`String`|
|`destination`|Destination path to deploy to. Defaults to the `instancePath` set in scjssconfig.json, combined with the `sitecoreConfigPath` setting from `package.json`.|`String`|
|`config`|Path to `scjssconfig` file.<br />**Default:** `./scjssconfig.json`|`String`|

### `jss deploy files`

Builds your production application (`jss build`) and copies all of its files to the configured Sitecore instance in `scjssconfig.json`. No items are deployed, and no manifest is generated.

|Parameter |Description| Value type|
| --- | --- | --- |
|`source`|The source path of the config patches to deploy.<br />**Default:** `./sitecore/config`|`String`|
|`destination`|Destination path to deploy to. Defaults to the `instancePath` set in scjssconfig.json, combined with the `sitecoreConfigPath` setting from `package.json`.|`String`|
|`config`|Path to `scjssconfig` file.<br />**Default:** `./scjssconfig.json`|`String`|
|`exclude`| Filters specific file(s) from the deployment package by file name(s).<br />**Default:** `['report.html']`|`Array`|
|`skipBuild`|If `true`, no build task is invoked, and any existing build artifacts at the source path are deployed.<br />**Default:** `false`|`Boolean`|
|`buildTaskName`|Name of the `npm` script to run to perform a build before deploying. To skip running any script, use `--skipBuild` or pass the argument with a blank value.<br />**Default:** `build`|`String`|
|`clean`|Whether to delete all existing items in the destination before copying new artifacts.<br />**Default:** `false`|`Boolean`|

> `jss deploy files` has many options that enable modifying how the files deploy, such as skipping a build and using existing `/dist` items with `--skipBuild`. Run `jss deploy files --help` to see all the options with descriptions.

> When run with default options, `jss deploy files` also runs `jss build`.

### `jss deploy items`

Use this command when using the code-first JSS development methodology, and you want to build a manifest and deploy items to Sitecore.

|Parameter |Description| Value type|
| --- | --- | --- |
|`deployUrl`|URL to the Sitecore JSS import service that accepts the package deployment.<br />**Default:** `deployUrl` from  `scjssconfig.json`|`String`|
|`deploySecret`|Shared secret to authenticate the deployment with Sitecore.<br />**Default:** `deploySecret` from  `scjssconfig.json`|`String`|
|`config`|Path to `scjssconfig` file.<br />**Default:** `./scjssconfig.json`|`String`|
|`debugSecurity`| Enables diagnosing authentication issues with your deployment. Exposes secrets to output, use only for temporary diagnostics.<br />**Default:** `false`|`Boolean`|
|`skipPackage`|If `true`, it skips the build, manifest, and packaging steps. This can consume existing output from the `jss` package (via the packageOutputPath parameter) without rebuilding it.<br />**Default:** `false`|`Boolean`|
|`proxy`|Specify an HTTP proxy to use when deploying items.|`String`|
|`acceptCertificate`|Whitelists a specific SSL certificate thumbprint, regardless of normal SSL validation. Useful for self-signed certificates.|`String`|

> `jss deploy items` has many options that enable modifying how the package deploys, such as excluding content items with `--noContent`. Run `jss deploy items --help` to see all the options with descriptions.

> When run with default options, `jss deploy items` also runs `jss manifest`, and `jss package`. Options for all of these commands may also be passed to `deploy items`.

> Content, media, or dictionary items are excluded by default for safety if a content editor has changed the data. To deploy these items, run `jss deploy items --includeContent --includeDictionary` to deploy everything.

### `jss deploy package`

This command is **deprecated**. Use `jss deploy app` instead.

### `jss deploy template`

When using Sitecore-first/connected development methodology, this command scaffolds out a new template in Sitecore. `jss deploy template` can also be used to modify existing templates (e.g., adding fields, changing field types, or set display names). Only explicitly specified arguments apply (e.g., using `--fields` will add/modify only the fields specified and will not delete any other fields.

|Parameter |Description| Value type|
| --- | --- | --- |
|`name`|The name of the item to create or update.|`String`|
|`displayName`|Sets the item's display name (visual name, as opposed to the actual `name` of the template).|`String`|
|`fields`|Creates template fields. Fields can be either a plain name or `name:fieldType`. For example, `--fields Foo Bar` or `--fields Foo "Bar Bas:Rich Text"`|`Array`|
|`icon`|Sets the icon of the item in Sitecore. For example, `People/16x16/alarmclock.png`|`String`|
|`appName`|The name of the app. <br />**Default:** `appName` from `package.json` config.|`String`|
|`config`|Path to `scjssconfig` file. <br />**Default:** `./scjssconfig.json`|`String`|
|`deployUrl`|URL to the Sitecore JSS import service that accepts the package deployment.<br />**Default:** `deployUrl` from  `scjssconfig.json`|`String`|
|`skipDeploy`|If `true`, no deployment is made, and the manifest registration code for code-first is written to the console instead.<br />**Default:** `false`|`Boolean`|
|`acceptCertificate`|Whitelists a specific SSL certificate thumbprint, regardless of normal SSL validation. Useful for self-signed certificates.|`String`|

> `jss deploy template` should never be used if code-first/disconnected development is in use as it does not update the disconnected manifest, only Sitecore items.

> `jss deploy template` has options that enable modifying how the template is scaffolded, such as specifying template fields with `--fields` or setting a display name with `--displayName`. Run `jss deploy template --help` to see all the options with descriptions.

### `jss deploy`

Deploys the JSS app artifacts to a Sitecore instance. Use `jss deploy --help` for subcommands.

### `jss environment`

Prints the value of an environment variable.

|Parameter |Description| Value type|
| --- | --- | --- |
|`name`| The name of the environment variable to print.|`String`|

### `jss manifest`

Runs the app's manifest generation process, which will generate the *app manifest* file under `/sitecore/manifest` in app root.

|Parameter |Description| Value type |
| --- | --- | --- |
|`appName`| The name of the app. Defaults to the package.json config value.|`String`|
|`manifestSourceFiles`| The files or file patterns to parse to generate the manifest. <br/> **Default:** `['./sitecore/definitions/**/*.sitecore.js', './sitecore/definitions/**/*.sitecore.ts']`|`Array`|
|`require`| A JS module to require before processing the manifest. This may initialize a custom compiler (Babel, TypeScript), perform init tasks, and so on. <br /> **Default:** `./sitecore/definitions/config.js`|`String`|
|`manifestOutputPath`| The path of the file to which manifest output will be written. <br /> **Default:** `./sitecore/manifest`|`String`|
|`includeContent`| Includes content and media items in the manifest output.<br /> **Default:** `false`<br /> **Alias:** `c`|`Boolean`|
|`includeDictionary`| Includes dictionary items in the manifest output.<br /> **Default:** `false`<br /> **Alias:** `d`|`Boolean`|
|`language`| Defines the language the manifest represents. Defaults to the language config in the package.json. <br /> **Alias:** `l`|`String`|
|`rootPlaceholders`| Sets the root placeholder name(s) for the app. If set, overrides root placeholders set in the package.json.**Alias:** `p`|`Array`|
|`wipe`| Causes the JSS import to run as a wipe + recreate of any existing app items. Pass --unattendedWipe in addition to bypass interactive confirmation for CI scenarios.<br /> **Default:** `false`<br /> **Alias:** `w`|`Boolean`|
|`pipelinePatchFiles`| List of files or file patterns from which to load pipeline config patch files. **Default:** `['./sitecore/pipelines/**/*.patch.js', './sitecore/pipelines/**/*.patch.ts']`|`Array`|
|`debug`| If true, emits additional diagnostic information.**Default:** `false`|`Boolean`|
|`allowConflictingPlaceholderNames`| Enables using placeholder names that conflict with Sitecore or SXA.**Default:** `false`<br /> **Alias:** `a`|`Boolean`|

> `jss manifest` has options that enable modifying how the manifest generates, such as `--includeContent` to add content and routes data to the manifest. Run `jss manifest --help` to see all the options with descriptions.

> Manifest does not include content, media, or dictionary items by default for safety, in case a content editor has changed the data. To include these items, run `jss manifest --includeContent --includeDictionary` to include everything.

### `jss package`

Creates a Sitecore update package that includes both the app manifest and the production build artifacts.

|Parameter |Description| Value type |
| --- | --- | --- |
|`packageOutputPath`|The location the JSS manifest package will be written to. <br /> **Default:** `./sitecore/package`|`String`|
|`skipManifest`|If `true`, skips manifest generation. This can be used to consume existing output from `jss manifest` (via the `manifestOutputPath` parameter) without rebuilding it.<br /> **Default:** `false`|`Boolean`|

> `jss package` has many options that enable modifying how the package deploys, such as excluding build artifacts with `--noFiles`. Run `jss package --help` to see all the options with descriptions.

> When run with default options, `jss package` also runs `jss build` and `jss manifest`. You may also pass options for all of these commands to `package`.

### `jss setup`

Runs the interactive setup process to optionally provide info about connecting/deploying to a Sitecore instance. The input is saved to the `scjssconfig.json` file in the app root.

|Parameter|Description|Value Type|
|---|---|---|
|`instancePath`|'Path to the Sitecore "Website" folder (e.g. c:\\dev\\sitecore\\Website)|`String`|
|`deployUrl`|Sitecore host used to deploy the app (e.g. <http://sitecore9/sitecore/api/jss/import>)|`String`|
|`layoutServiceHost`|Sitecore host used to download Layout Service data (e.g. <http://sitecore9>)|`String`|
|`apiKey`|Sitecore API Key (GUID of item under `/sitecore/system/Settings/Services/API Keys/` in the `master` database, or `core` database for Sitecore 9.0).|`String`|
|`deploySecret`|Deployment secret (32+ random chars).|`String`|
|`nonInteractive`|Disallows interactive prompts (all other arguments must be passed in this mode).|`Boolean`|
|`outputFile`|The file path to output the config to.<br />**Default:** `./scjssconfig.json`|`String`|
|`skipValidation`|Skip validation of command arguments (e.g. for CI).|`Boolean`|

> Note: for CI deployments, `setup` accepts arguments to build the config from variables. Use `jss setup --help` for details.

### `jss start`

Starts the application in _disconnected mode_. Sitecore is not required or used even if available. Content comes from local files.

### `jss start:connected`

Starts the application in _connected mode_, where it connects to Sitecore to retrieve the layout data and content but still runs locally.
