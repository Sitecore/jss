# Sitecore JSS End-to-end Test Suite

The e2e suite is designed to verify the behavior of JSS' sample apps and the JSS server components in a real scenario.

There are several moving parts:

## Cypress e2e Tests

[Cypress](https://www.cypress.io/) is a browser test automation suite. JSS has a battery of automated tests designed to validate that the sample sites and styleguides are rendering correctly and behaving themselves.

Check out the pre-configured tasks in the cypress `package.json` npm scripts to run the test scripts.

## Smokey (the e2e testing bear)

Smokey is a set of PowerShell scripts that automate complete test runs of the whole JSS infrastructure, starting from bootstrapping all `node_modules` from scratch, building the libraries and sample apps, running unit tests, then building up disconnected manifests, deploying them to Sitecore, and running smoke tests and Cypress tests against a Sitecore instance in Integrated Mode. A smokey run is considered a good basic test if the JSS infrastructure is operating - or at least the obvious parts.

NOTE: A Smokey test can take quite a while to run (10-20 minutes) and uses a lot of CPU ;)

To run Smokey,

1. Install Sitecore instance, and JSS server components onto it
1. Configure `smokey\smokey.sample.cmd` with your Sitecore connection info
1. Run `smokey.sample.cmd` as an admin, or someone with write access to the `hosts` file

## Test Plan

JSS has many possible operation modes that should be tested. Run the scripts in order.

### Create App Script

> We run the create app tests first, because the Smokey tests that run the _baseline script_ will also exercise the created apps using the same script (manifest, deploy, integrated mode e2e tests)

1. Use `jss create` to bootstrap a new instance of each sample app (react, vue, angular)
     - Open command prompt in `samples` path in this repo
     - Run `jss create <SomeUniqueTestAppName>-<framework> <framework> --source .`
     - Open the `package.json` within the newly created React app and remove the `test` npm script to avoid hanging smokey later (CRA defaults to watching tests)
     - **Important**: Ensure the created app contains the framework in its name (i.e. `e2etest-react`, `e2etest-vue`, `e2etest-angular`), or the Cypress tests may fail due to matching the wrong framework with the app.
