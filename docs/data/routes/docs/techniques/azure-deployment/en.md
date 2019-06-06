---
name: azure-deployment
routeTemplate: ./data/component-templates/article.yml
title: Azure Deployment
---

# Deploying a JSS site to Azure

> There are many considerations and possible topologies involved in deploying a JSS site to Azure. This guide is designed to be the simplest way to get up and running with a JSS site using _integrated mode_ in Azure, using a version of Sitecore deployed from the Azure Marketplace. In practice a more advanced deployment toolkit would be appropriate that involves source control, automated builds, testing, etc.

## Step 1: Provision Sitecore and JSS

Starting from Sitecore 9.1 release JSS server components can be provisioned alongside with Sitecore through the Azure Marketplace. You will need a JSS-enabled license file. For the purposes of simplicity, choose an XP Developer installation. In production, a more repeatable deployment methodology such as ARM templates and the Sitecore Azure Toolkit should be used, but the Marketplace installation is the simplest to get started with. Consult the Sitecore documentation for help with production Azure setup.

> After provisioning, ensure to increase the `core` and `master` database sizes to at least S2 (50 DTU). Lower scaled databases will cause slow UI and may fail the package installation.

## Step 2: Install the JSS server components (optional)

In case you already have Sitecore instance in Azure you have to use ARM templates methodology.
1. Download official released Sitecore JSS WDP package https://dev.sitecore.net/Downloads/Sitecore_JavaScript_Services/110/Sitecore_JavaScript_Services_1100.aspx
1. Download ARM templates for the appropriate topology available on the GitHub https://github.com/Sitecore/Sitecore-Azure-Quickstart-Templates/tree/master/JSS
1.	After you download all wdp’s and ARM’s you should preserve all files to some publicly available storage like Azure storage.
1. Prepare parameters.json file. Content of the file should be similar to the following:
```json
{	 
    "sqlServerLogin":  
        {"value":  "sql"},

    "sqlServerPassword":  
        {"value":  "Password12345"},

    "jssMsDeployPackageUrl":
        {"value": "<PackageUrl>"},

    "jssCDMsDeployPackageUrl":
        { "value": "<CDPackageUrl>"}
}

```
5. Provision JSS. Use following script to perform the provisioning:
```powershell
param (
    $DeploymentId = “deploymentId”,
    $LicenseXmlPath = "<path to license>",
    $Location = "West Europe",
    $ParametersPath = "<path to parameters file>",
    $Cmdlets = "C:\Sitecore.Azure.Toolkit.2.0.0-r1041-170929\tools",
    $SubscriptionName = "<subscription name>",
    $TemplateUri = "ARM template url"
)

if ((Test-Path "$Cmdlets\Sitecore.Cloud.Cmdlets.psm1") -eq $False) {
    nuget install Sitecore.Azure.Toolkit.Cmdlets -Source http://nuget1dk1:8181/nuget/Cloud/ -x -Prerelease
    $Cmdlets = "$PSScriptRoot\Sitecore.Azure.Toolkit.Cmdlets\Cmdlets"
}

Import-Module "$Cmdlets\Sitecore.Cloud.Cmdlets.psm1" -Verbose

Login-AzureRmAccount
Set-AzureRmContext -SubscriptionName "$SubscriptionName"

Start-SitecoreAzureDeployment `
    -Name $DeploymentId `
    -Location $Location `
    -ArmTemplateUrl $TemplateUri `
    -ArmParametersPath $ParametersPath `
    -LicenseXmlPath $LicenseXmlPath `
    -Verbose

```
6. Configure Azure Node version: In Azure, the app services come with a very old Node.js version enabled by default. This will cause issues rendering your JSS apps. Configure the `WEBSITE_NODE_DEFAULT_VERSION` setting on your app service, [per this article](https://blogs.msdn.microsoft.com/azureossds/2016/04/20/nodejs-and-npm-versions-on-azure-app-services/). The same Node version should be used on Azure as is used during development, normally the latest LTS Node release. As of the writing of this documentation, that is 8.9.4. Starting from Sitecore 9.1 Azure Node version set during Sitecore provisioning. Default Azure Node version for Sitecore 9.1 is 8.11.1. Can be changed during the Sitecore provisioning.

7. Please make sure that sitecore\JSS Import Service Users role has 'Create Item' and 'Create Descendants' right on 'sitecore\Content' item. If not please assign mentioned security permission in order to allow JSS create content on the Sitecore instance.

## Step 3: Configure the Sitecore server

The steps to configure an Azure server to accept a JSS app are mostly the same as for on-premise. Consult the [app deployment](/docs/getting-started/app-deployment) documentation for details, and read on for the differences.

1. When in Azure, the config deployment step must be performed manually (in production, it should be performed by an automated build step). For our purposes, we can use our FTPS client to deploy the JSS app's `/sitecore/config/*` files to the Azure website's `/site/wwwroot/app_config/include` directory.

    > NOTE: If your JSS apps are relying on custom `hostName` settings, which the default configs are (i.e. `hostName="jssreactweb"`), you will need to alter this before deploying to Azure. Either the hostName will need to be cleared, making the JSS site the default site, or the hostName will need to be something resolvable in DNS and registered to the Custom Domains of the Azure App Service instance. For simplicity, start by clearing the `hostName`.

1. When deploying the app to Azure, instead of `jss deploy app`, use `jss deploy items` with the same parameters. Because JSS deployment service does not deploy files, we must deploy the files separately to the App Service instance.

## Step 4: Deploy the app's files

In production, deployment of the JSS app's build artifacts should be done via an automated build setup. For simplicity, we can use FTPS to deploy our build artifacts.

1. Build your JSS app using `jss build`, and collect its artifacts.
    * For the React app, artifacts are in `/build`
    * For the Angular and Vue apps, artifacts are in `/dist`
1. Collect the artifacts and deploy them using FTPS to the App Service under the relative path listed in the `sitecoreDistPath` setting in your app's `package.json`. In most cases, this would be `/dist/YourAppName`, which translates to deploying the build to `/site/wwwroot/dist/YourAppName` on the app service
    * Download your App Service's `publishsettings` file from the Azure portal
    * Locate the FTP connection information within, i.e. 

        ```
        <publishProfile profileName="sitecorejss-999-single - FTP" 
          publishUrl="ftp://waws-prod-mwh-015.ftp.azurewebsites.windows.net/site/wwwroot" 
          userName="sitecorejss-999-single\$sitecorejss-999-single" 
          userPWD="long random pw here"...
        ```
    * Using an FTPS client, such as WinSCP, connect to the app service and edit the Web.config file. Ensure to select explicit encryption when connecting.

1. That's it! Visiting your app's URL should now operate correctly.