# Sitecore JavaScript Rendering SDK (JSS)

[![Build Status](https://dev.azure.com/sitecore-devex/headless-javascript/_apis/build/status/Sitecore.jss?branchName=dev)](https://dev.azure.com/sitecore-devex/headless-javascript/_build/latest?definitionId=8&branchName=dev) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

This repository contains source code for all Sitecore JSS packages and templates to help you get started using Sitecore JSS.

## Getting started with JSS
To develop a JSS application, you need:
- An operating system supported by Node (Mac, Windows, Linux).
- Node. We recommend using the latest long-term support (LTS) release.

> To run a JSS application in production or develop using Sitecore data you need to connect your application to a Sitecore instance with the Headless Services module installed (requires a **Sitecore Headless Services license**). Sitecore *requires Windows*, but the Sitecore instance does not need to be local. You can use a Sitecore instance installed in a virtual machine or on a remote server.

### Identify the JSS version for your Sitecore version
JSS versions are coupled with Sitecore versions. The current JSS release is compatible with the latest version of Sitecore. 

If you use an older version of Sitecore, before creating a JSS project, you need to determine which JSS version is compatible with your version of Sitecore XP.

To identify the correct JSS version for your Sitecore XP version:  
- For Sitecore XP 7.5—9.3, in the [Sitecore modules compatibility table for Sitecore XP 7.5—9.3](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788), in the section *Headless Services*, identify the correct JavaScript Services version for your Sitecore version.
- For Sitecore XP 10.0 and later, in the [Sitecore modules compatibility table for Sitecore XP 10.0 and later versions](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB1000576), in the section *Headless Services*, identify the correct JavaScript Services version for your Sitecore version.

### Getting started with the latest version of JSS

To create a JSS project, perform the following steps:
1. Install the JSS CLI:   
	```
	npm install -g @sitecore-jss/sitecore-jss-cli
	```
2. In a terminal, run the following command to create the JSS application:
	```
	jss create <your-app-name> <app-template-name>
	```	
	
	Replace `<your-app-name>` with your desired application name, and `<app-template-name>` with the name of the template. 
	
	For example: `jss create my-first-jss-app nextjs`.
	
	>This command scaffolds a JSS application based on the ***latest version of JSS templates*** regardless of the JSS CLI version, because it pulls the template code from the `master` branch of the JSS repository.
3. Change directory to your application folder: 
	```
	cd my-first-jss-app
	```
4. Start the development server:
	```
	jss start
	```

### Working with older versions

To create a JSS project for an older version of JSS and Sitecore:   
1. [Identify the correct JSS version for your Sitecore XP version](#identify-the-jss-version-for-your-sitecore-version).
2. Run the JSS CLI installation command:
	```
	npm i @sitecore-jss/sitecore-jss-cli@<version>
	```
	Replace `<version>` with your desired version. For example, `npm i @sitecore-jss/sitecore-jss-cli@13.0.0`.
3. In a terminal, create your JSS project by running the following command:
	```
	jss create my-jss-app react --branch release/13.0.0
	```
	>The command uses the `--branch` option and you need to provide the name of a branch in the JSS repository. You can use a [release branch](https://github.com/Sitecore/jss/branches/all?query=release%2F) or any other branch from the repository.
	
4. Change directory to your application folder: 
	```
	cd my-first-jss-app
	```
5. Start the development server:
	```
	jss start
	```

## Documentation and community resources

- [Official JSS documentation](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/sitecore-javascript-rendering-sdks--jss-.html)
- [StackExchange](https://sitecore.stackexchange.com/)
- [Community Slack](https://sitecorechat.slack.com/messages/jss)
- [Sitecore Community Forum](https://community.sitecore.net/developers/f/40)

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Sitecore JavaScript Rendering SDK; read below to learn how to participate in those efforts.

### [Code of Conduct](CODE_OF_CONDUCT.md)

Sitecore has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](CONTRIBUTING.md)

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to React.

### License

Sitecore JavaScript Services is using the [Apache 2.0 license](LICENSE.MD).

## [Support](SUPPORT.md)
