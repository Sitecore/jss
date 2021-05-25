---
name: walkthrough-dotnetnew
routeTemplate: ./data/component-templates/article.yml
title: Walkthrough with `dotnet new`
---
# Walkthrough: Using the Sitecore Container Starter Template for JSS Next.js Projects

Sitecore provides a Getting Started template for Sitecore developers that want to try out  Sitecore JSS with [Sitecore Containers](https://doc.sitecore.com/developers/101/developer-tools/en/containers-in-sitecore-development.html), the [Sitecore Next.js SDK](https://jss.sitecore.com/), and [Sitecore Content Serialization](https://doc.sitecore.com/developers/101/developer-tools/en/sitecore-content-serialization.html). 

For simplicity, this solution does not implement Sitecore Helix conventions for solution architecture. As you begin building your Sitecore solution, you should review [Sitecore Helix](https://helix.sitecore.net/) and the [Sitecore Helix Examples](https://sitecore.github.io/Helix.Examples/) for guidance on implementing a modular solution architecture.

The template includes: 

* A `docker-compose` environment for a Sitecore XP0 topology with a Next.js rendering host.

 > The included `docker-compose.yml` is a stock XP0 environment from the Sitecore Container Support Package. All changes/additions for this solution are included in the `docker-compose.override.yml`.

* Scripted invocation of `jss create` and `jss deploy` to initialize a Next.js application.

* Sitecore Content Serialization configuration.

* An MSBuild project for deploying configuration and code into the Sitecore Content Management role. (see `src\platform`).

## Support

Sitecore supports the template output as provided. Once changed or amended, the solution becomes a custom implementation and is subject to limitations as defined in Sitecore's [scope of support](https://kb.sitecore.net/articles/463549#ScopeOfSupport).

## Create a solution from the Getting Started template

To create a solution from the Getting Started template, you must complete the following procedures:

* [Install the prerequisites](#install-the-prerequisites)

- [Install the template](#install-the-template)
- [Create the MyProject solution](#create-the-myproject-solution)
- [Rebuild search indexes](#rebuild-search-indexes)
- [Add a language and import it (Optional)](#add-a-language-and-import-it-optional)

### Install the prerequisites

Before you can install the template and create a solution, you must make sure that you have these software components installed on your workstation:

* A valid Sitecore license file.
* Windows PowerShell 5.1. PowerShell 7 is not supported at this time.
* [NodeJs 14.x](https://nodejs.org/) (we recommend using the latest LTS release).
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1) (check your installed version with the `dotnet --version` command).
* [.NET Framework 4.8 SDK ](https://dotnet.microsoft.com/download/dotnet-framework/net48) (see the [Microsoft procedure for checking .NET Framework versions](https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed)).
* [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/).
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/), with Windows Containers enabled.
* If you have not already done so, set the `ExecutionPolicy` to allow these scripts to run using the command `Set-ExecutionPolicy Unrestricted`

See the [Sitecore Containers](https://doc.sitecore.com/developers/101/developer-tools/en/containers-in-sitecore-development.html) documentation for more information on system requirements.

### Install the template

Before you can create a solution, you must download and install the .NET starter template in your file system. 

To install the template:

1. Open PowerShell with administrator privileges.

2. Run the following command:

   ```powershell
   dotnet new -i Sitecore.DevEx.Templates --nuget-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
   ```

   The `dotnet` tool does not provide obvious feedback that the install was successful. However, the install command ends by listing all of the installed templates. If the install is successful, the list includes `sitecore.nextjs.gettingstarted`.

### Create the MyProject solution

You can name your solution anything you like, but we name the solution `MyProject` in this example.

> * Using non-Latin characters in the project/folder name can give unexpected results because of character limitations in Docker registry names and URLs.

To create the `MyProject` solution:

1. Open PowerShell with administrator privileges.

2. Check if you have the Internet Information Server running on port 443:

   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 443).OwningProcess
   ```

   If you do, you must stop it:

   ```powershell
   iisreset /stop
   ```

3. Check if you have Apache Solr or any other service running on port 8984:

   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 8984).OwningProcess
   ```

   If you do, you must stop it:

   ```powershell
   Stop-Service -Name "<the name of your service>"
   ```

   Or, if you have started it with Non-Sucking Service Manager, stop it with this command:

   ```powershell
   nssm stop "<the name of your service>"
   ```

4. Go to your solutions folder and create the `MyProject` solution and project:

   ```powershell
   dotnet new sitecore.nextjs.gettingstarted -n MyProject 
   ```

5. Go to the `MyProject` folder.

6. To prepare the the Sitecore container environment, use the provided `init.ps1` script:

   ```
   .\init.ps1 -InitEnv -LicenseXmlPath "<C:\path\to\license.xml>" -AdminPassword "<desired password>"
   ```

   The `.\init.ps1` script provides: 

   * A valid/trusted privately signed wildcard certificate for `*.myproject.localhost`.

     > On local environments, Sitecore instances are installed using privately signed certificates. `.\init.ps1` generates certificates using the `mkcert` utility. Node.js rejects these certificates because their root CAs are not known. 
     >
     > If this is your first time using `mkcert` with Node.js, you will need to [manually set the  `NODE_EXTRA_CA_CERTS` environment variable](/docs/fundamentals/troubleshooting/node-certificates) to prevent HTTPS errors.
     >
     > The `.\init.ps1` script will instruct you on how to set the `NODE_EXTRA_CA_CERTS` environment variable in your user or system environment variables: 
     >
     > ```
     > To avoid HTTPS errors, set the NODE_EXTRA_CA_CERTS environment variable using the following command:
     > setx NODE_EXTRA_CA_CERTS C:\Users\<username>\AppData\Local\mkcert\rootCA.pem
     > 
     > You will need to restart your terminal or VS Code for it to take effect.
     > ```

   * Hosts file entries for `myproject.localhost`.

   * Required environment variable values in `.env` for the Sitecore instance.

     > Running the `init.ps1` script with the `-InitEnv` switch populates the `.env` variables required by the Sitecore container environment. 
     >
     > The sample application does not exclude the `.env` file from source control. This is so that developers can share initialized environment variables. 
     >
     > If you add your `.env` file into source control, other developers can prepare a certificate and hosts file entries by simply running the `init.ps1` script.
     >
     > If your Sitecore solution and/or its data are sensitive, we recommend that you exclude the `.env` file from source control and provide other means of centrally configuring the information within.

7. Download the Sitecore Docker images, install and configure the containers and JSS application:

   ```powershell
   .\up.ps1
   ```

8. When prompted, log into Sitecore via your browser, and accept the device authorization.

9. Wait for the startup script to open browser tabs for the [rendered site](https://www.myproject.localhost/) and the [Sitecore Launchpad](https://cm.myproject.localhost/sitecore/).

### Rebuild search indexes

After running `.\up.ps1` for the first time, or if you ever run `\docker\clean.ps1`, you need to [rebuild the search indexes](https://doc.sitecore.com/developers/101/platform-administration-and-architecture/en/rebuild-search-indexes.html).

### Add a language and import it (Optional)

To add a language to your JSS Next.js application, you must: 

1. [Add the language to /sitecore/system](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/add-a-new-language-to-sitecore-settings.html). In this example, use `da-DK`.

2. Deploy and publish the language:
   ```bash
      jss deploy items --language=da-DK --includeContent --includeDictionary
      dotnet sitecore publish
   ```
   The language links in the sample application should work now. 
   

To import the deployed language into your serialized items, you must: 
1. In the file `src/InitItems.module.json`, add a serialization configuration for languages. For example: 

   ```
   {
   	"name": "languages",
   	"path": "/sitecore/system/Languages",
   	"scope": "descendantsOnly",
   	"rules": [
   		{
   			"path": "/en",
   			"scope": "ignored"
   		}
   	]
   }
   ```

2. Run `dotnet sitecore ser pull`.
