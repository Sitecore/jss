---
name: walkthrough-dotnetnew
routeTemplate: ./data/component-templates/article.yml
title: Walkthrough with `dotnet new`
---
# Walkthrough: Using the .NET starter template for JSS Next.js projects

Sitecore provides a Getting Started template for Sitecore developers that want to try out  Sitecore JSS with [Sitecore Containers](https://containers.doc.sitecore.com/), the [Sitecore Next.js SDK](https://jss.sitecore.com/), and [Sitecore Content Serialization](https://doc.sitecore.com/developers/101/developer-tools/en/sitecore-content-serialization.html). 

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

- [Install the prerequisites](#install-the-prerequisites)
- [Install the template](#install-the-template)
- [Create the MyProject solution](#create-the-myproject-solution)

### Install the prerequisites

Before you can install the template and create a solution, you must make sure that you have these software components installed on your workstation:

* [NodeJs 14.x](https://nodejs.org/) (we recommend using the latest LTS release.)

* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1) (check your installed version with the `dotnet --version` command)

* [.NET Framework 4.8 SDK ](https://dotnet.microsoft.com/download/dotnet-framework/net48) (see the [Microsoft procedure for checking .NET Framework versions](https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed))

* [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/)

* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/), with Windows Containers enabled

See the [Sitecore Containers](https://doc.sitecore.com/developers/101/developer-tools/en/containers-in-sitecore-development.html) documentation for more information on system requirements.

### Install the template

You download and install the template in your file system. Afterward, you can create solutions based on the template.

To install the template:

1. Open PowerShell with administrator privileges.

2. Run the following command:

   ```powershell
   dotnet new -i Sitecore.DevEx.Templates --nuget-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
   ```

   The `dotnet` tool does not provide obvious feedback that the install was successful. However, the install command ends by listing all of the installed templates. If the install is successful, the list includes `sitecore.nextjs.gettingstarted`.

### Create the MyProject solution

You can name you solution anything you like, but we name the solution `MyProject` in this example.

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

5. Go to the `MyProject` folder

6. You use the provided `init.ps1` script to prepare the following items for the Sitecore container environment:

   * A valid/trusted wildcard certificate for `*.myproject.localhost`
   * Hosts file entries for `myproject.localhost`
   * Required environment variable values in `.env` for the Sitecore instance

   > * Using non-Latin characters in the project/folder name can give unexpected results because of character limitations in Docker registry names and URLs.
   >
   > * See the [Sitecore Containers documentation](https://doc.sitecore.com/developers/101/developer-tools/en/containers-in-sitecore-development.html) for more information on these preparation steps.

   Running the `init.ps1` script with the `-InitEnv` switch populates the `.env` variables required by the Sitecore container environment. It leverages `mkcert` to generate certificates.

   To prepare the Sitecore container environment:

   ```powershell
   .\init.ps1 -InitEnv -LicenseXmlPath "<C:\path\to\license.xml>" -AdminPassword "<desired password>"
   ```

   > You must use an elevated/Administrator Windows PowerShell 5.1 prompt for this command, PowerShell 7 is not supported at this time.

   Out of the box, this example does not include a reference to the `.env` file in the `.gitignore` file. This is so that developers can share initialized environment variables. If you check your `.env` file into source control, other developers can prepare a certificate and hosts file entries by simply running the `init.ps1` script.

   If your Sitecore solution and/or its data are sensitive, we recommend that you keep the `.env` file excluded from source control and provide another means of centrally configuring the information within.

   > If this is your first time using `mkcert` with Node.js, you must set the `NODE_EXTRA_CA_CERTS` environment variable in your user or system environment variables. For example: 
   >
   > ```powershell
   > setx NODE_EXTRA_CA_CERTS C:\<path to user>\AppData\Local\mkcert\rootCA.pem
   > ```
   >
   > Restart your terminal or VS Code for the environment variable to take effect.

7. Download the Sitecore Docker images, install and configure the containers and JSS application:

   ```powershell
   .\up.ps1
   ```

8. When prompted, log into Sitecore via your browser, and accept the device authorization.
9. Wait for the startup script to open browser tabs for the [rendered site](https://www.myproject.localhost/) and the [Sitecore Launchpad](https://cm.myproject.localhost/sitecore/).