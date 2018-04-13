# Embedded Wizard Demo

Demonstrates embedding a JSS React application within a non-JSS Sitecore site. Useful for sites where a full JS application is not desired, but smaller applications are still needed within a larger whole.

Consult the primary JSS documentation at https://jss.sitecore.net for the latest documentation on JSS.

# Setup

**First** run `npm i` to install dependencies.

**Second**, if you have not already, install the JSS CLI: `npm install -g @sitecore-jss/sitecore-jss-cli` or `yarn global add @sitecore-jss/sitecore-jss-cli`. Then choose how to run the application:

## Disconnected Sitecore-less Development

Use `jss start` to run a local development server. Sitecore is not required to be installed, and content data is pulled from static local sources.

Disconnected development is appropriate when no Sitecore instance is available, or when frontend developers do not wish to run a local copy of Sitecore.

## Deploying to Sitecore

* Install the JSS server components on your local Sitecore installation according to the JSS documentation
* `jss setup` to configure the connection to a local Sitecore installation
* Review the application config patch file in `sitecore/config` to ensure that it is configured appropriately for your Sitecore installation.
* `jss deploy config` to deploy the Sitecore config patch file to the Sitecore instance (you may need to add the `hostName` to your `hosts` file)
* Use `jss deploy package` to deploy the sample to Sitecore
* Visit `$sitecoreHost/EmbeddedWizard/Wizard` to see the demonstration running in Sitecore