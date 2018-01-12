# Basic Application Demo

Demonstrates an very basic JSS Application written using React.

Consult the primary JSS documentation at https://jss.sitecore.net for the latest documentation on JSS.

# Setup

**First** run `npm i` to install dependencies. Then choose how to run the application:

## Disconnected Sitecore-less Development

Use `npm run start` to run a local development server. Sitecore is not required to be installed, and content data is pulled from static local sources.

Disconnected development is appropriate when no Sitecore instance is available, or when frontend developers do not wish to run a local copy of Sitecore.

## Deploying to Sitecore

* Install the JSS server components on your local Sitecore installation according to the JSS documentation
* `npm run setup` to configure the connection to a local Sitecore installation
* Review the application config patch file in `sitecore/config` to ensure that it is configured appropriately for your Sitecore installation.
* `npm run deploy-config` to deploy the Sitecore config patch file to the Sitecore instance (you may need to add the `hostName` to your `hosts` file)
* Use `npm run deploy-codefirst` to deploy the sample to Sitecore
* Visit `http://jssbasicapp` to see the demonstration running in Sitecore