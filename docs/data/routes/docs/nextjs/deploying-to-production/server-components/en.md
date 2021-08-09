---
name: server-components
routeTemplate: ./data/component-templates/article.yml
title: Installing Sitecore Headless Services
---
<!-- omit in toc -->
# Installing Sitecore Headless Services
- [On-prem / Virtual Machine / IaaS](#on-prem--virtual-machine--iaas)
- [Azure Webapps / PaaS](#azure-webapps--paas)
- [Sitecore Containers](#sitecore-containers)

To use the Next.js SDK, you must install the Sitecore Headless Services module in the Sitecore environment. 

The Sitecore Headless Services module provides APIs and configuration needed for the Next.js SDK, including the Layout Service, Sitecore GraphQL, the Dictionary Service, and the JSS Import Service.

The method of installing Sitecore Headless Services depends on your deployment architecture.

## On-prem / Virtual Machine / IaaS
Install using the Headless Services package zip.
* [Procedure: Server components installation](/docs/client-frameworks/getting-started/jss-server-install#server-components-installation)

## Azure Webapps / PaaS
Install using Headless Services WDP packages.
* [Walkthrough: Deploying a JSS site to Azure](/docs/techniques/azure-deployment)

## Sitecore Containers
Layer the Sitecore Headless Services module onto your container images in your Dockerfiles.
* [Walkthrough: Add Sitecore modules to custom images](https://doc.sitecore.com/developers/101/developer-tools/en/add-sitecore-modules.html)
* [Sitecore container module reference for Headless Services](https://doc.sitecore.com/developers/101/developer-tools/en/sitecore-module-reference.html#javascript-services--jss---sitecore-headless-services_body)