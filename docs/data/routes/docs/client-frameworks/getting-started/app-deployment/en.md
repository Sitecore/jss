---
name: app-deployment
routeTemplate: ./data/component-templates/article.yml
title: App Deployment
---
# App Deployment

Every JSS application must at some point in its lifecycle transition from [_disconnected mode_](/docs/fundamentals/application-modes), to being deployed to a Sitecore environment. We can use the JSS CLI to deploy our app to Sitecore, which imports all of our disconnected content and components into Sitecore Items that can then be edited.

Once the app is deployed to Sitecore we can use [_connected mode_](/docs/fundamentals/application-modes) where we develop the app using live data from Sitecore, as well as [_integrated mode_](/docs/fundamentals/application-modes) where the app is rendered by Sitecore and content authors can edit the app's content.

## Configuring the Sitecore server to receive the JSS app

In order to host your JSS app the Sitecore server needs to know some configuration about how it will be hosted, such as where to find the site's root item, where to store its templates, what its host name will be, and where to find its JavaScript bundle for server-side rendering.

### Step 1. Configure your app's site and host name

Standard example sites used with `jss create` include a [Sitecore site definition](https://doc.sitecore.net/sitecore_experience_platform/setting_up_and_maintaining/configuring_servers/configuring_servers/configure_multiple_managed_websites) in their provided Sitecore configuration patch. Open this configuration patch (`sitecore\config\<appname>.config`) and confirm the `hostName` attribute matches a host header that the Sitecore server should respond to with the JSS app. If you are deploying a JSS app that is the default site for the Sitecore installation, you may _remove_ the `hostName` attribute to respond to any host.

> NOTE: When selecting a development hostname, note that Microsoft Edge will not resolve any hostnames without a TLD (i.e. `http://sitecore`). If you will be testing with Edge, ensure you select a hostname with a TLD (i.e. `http://jss.sitecore`).

```xml
<!-- other attributes removed for brevity -->
<site x:before="site[@name='website']"
      hostName="myapp.siteco.re" />
```

If you are using a local Sitecore instance, ensure the desired host name is mapped to your localhost via a `hosts` file entry. On Windows the hosts file can be found at `C:\Windows\System32\drivers\etc\hosts` (open your editor as administrator to be able to edit it with default security settings).

```text
127.0.0.1	myapp.siteco.re
```

After adding the host name entry, add it as a binding on your IIS instance as well:

<img src="/assets/img/iis-bindings.png" alt="IIS Bindings" class="img-fluid img-thumbnail" />

> If you are planning on deploying multiple JSS applications, you will need to configure different hosts and host name bindings in IIS in order for Sitecore to resolve the proper site.

### Step 2. API Key

The services used by JSS (including the [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service), [GraphQL](/docs/fundamentals/services/graphql), [Tracking Service](/docs/fundamentals/services/tracking), and [Dictionary Service](/docs/fundamentals/services/dictionary/sitecore-dictionary-service)) utilize the [API Key mechanism provided by Sitecore Services Client (SSC)](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service). You'll need to create an API Key and note its Item ID for use in setting up the sample apps.

1. Log into Sitecore (e.g. http://myapp.siteco.re/sitecore) and open the *Desktop* application.
1. > **For Sitecore 9.0.x only! Skip for Sitecore 9.1+**

     > Using the database icon in the lower right, switch to the *core* database. In Sitecore 9.1 and later, the API key is stored in the *master* database instead, which is the default, so this step is unnecessary.

     > <img src="/assets/img/switch-core-db.png" alt="Core Database" class="img-fluid img-thumbnail" />

1. From the start menu / Sitecore icon, open the *Content Editor* application.
1. Navigate to */sitecore/system/Settings/Services/API Keys* in the content tree, and via right-click or the *Home* ribbon, insert a new *API Key* item. The item can be named anything; the name is for your reference only. Pick something meaningful, e.g. the name of your app.
1. Set up the fields on the API key:
    * _CORS Origins:_ If you will be using _connected mode_ (quite likely), the APIs will need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) so that your dev server (default: `http://localhost:3000`) is allowed to make HTTP calls to the JSS services. For purely local development setup, use `*` to allow all origins. In production, only allow specific origins ([multiple origins](https://doc.sitecore.net/sitecore_experience_platform/90/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service) are `;`-delimited).
    * *AllowedControllers:* Use the following value. It is also possible to use `*`, but explicitly whitelisting controllers is a best practice. If you use additional custom SSC API controllers, they would need to be added to this list. Note that GraphQL endpoints require both the `GraphQLController` to be whitelisted, as well as the GraphQL endpoint URL (with `GraphQL:/path/to/endpoint/from/config`):

      ```text
      Sitecore.LayoutService.Mvc.Controllers.LayoutServiceController; 
      Sitecore.JavaScriptServices.Globalization.Controllers.DictionaryServiceController; 
      Sitecore.Services.GraphQL.Hosting.Mvc.GraphQLController;
      GraphQL:/api/yourappname
      ```
    * *Impersonation User:* always specify an explicit user. The impersonation user is a Sitecore user whose security context is used to determine the security rights of the JSS app to Sitecore content. Most apps should use `extranet\anonymous`, giving them the same security context as any anonymous web user. Note that _authenticated_ users (with valid Sitecore auth cookies) will receive their own security context regardless of this setting; it applies only to anonymous requests.

        > **Do not ever use `sitecore\admin` or any other privileged user as the impersonation user.** A serious security breach will result. Use only `extranet\anonymous` or a app-specific dedicated user for impersonation.

1. Save the API key item, publish it (Sitecore 9.1+) and make note of its **Item ID** (see screenshot below, highlighted). You'll need this ID to connect the JSS app.

  <img src="/assets/img/ssc-api-key.png" alt="API Key" class="img-fluid img-thumbnail" />

The services utilized by JSS will honor the configuration options on the API Key, including Allowed Controllers, CORS Origins, and Impersonation User. See the [SSC Documentation](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service) for more information on this configuration.


### Step 3. Verification

Make a request to the [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) on your Sitecore host:
`http://myapp.siteco.re/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY_ID}`.

> Be sure to specify the API key ID created above. If the API key is not provided, the server will return `HTTP 400 - Bad Request`.

The request should come back with some JSON that looks something like this:

```json
{
  "context": {
    ...
  },
  "route": {
    "name": "Home",
    ...
  }
}
```

## Connecting the JSS app to Sitecore

With Sitecore ready to receive our JSS app, we need to configure the JSS app to deploy to it, and then deploy the app.

### Step 1: Setup connection information

To configure the Sitecore connection, run `jss setup` at a command line within your JSS app, and follow the prompts. You will be asked for several pieces of information:

* **'Website' folder**: This is the root physical path to the Sitecore instance, used to deploy config files and JS build artifacts. File share paths are fine for remote instances. Example: `c:\inetpub\wwwroot\MySitecore\Website`. If you do not have access to the website folder directly, answer 'no' when asked if your instance is remote.
* **Sitecore host name**. This is the _host name of your JSS app_ (not the Sitecore root host name), which was configured previously. Example: `http://jssreactweb`
* **Sitecore import service URL**. This is the _import service URL of your JSS app_, by default it will сonsist of _host name of your JSS app_
plus `/sitecore/api/jss/import`: `http://JssReactWeb/sitecore/api/jss/import`. You can left blank value and default value will be set, in another case you can provide your custom URL.
* **API key ID** created above.
* **Deployment secret**. This is a shared secret that enables authentication to deploy your app's items to Sitecore. The setup process can auto-generate a random key, which we recommend. If you choose your own key, the secret must be:
    * 32 or more characters long
    * Randomly generated

  > Do not commit the secret to source control; use a unique secret for each environment and limit access to production secrets. For CI environments, `jss setup` accepts parameters (`--help`) that can be used to pass the secret and other parameters from variables. By default, the secret is stored in `/scjssconfig.json` and `/sitecore/config/AppName.deploysecret.config` - both of which are automatically ignored if you're using Git for source control.

`jss setup` will generate the `/scjssconfig.json` file that contains your JSS connection settings.

> Deployment tip: To build an environment-agnostic JSS app bundle for production environments that will always use the current hostname for API requests, set the `scjssconfig.json`'s `layoutServiceHost` setting to blank. This can be useful when you wish to commit one set of build artifacts and deploy them to CM + CD, or even a [headless proxy](/docs/techniques/ssr/headless-mode-ssr). Note that this technique is incompatible with [Connected GraphQL](/docs/techniques/graphql/connected-graphql) and server-side rendering, which requires an absolute URL to be set.

### Step 2: Config deployment

The JSS app is registered with Sitecore using [config patches](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/customizing_server_configuration/use_a_patch_file_to_customize_the_sitecore_configuration) that are deployed to the Sitecore server. When setting up the Sitecore server, we already edited one of these patches when we set the `hostName` attribute. Before they can take effect on the Sitecore server, we need to deploy them there.

#### Automatic config deployment (recommended)

Automatic deployment deploys the config patches directly from the JSS app using the JSS CLI. `jss setup` must have been completed to use this technique.

1. Open a command prompt/terminal within your JSS app
1. Run `jss deploy config`

This will take the Sitecore config patch files under `sitecore/config` and copy them to the Sitecore `App_Config/Include/zzz` folder.

This configures the JSS app with Sitecore, creates a site for it, and enables live mode (no need to publish) among other handy things. A Sitecore developer should review the patch file carefully to ensure that all the settings are as they should be; in production, for example, live mode is undesirable.

> Ensure that the user account you run the command under has write access to the Sitecore website folder configured in `/scjssconfig.json`. On Windows, this can also involve UAC elevation.

#### Manual config deployment

If the JSS app config is to be deployed by a dedicated Sitecore developer (or DevOps), or when you're working with a remote Sitecore instance, the JSS app config may need to be deployed manually. Acquire the `sitecore/config/*.config` patches from the JSS application, and deploy it to your Sitecore `App_Config/Include` folder in a location of your liking such as a `zzz` folder. Ensure you review the config patches for content before deploying them.

> Do not commit the `<appname>.deploysecret.config` patch to source control.

### Step 3: App Deployment

Now we are all ready to deploy our JSS app to the Sitecore instance.

### 3.1: Local Sitecore Instance

If your Sitecore instance is local, or accessible via file share, you can use the CLI for an automated deployment. Skip to 3.2 for a remote instance.

If you are using local self-signed certificate:
  1. Open a command prompt/terminal within your JSS app. If you know certificate value skip to step 4.
  1. Run command using wrong certificate thumbprint `jss deploy app --includeContent --includeDictionary --acceptCertificate test`
  1. From error message copy certificate thumbprint and paste instead of `test`
  <img src="/assets/img/certificate-error.png" alt="Certificate error" class="img-fluid img-thumbnail" />
  1. `jss deploy app --includeContent --includeDictionary --acceptCertificate CA:CD:3B:DB:19:D1:97:92:F9:80:91:FF:32:CC:F8:35:DC:F5:0B:01`

If you are not using local self-signed certificate:
1. `jss deploy app --includeContent --includeDictionary`

This will:
- Run the production build of your app (by default the `build` package script)
- Generate the app manifest, which defines the Sitecore structure needed to power the app
- Generate a JSS manifest package that contains your app manifest and referenced media files
- Install the package over HTTP(S) on your Sitecore instance.
- Copy build artifacts to the Sitecore website folder

> `--acceptCertificate` parameter whitelists an SSL certificate by thumbprint (certificate pinning). Because Node does not respect Windows trusted root certificates, this enables deploying items to local Sitecore instances that use self-signed certificates without disabling SSL validation entirely.

> There are many available options for `jss deploy app`, which are all set to sensible defaults if unspecified. You can see all of the options for it using `jss deploy app --help`. 

Note that content, media, and dictionary items are not installed by the deployment process by default (which is why we used `--includeContent --includeDictionary`). It's appropriate to include them as long as disconnected content is being updated but inappropriate if content editors are at work writing content for the app, as they could lose content data. See [content workflows](/docs/fundamentals/dev-workflows/code-first#content-workflow-and-developer-overwrite) for a way to have both coexist.

### 3.2: Remote Sitecore Instance

For a Sitecore installation that is remote, for example on Azure, you will need to deploy the build artifacts to the Sitecore instance manually.

1. Open a command prompt/terminal within your JSS app
1. `jss deploy items --includeContent --includeDictionary`

    This will:
    - Generate the app manifest, which defines the Sitecore structure needed to power the app
    - Generate a JSS manifest package that contains your app manifest and referenced media files
    - Install the package over HTTP(S) on your Sitecore instance

1. `jss build` to create production build artifacts
1. Deploy the build artifacts (from `build` (React), `dist` (others)) to the relative path on the Sitecore instance defined in `sitecoreDistPath` in your `package.json` file. This is normally something like `$sitecore\dist\myappname`.

For production setups, this deployment should be automated along with the deployment of other Sitecore artifacts in some sort of automated build process.

### Step 4: Verification

Check to make sure your app looks correct in Sitecore by logging in and opening the Content Editor.

#### 1. Content shows up in Content Tree
To test, log into your Sitecore instance using the selected app host `http://myapp.siteco.re/sitecore/` and open Content Editor. You should see the app item under `/sitecore/content`:

<img src="/assets/img/jss-tree.png" alt="Great success!" class="img-fluid img-thumbnail" />

#### 2. App is rendered by Sitecore

You should now be able to run the JSS app in _integrated mode_ by visiting the host name that was configured for the site, e.g. `http://myapp.siteco.re/`. If integrated mode is working correctly, viewing source should reveal a fully rendered app with complete HTML.

<img src="/assets/img/jss-deployed.png" alt="Great success!" class="img-fluid img-thumbnail" />

#### 3. App is editable in Experience Editor

Try launching the `/Home` page in Experience Editor. For example, `http://myapp.siteco.re/?sc_mode=edit` - or launch it from the dashboard:

<img src="/assets/img/basic-app-editable-ee.png" alt="Fully editable app in Experience Editor!" class="img-fluid img-thumbnail" />


## Now what?

Congratulations, you've successfully deployed your first JSS app! Next we'd recommend diving deeper into some JSS fundamental concepts, starting with [JSS Architecture](/docs/fundamentals/architecture).
