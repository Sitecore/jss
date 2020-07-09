---
name: jss-server-install
routeTemplate: ./data/component-templates/article.yml
title: Server Setup
---
# JSS Server Setup

In order to deploy a JSS app to Sitecore, or to pull data from a remote Sitecore instance into a headless JSS app, a Sitecore instance running the JSS Server Components is required.

## Prerequisites

> You do not need these prerequisites to perform [disconnected development](/docs/fundamentals/application-modes#disconnected-developer-mode) on a JSS site, or to quickly try out JSS. These prerequisites are to deploy to a Sitecore server for editing or server-side rendering.

### Node.js

To run in Integrated Mode (required for editing JSS sites), the Sitecore server must have [Node](https://nodejs.org) installed and `node.exe` on the `PATH` (e.g. running `node` at a command prompt should work). We recommend using the latest LTS release.

### Sitecore

The JSS server components require Sitecore 9.0 Update-1 or later. Install Sitecore according to the instructions for your version available on [the dev site](https://dev.sitecore.net).

### Sitecore JSS License

**JSS server-side functionality requires an JSS-enabled license file.**

To check if your license is a JSS-enabled license, open your `license.xml` in a text editor and search for `Sitecore.JSS` - if it's found, you're ready to use JSS. Not there? Read on.

#### For partners

Recently updated partner license should already have the key that enables JSS. If you do not have the endorsement, you may need to request a fresh partner license on [SPN](https://spn.sitecore.net/Partner%20Resources/Partner%20License.aspx) or reach out to your Sitecore Partner Manager.

#### For customers

If you do not have a JSS-enabled license, please reach out to your Sitecore Account Manager and request a temp license for short term needs and discuss migration to a JSS license.

## Server Components Installation

These steps only need to be performed once per Sitecore JSS server. A JSS server may host many JSS applications. In a scaled Sitecore installation, perform these steps on a _Standalone_ or _Content Management_ server.

1. [Download the JSS Server Components Sitecore package](https://dev.sitecore.net/Downloads/Sitecore_JavaScript_Services.aspx).

1. Login to your Sitecore instance, and open the Desktop. On the Sitecore menu (lower left), click `Development Tools`, then `Installation Wizard`.

1. Install the JSS Server Components zip package using the Installation Wizard.

1. For **Sitecore 9.0.x only** (not 9.1), alter the binding redirect for `Newtonsoft.Json` in your `Web.config`:

    ```xml
    <dependentAssembly>
      <assemblyIdentity name="Newtonsoft.Json" publicKeyToken="30ad4fe6b2a6aeed" />
      <!-- change the oldVersion from 9.0.0.0 to 11.0.0.0. Leave newVersion alone (do not make it 11.0). -->
      <bindingRedirect oldVersion="0.0.0.0-11.0.0.0" newVersion="9.0.0.0" />
    </dependentAssembly>
    ```

1. Verify your server components install worked, by visiting `http://your-sitecore-instance/sitecore/api/layout/render/jss?item=/&sc_apikey=TEST`. You should receive **HTTP Error 400.0 - API key is not valid** if it is working correctly (browsers may obscure the message behind a custom error page for HTTP 400; tools like Postman or browser DevTools may be needed to see this message).

## Scaled Sitecore Installations

If you are installing the JSS server components to a scaled Sitecore installation (i.e. production environments with separate CM and CD servers), additional configuration is required to complete the JSS installation for the CD (Content Delivery) servers.

1. Extract the server components Sitecore package with an unzip tool such as 7-Zip.
1. Extract the inner `package.zip` the same way. Ignore any unzip warnings about `sc_*.txt` files.
1. In the resulting items, deploy all of the items in the `files` folder to your CD server's webroot: `App_Config`, `bin`, `sitecore`, and `Views`.
1. Add this key in `<handlers>` section in `Web.config` on a CD server:

    ```xml
    <add verb="*" path="sitecorejss_media.ashx" type="Sitecore.JavaScriptServices.Media.MediaRequestHandler, Sitecore.JavaScriptServices.Media" name="Sitecore.JavaScriptServices.Media.MediaRequestHandler" />
    ```

1. Congratulations, your CD server is ready to host JSS apps.

## What's next?

Your Sitecore server is now all set for JSS development. Now you can [deploy your app](./app-deployment).