1. Boot each app with `jss start` and ensure that no obvious errors occur (we'll run more thorough automated tests later in the test plan)

### Baseline Functionality Script

1. Install three copies of Sitecore:
   - XM1 (on-premise) - verify compatibility with XM only mode
   - XP1 (on-premise) - verify compatibility with XP
   - XP1 (Azure) - verify Azure PaaS compatibility
   - _For all future tests, repeat each on all Sitecore instances_
1. Install the JSS server components package
   - Ensure to install the correct XM or XP package on each instance
   - Create an API key and note its ID
1. Configure Sitecore instances
   - Register the `da-DK` (Danish) language with Sitecore in the master db
   - Rebind IIS to \*:80 so JSS apps hostnames can resolve to it
   - If Sitecore is defaulted to requiring HTTPS (XM does this right now), turn it off and remove rewrite rules for SSL from web.config
1. Smokey e2e tests (foreach-instance XM, XP - NOT azure)
   - Execute Smokey on XM1/XP1 on-premise installations to verify disconnected and integrated mode workflows.
1. Azure-specific deploy + e2e tests (foreach-app, azure only)
   - See https://jss.sitecore.com/docs/techniques/azure-deployment (don't forget to set the Node version)
   - Push build artifacts & configs via FTPS or Kudu
   - Import the site with `jss deploy items -c -d` in `en` and `da-DK`
1. Experience Editor testing (foreach-app react, angular, vue)
   - Note: if you receive `unauthorized_client` from IdentityServer, you may need to add the JSS site URL to IdentityServer's allowed CORS origins and restart its app pool.
   - Enter EE mode on each app
   - Ensure that values can be edited on the Styleguide (+ save)
   - Ensure that adding components works on the Styleguide (build a new SG section, + save)
   - Remove added components (+ save)
   - Create a new page, build a few components, save.
1. Analytics testing (foreach-app react, angular, vue)
   - Enable the JSS tracker (enable `Sitecore.JSS.TrackerServiceEnabled` setting in `JSS.Tracker.config`)
   - Ensure tracker form on styleguide is successfully pushing data
1. Scaled and Azure testing (foreach-app react, angular, vue)
   - Deploy the build artifacts (`dist`/`build`) to XM/XP CD instance
     - Modify the app config to set the site database to web
     - Approve all items in the JSS app workflow
     - Publish the site
     - Run Cypress integrated e2e against the CD (see cypress `package.json` - set URL and run `test:integrated:<framework>`).
1. Scaling test. Run JMeter against the home page of sample apps in integrated mode to ensure that they do not have any major scaling issues.
   - Increase the node cluster size from 2 to 12 for better scalability (`Jss.Apps.config`)
   - For a basic local smoke test, 700 threads with no warmup time should pass

> Note: installing SXA then re-running Smokey and EE tests is also recommended.

### Application Mode Functionality Script

_Execute after baseline script. Execute each step once per sample app (react, vue, angular)._

1. Disconnected mode: `node ./appmodes.js disconnected`
    - Starts each sample app in disconnected mode and runs cypress disconnected e2e suite on it
1. Connected mode: `node ./appmodes.js connected`
    - Starts each sample app in connected mode and runs cypress connected e2e suite on it
1. Headless mode test: `node ./headless.js`
    - NOTE: will modify all sample apps' `scjssconfig.json`, specifically `layoutServiceHost` and `instancePath`.
    - Configures each app to run in headless mode
    - Builds and deploys the app to the `node-headless-ssr-proxy` sample
    - Boots the sample app in headless mode
    - Executes cypress headless e2e on the sample app

### Developer Functionality Script

> `jss create`, which is also developer functionality, is vetted at the start of the test plan so that the deploy test suite exercises the created apps as well

1. Scaffold new component test/jss scaffold
    - Boot each sample app in disconnected mode: `jss start`
    - In a separate console, run `jss scaffold HelloWorld`
    - Append the HelloWorld component to the root `/data/routes/en.yml` route (see snippet below)
      ```yaml
        - componentName: HelloWorld
          fields:
            heading: e2e pass
      ```
    - Visit the running app and ensure that the `HelloWorld` component is present on the route (no page refresh should be required)
    - Deploy the component to Sitecore: `jss deploy items -c`
    - Visit the site in integrated mode. You should see a yellow placeholder saying the `HelloWorld` component has no implementation (because we did not deploy updated js artifacts)
1. Sitecore-first scaffolding test
    - Open a console in any sample app (NOTE: this code is app-independent, so it need only be tested once not for each framework)
    - Deploy a new component: `jss deploy component SitecoreFirst --fields e2e e2e2:Integer "e2e 3:Rich Text" --allowedPlaceholders jss-main`
    - Open the Sitecore content editor
        - Ensure that there is a datasource template for `SitecoreFirst` containing the expected fields (`/sitecore/templates/project/appname`)
        - Ensure that there is a corresponding rendering item for `SitecoreFirst` (`/sitecore/layout/renderings/project/appname`)
        - Ensure that the `SitecoreFirst` rendering is allowed in the `jss-main` placeholder settings (`/sitecore/layout/Placeholder Settings/Project/appname/jss-main`)
    - Deploy a new template: `jss deploy template TemplateFirst --fields e2e e2e2:Integer "e2e 3:Rich Text"`
        - Ensure that there is a template for `TemplateFirst` containing the expected fields (`/sitecore/templates/project/appname`)

### React Native Script

_Execute after baseline script._

1. Perform all necessary setup steps for your environment (Android or iOS). Read the **Prerequisities** section of the `sitecore-jss-react-native` documentation for more information: http://jss.sitecore.com/docs/client-frameworks/react-native

   - If you haven't done this before, it will take some time, plan accordingly.

1. Clone or download the basic sample app repo: https://github.com/Sitecore/jss/tree/master/samples/react-native

1. Start app disconnected with `jss start-android` or `jss start-ios` (depending on your platform).

   - At this point, the React Native build process should start, opening 1 or 2 separate terminal window(s)/tab(s) containing the output from the React Native Metro bundler and the output from the React Native platform-specific compiler (e.g. Xcode, Android SDK).
   - Once the build process completes, you should see the basic sample app - essentially a copy of the default Welcome to Sitecore page - in the simulator or physical device (whichever you're choosing to use). Note: the initial build can take several minutes. Subsequent builds are typically much faster. This is not something specific to JSS, but rather normal behavior for React Native.
   - The app will be running in disconnected application mode. This means data and assets are embedded statically within the app.
   - Make changes to app content and/or media in local route data, then refresh app to ensure it is displaying the changes.

1. Start app in `connected-tunnel` mode with `jss start-android:connected-tunnel` or `jss start-ios:connected-tunnel` (depending on your platform).

   - Use `jss deploy items -c -d` to generate the app manifest and deploy to a Sitecore instance.
   - Read the **Connected Tunnel Mode** section on the doc site for more information about what Connected Tunnel Mode is: http://jss.sitecore.com/docs/client-frameworks/react-native
   - The build process for Connected Tunnel mode is the same as for Disconnected mode, just with different configuration.
   - The app will run in the simulator or physical device and should look identical to the app in Disconnected mode.
   - Make changes to app content and/or media in Sitecore, save/publish, then refresh app to ensure it is displaying the changes.

1. Start app in `connected` mode with `jss start-android:connected` or `jss start-ios:connected` (depending on your platform).
   - Use `jss deploy items -c -d` to generate the app manifest and deploy to a Sitecore instance.
   - **Connected Mode** is conceptually similar to **Connected Tunnel Mode** in that the app is fetching data from a Sitecore instance. The primary difference is that **Connected Mode** assumes the Sitecore instance has a fully-qualified domain name that the app can access and make requests to, while **Connected Tunnel Mode** does not.
   - The app will run in the simulator or physical device and should look identical to the app in Disconnected mode.
   - Make changes to app content and/or media in Sitecore, save/publish, then refresh app to ensure it is displaying the changes.

### MVC Integration Script

_Execute after baseline script._

#### Client-side Embedding (Embedded Wizard)

This test plan basically mirrors the installation and verification instructions from the **Client-side Embedding** page of the doc site: http://jss.sitecore.com/docs/techniques/mvc-integration/client-side-embedding

1. Follow `Step 1` of the guide.

   - Be sure to browse to `http://[sitecorehost]/EmbeddedWizard/Wizard` and ensure the app runs independently in Integrated Mode.

1. Follow `Step 2, option 1` of the guide.

1. Follow the `Verification` section of the guide.

#### JavaScript Rendering Type

This test plan largely mirrors the **Getting Started** and **Component Library** sections of the **Sitecore JavaScript rendering** page of the doc site: http://jss.sitecore.com/docs/techniques/mvc-integration/javascript-rendering

1. Follow the `Getting Started` section of the guide.

   - Be sure to verify the result via the instructions at the end of the `Getting Started` section.

1. In the `Component Library` section, we first provide a description of the notable files in the `sitecore-javascript-renderings` sample. After those descriptions, there are instructions for how to deploy and build the sample. Follow those instructions.

   - Be sure to verify the result via the instructions at the end of the `Component Library` section.

### Cleanup

After a test run ensure you delete the sample apps created using `jss create` for the first test suite.

### Post-release Test Script

_After pushing a new JSS release to npm, verify that the updated samples and npm packages run with this script. Occasionally monorepo can mask specific types of issues._

1. Run `jss create` on all updated templates _outside the monorepo_ to ensure fresh live `node_modules`
1. Start each app with `jss start`
1. Configure and deploy each app to a local Sitecore instance
1. Test integrated mode + EE
